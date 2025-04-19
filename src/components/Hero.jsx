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
            data-scroll-section
            className="w-full max-h-screen h-screen"
        >

            <span className="px-8 py-1 text-orange-600 uppercase font-extrabold border-black border-[1px] rounded-full">
                full stack DEVLOPER
            </span>

            <h1 className="">
                PORTFOLIO
                <span className="">
                    *
                </span>
            </h1>

            <p className="">
                Creative
            </p>

            <div className="">
                <div className="" />
                <div className="" />
            </div>

            <div className="">
                <span className="">&darr;</span>
            </div>
        </section>
    );
};

export default Hero;

/*  <div className="flex gap-6 mt-4">
                <div className="w-32 h-4 rounded-lg bg-gradient-to-r from-pink-400 to-blue-400" />
                <div className="w-32 h-4 rounded-lg bg-gradient-to-r from-green-300 to-purple-600" />
            </div> */