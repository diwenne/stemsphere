"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export const StatefulButton = ({ className, children, ...props }: ButtonProps) => {
    const [scope, animate] = useAnimate();

    const animateLoading = async () => {
        await animate(
            ".loader",
            {
                width: "20px",
                scale: 1,
                display: "block",
            },
            {
                duration: 0.2,
            },
        );
    };

    const animateSuccess = async () => {
        await animate(
            ".loader",
            {
                width: "0px",
                scale: 0,
                display: "none",
            },
            {
                duration: 0.2,
            },
        );
        await animate(
            ".check",
            {
                width: "20px",
                scale: 1,
                display: "block",
            },
            {
                duration: 0.2,
            },
        );

        await animate(
            ".check",
            {
                width: "0px",
                scale: 0,
                display: "none",
            },
            {
                delay: 2,
                duration: 0.2,
            },
        );
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
            await animateLoading();
            await props.onClick(event);
            await animateSuccess();
        }
    };

    const {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onAnimationStart,
        onAnimationEnd,
        ...buttonProps
    } = props;

    return (
        <motion.button
            layout
            layoutId="button"
            ref={scope}
            className={cn(
                "group relative flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5 text-sm font-medium text-emerald-600 transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] dark:text-emerald-400 dark:hover:text-white",
                className,
            )}
            {...buttonProps}
            onClick={handleClick}
        >
            <motion.div layout className="flex items-center gap-2">
                <Loader />
                <CheckIcon />
                <motion.span layout>{children}</motion.span>
            </motion.div>
        </motion.button>
    );
};

const Loader = () => {
    return (
        <motion.svg
            animate={{
                rotate: [0, 360],
            }}
            initial={{
                scale: 0,
                width: 0,
                display: "none",
            }}
            style={{
                scale: 0.5,
                display: "none",
            }}
            transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "linear",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="loader"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a9 9 0 1 0 9 9" />
        </motion.svg>
    );
};

const CheckIcon = () => {
    return (
        <motion.svg
            initial={{
                scale: 0,
                width: 0,
                display: "none",
            }}
            style={{
                scale: 0.5,
                display: "none",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l2 2l4 -4" />
        </motion.svg>
    );
};
