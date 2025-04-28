import { FiLinkedin, FiGithub, FiYoutube } from "react-icons/fi";
import { AiOutlineJavaScript } from "react-icons/ai";
import { PiFileHtmlBold, PiFileCssBold } from "react-icons/pi";
import { RiTailwindCssLine, RiNextjsLine, RiNodejsLine } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";
import { SiVite, SiFramer, SiReactrouter, SiPrisma, SiExpress, SiDrizzle, SiTypescript, SiGreensock } from "react-icons/si";
import { BsFiletypeScss } from "react-icons/bs";
import { DiMongodb } from "react-icons/di";

export const LINKS = [
    {
        name: "LinkedIn",
        icon: <FiLinkedin />,
        url: "https://www.linkedin.com/in/m-hassaam-mughal-91668a256/",
    },
    {
        name: "GitHub",
        icon: <FiGithub />,
        url: "https://github.com/hassaammgl/"
    },
    {
        name: "Youtube",
        icon: <FiYoutube />,
        url: "https://www.youtube.com/@coderglitchx03"
    }
];

export const IMAGES = [
    {
        preview: "/hero/bg-1.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-1.jpg",
    },
    {
        preview: "/hero/bg-2.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-2.jpg",
    },
    {
        preview: "/hero/bg-3.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-3.jpg",
    },
    {
        preview: "/hero/bg-4.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-4.jpg",
    },
    {
        preview: "/hero/bg-5.jpg",
        alt: "Hero",
        bg_img: "/hero/bg-5.jpg",
    },
];



export const LANGS = [
    {
        name: "JavaScript",
        icon: <AiOutlineJavaScript />,
        bgcolor: "#F7DF1E",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        percentage: 90,
        description: "The cool kid who makes websites dance, sing, and occasionally crash. 💃🎤🚒"
    },
    {
        name: "TypeScript",
        icon: <SiTypescript />,
        bgcolor: "#3178C6",
        url: "https://www.typescriptlang.org",
        percentage: 85,
        description: "JavaScript with a bulletproof vest, a helmet, and a life insurance policy. 🛡️🪖🔧"
    },
    {
        name: "HTML",
        icon: <PiFileHtmlBold />,
        bgcolor: "#E34F26",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        percentage: 95,
        description: "The skeleton of the internet. Without it, the web would just be air. 💀✨"
    },
    {
        name: "CSS",
        icon: <PiFileCssBold />,
        bgcolor: "#1572B6",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        percentage: 85,
        description: "The fairy godmother who transforms ugly HTML pumpkins into beautiful websites. 🎃✨"
    },
    {
        name: "SCSS",
        icon: <BsFiletypeScss />,
        bgcolor: "#CC6699",
        url: "https://sass-lang.com",
        percentage: 80,
        description: "CSS after it drank a protein shake and learned some magic tricks. 🧙‍♂️💪"
    },
    {
        name: "Tailwind",
        icon: <RiTailwindCssLine />,
        bgcolor: "#06B6D4",
        url: "https://tailwindcss.com",
        percentage: 90,
        description: "Utility-first CSS framework: fast, furious, and addicted to small classes. 🌀🚀"
    },
    {
        name: "React",
        icon: <IoLogoReact />,
        bgcolor: "#61DAFB",
        url: "https://react.dev",
        percentage: 85,
        description: "Component-based wizardry — write once, render everywhere (except IE). ⚛️🧙‍♂️"
    },
    {
        name: "Next.js",
        icon: <RiNextjsLine />,
        bgcolor: "#000000",
        url: "https://nextjs.org",
        percentage: 75,
        description: "React, but on steroids — server-rendered, SEO-friendly, and extra spicy. 🔥⚛️"
    },
    {
        name: "Node.js",
        icon: <RiNodejsLine />,
        bgcolor: "#339933",
        url: "https://nodejs.org",
        percentage: 80,
        description: "JavaScript's grand jailbreak mission — now terrorizing servers worldwide. 🏃‍♂️💻"
    },
    {
        name: "Bun",
        icon: (<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="128" cy="128" r="128" fill="black" />
            <path d="M128 40C90 40 70 100 110 140C90 180 130 220 160 180C190 140 160 80 128 40Z" fill="white" />
        </svg>),
        bgcolor: "#000000",
        url: "https://bun.sh",
        percentage: 65,
        description: "Speed demon of JavaScript runtimes — runs, builds, and installs faster than you blink. ⚡🐰"
    },
    {
        name: "Express",
        icon: <SiExpress />,
        bgcolor: "#000000",
        url: "https://expressjs.com",
        percentage: 80,
        description: "Minimalist web server — fast, unopinionated, and still carrying the internet on its back. 🚂💼"
    },
    {
        name: "MongoDB",
        icon: <DiMongodb />,
        bgcolor: "#47A248",
        url: "https://www.mongodb.com",
        percentage: 75,
        description: "Your go-to NoSQL BFF for messy JSON hoarding. 📦🎉"
    },
    {
        name: "Prisma",
        icon: <SiPrisma />,
        bgcolor: "#2D3748",
        url: "https://www.prisma.io",
        percentage: 70,
        description: "ORM that makes talking to databases feel like sliding into DMs. 📬💬"
    },
    {
        name: "Drizzle",
        icon: <SiDrizzle />,
        bgcolor: "#C5F74F",
        url: "https://orm.drizzle.team",
        percentage: 65,
        description: "SQL, but clean, simple, and without the existential crisis. 🌧️💻"
    },
    {
        name: "React Router",
        icon: <SiReactrouter />,
        bgcolor: "#CA4245",
        url: "https://reactrouter.com",
        percentage: 85,
        description: "Making single-page apps feel like multi-page adventures. 🧭🗺️"
    },
    {
        name: "GSAP",
        icon: <SiGreensock />,
        bgcolor: "#88CE02",
        url: "https://greensock.com/gsap/",
        percentage: 80,
        description: "Animations so smooth, you'll think your website's made of butter. 🧈🎢"
    },
    {
        name: "Vite",
        icon: <SiVite />,
        bgcolor: "#646CFF",
        url: "https://vitejs.dev",
        percentage: 85,
        description: "Bundler so fast, it finishes building before you finish blinking. ⚡👀"
    },
    {
        name: "Zustand",
        icon: (<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle cx="128" cy="128" r="128" fill="#000000" />
            <path d="M180 80c0-30-40-40-60-10-20-30-60-20-60 10 0 40 60 100 60 100s60-60 60-100z" fill="#FDB813" />
            <circle cx="98" cy="100" r="8" fill="#000000" />
            <circle cx="158" cy="100" r="8" fill="#000000" />
            <path d="M120 140c8 4 16 4 24 0" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        </svg>),
        bgcolor: "#000000",
        url: "https://zustand-demo.pmnd.rs",
        percentage: 80,
        description: "Tiny, minimal state management — because Redux gave you trust issues. 🐻🔗"
    },
    {
        name: "Framer Motion",
        icon: <SiFramer />,
        bgcolor: "#0055FF",
        url: "https://www.framer.com/motion/",
        percentage: 75,
        description: "Bring your UI to life with effortless animations and jaw-dropping transitions. 🎬✨"
    },
    {
        name: "shadcn/ui",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M8 8h8v8H8z" />
            </svg>
        ),
        bgcolor: "#000000",
        url: "https://ui.shadcn.dev",
        percentage: 70,
        description: "Beautifully styled UI components without the JavaScript drama. 💅📦"
    },
    {
        name: "Clerk/Auth.js",
        icon: (<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="4" />
            <path d="M16 24a8 8 0 0016 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>),
        bgcolor: "#3B82F6",
        url: "https://clerk.dev",
        percentage: 70,
        description: "Authentication so easy, it feels like cheating. Log in, sign up, and vibe. 🔒🚀"
    }
];


