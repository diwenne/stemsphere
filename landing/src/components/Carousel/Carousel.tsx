import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [itemWidth, setItemWidth] = useState(0);
    // Create infinite loop by duplicating images
    const infiniteImages = [...carouselImages, ...carouselImages, ...carouselImages];

    useEffect(() => {
        const updateWidth = () => {
            if (scrollContainerRef.current) {
                const firstCard = scrollContainerRef.current.children[0] as HTMLElement;
                if (firstCard) {
                    const gap = parseInt(window.getComputedStyle(scrollContainerRef.current).gap || '0');
                    setItemWidth(firstCard.offsetWidth + gap);
                }
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        // Additional check to ensure layout is settled
        const timeout = setTimeout(updateWidth, 100);

        return () => {
            window.removeEventListener('resize', updateWidth);
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        // Start at the middle set of images
        if (scrollContainerRef.current && itemWidth > 0) {
            const singleSetWidth = itemWidth * carouselImages.length;
            // Only set initial position if we are near 0 (initial load)
            if (scrollContainerRef.current.scrollLeft < 100) {
                scrollContainerRef.current.scrollLeft = singleSetWidth;
            }
        }
    }, [itemWidth]);

    const handleScroll = () => {
        if (!scrollContainerRef.current || itemWidth === 0) return;

        const container = scrollContainerRef.current;
        const singleSetWidth = itemWidth * carouselImages.length;

        // Loop back to middle when reaching end of second set (start of third set)
        if (container.scrollLeft >= 2 * singleSetWidth) {
            container.scrollLeft -= singleSetWidth;
        }
        // Loop forward to middle when reaching start of first set (going left)
        // We trigger this when we are halfway through the first set to avoid hitting 0
        else if (container.scrollLeft < singleSetWidth * 0.2) {
            container.scrollLeft += singleSetWidth;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current && itemWidth > 0) {
            const scrollAmount = itemWidth;
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'right' ? scrollAmount : -scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="carousel-container">
            <h2 className="carousel-title">{t('home.carousel')}</h2>
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
