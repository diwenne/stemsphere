import React from 'react';
import { useInView } from 'react-intersection-observer';
import './Section.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  // The 'id' prop is now required and will be correctly applied
  id: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  return (
    // THE FIX: The 'id' prop is now passed to the section element
    <section id={id} ref={ref} className={`section-container fade-in-section ${inView ? 'is-visible' : ''} ${className}`}>
      {children}
    </section>
  );
};

export default Section;