"use client";

import { HeroSection } from "@/components/hero-section";
import { BenefitsSection } from "@/components/benefits-section";
import { ImpactSection } from "@/components/impact-section";
import { RecentBlogsSection } from "@/components/recent-blogs-section";
import { motion } from "framer-motion";
import { Star, Sparkles, Cloud, Zap, Triangle, Hexagon, Circle } from "lucide-react";

const decorations = [
  { Icon: Star, top: "5%", left: "5%", size: 48, delay: 0, rotate: 12, color: "text-emerald-300" },
  { Icon: Sparkles, top: "12%", right: "8%", size: 36, delay: 1.5, rotate: -15, color: "text-yellow-300" },
  { Icon: Circle, top: "18%", left: "15%", size: 24, delay: 0.5, rotate: 0, color: "text-blue-300" },
  { Icon: Triangle, top: "25%", right: "20%", size: 40, delay: 2, rotate: 45, color: "text-purple-300" },
  { Icon: Hexagon, top: "35%", left: "8%", size: 56, delay: 1, rotate: -10, color: "text-orange-300" },
  { Icon: Cloud, top: "45%", right: "5%", size: 64, delay: 3, rotate: 5, color: "text-sky-200" },
  { Icon: Zap, top: "55%", left: "20%", size: 32, delay: 0.8, rotate: 20, color: "text-yellow-400" },
  { Icon: Star, top: "65%", right: "12%", size: 44, delay: 2.2, rotate: -25, color: "text-pink-300" },
  { Icon: Circle, top: "72%", left: "6%", size: 28, delay: 1.2, rotate: 0, color: "text-teal-300" },
  { Icon: Sparkles, top: "80%", right: "25%", size: 52, delay: 0.3, rotate: 10, color: "text-indigo-300" },
  { Icon: Triangle, top: "90%", left: "10%", size: 48, delay: 2.5, rotate: -30, color: "text-red-300" },
];

function FloatingElement({ item }: { item: typeof decorations[0] }) {
  return (
    <motion.div
      initial={{ y: 0, rotate: item.rotate }}
      animate={{
        y: [0, -20, 0],
        rotate: [item.rotate, item.rotate + 10, item.rotate],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        delay: item.delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={`absolute opacity-60 ${item.color} drop-shadow-lg`}
      style={{
        top: item.top,
        left: item.left,
        right: item.right,
      }}
    >
      <item.Icon 
        size={item.size} 
        strokeWidth={2.5} 
        fill="currentColor" 
        className="fill-current/20" 
      />
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="relative bg-[#FEFCF9] dark:bg-neutral-950 flex flex-col mx-auto overflow-hidden">

      <HeroSection />


      {/* Content sections with ribbon flowing through */}

      <div className="relative" style={{ minHeight: "200vh" }}>
        
        {/* Floating Decorations Layer */}
        <div className="absolute inset-0 pointer-events-none z-0">
             {decorations.map((item, i) => (
               <FloatingElement key={i} item={item} />
             ))}
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto sm:px-10 px-5">
          <section id="impact" className="pt-20 pb-20">
            <h2 className="text-3xl font-extrabold text-center mb-4 text-neutral-800 dark:text-neutral-200">
              Our Impact
            </h2>
            <p className="text-center text-neutral-500 mb-10 max-w-2xl mx-auto">Making a measurable difference in STEM education.</p>
            <ImpactSection />
          </section>
          <section id="benefits" className="py-20 relative z-20">
            <h2 className="text-3xl font-extrabold text-center mb-10 text-neutral-800 dark:text-white drop-shadow-md">
              Why Join Stemsphere?
            </h2>
            <BenefitsSection />
          </section>
          <section id="blog" className="py-20">
            <RecentBlogsSection />
          </section>
        </div>
      </div>
    </main>
  );
}
