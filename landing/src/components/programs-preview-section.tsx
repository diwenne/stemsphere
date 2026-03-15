import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const programs = [
  {
    title: "Bridge Building",
    description: "Learn civil engineering and build bridges to test load distribution.",
    image: "/images/3.5_mms/bridge/proj3.jpg",
    link: "/programs/bridge-building"
  },
  {
    title: "Python Programming",
    description: "Learn the basics of the Python language and use it to draw digital art.",
    image: "/images/12.8_mms/turtle/proj1.png",
    link: "/programs/python-programming"
  },
  {
    title: "Egg Drop",
    description: "Learn about gravity and shock absorption to design protective capsules for raw eggs.",
    image: "/images/3.5_mms/egg/drop4.JPG",
    link: "/programs/egg-drop"
  },
  {
    title: "Toothpick Towers",
    description: "Learn about structural stability by building tall towers using toothpicks and marshmallows.",
    image: "/images/12.8_mms/tower/gallery-16.jpg",
    link: "/programs/toothpick-towers"
  }
];

export function ProgramsPreviewSection() {
    return (
        <div className="w-full">
            <div className="mb-12 text-center text-neutral-800 dark:text-neutral-200">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                    Our Programs
                </h2>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                    Explore our hands-on STEM workshops where students learn by doing.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programs.map((program, index) => (
                    <Link href={program.link} key={index} className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image 
                                src={program.image}
                                alt={program.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">{program.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 flex-grow leading-relaxed">{program.description}</p>
                            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-semibold group-hover:text-emerald-500 transition-colors mt-auto">
                                Explore Program <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
