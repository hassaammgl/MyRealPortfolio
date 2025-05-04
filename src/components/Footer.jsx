import React from 'react'
import AnimatedText from './AnimatedText'

const Footer = () => {
    return (
        <footer className="bg-primary text-white">
            <h1 className="text-[15vw] font-ruslan text-center font-light mt-10 uppercase leading-48">
                <AnimatedText className='text-tertiary' text={"HASSAAM"} />
            </h1>
            <div className="bg-accent text-black text-sm py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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