import fs from 'fs';
import path from 'path';

export async function getInterleavedGalleryImages(): Promise<string[]> {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Get all subdirectories in public/images
    let workshops: string[] = [];
    try {
        const entries = fs.readdirSync(imagesDir, { withFileTypes: true });
        workshops = entries
            .filter(entry => entry.isDirectory())
            .map(entry => entry.name);
    } catch (e) {
        console.error("Error reading images directory", e);
        return [];
    }

    // Helper to recursively find all images in a directory
    const findImagesRecursively = (dir: string, baseDir: string, imagesList: string[]) => {
        try {
            const files = fs.readdirSync(dir, { withFileTypes: true });
            for (const file of files) {
                const fullPath = path.join(dir, file.name);
                if (file.isDirectory()) {
                    findImagesRecursively(fullPath, baseDir, imagesList);
                } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
                    // Convert the absolute path back to a public URL path
                    const relativePath = path.relative(baseDir, fullPath);
                    // Standardize slashes for web URLs and encode to support spaces
                    const webPath = encodeURI(`/images/${relativePath.split(path.sep).join('/')}`);
                    imagesList.push(webPath);
                }
            }
        } catch (e) {
            console.error(`Error reading directory ${dir}`, e);
        }
    };

    // Collect images per workshop
    const workshopImages: string[][] = [];
    
    for (const workshop of workshops) {
        const workshopPath = path.join(imagesDir, workshop);
        const images: string[] = [];
        findImagesRecursively(workshopPath, imagesDir, images);
        
        if (images.length > 0) {
            workshopImages.push(images);
        }
    }

    // Interleave
    const result: string[] = [];
    let hasMore = true;
    let index = 0;
    
    while (hasMore) {
        hasMore = false;
        for (let i = 0; i < workshopImages.length; i++) {
            if (index < workshopImages[i].length) {
                result.push(workshopImages[i][index]);
                hasMore = true;
            }
        }
        index++;
    }

    return result;
}
