const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outputJson = path.join(__dirname, '..', 'src', 'lib', 'images-index.json');

function generateIndex() {
    let workshops = [];
    try {
        const entries = fs.readdirSync(imagesDir, { withFileTypes: true });
        workshops = entries.filter(e => e.isDirectory()).map(e => e.name);
    } catch (e) { 
        console.error("Error reading images root:", e);
        return; 
    }

    const findImagesRecursively = (dir, baseDir, imagesList) => {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            if (file.isDirectory()) {
                findImagesRecursively(fullPath, baseDir, imagesList);
            } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
                const relativePath = path.relative(baseDir, fullPath);
                const webPath = encodeURI(`/images/${relativePath.split(path.sep).join('/')}`);
                imagesList.push(webPath);
            }
        }
    };

    const workshopImages = [];
    for (const workshop of workshops) {
        const workshopPath = path.join(imagesDir, workshop);
        const images = [];
        findImagesRecursively(workshopPath, imagesDir, images);
        if (images.length > 0) workshopImages.push(images);
    }

    // Interleave
    const result = [];
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

    fs.writeFileSync(outputJson, JSON.stringify(result, null, 2));
    console.log("Successfully generated src/lib/images-index.json with " + result.length + " images");
}

generateIndex();
