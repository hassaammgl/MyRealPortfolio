
import { Element } from 'react-scroll';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LANGS } from '@/constants';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);
    const animations = useRef([]);


    return (
        <Element name="Skills">
            <section
                ref={sectionRef}
                className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
            >
                <div className="max-w-7xl mx-auto">
                    <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 perspective-1000">
                        {LANGS.map((skill, index) => (
                            <div
                                key={`${skill.name}-${index}`}
                                ref={el => (cardsRef.current[index] = el)}
                                className="rounded-xl p-6 shadow-xl transform transition-transform duration-300 preserve-3d hover:shadow-2xl"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    backfaceVisibility: 'hidden',
                                    backgroundColor: skill.bgcolor
                                }}
                            >
                                <div className="flex flex-col h-full transform translate-z-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-2xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                            {skill.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                                    </div>

                                    <div className="relative h-4 bg-black bg-opacity-20 rounded-full mb-6 overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-white rounded-full"
                                            style={{ width: `${skill.percentage}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex justify-between items-center">
                                        <a
                                            href={skill.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-white hover:underline"
                                        >
                                            Documentation
                                        </a>
                                        <div className="w-10 h-10 rounded-full bg-black bg-opacity-20 flex items-center justify-center">
                                            <span className="text-white font-bold">{skill.percentage}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Element>
    );
};

export default Skills;