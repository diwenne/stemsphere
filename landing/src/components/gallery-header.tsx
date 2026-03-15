"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function GalleryHeader() {
    return (
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
                    unoptimized
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
    );
}
