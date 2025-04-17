import React from "react";
import personImg from "/whoiam.png"; // Replace with actual image
import abstractImg from "/abstract.jpg"; // Replace with abstract texture

const WhoIAm = () => {
    return (
        <section className="w-full min-h-screen bg-[#f7f7f7] px-6 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">

            <div className="relative w-full lg:w-1/2">
                <img
                    src={personImg}
                    alt="Chiaki Sato"
                    className="w-full h-auto object-cover rounded-md"
                />

                <h2 className="absolute top-4 left-4 text-4xl lg:text-5xl text-[#ff4d00] italic font-medium">
                    Hello, i'm
                </h2>

                <div className="mt-6 lg:mt-10">
                    <h1 className="text-[70px] lg:text-[120px] leading-none font-extrabold text-black">
                        CHIAKI
                        <br />
                        SATO
                    </h1>
                </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
                <img
                    src={abstractImg}
                    alt="Abstract texture"
                    className="w-full max-w-md h-auto object-cover rounded-md"
                />
                <p className="text-lg text-gray-700 max-w-md">
                    nepos Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                </p>
                <div className="text-3xl hover:translate-x-2 transition-transform cursor-pointer">
                    →
                </div>
            </div>
        </section>
    );
};

export default WhoIAm;
