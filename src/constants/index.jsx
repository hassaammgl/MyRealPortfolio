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
        name: "FULLSTACK",
        description:
            "🧠 I bring frontend and backend together into a seamless, fully integrated web solution. From stunning interfaces to rock-solid server-side logic, I deliver complete applications that perform flawlessly across every layer.",
        features: [
            "🖥️ Full frontend-backend integration for consistency and performance",
            "💬 Real-time features like live chat and notifications with rapid deployment",
            "🌱 End-to-end tested systems built to scale and evolve",
        ],
    },
    {
        name: "TOOLBOX",
        description:
            "🧰 Here’s a glimpse into the powerful technologies and tools I use daily to bring high-quality web experiences to life. My toolbox is battle-tested, modern, and always evolving with the best industry standards.",
        features: [
            "⚛️ React.js / Next.js / Tailwind CSS",
            "🟩 Node.js / Express.js",
            "🍃 MongoDB / 🐘 PostgreSQL",
            "🛠️ Prisma ORM / Mongoose",
            "🎥 GSAP / Framer Motion",
            "▲ Vercel / Netlify",
            "🗂️ Git / GitHub",
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
        livelink: "https://awwards-zentry-website-clone.vercel.app/",
        image: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337810/portfolio/portfolio/projects/zentry_ibkwrv.gif",
        preview: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337808/portfolio/portfolio/projects/zentrypreveiw_et5km8.png",
    },
    {
        _id: crypto.randomUUID(),
        name: "ARTISUMMER",
        tech: [
            "Next.js", "OpenAI API",
        ],
        githublink: "https://github.com/hassaammgl/article-summerizer",
        image: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337807/portfolio/portfolio/projects/article_pl0vve.gif",
        preview: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337808/portfolio/portfolio/projects/articlepre_c5k8cn.png",
        livelink: "https://artisummer.netlify.app/"
    },
    {
        _id: crypto.randomUUID(),
        name: "Macbook Pro Clone",
        tech: [
            "React", "Threejs", "TailwindCSS"
        ],
        githublink: "https://github.com/hassaammgl/Apple-3D-Website-Project",
        preview: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337808/portfolio/portfolio/projects/macbookpre_gelaew.png",
        image: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337807/portfolio/portfolio/projects/macbook_drffhk.gif",
        livelink: "https://macbook-pro-clone.netlify.app/"
    },
    {
        _id: crypto.randomUUID(),
        name: "PARRE Textile",
        tech: [
            "Next.js", "SCSS", "React", "Chakra Ui", "Frammer motion"
        ],
        preview: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337809/portfolio/portfolio/projects/parrepre_acqcqq.png",
        image: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337810/portfolio/portfolio/projects/parre_poxdjq.gif",
        githublink: "https://github.com/hassaammgl/PARRE-Textiles",
        livelink: "https://www.parretextile.com/"
    },
    {
        _id: crypto.randomUUID(),
        name: "Claudia Silvia",
        tech: [
            "React", "GSAP", "Tailwindcss",
        ],
        githublink: "https://github.com/hassaammgl/Modern-portfolio-HSM",
        preview: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337806/portfolio/portfolio/projects/portfoliopre_j919ai.png",
        image: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337806/portfolio/portfolio/projects/portfolio_gnvwdn.gif",
        livelink: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337806/portfolio/portfolio/projects/portfoliopre_j919ai.png"
    },
    {
        _id: crypto.randomUUID(),
        name: "Appointment Booking",
        tech: [
            "React", "Tailwindcss", "MongoDb", "Express", "Nodejs", "JWT"
        ],
        githublink: "https://github.com/hassaammgl/Appointment-app",
        preview: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337807/portfolio/portfolio/projects/appointmentpre_pwittb.png",
        image: "https://res.cloudinary.com/dnpeaebgu/image/upload/v1748337806/portfolio/portfolio/projects/appointment_mjnb6l.gif",
        livelink: "https://github.com/hassaammgl/Appointment-app"
    }
]


export const CONTACTS = [
    {
        name: "Email",
        url: "mailto:contact@hassaammgl.xyz"
    },
    {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/m-hassaam-mughal-91668a256/"
    },
    {
        name: "GIthub",
        url: "https://github.com/hassaammgl/"
    },
    {
        name: "Youtube",
        url: "https://www.youtube.com/@coderglitchx03"
    },
]