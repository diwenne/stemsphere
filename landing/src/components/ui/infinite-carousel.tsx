"use client";

import { useState, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface InfiniteCarouselProps {
    images: string[];
    className?: string;
    speed?: number;
    direction?: "left" | "right";
    isPaused?: boolean;
}

export function InfiniteCarousel({
    images,
    className,
    speed = 30,
    direction = "left",
    isPaused = false,
}: InfiniteCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const xRef = useRef(0);

    useAnimationFrame((_, delta) => {
        if (!scrollRef.current || isPaused) return;

        const scrollWidth = scrollRef.current.scrollWidth / 2;
        const moveAmount = (speed * delta) / 1000;

        if (direction === "left") {
            xRef.current -= moveAmount;
            if (xRef.current <= -scrollWidth) {
                xRef.current += scrollWidth;
            }
        } else {
            xRef.current += moveAmount;
            if (xRef.current >= 0) {
                xRef.current -= scrollWidth;
            }
        }

        scrollRef.current.style.transform = `translateX(${xRef.current}px)`;
    });

    // Double the images for seamless loop
    const duplicatedImages = [...images, ...images];

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                className
            )}
        >
            <div
                ref={scrollRef}
                className="flex gap-4"
                style={{ willChange: "transform" }}
            >
                {duplicatedImages.map((src, index) => (
                    <div
                        key={`${src}-${index}`}
                        className="flex-shrink-0 rounded-sm shadow-lg"
                    >
                        <Image
                            src={src}
                            alt={`Gallery image ${(index % images.length) + 1}`}
                            width={320}
                            height={240}
                            className="w-64 md:w-80 h-auto rounded-sm hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

interface DualRowCarouselProps {
    images: string[];
    className?: string;
    speed?: number;
}

export function DualRowCarousel({
    images,
    className,
    speed = 25,
}: DualRowCarouselProps) {
    const [isPaused, setIsPaused] = useState(false);

    // Split images into two rows
    const midpoint = Math.ceil(images.length / 2);
    const topRowImages = images.slice(0, midpoint);
    const bottomRowImages = images.slice(midpoint);

    return (
        <div
            className={cn("space-y-4 py-8 cursor-pointer", className)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <InfiniteCarousel
                images={topRowImages}
                speed={speed}
                direction="left"
                isPaused={isPaused}
            />
            <InfiniteCarousel
                images={bottomRowImages}
                speed={speed * 0.8}
                direction="right"
                isPaused={isPaused}
            />
        </div>
    );
}
