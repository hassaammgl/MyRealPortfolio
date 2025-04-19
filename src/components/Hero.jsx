import { Element } from 'react-scroll';
import heroImage from '/hero.png'

const Hero = () => {
    return (
        <Element name="Home">
            <section className="relative min-h-screen flex-col overflow-hidden w-full h-screen bg-primary flex items-center justify-center text-white">
                <p className="relative z-10 text-lg mb-4 uppercase font-ruslan">👋, my name is Hassaam and I am a freelancer</p>
                <div className="relative z-10 w-full p-2">
                    <h1 className="uppercase font-extrabold font-boldonse text-center text-[10vw] text-accent" >
                        Webdevloper
                    </h1>
                    <h1
                        className="transition-all font-extrabold ease-in-out duration-500 uppercase text-transparent hover:text-accent font-boldonse text-center text-[10vw]"
                        style={{ WebkitTextStroke: '1px #e94560' }}
                    >
                        Programmer
                    </h1>
                    <span className="font-roboto w-[95%] m-auto flex justify-between items-center">
                        <p className='' >based in Pakistan. 🇵🇰</p>
                        <p className="text-sm font-brittany">
                            <span className='transition-all duration-300 ease-in font-bold hover:text-accent pr-3' >Creative</span>
                            <span className='transition-all duration-300 ease-in font-bold hover:text-accent' >HassaamMgl</span>
                        </p>
                    </span>
                </div>
                <div className="flex flex-col items-center gap-6 mt-8 absolute bottom-0 w-full p-4">
                    <img
                        src={heroImage}
                        alt="Hassaam portrait"
                        className="w-full max-w-[35vw] min-w-[200px]"
                    />
                </div>
            </section>
        </Element>
    );
};

export default Hero;
// <section className='w-full h-screen bg-primary flex items-center justify-center text-white'>
//     {/* 👋 */}
//     <h1 className="text-4xl font-bold">Welcome to the Hero Section</h1>
// </section>