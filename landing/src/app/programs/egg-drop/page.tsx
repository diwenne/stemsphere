import Image from "next/image";
import { MasonryGallery } from "@/components/masonry-gallery";

export default function EggDropPage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-neutral-900 dark:text-neutral-100">
                        Egg Drop
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        In this workshop, students learned about physics concepts like gravity and shock absorption to design protective capsules for raw eggs.
                    </p>
                </div>

                {/* The Lesson */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/3.5_mms/egg/intro1.JPG" 
                            alt="Physics Lesson Presentation" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">1. The Concept</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            We started by explaining velocity, gravity, and impact force. 
                            <br /><br />
                            Students learned how shock absorption can protect an object upon impact, and how air resistance can be used to slow an object down as it falls.
                        </p>
                    </div>
                </div>

                {/* The Build */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">2. Building the Capsules</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            Teams designed protective capsules using straws, tape, cotton balls, and cardboard. 
                            <br /><br />
                            Some teams built parachutes to increase air resistance, while others built padded cages to absorb the impact of the landing.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/3.2_mms/egg/DSCF5398.JPG" 
                            alt="Students building their egg drop capsules" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* The Result */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/3.5_mms/egg/drop1.JPG" alt="The big drop" fill className="object-cover" />
                        </div>
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/3.5_mms/egg/drop2.JPG" alt="Inspecting the results" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">3. The Drop</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            We dropped each capsule from a high location to test if the egg inside would survive the fall. 
                            <br /><br />
                            We checked each capsule after the drop to see the results. Students inspected the designs that survived and the ones that failed to understand why.
                        </p>
                    </div>
                </div>

                {/* Additional Photos */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-100">Workshop Gallery</h2>
                    <MasonryGallery images={[
                        "/images/3.5_mms/egg/group2.JPG",
                        "/images/3.5_mms/egg/group3.JPG",
                        "/images/3.5_mms/egg/group4.JPG",
                        "/images/3.5_mms/egg/group5.JPG",
                        "/images/3.5_mms/egg/drop3.JPG",
                        "/images/3.5_mms/egg/drop4.JPG",
                        "/images/3.5_mms/egg/drop5.JPG",
                        "/images/3.5_mms/egg/drop6.JPG",
                        "/images/3.2_mms/egg/DSCF5454.JPG",
                        "/images/3.2_mms/egg/DSCF5456.JPG"
                    ]} />
                </div>

            </div>
        </div>
    );
}
