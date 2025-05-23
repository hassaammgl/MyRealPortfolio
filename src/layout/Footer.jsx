import React from 'react'
import AnimatedText from '@/utils/AnimatedText'

const Footer = () => {
    return (
        <footer className=" text-white font-Audiowide">
            <h1 className="text-[15vw] font-ruslan text-center font-light mt-10 uppercase leading-48">
                <AnimatedText start='top 100%' className='text-tertiary' text={"HASSAAM"} />
            </h1>
            <div className="bg-accent text-white text-sm py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>Copyright © hassaammgl {new Date().getFullYear()}</p>
                <p>📍 PAKISTAN |🇵🇰| PUNJAB</p>
                <div className="flex gap-4 underline">
                    <a href="#">Github</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}


export default Footer