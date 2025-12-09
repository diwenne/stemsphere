
import './Gallery.css';

const images = [
    '/images/gallery/gallery-1.jpg',
    '/images/gallery/gallery-2.jpg',
    '/images/gallery/gallery-3.jpg',
    '/images/gallery/gallery-4.jpg',
    '/images/gallery/gallery-5.jpg',
    '/images/gallery/gallery-6.jpg',
    '/images/gallery/gallery-7.jpg',
    '/images/gallery/gallery-8.jpg',
    '/images/gallery/gallery-9.jpg',
    '/images/gallery/gallery-10.jpg',
    '/images/gallery/gallery-11.jpg',
    '/images/gallery/gallery-12.jpg',
    '/images/gallery/gallery-13.jpg',
    '/images/gallery/gallery-14.jpg',
    '/images/gallery/gallery-15.jpg',
    '/images/gallery/gallery-16.jpg',
    '/images/gallery/gallery-17.jpg',
    '/images/gallery/gallery-18.jpg',
    '/images/gallery/gallery-19.jpg',
    '/images/gallery/gallery-20.jpg',
];

const Gallery = () => {
    return (
        <div className="gallery-grid">
            {images.map((src, index) => (
                <div key={index} className="gallery-item">
                    <img src={src} alt={`Gallery image ${index + 1}`} loading="lazy" />
                </div>
            ))}
        </div>
    );
};

export default Gallery;
