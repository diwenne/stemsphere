"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/neon-button";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export function HeroSection() {
    return (
        <HeroGeometric
            title1="Stemsphere"
            title2="Foundation"
        >
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/get-involved">
                    <Button variant="solid" size="lg" className="rounded-full">
                        Get Involved
                    </Button>
                </Link>
            </div>
        </HeroGeometric>
    );
}

