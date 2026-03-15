import images from './images-index.json';

export async function getInterleavedGalleryImages(): Promise<string[]> {
    return images as string[];
}
