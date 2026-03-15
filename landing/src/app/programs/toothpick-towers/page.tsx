import Image from "next/image";

export default function ToothpickTowersPage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-neutral-900 dark:text-neutral-100">
                        Toothpick Towers
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        In this workshop, students learned about structural stability by building tall towers using toothpicks and marshmallows.
                    </p>
                </div>

                {/* The Lesson */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/12.8_mms/intro/gallery-1.jpg" 
                            alt="Learning about geometric shapes in engineering" 
                            fill 
                            className="object-cover object-top"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">1. The Concept</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            Before building, we presented a lesson on structural engineering and geometry. We looked at famous towers and identified the shapes that make them strong.
                            <br /><br />
                            The key concept is that triangles are the strongest shape. Unlike squares, triangles distribute weight evenly, making them stable building blocks for our structures.
                        </p>
                    </div>
                </div>

                {/* The Build */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">2. Construction</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            Students worked in teams to design the tallest and most stable tower using toothpicks and marshmallows.
                            <br /><br />
                            They built a wide base first, then built upwards. They had to reinforce weak joints as the tower grew taller to prevent gravity from pulling it down.
                        </p>
                    </div>
                    <div className="relative h-64 md:h-96 w-full overflow-hidden shadow-xl">
                        <Image 
                            src="/images/12.8_mms/tower/gallery-17.jpg" 
                            alt="Students constructing their toothpick towers" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* The Result */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/12.8_mms/tower/gallery-16.jpg" alt="Tall toothpick tower" fill className="object-cover" />
                        </div>
                        <div className="relative h-48 overflow-hidden shadow-md">
                             <Image src="/images/12.8_mms/tower/gallery-18.jpg" alt="A uniquely designed tower" fill className="object-cover object-top" />
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">3. The Earthquake Test</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                            For the finale, we simulated an earthquake by shaking the table the towers were built on. We watched to see which towers survived the shaking without collapsing.
                            <br /><br />
                            Some towers stood strong, while others fell. Students learned how building design impacts stability during dynamic events like earthquakes.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
