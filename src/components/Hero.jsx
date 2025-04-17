import { useEffect, useRef } from "react";
// import gsap from "gsap";

const Hero = () => {
    const heroRef = useRef();

    useEffect(() => {
        // gsap.to(heroRef.current, {
        //     opacity: 0,
        //     y: 50,
        //     duration: 1.2,
        //     ease: "power3.out",
        // });
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen flex flex-col justify-center items-center bg-white px-4 md:px-12"
        >
            <div className="absolute top-6 left-6 text-2xl">•••</div>

            <div className="absolute top-6 right-6 text-gray-800 font-semibold text-lg">
                2030
            </div>

            <span className="text-sm uppercase border border-orange-500 px-4 py-1 rounded-full text-orange-500 mb-6 tracking-wider">
                Presentation Template
            </span>

            <h1 className="text-[64px] md:text-[120px] font-extrabold leading-tight tracking-tight text-gray-900 relative text-center font-heading">
                PORTFOLIO
                <span className="absolute -top-6 -right-4 text-orange-500 text-5xl font-black">
                    *
                </span>
            </h1>

            <p className="text-orange-500 text-5xl md:text-6xl font-semibold italic -mt-4 mb-8">
                Creative
            </p>

            <div className="flex gap-6 mt-4">
                <div className="w-32 h-4 rounded-lg bg-gradient-to-r from-pink-400 to-blue-400" />
                <div className="w-32 h-4 rounded-lg bg-gradient-to-r from-green-300 to-purple-600" />
            </div>

            <div className="absolute bottom-10 right-10 text-3xl animate-bounce">
                <span className="text-black">&darr;</span>
            </div>
        </section>
    );
};

export default Hero;
