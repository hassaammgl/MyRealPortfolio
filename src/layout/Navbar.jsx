import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-scroll';
import Hamburger from 'hamburger-react';
import { useWindowScroll } from "react-use"

const navLinks = [
    { name: "Home", link: "home", value: "<Home />" },
    { name: "About", link: "about", value: "<About />" },
    { name: "Services", link: "services", value: "<Services />" },
    { name: "Projects", link: "projects", value: "<Projects />" },
    { name: "Contact", link: "contact", value: "<Contact />" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const tl = useRef();

    // Store link refs
    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    useGSAP(() => {
        // Main navigation animation
        tl.current = gsap.timeline({ paused: true })
            .to(navRef.current, {
                duration: 0.5,
                opacity: 1,
                y: 0,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                ease: "power2.out",
                display: "flex",
            })
            .from(linksRef.current, {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, "-=0.3");
    }, { scope: navRef });

    // Hover animations for links
    useGSAP(() => {
        linksRef.current.forEach(link => {
            const text = link.querySelector('.nav-text');
            const hoverText = link.querySelector('.hover-text');

            gsap.set(hoverText, { opacity: 0, x: -20 });

            link.addEventListener('mouseenter', () => {
                gsap.to(text, { opacity: 0, x: 20, duration: 0.8 });
                gsap.to(hoverText, { opacity: 1, x: 0, duration: 0.8 });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(text, { opacity: 1, x: 0, duration: 0.2 });
                gsap.to(hoverText, { opacity: 0, x: -20, duration: 0.2 });
            });
        });
    }, { dependencies: [open], scope: navRef });

    const handleToggle = () => {
        setOpen(prev => {
            const newOpen = !prev;
            if (newOpen) {
                tl.current.play();
            } else {
                tl.current.reverse();
            }
            return newOpen;
        });
    };

    // Close menu when clicking on a link
    const handleLinkClick = () => {
        setOpen(false);
        tl.current.reverse();
    };

    return (
        <>
            <TopNav open={open} handleToggle={handleToggle} />
            <div
                ref={navRef}
                className='font-syne-mono w-full h-screen bg-tertiary flex flex-col items-center justify-center px-4 text-white fixed top-0 left-0 z-30'
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                    opacity: 0,
                    display: 'none'
                }}
            >
                {navLinks.map((link, i) => (
                    <div
                        key={i}
                        ref={addToRefs}
                        className='overflow-hidden mb-4'
                    >
                        <Link
                            className='relative group text-2xl font-semibold cursor-pointer inline-block border-2 w-[12rem] border-transparent rounded-lg transition-all duration-700 ease-in-out'
                            onClick={handleLinkClick}
                            to={link.name}
                            smooth={true}
                            duration={500}
                            spy={true}
                        >
                            <span className="nav-text inline-block">{link.value}</span>
                            <span className='hover-text absolute left-0 top-0 inline-block'>{"<>" + link.name + "</>"}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

const TopNav = ({ open, handleToggle }) => {
    // const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const navRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        // Animate navbar with GSAP on visibility change
        gsap.to(navRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            ease: "power2.out",
            duration: 0.5,
        });
    }, [isNavVisible]);

    const lastScrollYRef = useRef(0); 
    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navRef.current?.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollYRef.current) {
            setIsNavVisible(false);
            navRef.current?.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollYRef.current) {
            setIsNavVisible(true);
            navRef.current?.classList.add('floating-nav');
        }

        lastScrollYRef.current = currentScrollY; 
    }, [currentScrollY]); 


    return (
        <nav
            ref={navRef}
            className="w-full h-16 fixed top-0 z-40 flex items-center justify-between px-4 text-white bg-transparent font-ruslan transition-all duration-500"
        >
            <a href="/">
                <img src="/logo.png" className='size-9 object-contain' alt="logo" />
            </a>
            <button
                className="text-white font-bold text-xl"
                aria-label="Toggle menu"
            >
                <Hamburger toggled={open} toggle={handleToggle} />
            </button>
        </nav>
    );
};

export default Navbar;