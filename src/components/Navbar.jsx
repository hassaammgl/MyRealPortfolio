import React, { useState } from 'react'
import { FaBars, } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    }
    return (
        <>
            <nav className='group w-full h-16 bg-primary transition-all duration-500 ease-in-out hover:bg-accent flex items-center justify-between px-4 text-white'>
                <h1 className='group-hover:text-black font-extrabold font-'>HSM<span className='group-hover:text-white
                text-accent'>.</span></h1>
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
