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
        name: "APIs\n& SYSTEMS",
        description:
            "I design and build production REST APIs that power real products — clear contracts, solid validation, and predictable error handling so your app stays reliable as it grows.",
        features: [
            "REST API design, versioning, validation, and structured error responses",
            "Authentication, authorization, and role-based access control",
            "PostgreSQL data modeling, ORM workflows, transactions, and data consistency",
        ],
    },
    {
        name: "PAYMENTS\n& WORKFLOWS",
        description:
            "I implement the business logic clients actually pay for — orders, subscriptions, billing, and multi-step workflows that must work correctly every time money or state is involved.",
        features: [
            "Payment processing, provider integrations, and webhook handling",
            "Subscription and billing flows with reliable state transitions",
            "Background jobs, queues, and scheduled processing for long-running work",
        ],
    },
    {
        name: "INTEGRATIONS\n& OPS",
        description:
            "I connect your product to the tools your business already depends on — and keep those pipelines reliable with retries, notifications, and operational visibility.",
        features: [
            "Third-party API integrations, file storage, email, and notification systems",
            "Redis caching, search/filtering, reporting, and import/export pipelines",
            "Admin systems, audit logs, real-time updates, and activity tracking",
        ],
    },
    {
        name: "PRODUCTION\n& IMPROVE",
        description:
            "I take existing systems seriously — fix production bugs, improve performance, refactor messy backends, and ship maintainable architecture you can keep building on.",
        features: [
            "Performance improvements, reliability hardening, and production bug fixing",
            "Refactoring legacy APIs into clearer, maintainable modules",
            "Dockerized apps, Linux deployment support, and frontend integration when needed",
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
        url: "mailto:contact@hassaammgl.com"
    },
    {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/m-hassaam-mehtab-91668a256"
    },
    {
        name: "Github",
        url: "https://github.com/hassaammgl/"
    },
    {
        name: "Youtube",
        url: "https://www.youtube.com/@coderglitchx03"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/hassaammgl/"
    },
    {
        name: "X",
        url: "https://x.com/hassaammgl"
    },
    {
        name: "Upwork",
        url: "https://www.upwork.com/freelancers/~01984a29dcc68bc2db"
    },
    {
        name: "Fiverr",
        url: "https://www.fiverr.com/hassaam_mgl?public_mode=true"
    },
]
