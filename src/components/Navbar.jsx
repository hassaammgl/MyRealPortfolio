import React, { useState, useRef } from 'react'
import { FaBars, } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import gsap from 'gsap';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const navRef = useRef(null);
    const tl = gsap.timeline({ paused: true });
    tl.to(navRef.current, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power2.out"
    })
    const handleToggle = () => {
        setOpen(!open);
        if (open) {
            tl.reverse();
        } else {
            tl.play();
        }
    }
    return (
        <>
            <nav className='group w-full h-16 bg-primary transition-all duration-500 ease-in-out hover:bg-accent flex items-center justify-between px-4 text-white'>
                <h1 className='group-hover:text-black font-extrabold font-'>HSM<span className='text-accent group-hover:text-white
                '>.</span></h1>
                <button onClick={handleToggle} className='text-white group-hover:text-black font-bold'>
                    {open ? <IoCloseSharp className=' text-2xl' /> : <FaBars />}
                </button>
            </nav>
            <div className='w-full h-screen bg-primary flex items-center justify-between px-4'>
            </div>
        </>
    )
}

export default Navbar
