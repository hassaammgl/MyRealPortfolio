import { useEffect, useRef, useState, forwardRef } from 'react'
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

uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_img;
uniform vec2 u_mouse;
uniform float u_hover;
uniform float u_time;
uniform float u_intensity;

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
  return outUv;
}

void main() {
  vec2 uv = coverUV(v_uv, u_res, u_img);
  vec2 m = u_mouse;

  float d = distance(uv, m);
  float radius = mix(0.22, 0.38, u_hover);
  float falloff = smoothstep(radius, 0.0, d);
  float strength = falloff * u_hover * u_intensity;

  float wave = sin(d * 28.0 - u_time * 3.2) * 0.012;
  vec2 dir = normalize(uv - m + vec2(0.0001));
  vec2 distorted = uv;
  distorted += dir * (wave + strength * 0.08);
  distorted.x += sin(uv.y * 14.0 + u_time * 1.6) * strength * 0.035;
  distorted.y += cos(uv.x * 14.0 + u_time * 1.4) * strength * 0.035;
  distorted -= (uv - m) * strength * 0.18;

  float shift = strength * 0.012;
  float r = texture2D(u_tex, distorted + vec2(shift, 0.0)).r;
  float g = texture2D(u_tex, distorted).g;
  float b = texture2D(u_tex, distorted - vec2(shift, 0.0)).b;
  float a = texture2D(u_tex, distorted).a;

  gl_FragColor = vec4(r, g, b, a);
}
`

function createShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[ShaderImage]', gl.getShaderInfoLog(s) || 'compile failed')
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
    console.error('[ShaderImage]', gl.getProgramInfoLog(p) || 'link failed')
    return null
  }
  return p
}

function loadCorsImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load ${src}`))
    image.src = src
  })
}

/**
 * Shery.js-style liquid image effect (mouse-reactive WebGL).
 * Falls back to a normal <img> on touch / CORS / no WebGL.
 */
const ShaderImage = forwardRef(function ShaderImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  intensity = 1,
  animated = false,
  style,
}, ref) {
  const localWrapRef = useRef(null)
  const wrapRef = (node) => {
    localWrapRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }
  const canvasRef = useRef(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const wrap = localWrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas || useFallback) return

    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (coarse) {
      setUseFallback(true)
      return
    }

    let raf = 0
    let disposed = false
    let gl = null
    let ro = null
    let sourceImg = null

    const cleanup = () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
      gl?.getExtension('WEBGL_lose_context')?.loseContext()
    }

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const state = { hover: 0, targetHover: 0 }

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1)
      mouse.ty = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1)
      state.targetHover = 1
    }
    const onEnter = () => { state.targetHover = 1 }
    const onLeave = () => { state.targetHover = 0 }

    const fail = () => {
      if (!disposed) setUseFallback(true)
    }

    ;(async () => {
      try {
        sourceImg = await loadCorsImage(src)
        if (disposed) return

        gl = canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          premultipliedAlpha: true,
        })
        if (!gl) return fail()

        const program = createProgram(gl)
        if (!program) return fail()

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW,
        )

        const aPos = gl.getAttribLocation(program, 'a_pos')
        const uTex = gl.getUniformLocation(program, 'u_tex')
        const uRes = gl.getUniformLocation(program, 'u_res')
        const uImg = gl.getUniformLocation(program, 'u_img')
        const uMouse = gl.getUniformLocation(program, 'u_mouse')
        const uHover = gl.getUniformLocation(program, 'u_hover')
        const uTime = gl.getUniformLocation(program, 'u_time')
        const uIntensity = gl.getUniformLocation(program, 'u_intensity')

        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

        try {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceImg)
        } catch {
          return fail()
        }

        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
        gl.uniform1i(uTex, 0)
        gl.uniform1f(uIntensity, intensity)

        const resize = () => {
          if (!gl || disposed) return
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          const rect = wrap.getBoundingClientRect()
          const w = Math.max(1, Math.floor(rect.width * dpr))
          const h = Math.max(1, Math.floor(rect.height * dpr))
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w
            canvas.height = h
          }
          gl.viewport(0, 0, w, h)
          gl.uniform2f(uRes, w, h)
          gl.uniform2f(uImg, sourceImg.naturalWidth || 1, sourceImg.naturalHeight || 1)
        }

        ro = new ResizeObserver(resize)
        ro.observe(wrap)
        wrap.addEventListener('mousemove', onMove)
        wrap.addEventListener('mouseenter', onEnter)
        wrap.addEventListener('mouseleave', onLeave)
        resize()

        const render = (t) => {
          if (disposed || !gl) return
          raf = requestAnimationFrame(render)

          mouse.x += (mouse.tx - mouse.x) * 0.12
          mouse.y += (mouse.ty - mouse.y) * 0.12
          state.hover += (state.targetHover - state.hover) * 0.08

          if (animated && sourceImg) {
            try {
              gl.bindTexture(gl.TEXTURE_2D, texture)
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceImg)
            } catch {
              /* ignore frame upload errors */
            }
          }

          gl.clearColor(0, 0, 0, 0)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.uniform2f(uMouse, mouse.x, mouse.y)
          gl.uniform1f(uHover, state.hover)
          gl.uniform1f(uTime, t * 0.001)
          gl.drawArrays(gl.TRIANGLES, 0, 6)
        }

        raf = requestAnimationFrame(render)
      } catch {
        fail()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [src, intensity, animated, useFallback])

  return (
    <div
      ref={wrapRef}
      className={clsx('relative overflow-hidden', className)}
      style={style}
      data-cursor-hover
    >
      <img
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        className={clsx(
          'pointer-events-none h-full w-full object-cover',
          useFallback ? 'opacity-100' : 'absolute inset-0 opacity-0',
          imgClassName,
        )}
        draggable={false}
      />
      {!useFallback && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        />
      )}
    </div>
  )
})

export default ShaderImage
