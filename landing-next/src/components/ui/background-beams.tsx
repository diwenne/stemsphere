"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-neutral-950",
                className
            )}
        >
            <div className="absolute h-full w-full inset-0 bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="absolute h-full w-full inset-0 opacity-30">
                <div className="absolute -inset-[100%] animate-[spin_60s_linear_infinite] opacity-50">
                    <div className="absolute top-[50%] left-[50%] h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-20 blur-[100px]" />
                </div>
            </div>
        </div>
    );
};
