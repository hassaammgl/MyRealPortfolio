import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-scroll'
import { useWindowScroll } from "react-use"

const navLinks = [
    { name: "Home", label: "Home" },
    { name: "About", label: "About" },
    { name: "Services", label: "Services" },
    { name: "Projects", label: "Projects" },
    { name: "Contact", label: "Contact" },
]

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const overlayRef = useRef(null)
    const panelRef = useRef(null)
    const linksRef = useRef([])
    const metaRef = useRef(null)
    const tl = useRef(null)

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el)
        }
    }

    useGSAP(() => {
        gsap.set(overlayRef.current, { autoAlpha: 0 })
        gsap.set(panelRef.current, { clipPath: "inset(0 0 100% 0)" })
        gsap.set(linksRef.current, { y: 40, opacity: 0 })
        gsap.set(metaRef.current, { opacity: 0 })

        tl.current = gsap.timeline({ paused: true })
            .set(overlayRef.current, { display: "flex" })
            .to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.3,
                ease: "power2.out",
            })
            .to(panelRef.current, {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.55,
                ease: "power3.inOut",
            }, "-=0.05")
            .to(linksRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.06,
                duration: 0.4,
                ease: "power3.out",
            }, "-=0.25")
            .to(metaRef.current, {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out",
            }, "-=0.2")
    }, { scope: overlayRef })

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    const handleLinkClick = () => {
        setOpen(false)
        tl.current?.reverse()
    }

    const handleMenuToggle = () => {
        setOpen((prev) => {
            const next = !prev
            if (next) tl.current?.play()
            else tl.current?.reverse()
            return next
        })
    }

    return (
        <>
            <TopNav open={open} onToggle={handleMenuToggle} />

            <div
                ref={overlayRef}
                className="fixed inset-0 z-30 hidden h-dvh flex-col p-3 md:p-4"
                style={{ visibility: "hidden" }}
            >
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />

                <div
                    ref={panelRef}
                    className="menu-panel relative z-10 h-full min-h-0 rounded-3xl bg-accent text-white flex flex-col overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full min-h-0 px-5 pt-16 pb-4 md:px-12 md:pt-20 md:pb-6">
                        <p className="font-syne-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2 shrink-0">
                            ( Navigation )
                        </p>

                        <nav className="flex flex-col flex-1 min-h-0 border-t border-white/20">
                            {navLinks.map((link, i) => (
                                <div
                                    key={link.name}
                                    ref={addToRefs}
                                    className="flex-1 min-h-0 border-b border-white/20 flex"
                                >
                                    <Link
                                        to={link.name}
                                        smooth
                                        duration={700}
                                        spy
                                        onClick={handleLinkClick}
                                        data-cursor-hover
                                        className="group w-full h-full grid grid-cols-[2.5rem_1fr] md:grid-cols-[3rem_1fr] items-center gap-2 md:gap-4 cursor-pointer"
                                    >
                                        <span className="font-syne-mono text-[10px] md:text-xs text-white/45 group-hover:text-white transition-colors">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="menu-link-label font-boldonse uppercase leading-none text-white group-hover:text-black transition-colors duration-300">
                                            {link.label}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        <div
                            ref={metaRef}
                            className="shrink-0 mt-3 pt-3 border-t border-white/15 flex items-center justify-between gap-3"
                        >
                            <a
                                href="mailto:contact@hassaammgl.com"
                                data-cursor-hover
                                className="font-roboto text-xs md:text-sm text-white/80 hover:text-white transition-colors truncate"
                            >
                                contact@hassaammgl.com
                            </a>
                            <p className="font-brittany text-xl md:text-2xl text-white/90 shrink-0">
                                Hassaam
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MenuToggle = ({ open, onToggle }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            data-cursor-hover
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`relative z-50 flex items-center gap-3 rounded-full border h-11 pl-4 pr-3 transition-all duration-300 ${
                open
                    ? "border-white/40 bg-black/35 text-white"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15"
            }`}
        >
            <span className="font-syne-mono text-[10px] tracking-[0.22em] uppercase pointer-events-none">
                {open ? "Close" : "Menu"}
            </span>
            <span className="relative w-5 h-3.5 pointer-events-none" aria-hidden>
                <span
                    className={`absolute left-0 top-0 h-[1.5px] w-full bg-current rounded-full transition-all duration-300 origin-center ${
                        open ? "translate-y-[6px] rotate-45" : ""
                    }`}
                />
                <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ${
                        open ? "opacity-0 scale-x-0" : "opacity-100"
                    }`}
                />
                <span
                    className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-current rounded-full transition-all duration-300 origin-center ${
                        open ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                />
            </span>
        </button>
    )
}

const TopNav = ({ open, onToggle }) => {
    const [isNavVisible, setIsNavVisible] = useState(true)
    const navRef = useRef(null)
    const lastScrollYRef = useRef(0)
    const { y: currentScrollY } = useWindowScroll()

    useEffect(() => {
        gsap.to(navRef.current, {
            y: isNavVisible || open ? 0 : -100,
            opacity: isNavVisible || open ? 1 : 0,
            ease: "power2.out",
            duration: 0.45,
        })
    }, [isNavVisible, open])

    useEffect(() => {
        if (open) {
            setIsNavVisible(true)
            return
        }

        if (currentScrollY === 0) {
            setIsNavVisible(true)
            navRef.current?.classList.remove("floating-nav")
        } else if (currentScrollY > lastScrollYRef.current) {
            setIsNavVisible(false)
            navRef.current?.classList.add("floating-nav")
        } else if (currentScrollY < lastScrollYRef.current) {
            setIsNavVisible(true)
            navRef.current?.classList.add("floating-nav")
        }

        lastScrollYRef.current = currentScrollY
    }, [currentScrollY, open])

    return (
        <nav
            ref={navRef}
            className="w-full h-16 fixed top-0 z-40 flex items-center justify-between px-4 md:px-6 text-white"
        >
            <a href="/" data-cursor-hover className="relative z-50 flex items-center gap-3">
                <img src="/logo.png" className="size-9 object-contain" alt="logo" />
                <span className="hidden sm:block font-ruslan text-sm tracking-wide text-white/80">
                    hassaammgl
                </span>
            </a>

            <MenuToggle open={open} onToggle={onToggle} />
        </nav>
    )
}

export default Navbar
