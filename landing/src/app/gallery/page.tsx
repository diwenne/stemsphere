"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MasonryGallery } from "@/components/masonry-gallery";

const images = [
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
    "/images/gallery/gallery-13.jpg",
    "/images/gallery/gallery-16.jpg",
    "/images/gallery/gallery-17.jpg",
    "/images/gallery/gallery-18.jpg",
    "/images/gallery/gallery-19.jpg",
    "/images/gallery/gallery-20.jpg",
    "/images/gallery/gallery-21.jpg",
    "/images/gallery/gallery-22.jpg",
    "/images/gallery/gallery-23.jpg",
    "/images/gallery/gallery-24.jpg",
    "/images/gallery/gallery-25.jpg",
    "/images/gallery/gallery-26.jpg",
    "/images/gallery/gallery-27.jpg",
    "/images/gallery/gallery-28.jpg",
    "/images/gallery/gallery-29.jpg",
    "/images/gallery/gallery-30.jpg",
    "/images/gallery/gallery-31.jpg",
    "/images/gallery/gallery-32.jpg",
    "/images/gallery/gallery-33.jpg",
    "/images/gallery/gallery-34.jpg",
];

export default function GalleryPage() {
    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    {/* Cartoon Camera Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 12 }}
                        className="w-32 h-32 mx-auto mb-6 relative"
                    >
                        <Image
                            src="/icons/camera-snap.png"
                            alt="Gallery"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    <h1 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-white sm:text-5xl mb-4">
                        Gallery
                    </h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                        A glimpse into our workshops, events, and the amazing students we work with.
                    </p>
                </motion.div>

                <MasonryGallery images={images} />
            </div>
        </div>
    );
}
