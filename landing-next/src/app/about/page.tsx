"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Globe, Handshake, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
    {
        id: 1,
        name: "Diwen Huang",
        designation: "Founder & Executive Director",
        image: "/assets/diwen.jpg",
        bio: "Diwen is a high school student passionate about bridging the gap in STEM education. He founded Stemsphere to provide accessible resources to students worldwide.",
        tags: ["Leadership", "Engineering", "Education"],
        linkedin: "https://www.linkedin.com/in/diwen-huang-b8b8a821a/"
    },
    {
        id: 2,
        name: "Wilson Huang",
        designation: "Director of Operations",
        image: "/assets/wilson.png",
        bio: "Wilson oversees the day-to-day operations of Stemsphere, ensuring smooth execution of workshops and events.",
        tags: ["Operations", "Management", "Logistics"],
        linkedin: ""
    },
    {
        id: 3,
        name: "Drishya Sharma",
        designation: "Director of Outreach",
        image: "/assets/drishya.jpg",
        bio: "Drishya leads our outreach efforts, connecting with schools and community organizations to expand our impact.",
        tags: ["Outreach", "Communication", "Networking"],
        linkedin: ""
    },
    {
        id: 4,
        name: "Tristan Du",
        designation: "Director of Technology",
        image: "/assets/tristan.png",
        bio: "Tristan manages our digital platforms and develops technical curriculum for our coding workshops.",
        tags: ["Technology", "Coding", "Web Dev"],
        linkedin: ""
    },
    {
        id: 5,
        name: "Zoe Zhu",
        designation: "Director of Marketing",
        image: "/assets/zoe.jpg",
        bio: "Zoe creates engaging content and manages our social media presence to spread the word about Stemsphere.",
        tags: ["Marketing", "Social Media", "Design"],
        linkedin: ""
    },
    {
        id: 6,
        name: "Eden Liang",
        designation: "Director of Finance",
        image: "/assets/eden.jpg",
        bio: "Eden manages our budget and fundraising initiatives to ensure the sustainability of our programs.",
        tags: ["Finance", "Fundraising", "Budgeting"],
        linkedin: ""
    },
    {
        id: 7,
        name: "Timmy Jin",
        designation: "Director of Curriculum",
        image: "/assets/timmy.jpeg",
        bio: "Timmy develops our STEM curriculum, ensuring it is engaging, educational, and aligned with standards.",
        tags: ["Curriculum", "Education", "Teaching"],
        linkedin: ""
    },
    {
        id: 8,
        name: "Andy Guo",
        designation: "Director of Events",
        image: "/assets/andy.jpg",
        bio: "Andy organizes our workshops and events, creating memorable learning experiences for students.",
        tags: ["Events", "Planning", "Coordination"],
        linkedin: ""
    },
];

const values = [
    {
        title: "Global Community",
        description: "Connecting students from diverse backgrounds through a shared passion for STEM.",
        icon: <Globe className="h-8 w-8 text-emerald-500" />,
    },
    {
        title: "Collaboration",
        description: "Fostering teamwork and peer-to-peer learning to solve complex problems.",
        icon: <Handshake className="h-8 w-8 text-emerald-500" />,
    },
    {
        title: "Innovation",
        description: "Encouraging creative thinking and novel approaches to scientific challenges.",
        icon: <Lightbulb className="h-8 w-8 text-emerald-500" />,
    },
    {
        title: "Empowerment",
        description: "Providing the tools and confidence for students to become future leaders.",
        icon: <Rocket className="h-8 w-8 text-emerald-500" />,
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-24">

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
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Vision
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            To create a world where every student has the opportunity to explore their potential in science, technology, engineering, and mathematics, regardless of their background.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Mission
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We strive to provide high-quality, free STEM resources and mentorship to students globally, fostering a community of curious learners and future innovators.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div>
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                        Our Values
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="mb-4">{value.icon}</div>
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            </div>
        </div>
    );
}
