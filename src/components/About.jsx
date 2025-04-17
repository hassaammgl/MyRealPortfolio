import React from "react";
import aboutImg from "/aboutme.png"; // Replace with your image path

const AboutMe = () => {
    return (
        <section className="w-full min-h-screen bg-[#f7f7f7] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12">
            <div className="lg:w-1/2 space-y-6">
                <div>
                    <p className="text-3xl font-bold">...</p>
                    <h1 className="text-[80px] leading-none font-extrabold text-black">
                        ABOUT
                        <br />
                        ME <span className="inline-block text-[#ff4d00] text-[100px] leading-none">*</span>
                    </h1>
                </div>
                <p className="text-lg text-gray-700 max-w-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

            <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
                <img
                    src={aboutImg}
                    alt="About"
                    className="w-full h-auto object-cover rounded-md shadow-xl"
                />
                <h2 className="absolute bottom-4 left-4 text-5xl font-semibold text-[#ff4d00] italic pointer-events-none">
                    Introduction
                </h2>
                <p className="mt-6 text-lg text-gray-700 max-w-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                </p>

                <div className="mt-6 text-3xl text-gray-800 hover:translate-x-2 transition-transform cursor-pointer">
                    →
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
