import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-emerald-500/5 hover:bg-emerald-500/0 border-emerald-500/20 text-emerald-500",
                solid: "bg-emerald-500 hover:bg-emerald-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
                outline: "border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
            },
            size: {
                default: "px-7 py-2 text-base",
                sm: "px-4 py-1 text-sm",
                lg: "px-10 py-3 text-lg",
                icon: "h-10 w-10 px-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    neon?: boolean;
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, asChild = false, ...props }, ref) => {
        const Comp = asChild ? React.Fragment : "button"

        // If asChild is true, we need to handle the children differently to pass props
        // But for simplicity in this specific component which relies on wrapping structure for neon effect,
        // we might want to avoid full Slot behavior or wrap the child.
        // However, shadcn uses Slot. The user provided code is a simple button.
        // To support 'asChild' (used in existing code for Links), we need to be careful.
        // The provided code DOES NOT support asChild.
        // I will modify it to wrap the children if asChild is true, or just render the button.
        // Actually, the user's code is strict. 
        // But my existing code uses `asChild` heavily (e.g. <Button asChild><Link ...>).
        // I will adapt the component to support `asChild` by cloning the child if present, 
        // OR I will refactor my usage to not use asChild and instead wrap the Link inside the Button or vice versa.
        // Refactoring usage is safer for the "Neon" effect which relies on the spans.

        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-emerald-500 via-emerald-600 to-transparent hidden", neon && "block")} />
                {children}
                <span className={cn("absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-emerald-500 via-emerald-600 to-transparent hidden", neon && "block")} />
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
