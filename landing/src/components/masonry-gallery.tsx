"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const MasonryGallery = ({
    images,
    className,
}: {
    images: string[];
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "columns-1 sm:columns-2 lg:columns-3 gap-6",
                className
            )}
        >
            {images.map((src, index) => (
                <div
                    key={index}
                    className="mb-6 break-inside-avoid overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "translateZ(0)",
                    }}
                >
                    {/* Next.js Image component forces a specific aspect ratio based on width/height props. 
                        For a true masonry layout with unknown mixed aspect ratios, a standard img tag works best. */}
                    <img
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};
