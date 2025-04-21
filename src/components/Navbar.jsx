import React, { useState, useRef } from 'react'
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import gsap from 'gsap';
import { useNavStore } from '../store'
import { Link } from "react-scroll"
import { useGSAP } from "@gsap/react"
import Hamburger from 'hamburger-react'

const navLinks = [
    { name: "Home", link: "#" },
    { name: "About", link: "#" },
    { name: "Skills", link: "#" },
    { name: "Reads", link: "#" },
    { name: "Hobby", link: "#" },
    { name: "Projects", link: "#" },
    { name: "Contact", link: "#" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navRef = useRef(null);
    const tl = useRef();
    const { toggleNavAnimation } = useNavStore();

    useGSAP(() => {
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
            });
    }, { scope: navRef });

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

    return (
        <>
            <nav className='group w-full h-16 bg-transparent transition-all duration-500 ease-in-out hover:bg-accent flex items-center justify-between px-4 text-white fixed z-40'>
                <h1 className='group-hover:text-black font-extrabold text-xl'>HSM<span className='text-accent group-hover:text-white'>.</span></h1>
                <button className='text-white group-hover:text-black font-bold text-xl'>
                    <Hamburger toggled={open} toggle={handleToggle} />
                </button>
            </nav>
            <div
                ref={navRef}
                className='w-full h-screen bg-accent flex flex-col items-center justify-center px-4 text-white fixed top-0 left-0 translate-y-[-100px] z-30'
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
                }}
            >
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        className='text-2xl font-semibold mb-4 hover:underline'
                        onClick={handleToggle}
                        to={link.name}
                        smooth={true}
                        duration={500}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Navbar;
