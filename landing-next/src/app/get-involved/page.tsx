"use client";
import { FeyButton } from "@/components/ui/fey-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function GetInvolvedPage() {

    return (
        <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased pt-32 pb-20 px-4">
            <div className="max-w-2xl w-full relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
                        Get Involved
                    </h1>
                    <p className="text-lg text-neutral-400">
                        Join us in our mission to make STEM education accessible to all.
                    </p>
                </div>

                <Card className="bg-black/50 border-neutral-800 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-white">Contact Us</CardTitle>
                        <CardDescription className="text-neutral-400">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-neutral-200">First Name</Label>
                                    <Input id="firstName" placeholder="John" className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-neutral-200">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-neutral-200">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="interest" className="text-neutral-200">I'm interested in...</Label>
                                <Select>
                                    <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
                                        <SelectItem value="volunteering">Volunteering</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="starting-chapter">Starting a Chapter</SelectItem>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-neutral-200">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us more about how you'd like to get involved..."
                                    className="min-h-[120px] bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600"
                                />
                            </div>

                            <FeyButton type="submit">
                                Send Message
                            </FeyButton>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <BackgroundBeams />
        </div>
    );
}
