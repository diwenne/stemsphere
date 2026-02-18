"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Image from "next/image";
import { FeyButton } from "@/components/ui/fey-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GetInvolvedPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [interest, setInterest] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus("loading");

        try {
            await emailjs.sendForm(
                "service_g2bgaay",
                "template_gq8p85n",
                formRef.current,
                "jm395ub_Ega2NGH6O"
            );
            setStatus("success");
            formRef.current.reset();
            setInterest("");
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#FEFCF9] dark:bg-neutral-950 flex flex-col items-center justify-center antialiased pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    {/* Cartoon Mailbox Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 12 }}
                        className="w-32 h-32 mx-auto mb-6 relative"
                    >
                        <Image
                            src="/icons/mailbox-hello.png"
                            alt="Get Involved"
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </motion.div>

                    <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-white sm:text-5xl mb-4">
                        Get Involved
                    </h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400">
                        Join us in our mission to make STEM education accessible to all.
                    </p>
                    <a
                        href="/handbook.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-500 hover:underline text-sm mt-2 inline-block"
                    >
                        Download School Information Packet →
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30, rotate: -1 }}
                    animate={{ opacity: 1, y: 0, rotate: -1 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 180,
                        damping: 14,
                    }}
                    whileHover={{
                        scale: 1.01,
                        rotate: 0,
                        transition: { duration: 0.2 },
                    }}
                >
                    <Card
                        className="border-2 shadow-none overflow-hidden"
                        style={{
                            backgroundColor: "#E8F5E9",
                            borderColor: "#66BB6A",
                            boxShadow: "4px 4px 0px #66BB6A",
                        }}
                    >
                        <CardHeader>
                            <CardTitle className="text-emerald-700 dark:text-emerald-400">Contact Us</CardTitle>
                            <CardDescription className="text-neutral-600 dark:text-neutral-400">
                                Fill out the form below and we&apos;ll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status === "success" ? (
                                <div className="text-center py-8">
                                    <div className="text-emerald-500 text-5xl mb-4">✓</div>
                                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400">
                                        Thank you for reaching out. We&apos;ll get back to you soon.
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="mt-4 text-emerald-500 hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-neutral-700 dark:text-neutral-200">First Name</Label>
                                            <Input id="firstName" name="firstName" placeholder="John" required className="bg-white dark:bg-white border-emerald-200 dark:border-neutral-300 text-neutral-800 dark:text-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 focus:border-emerald-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-neutral-700 dark:text-neutral-200">Last Name</Label>
                                            <Input id="lastName" name="lastName" placeholder="Doe" required className="bg-white dark:bg-white border-emerald-200 dark:border-neutral-300 text-neutral-800 dark:text-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 focus:border-emerald-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-200">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-white dark:bg-white border-emerald-200 dark:border-neutral-300 text-neutral-800 dark:text-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 focus:border-emerald-400" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="interest" className="text-neutral-700 dark:text-neutral-200">I&apos;m interested in...</Label>
                                        <Select value={interest} onValueChange={setInterest}>
                                            <SelectTrigger className="bg-white dark:bg-white border-emerald-200 dark:border-neutral-300 text-neutral-800 dark:text-neutral-800">
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white dark:bg-white border-emerald-200 dark:border-neutral-300 text-neutral-800 dark:text-neutral-800">
                                                <SelectItem value="volunteering">Volunteering</SelectItem>
                                                <SelectItem value="partnership">Partnership</SelectItem>
                                                <SelectItem value="starting-chapter">Starting a Chapter</SelectItem>
                                                <SelectItem value="general">General Inquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <input type="hidden" name="interest" value={interest} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-neutral-700 dark:text-neutral-200">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us more about how you'd like to get involved..."
                                            required
                                            className="min-h-[120px] bg-white dark:bg-white border-emerald-200 dark:border-neutral-300 text-neutral-800 dark:text-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-400 focus:border-emerald-400"
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-500 text-sm">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}

                                    <FeyButton type="submit" disabled={status === "loading"}>
                                        {status === "loading" ? "Sending..." : "Send Message"}
                                    </FeyButton>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
