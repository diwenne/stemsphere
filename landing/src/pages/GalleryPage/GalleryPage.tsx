import Section from '../../components/Section/Section';
import Gallery from '../../components/Gallery/Gallery';
import './GalleryPage.css';

const GalleryPage = () => {
    return (
        <Section id="gallery-page">
            <div className="page-header">
                <h1 className="page-title">Gallery</h1>
                <p className="page-subtitle">A glimpse into our activities and events.</p>
            </div>

            <div className="gallery-container-page">
                <Gallery />
            </div>
        </Section>
    );
};

export default GalleryPage;
