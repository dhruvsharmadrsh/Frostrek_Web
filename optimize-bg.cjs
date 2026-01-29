const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeBackgroundImage() {
    const inputPath = path.join(__dirname, 'public', 'bg.jpg');
    const outputWebP = path.join(__dirname, 'public', 'bg.webp');
    const outputJpg = path.join(__dirname, 'public', 'bg-optimized.jpg');
    const outputBlur = path.join(__dirname, 'public', 'bg-blur.webp');

    console.log('Starting image optimization...\n');

    try {
        // 1. Create optimized WebP version (best compression)
        console.log('Creating optimized WebP version...');
        await sharp(inputPath)
            .resize(1920, null, { // Resize to max 1920px width, maintain aspect ratio
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({
                quality: 85, // High quality WebP
                effort: 6    // Higher effort = better compression
            })
            .toFile(outputWebP);

        const webpStats = fs.statSync(outputWebP);
        console.log(`✓ WebP created: ${(webpStats.size / 1024 / 1024).toFixed(2)} MB`);

        // 2. Create optimized JPG fallback
        console.log('\nCreating optimized JPG fallback...');
        await sharp(inputPath)
            .resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({
                quality: 80,
                progressive: true, // Progressive JPG loads faster
                mozjpeg: true
            })
            .toFile(outputJpg);

        const jpgStats = fs.statSync(outputJpg);
        console.log(`✓ Optimized JPG created: ${(jpgStats.size / 1024 / 1024).toFixed(2)} MB`);

        // 3. Create tiny blur placeholder (for instant loading)
        console.log('\nCreating blur placeholder...');
        await sharp(inputPath)
            .resize(20, null, { // Very small for instant load
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: 20 })
            .blur(10)
            .toFile(outputBlur);

        const blurStats = fs.statSync(outputBlur);
        console.log(`✓ Blur placeholder created: ${(blurStats.size / 1024).toFixed(2)} KB`);

        // Show original size for comparison
        const originalStats = fs.statSync(inputPath);
        console.log(`\n--- Comparison ---`);
        console.log(`Original: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`WebP: ${(webpStats.size / 1024 / 1024).toFixed(2)} MB (${((1 - webpStats.size / originalStats.size) * 100).toFixed(1)}% smaller)`);
        console.log(`JPG: ${(jpgStats.size / 1024 / 1024).toFixed(2)} MB (${((1 - jpgStats.size / originalStats.size) * 100).toFixed(1)}% smaller)`);
        console.log(`Blur: ${(blurStats.size / 1024).toFixed(2)} KB\n`);

        console.log('✓ Optimization complete!');
    } catch (error) {
        console.error('Error optimizing image:', error);
        process.exit(1);
    }
}

optimizeBackgroundImage();
