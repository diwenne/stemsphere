import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: Props) {
  return (
    <section className={`py-12 md:py-20 ${className}`}>
      <div className="container mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}