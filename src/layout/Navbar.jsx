import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-scroll'
import Hamburger from 'hamburger-react'
import { useWindowScroll } from "react-use"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"

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
        gsap.set(linksRef.current, { y: 80, opacity: 0 })
        gsap.set(metaRef.current, { y: 30, opacity: 0 })

        tl.current = gsap.timeline({ paused: true })
            .set(overlayRef.current, { display: "flex" })
            .to(overlayRef.current, {
                autoAlpha: 1,
                duration: 0.35,
                ease: "power2.out",
            })
            .to(panelRef.current, {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.7,
                ease: "power3.inOut",
            }, "-=0.1")
            .to(linksRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.55,
                ease: "power3.out",
            }, "-=0.35")
            .to(metaRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.45,
                ease: "power2.out",
            }, "-=0.25")
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

    const handleMenuToggle = (next) => {
        setOpen(next)
        if (next) tl.current?.play()
        else tl.current?.reverse()
    }

    return (
        <>
            <TopNav open={open} onToggle={handleMenuToggle} />

            <div
                ref={overlayRef}
                className="fixed inset-0 z-30 hidden flex-col"
                style={{ visibility: "hidden" }}
            >
                <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />

                <div
                    ref={panelRef}
                    className="relative m-3 md:m-5 flex-1 min-h-0 rounded-3xl bg-accent text-white overflow-hidden flex flex-col px-6 pt-20 pb-6 md:px-16 md:pt-24 md:pb-10"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />

                    <div className="relative z-10 flex flex-col flex-1 min-h-0">
                        <p className="font-syne-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mb-4 md:mb-6 shrink-0">
                            ( Navigation )
                        </p>

                        <nav className="flex flex-col border-t border-white/20 flex-1 min-h-0 overflow-y-auto overscroll-contain">
                            {navLinks.map((link, i) => (
                                <div
                                    key={link.name}
                                    ref={addToRefs}
                                    className="border-b border-white/20 shrink-0"
                                >
                                    <Link
                                        to={link.name}
                                        smooth
                                        duration={700}
                                        spy
                                        onClick={handleLinkClick}
                                        data-cursor-hover
                                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6 py-3 md:py-4 cursor-pointer"
                                    >
                                        <span className="font-syne-mono text-xs text-white/45 group-hover:text-white transition-colors">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-boldonse uppercase text-2xl sm:text-3xl md:text-5xl lg:text-[4.5vw] leading-none text-white group-hover:text-black transition-colors duration-300">
                                            {link.label}
                                        </span>
                                        <span className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-black/70">
                                            <FaArrowUpRightFromSquare className="text-sm md:text-base" />
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div
                        ref={metaRef}
                        className="relative z-10 mt-4 md:mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 shrink-0"
                    >
                        <div>
                            <p className="font-syne-mono text-[10px] tracking-[0.25em] uppercase text-white/45 mb-1">
                                Get in touch
                            </p>
                            <a
                                href="mailto:contact@hassaammgl.com"
                                data-cursor-hover
                                className="font-roboto text-base md:text-xl text-white hover:text-black transition-colors duration-300"
                            >
                                contact@hassaammgl.com
                            </a>
                        </div>
                        <p className="font-brittany text-2xl md:text-3xl text-white/90">
                            Hassaam
                        </p>
                    </div>
                </div>
            </div>
        </>
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
            className={`w-full h-16 fixed top-0 z-40 flex items-center justify-between px-4 md:px-6 text-white transition-colors duration-500 ${
                open ? "bg-transparent" : "bg-transparent"
            }`}
        >
            <a href="/" data-cursor-hover className="relative z-50 flex items-center gap-3">
                <img src="/logo.png" className="size-9 object-contain" alt="logo" />
                <span className="hidden sm:block font-ruslan text-sm tracking-wide text-white/80">
                    hassaammgl
                </span>
            </a>

            <div
                data-cursor-hover
                className={`relative z-50 flex items-center gap-2 rounded-full border px-2 pl-4 transition-colors duration-300 ${
                    open
                        ? "border-white/30 bg-black/20 text-white"
                        : "border-white/15 bg-white/5 text-white backdrop-blur-md"
                }`}
            >
                <span className="font-syne-mono text-[10px] tracking-[0.2em] uppercase hidden sm:inline pointer-events-none">
                    {open ? "Close" : "Menu"}
                </span>
                <Hamburger
                    toggled={open}
                    toggle={onToggle}
                    size={18}
                    label="Toggle menu"
                />
            </div>
        </nav>
    )
}

export default Navbar
