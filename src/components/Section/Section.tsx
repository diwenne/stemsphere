import React from 'react';
import { useInView } from 'react-intersection-observer';
import './Section.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  return (
    <section ref={ref} className={`section-container fade-in-section ${inView ? 'is-visible' : ''} ${className}`}>
      {children}
    </section>
  );
};

export default Section;