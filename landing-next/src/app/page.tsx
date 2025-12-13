"use client";

import { HeroSection } from "@/components/hero-section";
import { BenefitsSection } from "@/components/benefits-section";
import { ImpactSection } from "@/components/impact-section";
import { DualRowCarousel } from "@/components/ui/infinite-carousel";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

// Gallery images for the carousel
const galleryImages = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-7.jpg",
  "/images/gallery/gallery-8.jpg",
  "/images/gallery/gallery-9.jpg",
  "/images/gallery/gallery-10.jpg",
  "/images/gallery/gallery-11.jpg",
  "/images/gallery/gallery-12.jpg",
];

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-neutral-950 flex flex-col overflow-hidden mx-auto">
      <HeroSection />

      {/* Content sections with grid pattern background */}
      <div className="relative">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.15}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,white,transparent)]",
            "fill-emerald-500/30 stroke-emerald-500/30",
            "dark:fill-emerald-500/20 dark:stroke-emerald-500/20"
          )}
        />

        <div className="relative z-10 max-w-7xl w-full mx-auto sm:px-10 px-5">
          <section id="impact" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-200">Our Impact</h2>
            <p className="text-center text-neutral-500 mb-10 max-w-2xl mx-auto">Making a measurable difference in STEM education.</p>
            <ImpactSection />
          </section>
          <section id="benefits" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800 dark:text-neutral-200">Why Join Stemsphere?</h2>
            <BenefitsSection />
          </section>
        </div>
      </div>

      {/* Photo Gallery Carousel */}
      <section className="relative py-20 bg-white dark:bg-neutral-950 overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.15}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,white,transparent)]",
            "fill-emerald-500/30 stroke-emerald-500/30",
            "dark:fill-emerald-500/20 dark:stroke-emerald-500/20"
          )}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 mb-10">
          <h2 className="text-3xl font-bold text-center mb-4 text-neutral-800 dark:text-neutral-200">
            Moments in STEM
          </h2>
          <p className="text-center text-neutral-500 max-w-2xl mx-auto">
            Snapshots from our workshops and events around the world.
          </p>
        </div>
        <DualRowCarousel images={galleryImages} speed={40} />
      </section>
    </main>
  );
}


