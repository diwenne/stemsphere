import Image from "next/image";
import { MasonryGallery } from "@/components/masonry-gallery";

export default function PythonProgrammingPage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-neutral-900 dark:text-neutral-100">
                        Python Programming
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        In this workshop, students learned the basics of the Python programming language and used it to draw shapes.
                    </p>
                </div>

                {/* The Lesson */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/12.8_mms/turtle/gallery-12.jpg" 
                            alt="Learning Python syntax on the big screen" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">1. The Concept</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            We started by explaining how computers execute instructions. Students learned basic Python syntax, including variables, loops, and function calls.
                            <br /><br />
                            They learned that code must be written in a specific order for the computer to understand it and perform the correct actions.
                        </p>
                    </div>
                </div>

                {/* The Build */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">2. Coding</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            Students used the Python Turtle Graphics library to draw shapes on the screen. They started by drawing a simple square.
                            <br /><br />
                            Then, they used combinations of loops and movement commands to create more complex patterns, such as stars, spirals, and concentric circles.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/12.8_mms/turtle/proj1.png" 
                            alt="Student Python project" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* The Result */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/12.8_mms/turtle/python1.JPG" alt="Python coding" fill className="object-cover" />
                        </div>
                        <div className="relative h-48 overflow-hidden shadow-md bg-white">
                             <Image src="/images/12.8_mms/turtle/proj2.png" alt="Python turtle intricate pattern" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">3. The Projects</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            By the end of the session, each student created a digital art piece using Python.
                            <br /><br />
                            They applied the coding concepts they learned to make their own unique shape and pattern projects.
                        </p>
                    </div>
                </div>

                {/* Additional Photos */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-100">Workshop Gallery</h2>
                    <MasonryGallery images={[
                        "/images/12.8_mms/turtle/gallery-8.jpg",
                        "/images/12.8_mms/turtle/gallery-19.jpg",
                        "/images/12.8_mms/turtle/gallery-20.jpg",
                        "/images/12.8_mms/turtle/gallery-25.jpg",
                        "/images/12.8_mms/turtle/gallery-26.jpg",
                        "/images/12.8_mms/turtle/gallery-27.jpg",
                        "/images/12.8_mms/turtle/gallery-30.jpg",
                        "/images/12.8_mms/turtle/gallery-31.jpg"
                    ]} />
                </div>

            </div>
        </div>
    );
}
