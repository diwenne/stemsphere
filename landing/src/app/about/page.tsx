"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
    {
        id: 1,
        name: "Diwen Huang",
        designation: "President",
        image: "/assets/diwen.jpg",
        bio: "Aspiring AI researcher and software engineer, passionate about making STEM education accessible to all.",
        tags: ["iOS Developer", "Likes Starbucks"],
        linkedin: "http://linkedin.com/in/diwenh5"
    },
    {
        id: 2,
        name: "Wilson Huang",
        designation: "Vice President",
        image: "/assets/wilson.png",
        bio: "Dedicated to creating innovative curricula that bridge the gap between classroom theory and real-world application.",
        tags: ["Algorithmic Research", "STEM Curriculum Designer", "UN Delegate"],
        linkedin: "https://www.linkedin.com/in/wilson-bohan-huang/"
    },
    {
        id: 3,
        name: "Drishya Sharma",
        designation: "Director of Programs",
        image: "/assets/drishya.jpg",
        bio: "Focused on building inclusive STEM initiatives that connect technology with human-centered design to serve diverse learners.",
        tags: ["STEM Tutor", "Community Builder"],
        linkedin: "http://linkedin.com/in/drishya-anonymous-14736a218"
    },
    {
        id: 4,
        name: "Tristan Du",
        designation: "Director of Partnerships",
        image: "/assets/tristan.png",
        bio: "Passionate about forging relationships between schools, organizations, and communities to expand STEM learning opportunities.",
        tags: ["UX Design", "Outdoor Enthusiast"],
        linkedin: "https://linkedin.com/in/tristan-du-329595384"
    },
    {
        id: 5,
        name: "Zoe Zhu",
        designation: "Director of Communications",
        image: "/assets/zoe.jpg",
        bio: "Ambitious STEM and business student, driven to innovate educational resources and enhance foundational learning.",
        tags: ["Aspiring Business Major", "Creative Thinker"],
        linkedin: "http://linkedin.com/in/zoe-zhu-011551377"
    },
    {
        id: 6,
        name: "Eden Liang",
        designation: "Director of Finances",
        image: "/assets/eden.jpg",
        bio: "Dedicated to combining engineering and financial literacy to support sustainable STEM initiatives.",
        tags: ["Shad Design Award", "Startup Experience", "Robotics Programmer"],
        linkedin: "http://linkedin.com/in/zoe-zhu-011551377"
    },
];

const chapterPresidents = [
    {
        id: 1,
        name: "Cristal Tao",
        chapter: "Seattle, USA",
        image: "/assets/cristaltao.png",
        bio: "",
        tags: [],
        linkedin: ""
    },
    {
        id: 2,
        name: "Jiayu Liu",
        chapter: "Wuhan, China",
        image: "/assets/jiayuliu.png",
        bio: "",
        tags: [],
        linkedin: ""
    },
    {
        id: 3,
        name: "Samuel Sai",
        chapter: "Singapore, Singapore",
        image: "/assets/samuelsai.png",
        bio: "",
        tags: [],
        linkedin: ""
    },
    {
        id: 4,
        name: "Elsa Wu",
        chapter: "Miami, USA",
        image: "/assets/elsawu.png",
        bio: "",
        tags: [],
        linkedin: ""
    },
    {
        id: 5,
        name: "Kevin Chen",
        chapter: "Kansas, USA",
        image: "/assets/kevinchen.png",
        bio: "",
        tags: [],
        linkedin: ""
    },
    {
        id: 6,
        name: "Henrik Huang",
        chapter: "Honolulu, USA",
        image: "/assets/henrikhuang.png",
        bio: "",
        tags: [],
        linkedin: ""
    },
    {
        id: 7,
        name: "Timmy Jin",
        chapter: "Meadowridge, Canada",
        image: "/assets/timmy.jpeg",
        bio: "",
        tags: [],
        linkedin: "https://linkedin.com/in/timmy-jin-24bb51363"
    },
];

const missionVision = [
    {
        title: "Our Vision",
        description: "To create a world where every student has the opportunity to explore their potential in science, technology, engineering, and mathematics, regardless of their background.",
        icon: "/icons/telescope-vision.png",
        bgColor: "#FFF8E1",
        borderColor: "#FFD54F",
        accentColor: "#F59E0B",
    },
    {
        title: "Our Mission",
        description: "We strive to provide high-quality, free STEM resources and mentorship to students globally, fostering a community of curious learners and future innovators.",
        icon: "/icons/flag-mission.png",
        bgColor: "#E8F5E9",
        borderColor: "#66BB6A",
        accentColor: "#10B981",
    },
];

const values = [
    {
        title: "Global Community",
        description: "Connecting students from diverse backgrounds through a shared passion for STEM.",
        icon: "/icons/globe-community.png",
        bgColor: "#EFF6FF",
        borderColor: "#60A5FA",
        accentColor: "#3B82F6",
    },
    {
        title: "Collaboration",
        description: "Fostering teamwork and peer-to-peer learning to solve complex problems.",
        icon: "/icons/handshake-collab.png",
        bgColor: "#F5F3FF",
        borderColor: "#A78BFA",
        accentColor: "#8B5CF6",
    },
    {
        title: "Innovation",
        description: "Encouraging creative thinking and novel approaches to scientific challenges.",
        icon: "/icons/lightbulb-idea.png",
        bgColor: "#FFF8E1",
        borderColor: "#FFD54F",
        accentColor: "#F59E0B",
    },
    {
        title: "Empowerment",
        description: "Providing the tools and confidence for students to become future leaders.",
        icon: "/icons/rocket-empower.png",
        bgColor: "#FFF0F0",
        borderColor: "#FCA5A5",
        accentColor: "#EF4444",
    },
];

function SketchyCard({
    children,
    bgColor,
    borderColor,
    index,
}: {
    children: React.ReactNode;
    bgColor: string;
    borderColor: string;
    index: number;
}) {
    const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.5];
    const rotation = rotations[index % rotations.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotation }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 180,
                damping: 14,
            }}
            whileHover={{
                scale: 1.04,
                rotate: 0,
                transition: { duration: 0.2 },
            }}
            className="rounded-2xl p-8 cursor-default flex flex-col items-center text-center"
            style={{
                backgroundColor: bgColor,
                border: `3px solid ${borderColor}`,
                boxShadow: `4px 4px 0px ${borderColor}`,
            }}
        >
            {children}
        </motion.div>
    );
}

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto space-y-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-white sm:text-5xl">
                        About Us
                    </h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                        We are a student-led non-profit organization dedicated to making STEM education accessible to everyone.
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8">
                    {missionVision.map((item, i) => (
                        <SketchyCard
                            key={item.title}
                            bgColor={item.bgColor}
                            borderColor={item.borderColor}
                            index={i}
                        >
                            <div className="w-24 h-24 mb-4 relative">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />
                            </div>
                            <h2
                                className="text-2xl font-bold mb-3"
                                style={{ color: item.accentColor }}
                            >
                                {item.title}
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {item.description}
                            </p>
                        </SketchyCard>
                    ))}
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mb-12">
                        Our Values
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <SketchyCard
                                key={value.title}
                                bgColor={value.bgColor}
                                borderColor={value.borderColor}
                                index={index}
                            >
                                {/* Cartoon Icon */}
                                <div className="w-28 h-28 mb-4 relative">
                                    <Image
                                        src={value.icon}
                                        alt={value.title}
                                        fill
                                        unoptimized
                                        className="object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-xl font-bold mb-2"
                                    style={{ color: value.accentColor }}
                                >
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </SketchyCard>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div id="team" className="space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
                            Our Team
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-white">
                            Meet the Leaders
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                            A dedicated group of students working together to drive our mission forward.
                        </p>
                    </div>

                    {/* Animated Tooltip Row */}
                    <div className="flex flex-row items-center justify-center mb-10 w-full">
                        <AnimatedTooltip items={teamMembers} />
                    </div>

                    {/* Detailed Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border-2 border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-all group"
                                style={{ boxShadow: "3px 3px 0px #A7F3D0" }}
                            >
                                <div className="aspect-square overflow-hidden relative">
                                    <img src={member.image} alt={member.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-1">{member.name}</h3>
                                    <p className="text-emerald-500 font-medium text-sm">{member.designation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Chapter Presidents Section */}
                <div id="chapters" className="space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
                            Local Leadership
                        </span>
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-white">
                            Chapter Presidents
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                            Meet the leaders who bring Stemsphere to their local communities.
                        </p>
                    </div>

                    {/* Chapter Presidents Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {chapterPresidents.map((president, i) => (
                            <motion.div
                                key={president.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border-2 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-all group"
                                style={{ boxShadow: "3px 3px 0px #FDE68A" }}
                            >
                                <div className="aspect-square overflow-hidden relative">
                                    <img src={president.image} alt={president.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-1">{president.name}</h3>
                                    <p className="text-amber-500 font-medium text-sm mb-4 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {president.chapter}
                                    </p>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-3">{president.bio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {president.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 text-xs rounded-full border border-amber-200 dark:border-amber-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
