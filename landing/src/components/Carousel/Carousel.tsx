import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

const carouselImages = [
    '/images/gallery/gallery-1.jpg',
    '/images/gallery/gallery-5.jpg',
    '/images/gallery/gallery-10.jpg',
    '/images/gallery/gallery-16.jpg',
    '/images/gallery/gallery-20.jpg',
    '/images/gallery/gallery-25.jpg',
    '/images/gallery/gallery-30.jpg',
    '/images/gallery/gallery-33.jpg',
];

const Carousel = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // Create infinite loop by duplicating images
    const infiniteImages = [...carouselImages, ...carouselImages, ...carouselImages];

    useEffect(() => {
        // Start at the middle set of images
        if (scrollContainerRef.current) {
            const itemWidth = 400; // width + gap
            scrollContainerRef.current.scrollLeft = itemWidth * carouselImages.length;
        }
    }, []);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const itemWidth = 400;
        const maxScroll = itemWidth * carouselImages.length * 2;
        const minScroll = itemWidth * carouselImages.length;

        // Loop back to middle when reaching end
        if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = itemWidth * carouselImages.length;
        }
        // Loop forward to middle when reaching start
        else if (container.scrollLeft <= 0) {
            container.scrollLeft = itemWidth * carouselImages.length;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'right' ? scrollAmount : -scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });

            // Check for looping after scroll completes
            setTimeout(handleScroll, 300);
        }
    };

    return (
        <div className="carousel-container">
            <h2 className="carousel-title">Photos</h2>
            <div className="carousel">
                <button className="carousel-button prev" onClick={() => scroll('left')}>
                    <ChevronLeft size={24} />
                </button>

                <div className="carousel-scroll" ref={scrollContainerRef} onScroll={handleScroll}>
                    {infiniteImages.map((image, index) => (
                        <div key={index} className="carousel-item">
                            <img src={image} alt={`Gallery ${index % carouselImages.length + 1}`} />
                        </div>
                    ))}
                </div>

                <button className="carousel-button next" onClick={() => scroll('right')}>
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
