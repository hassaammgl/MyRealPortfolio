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

export const SERVICES = [
    {
        name: "FRONTEND",
        description:
            "🎨 I craft sleek, responsive, and high-performing user interfaces that not only look amazing but deliver unforgettable user experiences. Every pixel is placed with purpose to drive engagement and conversions.",
        features: [
            "📱 Pixel-perfect, responsive designs with fast load times",
            "⚡ High-performance UI/UX focused builds, fully accessible and SEO-optimized",
            "🌐 Cross-browser and device compatibility with smooth, interactive animations",
        ],
    },
    {
        name: "BACKEND",
        description:
            "🛠️ I build powerful, secure backend systems that act as the reliable engine behind your application. From scalable databases to efficient APIs, I ensure your backend is ready to handle anything you throw at it.",
        features: [
            "🔒 Scalable and secure server-side architecture, built for traffic growth",
            "🗄️ Efficient database design and API development with secure data practices",
            "🛡️ Robust authentication and integrations with custom APIs",
        ],
    },
    {
        name: "FULL STACK",
        description:
            "🧠 I bring frontend and backend together into a seamless, fully integrated web solution. From stunning interfaces to rock-solid server-side logic, I deliver complete applications that perform flawlessly across every layer.",
        features: [
            "🖥️ Full frontend-backend integration for consistency and performance",
            "💬 Real-time features like live chat and notifications with rapid deployment",
            "🌱 End-to-end tested systems built to scale and evolve",
        ],
    },
    {
        name: "MY TOOLBOX",
        description:
            "🧰 Here’s a glimpse into the powerful technologies and tools I use daily to bring high-quality web experiences to life. My toolbox is battle-tested, modern, and always evolving with the best industry standards.",
        techStack: [
            "⚛️ React.js / Next.js / Tailwind CSS",
            "🟩 Node.js / Express.js",
            "🍃 MongoDB / 🐘 PostgreSQL",
            "🛠️ Prisma ORM / Mongoose",
            "🎥 GSAP / Framer Motion",
            "🐳 Docker / ▲ Vercel / 🚂 Railway",
            "🔐 JWT / OAuth / Clerk Authentication",
        ],
    },
];
