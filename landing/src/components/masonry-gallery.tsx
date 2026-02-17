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
                    <Image
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        width={600}
                        height={800}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                        style={{ objectFit: "contain" }}
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};
