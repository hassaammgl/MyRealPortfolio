import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import AnimatedCounter from '@/components/AnimatedCounter';
import { LINKS } from '@/constants';

const SocialLinks = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const links = containerRef.current.querySelectorAll('a');

        gsap.set(links, { opacity: 0, y: -30, scale: 0.7 });

        links.forEach(link => {
            const name = document.createElement('span');
            name.className = 'link-name absolute left-full ml-2 px-2 py-1 rounded-md text-sm whitespace-nowrap';
            name.style.backgroundColor = 'rgba(138,43,226,0.3)';
            name.style.backdropFilter = 'blur(12px)';
            name.style.border = '1px solid rgba(255,255,255,0.18)';
            name.style.opacity = 0;
            name.textContent = link.getAttribute('data-name');
            link.appendChild(name);
        });

        gsap.to(links, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "elastic.out(1,0.5)"
        });

        links.forEach(link => {
            const name = link.querySelector('.link-name');

            link.addEventListener('mouseenter', () => {
                gsap.to(link, { scale: 1.15, y: -3, duration: 0.15 });
                gsap.to(name, { opacity: 1, x: 10, duration: 0.2 });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, { scale: 1, y: 0, duration: 0.2 });
                gsap.to(name, { opacity: 0, x: 0, duration: 0.15 });
            });
        });

        return () => {
            links.forEach(link => {
                const name = link.querySelector('.link-name');
                if (name) link.removeChild(name);
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute text-white z-10 top-16 right-7">
            <div data-cursor-hover data-cursor-size="large" className="flex flex-col gap-3">
                {LINKS.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full text-white text-2xl peer-hover:text-accent relative"
                        style={{
                            background: 'rgba(138,43,226,0.15)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            boxShadow: '0 8px 32px rgba(31,38,135,0.15)'
                        }}
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

const Stats = () => {
    const [repos, setRepos] = useState(0);

    useEffect(() => {
        axios.get('https://api.github.com/users/hassaammgl')
            .then(res => setRepos(res.data.public_repos))
            .catch(console.error);
    }, []);

    return (
        <div
            className="p-7 group absolute bottom-10 left-1/2 sm:left-36 rounded-lg transform -translate-x-1/2 flex gap-5"
            style={{
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px rgba(31,38,135,0.15)',
            }}
        >
            <div className="flex transition-all duration-500 group-hover:scale-110 flex-col items-center">
                <AnimatedCounter
                    value={repos}
                    prefix="+"
                    duration={2}
                    className="text-white text-7xl sm:text-9xl font-ruslan"
                />
                <span className="text-white font-ruslan font-extralight">Repos</span>
            </div>
        </div>
    );
};

export {
    SocialLinks,
    Stats
}