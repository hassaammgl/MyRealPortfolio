import { Element } from 'react-scroll';

const Hero = () => {

    const imgs = [
        {
            preview: "/hero-1.png",
            alt: "Hero",
            bg_img: "/hero1-bg.png",
        },
        {
            preview: "/hero-1.png",
            alt: "Hero",
            bg_img: "/hero1-bg.png",
        },
        {
            preview: "/hero-1.png",
            alt: "Hero",
            bg_img: "/hero1-bg.png",
        }
    ]

    return (
        <Element name="Home">
            <section className="relative h-[100dvh] w-screen ">
                <div className="absolute top-0 left-0 bg-[url('/hero1-bg.png')] bg-cover bg-center h-screen w-full opacity-10" />
                <div>
                    <div>
                        {imgs.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img.preview}
                                    alt={img.alt}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                </div>

            </section>
        </Element>
    );
};

export default Hero;

{/* <div className="">
<div className="">
    <div className="" />
    <img
        src=""
        alt="Hero"
        className=""
    />
</div>
<h1 className="">
    HELLO <br />
    I'M HABIBI <br />
    SHEKA
</h1>
</div>
<div className="">
<p className="">
    I explore a vibrant world of creativity where every brush-stroke tells a story
</p>
<p className="">
    An artist based in Ireland
</p>
</div> */}