import React from 'react'

const Footer = () => {
    return (

        <footer className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Left - Info */}
                <div className="col-span-2 space-y-6">
                    <div className="text-sm uppercase text-gray-400">
                        Uncover the potency of MGL. at
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold underline underline-offset-4 decoration-white">
                        info@hassaammgl.com
                    </h2>
                    <div className="space-y-2 text-lg font-medium">
                        <div>Products</div>
                        <div>Pricing</div>
                        <div>Contact Us</div>
                    </div>
                </div>
                {/* Right - CTA + Address */}
                <div className="flex flex-col justify-between items-start gap-10">
                    {/* Get Started */}
                    <div className="bg-accent text-black p-4 rounded-xl space-y-2 w-full max-w-[200px]">
                        <p className="text-lg font-bold">Get Started</p>
                        <button className="bg-tertiary text-white px-4 py-2 rounded-lg w-full flex items-center justify-between">
                            Go <span className="ml-2">→</span>
                        </button>
                    </div>
                    {/* Address */}
                    <div className="text-sm leading-relaxed">
                        <p className="font-bold text-lg">Office</p>
                        <p>8574 Cempaka</p>
                        <p>Kotamso, Sleman</p>
                        <p>43452</p>
                    </div>
                </div>
            </div>
            {/* Divider */}
            <h1 className="text-[15vw] text-center font-light mt-10 uppercase leading-48">
                Hassaammgl
            </h1>
            {/* Bottom Bar */}
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
