"use client";
import { FeyButton } from "@/components/ui/fey-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GetInvolvedPage() {

    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-neutral-950 flex flex-col items-center justify-center antialiased pt-32 pb-20 px-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
                        Get Involved
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Join us in our mission to make STEM education accessible to all.
                    </p>
                </div>

                <Card className="bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-slate-900 dark:text-white">Contact Us</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-200">First Name</Label>
                                    <Input id="firstName" placeholder="John" className="bg-white dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-200">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" className="bg-white dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 dark:text-slate-200">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-white dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interest" className="text-slate-700 dark:text-slate-200">I'm interested in...</Label>
                                <Select>
                                    <SelectTrigger className="bg-white dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white">
                                        <SelectItem value="volunteering">Volunteering</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="starting-chapter">Starting a Chapter</SelectItem>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-slate-700 dark:text-slate-200">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us more about how you'd like to get involved..."
                                    className="min-h-[120px] bg-white dark:bg-neutral-900 border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500"
                                />
                            </div>

                            <FeyButton type="submit">
                                Send Message
                            </FeyButton>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
