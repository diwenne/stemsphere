"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Globe, Handshake, Lightbulb, Rocket, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const teamMembers = [
    {
        id: 1,
        name: "Diwen Huang",
        designation: "President",
        image: "/assets/diwen.jpg",
        bio: "Aspiring AI researcher and software engineer, passionate about making STEM education accessible to all.",
        tags: ["Computer Vision Research", "Bestselling Author", "iOS Developer"],
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
    {
        id: 7,
        name: "Timmy Jin",
        designation: "Executive Member",
        image: "/assets/timmy.jpeg",
        bio: "Blending interests in technology and business to ensure STEMsphere's projects are financially resilient and impactful.",
        tags: ["STEM Enthusiast", "Design-Minded"],
        linkedin: "https://linkedin.com/in/timmy-jin-24bb51363"
    },
];

const chapterPresidents = [
    {
        id: 1,
        name: "Andy Guo",
        chapter: "Meadowridge",
        image: "/assets/andy.jpg",
        bio: "Combining analytical skills with a passion for teamwork to manage resources and support student-led STEM programs.",
        tags: ["World Scholars Cup", "Team Player"],
        linkedin: "http://linkedin.com/in/andy-guo-11a699329"
    },
];

const values = [
    {
        title: "Global Community",
        description: "Connecting students from diverse backgrounds through a shared passion for STEM.",
        icon: <Globe className="h-8 w-8 text-blue-500" />,
        iconBg: "bg-blue-50 dark:bg-blue-950/50",
        gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
        accentColor: "bg-blue-500",
    },
    {
        title: "Collaboration",
        description: "Fostering teamwork and peer-to-peer learning to solve complex problems.",
        icon: <Handshake className="h-8 w-8 text-violet-500" />,
        iconBg: "bg-violet-50 dark:bg-violet-950/50",
        gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
        accentColor: "bg-violet-500",
    },
    {
        title: "Innovation",
        description: "Encouraging creative thinking and novel approaches to scientific challenges.",
        icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
        iconBg: "bg-amber-50 dark:bg-amber-950/50",
        gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
        accentColor: "bg-amber-500",
    },
    {
        title: "Empowerment",
        description: "Providing the tools and confidence for students to become future leaders.",
        icon: <Rocket className="h-8 w-8 text-rose-500" />,
        iconBg: "bg-rose-50 dark:bg-rose-950/50",
        gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
        accentColor: "bg-rose-500",
    },
];

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.15}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "z-0",
                    "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,white,transparent)]",
                    "fill-emerald-500/30 stroke-emerald-500/30",
                    "dark:fill-emerald-500/20 dark:stroke-emerald-500/20"
                )}
            />
            <div className="relative z-10 max-w-7xl mx-auto space-y-24">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        About Us
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        We are a student-led non-profit organization dedicated to making STEM education accessible to everyone.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group relative bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h2 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Vision
                        </h2>
                        <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed">
                            To create a world where every student has the opportunity to explore their potential in science, technology, engineering, and mathematics, regardless of their background.
                        </p>

                        {/* Bottom accent */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-1/2 transition-all duration-500" />
                    </div>
                    <div className="group relative bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        {/* Hover gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h2 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="relative z-10 text-slate-600 dark:text-slate-400 leading-relaxed">
                            We strive to provide high-quality, free STEM resources and mentorship to students globally, fostering a community of curious learners and future innovators.
                        </p>

                        {/* Bottom accent */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-1/2 transition-all duration-500" />
                    </div>
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                        Our Values
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                {/* Hover gradient */}
                                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", value.gradient)} />

                                {/* Icon */}
                                <div className={cn("relative z-10 mb-4 p-3 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300", value.iconBg)}>
                                    {value.icon}
                                </div>

                                {/* Title */}
                                <h3 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="relative z-10 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>

                                {/* Bottom accent */}
                                <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full group-hover:w-1/2 transition-all duration-500", value.accentColor)} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div id="team" className="space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
                            Our Team
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Meet the Leaders
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            A dedicated group of students working together to drive our mission forward.
                        </p>
                    </div>

                    {/* Animated Tooltip Row */}
                    <div className="flex flex-row items-center justify-center mb-10 w-full">
                        <AnimatedTooltip items={teamMembers} />
                    </div>

                    {/* Detailed Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-neutral-800 hover:shadow-md transition-all group">
                                <div className="aspect-square overflow-hidden relative">
                                    <img src={member.image} alt={member.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                                    <p className="text-emerald-500 font-medium text-sm mb-4">{member.designation}</p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">{member.bio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chapter Presidents Section */}
                <div id="chapters" className="space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-emerald-500 font-semibold tracking-wide uppercase text-sm">
                            Local Leadership
                        </span>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Chapter Presidents
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Meet the leaders who bring Stemsphere to their local communities.
                        </p>
                    </div>

                    {/* Chapter Presidents Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {chapterPresidents.map((president) => (
                            <div key={president.id} className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-neutral-800 hover:shadow-md transition-all group">
                                <div className="aspect-square overflow-hidden relative">
                                    <img src={president.image} alt={president.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{president.name}</h3>
                                    <p className="text-emerald-500 font-medium text-sm mb-4 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {president.chapter}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">{president.bio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {president.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
