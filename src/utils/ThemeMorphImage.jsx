import { useEffect, useRef, useState, forwardRef, useCallback } from 'react'
import gsap from 'gsap'
import clsx from 'clsx'

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;

uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform vec2 u_res;
uniform vec2 u_img;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_blend;
uniform float u_time;
uniform vec2 u_click;
uniform float u_busy;

varying vec2 v_uv;

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float ra = res.x / max(res.y, 1.0);
  float ia = img.x / max(img.y, 1.0);
  vec2 outUv = uv;
  if (ra > ia) {
    float s = ia / ra;
    outUv.y = outUv.y * s + (1.0 - s) * 0.5;
  } else {
    float s = ra / ia;
    outUv.x = outUv.x * s + (1.0 - s) * 0.5;
  }
  return clamp(outUv, 0.0, 1.0);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = coverUV(v_uv, u_res, u_img);

  // Water distortion while transitioning
  float travel = u_busy;
  float dClick = distance(uv, u_click);
  float n = noise(uv * 4.5 + u_time * 0.5);
  vec2 dir = normalize(uv - u_click + vec2(0.0001));
  float ripple = sin(dClick * 22.0 - u_blend * 20.0) * 0.055 * travel;
  vec2 distorted = uv + dir * ripple;
  distorted.x += sin(uv.y * 14.0 + u_blend * 12.0) * 0.03 * travel;
  distorted.y += cos(uv.x * 14.0 + u_blend * 12.0) * 0.03 * travel;
  distorted += (n - 0.5) * 0.04 * travel;

  // Soft water-shaped blend (not a hard fade)
  float wave = (n - 0.5) * 0.35 * travel;
  float shaped = clamp(u_blend + wave + ripple * 3.0, 0.0, 1.0);

  // Hover: peek the opposite theme under cursor
  float dHover = distance(uv, u_mouse);
  float lens = smoothstep(0.5, 0.0, dHover) * u_hover * (1.0 - travel * 0.85);
  float hoverTarget = 1.0 - u_blend;
  float mixAmt = mix(shaped, hoverTarget, lens);

  vec2 sampleUV = mix(uv, distorted, max(travel, lens * 0.55));
  vec4 colorA = texture2D(u_texA, sampleUV);
  vec4 colorB = texture2D(u_texB, sampleUV);
  vec4 color = mix(colorA, colorB, clamp(mixAmt, 0.0, 1.0));

  float sheen = travel * (1.0 - abs(u_blend - 0.5) * 2.0);
  color.rgb += sheen * 0.2;

  gl_FragColor = color;
}
`

function createShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[ThemeMorph] shader:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

function createProgram(gl) {
  const vs = createShader(gl, gl.VERTEX_SHADER, VERT)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const p = gl.createProgram()
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('[ThemeMorph] link:', gl.getProgramInfoLog(p))
    return null
  }
  return p
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load ${src}`))
    image.src = src
  })
}

const ThemeMorphImage = forwardRef(function ThemeMorphImage({
  srcA,
  srcB,
  alt = '',
  className = '',
  imgClassName = '',
  style,
  onThemeChange,
}, ref) {
  const localWrapRef = useRef(null)
  const wrapRef = (node) => {
    localWrapRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }
  const canvasRef = useRef(null)
  const [useGL, setUseGL] = useState(true)
  const [theme, setTheme] = useState('dark') // dark = A, light = B
  const blendRef = useRef({ value: 0, busy: 0 })
  const flippingRef = useRef(false)

  const notify = useCallback((next) => {
    setTheme(next)
    onThemeChange?.(next)
  }, [onThemeChange])

  useEffect(() => {
    const wrap = localWrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas || !useGL) return

    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      setUseGL(false)
      return
    }

    let raf = 0
    let disposed = false
    let gl = null
    let ro = null

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, hover: 0, targetHover: 0 }
    const click = { x: 0.5, y: 0.5 }

    const hit = (e) => {
      const rect = wrap.getBoundingClientRect()
      const ok =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      return { ok, rect }
    }

    const onMove = (e) => {
      const { ok, rect } = hit(e)
      if (!ok) {
        mouse.targetHover = 0
        return
      }
      mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1)
      mouse.ty = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)
      mouse.targetHover = 1
    }

    const onClick = (e) => {
      if (flippingRef.current || disposed) return
      if (e.target?.closest?.('a, button, input, textarea')) return
      const { ok, rect } = hit(e)
      if (!ok) return

      click.x = (e.clientX - rect.left) / Math.max(rect.width, 1)
      click.y = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)

      const from = blendRef.current.value
      const to = from < 0.5 ? 1 : 0
      flippingRef.current = true
      blendRef.current.busy = 1

      gsap.killTweensOf(blendRef.current)
      gsap.timeline({
        onComplete: () => {
          blendRef.current.value = to
          blendRef.current.busy = 0
          flippingRef.current = false
          notify(to > 0.5 ? 'light' : 'dark')
        },
      })
        .to(blendRef.current, {
          value: to,
          duration: 1.35,
          ease: 'power2.inOut',
        })
        .to(blendRef.current, {
          busy: 0,
          duration: 0.4,
          ease: 'power1.out',
        }, 0.95)
    }

    ;(async () => {
      try {
        const [imgA, imgB] = await Promise.all([loadImage(srcA), loadImage(srcB)])
        if (disposed) return

        gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true })
        if (!gl) {
          setUseGL(false)
          return
        }

        const program = createProgram(gl)
        if (!program) {
          setUseGL(false)
          return
        }

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW,
        )

        const aPos = gl.getAttribLocation(program, 'a_pos')
        const locs = {
          texA: gl.getUniformLocation(program, 'u_texA'),
          texB: gl.getUniformLocation(program, 'u_texB'),
          res: gl.getUniformLocation(program, 'u_res'),
          img: gl.getUniformLocation(program, 'u_img'),
          mouse: gl.getUniformLocation(program, 'u_mouse'),
          hover: gl.getUniformLocation(program, 'u_hover'),
          blend: gl.getUniformLocation(program, 'u_blend'),
          time: gl.getUniformLocation(program, 'u_time'),
          click: gl.getUniformLocation(program, 'u_click'),
          busy: gl.getUniformLocation(program, 'u_busy'),
        }

        const makeTex = (image) => {
          const t = gl.createTexture()
          gl.bindTexture(gl.TEXTURE_2D, t)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
          return t
        }

        const texA = makeTex(imgA)
        const texB = makeTex(imgB)

        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const resize = () => {
          if (!gl || disposed) return
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          const rect = wrap.getBoundingClientRect()
          const w = Math.max(2, Math.floor(rect.width * dpr))
          const h = Math.max(2, Math.floor(rect.height * dpr))
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
          gl.uniform2f(locs.res, w, h)
          gl.uniform2f(locs.img, imgA.naturalWidth || 1, imgA.naturalHeight || 1)
        }

        ro = new ResizeObserver(resize)
        ro.observe(wrap)
        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('click', onClick)
        resize()

        const render = (t) => {
          if (disposed || !gl) return
          raf = requestAnimationFrame(render)

          mouse.x += (mouse.tx - mouse.x) * 0.14
          mouse.y += (mouse.ty - mouse.y) * 0.14
          mouse.hover += (mouse.targetHover - mouse.hover) * 0.12

          gl.clearColor(0, 0, 0, 0)
          gl.clear(gl.COLOR_BUFFER_BIT)

          gl.activeTexture(gl.TEXTURE0)
          gl.bindTexture(gl.TEXTURE_2D, texA)
          gl.uniform1i(locs.texA, 0)
          gl.activeTexture(gl.TEXTURE1)
          gl.bindTexture(gl.TEXTURE_2D, texB)
          gl.uniform1i(locs.texB, 1)

          gl.uniform2f(locs.mouse, mouse.x, mouse.y)
          gl.uniform1f(locs.hover, mouse.hover)
          gl.uniform1f(locs.blend, blendRef.current.value)
          gl.uniform1f(locs.busy, blendRef.current.busy)
          gl.uniform1f(locs.time, t * 0.001)
          gl.uniform2f(locs.click, click.x, click.y)
          gl.drawArrays(gl.TRIANGLES, 0, 6)
        }

        raf = requestAnimationFrame(render)
      } catch (err) {
        console.error('[ThemeMorph]', err)
        if (!disposed) setUseGL(false)
      }
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      gsap.killTweensOf(blendRef.current)
      ro?.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [srcA, srcB, useGL, notify])

  // CSS fallback swap (no WebGL)
  useEffect(() => {
    if (useGL) return
    const wrap = localWrapRef.current
    if (!wrap) return

    const onClick = (e) => {
      if (e.target?.closest?.('a, button')) return
      const rect = wrap.getBoundingClientRect()
      const ok =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      if (!ok) return
      setTheme((t) => {
        const next = t === 'dark' ? 'light' : 'dark'
        onThemeChange?.(next)
        return next
      })
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [useGL, onThemeChange])

  return (
    <div
      ref={wrapRef}
      className={clsx('relative overflow-hidden', className)}
      style={style}
      data-cursor-hover
    >
      {/* Always keep both imgs for fallback / preload */}
      <img
        src={srcA}
        alt={alt}
        className={clsx(
          'pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
          useGL ? 'opacity-0' : theme === 'dark' ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
        draggable={false}
      />
      <img
        src={srcB}
        alt=""
        className={clsx(
          'pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
          useGL ? 'opacity-0' : theme === 'light' ? 'opacity-100' : 'opacity-0',
          imgClassName,
        )}
        draggable={false}
      />
      {useGL && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />
      )}
    </div>
  )
})

export default ThemeMorphImage
