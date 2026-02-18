"use client";

import { HeroSection } from "@/components/hero-section";
import { BenefitsSection } from "@/components/benefits-section";
import { ImpactSection } from "@/components/impact-section";
import { RecentBlogsSection } from "@/components/recent-blogs-section";

export default function Home() {
  return (
    <main className="relative bg-[#FEFCF9] dark:bg-neutral-950 flex flex-col mx-auto">

      <HeroSection />


      {/* Content sections with ribbon flowing through */}

      <div className="relative" style={{ minHeight: "200vh" }}>


        <div className="relative z-10 max-w-7xl w-full mx-auto sm:px-10 px-5">
          <section id="impact" className="pt-20 pb-20">
            <h2 className="text-3xl font-extrabold text-center mb-4 text-neutral-800 dark:text-neutral-200">
              Our Impact
            </h2>
            <p className="text-center text-neutral-500 mb-10 max-w-2xl mx-auto">Making a measurable difference in STEM education.</p>
            <ImpactSection />
          </section>
          <section id="benefits" className="py-20">
            <h2 className="text-3xl font-extrabold text-center mb-10 text-neutral-800 dark:text-neutral-200">
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
