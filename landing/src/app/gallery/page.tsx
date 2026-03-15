import { MasonryGallery } from "@/components/masonry-gallery";
import { GalleryHeader } from "@/components/gallery-header";
import { getInterleavedGalleryImages } from "@/lib/get-images";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
    const images = await getInterleavedGalleryImages();

    return (
        <div className="relative min-h-screen bg-[#FEFCF9] dark:bg-neutral-950 pt-32 pb-20 px-4 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <GalleryHeader />
                <MasonryGallery images={images} />
            </div>
        </div>
    );
}
