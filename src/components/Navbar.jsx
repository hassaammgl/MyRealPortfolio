// import React, { useState, useRef } from 'react'
// import { FaBars } from "react-icons/fa";
// import { IoCloseSharp } from "react-icons/io5";
// import gsap from 'gsap';
// import { useNavStore } from '../store'
// import { Link } from "react-scroll"
// import { useGSAP } from "@gsap/react"
// import Hamburger from 'hamburger-react'

// const navLinks = [
//     { name: "Home", link: "#", value: ".home()" },
//     { name: "About", link: "#", value: ".about()" },
//     { name: "Skills", link: "#", value: ".skills()" },
//     { name: "Reads", link: "#", value: ".reads()" },
//     { name: "Hobby", link: "#", value: ".hobby()" },
//     { name: "Projects", link: "#", value: ".projects()" },
//     { name: "Contact", link: "#", value: ".contact()" },
// ];

// const Navbar = () => {
//     const [open, setOpen] = useState(false);
//     const navRef = useRef(null);
//     const tl = useRef();
//     const { toggleNavAnimation } = useNavStore();

//     useGSAP(() => {
//         tl.current = gsap.timeline({ paused: true })
//             .to(navRef.current, {
//                 duration: 0.5,
//                 opacity: 1,
//                 y: 0,
//                 clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
//                 ease: "power2.out",
//                 display: "flex",
//                 onComplete: () => {
//                     toggleNavAnimation();
//                 }
//             });
//     }, { scope: navRef });

//     const handleToggle = () => {
//         setOpen(prev => {
//             const newOpen = !prev;
//             if (newOpen) {
//                 tl.current.play();
//             } else {
//                 tl.current.reverse();
//             }
//             return newOpen;
//         });
//     };

//     return (
//         <>
//             <nav className='group w-full h-16 bg-transparent transition-all duration-500 ease-in-out hover:bg-accent flex items-center justify-between px-4 text-white fixed z-40 font-ruslan'>
//                 <h1 className='group-hover:text-black font-extrabold text-xl'>HSM<span className='text-accent group-hover:text-white'>.</span></h1>
//                 <button className='text-white group-hover:text-black font-bold text-xl'>
//                     <Hamburger toggled={open} toggle={handleToggle} />
//                 </button>
//             </nav>
//             <div
//                 ref={navRef}
//                 className='font-syne-mono w-full h-screen bg-accent flex flex-col items-center justify-center px-4 text-white fixed top-0 left-0 translate-y-[-100px] z-30'
//                 style={{
//                     clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
//                 }}
//             >
//                 {navLinks.map((link, i) => (
//                     <Link
//                         key={i}
//                         className='relative group text-2xl font-semibold mb-4 cursor-pointer transition-all duration-700 ease-in-out'
//                         onClick={handleToggle}
//                         to={link.name}
//                         smooth={true}
//                         duration={500}
//                     >
//                         {link.value} <span className='hidden opacity-0 group-hover:inline-block group-hover:opacity-100 transition-all duration-700 ease-in-out'>{`{ // ${link.name} }`}</span>
//                     </Link>
//                 ))}
//             </div>
//         </>
//     );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-scroll';
import Hamburger from 'hamburger-react';
import { useNavStore } from '../store';

const navLinks = [
    { name: "Home", link: "home", value: ".home()" },
    { name: "About", link: "about", value: ".about()" },
    { name: "Skills", link: "skills", value: ".skills()" },
    { name: "Reads", link: "reads", value: ".reads()" },
    { name: "Hobby", link: "hobby", value: ".hobby()" },
    { name: "Projects", link: "projects", value: ".projects()" },
    { name: "Contact", link: "contact", value: ".contact()" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const tl = useRef();
    const { toggleNavAnimation } = useNavStore();

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
                onComplete: () => {
                    toggleNavAnimation();
                }
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
                gsap.to(text, { opacity: 0, x: 20, duration: 0.2 });
                gsap.to(hoverText, { opacity: 1, x: 0, duration: 0.2 });
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
            <nav className='group w-full h-16 bg-transparent transition-all duration-500 ease-in-out hover:bg-accent flex items-center justify-between px-4 text-white fixed z-40 font-ruslan'>
                <h1 className='group-hover:text-black font-extrabold text-xl'>HSM<span className='text-accent group-hover:text-white'>.</span></h1>
                <button
                    className='text-white group-hover:text-black font-bold text-xl'
                    aria-label="Toggle menu"
                >
                    <Hamburger toggled={open} toggle={handleToggle} />
                </button>
            </nav>
            <div
                ref={navRef}
                className='font-syne-mono w-full h-screen bg-accent flex flex-col items-center justify-center px-4 text-white fixed top-0 left-0 z-30'
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
                            className='relative group text-2xl font-semibold cursor-pointer inline-block'
                            onClick={handleLinkClick}
                            to={link.link}
                            smooth={true}
                            duration={500}
                            spy={true}
                        >
                            <span className="nav-text inline-block">{link.value}</span>
                            <span className='hover-text absolute left-0 top-0 inline-block'>{`{ ()=>${link.name} }`}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Navbar;