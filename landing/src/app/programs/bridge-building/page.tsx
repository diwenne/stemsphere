import Image from "next/image";
import { MasonryGallery } from "@/components/masonry-gallery";

export default function BridgeBuildingPage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-neutral-900 dark:text-neutral-100">
                        Bridge Building
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        In this workshop, students learned about civil engineering and built bridges to test load distribution.
                    </p>
                </div>

                {/* The Lesson */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/3.2_mms/bridge/pres1.JPG" 
                            alt="Bridge Building Presentation" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">1. The Concept</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            We started with a slideshow explaining different bridge designs, such as truss, suspension, and arch bridges. 
                            <br /><br />
                            We discussed how materials handle tension and compression forces, and how load is distributed across a structure.
                        </p>
                    </div>
                </div>

                {/* The Build */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">2. Construction</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            Students formed teams and built bridges using popsicle sticks and glue. 
                            <br /><br />
                            They planned their truss designs to be strong but lightweight, applying the engineering concepts from the presentation.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/3.5_mms/bridge/proj1.jpg" 
                            alt="Students building bridges together" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* The Result */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/3.5_mms/bridge/crowd1.jpg" alt="Excited crowd" fill className="object-cover" />
                        </div>
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/3.2_mms/bridge/pres4.JPG" alt="Bridge design presentation" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">3. The Final Test</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            We tested the strength of each bridge by adding weights until the structure broke.
                            <br /><br />
                            Students observed how different bridge designs supported the weight and identified where the structural failures occurred.
                        </p>
                    </div>
                </div>

                {/* Additional Photos */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-100">Workshop Gallery</h2>
                    <MasonryGallery images={[
                        "/images/3.2_mms/bridge/pres2.JPG",
                        "/images/3.2_mms/bridge/pres3.JPG",
                        "/images/3.2_mms/bridge/pres5.JPG",
                        "/images/3.2_mms/bridge/working2.JPG",
                        "/images/3.2_mms/bridge/working3.JPG",
                        "/images/3.5_mms/bridge/pres2.jpg",
                        "/images/3.5_mms/bridge/proj2.jpg",
                        "/images/3.5_mms/bridge/proj3.jpg"
                    ]} />
                </div>

            </div>
        </div>
    );
}
