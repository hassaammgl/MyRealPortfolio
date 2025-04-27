import { FiLinkedin, FiGithub, FiYoutube } from "react-icons/fi";
import { AiOutlineJavaScript } from "react-icons/ai";
import { PiFileHtmlBold, PiFileCssBold } from "react-icons/pi";
import { RiTailwindCssLine, RiNextjsLine, RiNodejsLine } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";
import { SiReactrouter, SiPrisma, SiExpress, SiDrizzle } from "react-icons/si";
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
        percentage: 90
    },
    {
        name: "TypeScript",
        icon: <SiTypescript />,
        bgcolor: "#3178C6",
        url: "https://www.typescriptlang.org",
        percentage: 85
    },
    {
        name: "HTML",
        icon: <PiFileHtmlBold />,
        bgcolor: "#E34F26",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        percentage: 95
    },
    {
        name: "CSS",
        icon: <PiFileCssBold />,
        bgcolor: "#1572B6",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        percentage: 85
    },
    {
        name: "React",
        icon: <IoLogoReact />,
        bgcolor: "#61DAFB",
        url: "https://react.dev",
        percentage: 85
    },
    {
        name: "Tailwind",
        icon: <RiTailwindCssLine />,
        bgcolor: "#06B6D4",
        url: "https://tailwindcss.com",
        percentage: 90
    },
    {
        name: "Next.js",
        icon: <RiNextjsLine />,
        bgcolor: "#000000",
        url: "https://nextjs.org",
        percentage: 75
    },
    {
        name: "Node.js",
        icon: <RiNodejsLine />,
        bgcolor: "#339933",
        url: "https://nodejs.org",
        percentage: 80
    },
    {
        name: "React Router",
        icon: <SiReactrouter />,
        bgcolor: "#CA4245",
        url: "https://reactrouter.com",
        percentage: 85
    },
    {
        name: "MongoDB",
        icon: <DiMongodb />,
        bgcolor: "#47A248",
        url: "https://www.mongodb.com",
        percentage: 75
    },
    {
        name: "Express",
        icon: <SiExpress />,
        bgcolor: "#000000",
        url: "https://expressjs.com",
        percentage: 80
    },
    {
        name: "Prisma",
        icon: <SiPrisma />,
        bgcolor: "#2D3748",
        url: "https://www.prisma.io",
        percentage: 70
    },
    {
        name: "Drizzle",
        icon: <SiDrizzle />,
        bgcolor: "#C5F74F",
        url: "https://orm.drizzle.team",
        percentage: 65
    },
    {
        name: "SCSS",
        icon: <BsFiletypeScss />,
        bgcolor: "#CC6699",
        url: "https://sass-lang.com",
        percentage: 80
    },
    {
        name: "GSAP",
        icon: (
            <svg viewBox="0 0 100 100" className="w-6 h-6">
                <path fill="#88CE02" d="M50 0l50 100H0z" />
            </svg>
        ),
        bgcolor: "#88CE02",
        url: "https://greensock.com/gsap/",
        percentage: 80
    }
];