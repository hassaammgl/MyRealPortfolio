import { FiLinkedin, FiGithub, FiYoutube } from "react-icons/fi";

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
        features: [
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


export const PROJECTS = [
    {
        _id: crypto.randomUUID(),
        name: "Zentry Website Clone",
        tech: [
            "React", "GSAP", "Tailwind CSS"
        ],
        githublink: "https://github.com/hassaammgl/zentry-awwards-game-website",
        livelink: "https://awwards-zentry-website-clone.vercel.app/"
    },
    {
        _id: crypto.randomUUID(),
        name: "ARTISUMMER",
        tech: [
            "Next.js", "OpenAI API",
        ],
        githublink: "https://github.com/hassaammgl/article-summerizer",
        livelink: "https://artisummer.netlify.app/"
    },
    {
        _id: crypto.randomUUID(),
        name: "Macbook Pro Clone",
        tech: [
            "React", "Threejs", "TailwindCSS"
        ],
        githublink: "https://github.com/hassaammgl/Apple-3D-Website-Project",
        livelink: "https://macbook-pro-clone.netlify.app/"
    },
    {
        _id: crypto.randomUUID(),
        name: "PARRE Textile",
        tech: [
            "Next.js", "SCSS", "React", "Chakra Ui", "Frammer motion"
        ],
        githublink: "https://github.com/hassaammgl/PARRE-Textiles",
        livelink: "https://www.parretextile.com/"
    },
    {
        _id: crypto.randomUUID(),
        name: "Monster Programming",
        tech: [
            "React", "Nextjs", "SCSS", "Frammer motion"
        ],
        githublink: "https://github.com/hassaammgl/monster-programming-portfolio",
        livelink: "https://animated-portfolio-website-project.vercel.app/"
    },
    {
        _id: crypto.randomUUID(),
        name: "Monster Programming",
        tech: [
            "React", "Nextjs", "SCSS", "Frammer motion"
        ],
        githublink: "https://github.com/hassaammgl/monster-programming-portfolio",
        livelink: "https://animated-portfolio-website-project.vercel.app/"
    }
]
