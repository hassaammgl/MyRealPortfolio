import { useRef, Fragment } from 'react';
import { Element } from 'react-scroll';
import { FaArrowRight } from "react-icons/fa6";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACTS } from '@/constants';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (contentRef.current) {
            const children = contentRef.current.children;

            // Set initial state
            gsap.set(children, {
                opacity: 0,
                y: (index) => (children[index].tagName === 'HR' ? 0 : 50)
            });

            // Animate with fromTo
            gsap.fromTo(children,
                {
                    opacity: 0,
                    y: (index) => (children[index].tagName === 'HR' ? 0 : 50)
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'bottom center',
                        toggleActions: 'play none none reverse',
                        // markers: false // Set to true for debugging
                    }
                }
            );
        }
    }, []);

    return (
        <Element name="Contact">
            <section
                ref={sectionRef}
                className="text-white relative h-fit w-screen flex items-center justify-center p-4 md:p-20 lg:p-40"
            >
                <div
                    ref={contentRef}
                    className="w-full h-full uppercase font-boldonse max-w-6xl mx-auto"
                >
                    <h3 className="text-4xl md:text-5xl lg:text-6xl py-6 md:py-8 lg:py-10 hover:text-accent transition-colors duration-700 ease-in-out">
                        Connect with us
                    </h3>
                    <hr className="text-tertiary my-2" />
                    {CONTACTS.map((data, idx) => (
                        <Fragment key={idx}>
                            <Links name={data.name} url={data.url} />
                            <hr className="text-tertiary my-2" />
                        </Fragment>
                    ))}
                </div>
            </section>
        </Element>
    );
};

const Links = ({ name, url }) => {
    return (
        <a
            className="group flex justify-between items-center py-4 md:py-6 lg:py-8 hover:text-accent transition-colors"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="text-xl md:text-2xl lg:text-3xl transition-all duration-300">
                {name}
            </span>
            <span className="text-2xl md:text-3xl lg:text-4xl transition-all duration-300 group-hover:-rotate-45">
                <FaArrowRight />
            </span>
        </a>
    );
};

export default Contact;