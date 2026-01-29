const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'optimized');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const images = [
    {
        input: 'logo.png',
        output: 'logo.webp',
        width: 64, // Reduced from 128. Displayed at 32x32.
        height: 64
    },
    {
        input: 'workflow-dashboard.png',
        output: 'workflow-dashboard.webp',
        width: 530, // Reduced from 1342. Displayed at 264x176.
        height: 353
    },
    {
        input: 'developer-workspace.png',
        output: 'developer-workspace.webp',
        width: 512, // Reduced from 568. Displayed at ~256px.
        height: 512
    },
    {
        input: 'Chat bot-rafiki.png',
        output: 'chatbot-rafiki.webp',
        width: 512, // Reduced from 568. Displayed at ~256px.
        height: 512
    },
    {
        input: 'robot.gif',
        output: 'robot.webp',
        width: 128, // Displayed at 56x56 max.
        height: 128,
        animated: true
    },
    {
        input: 'bg.webp',
        output: 'bg-optimized.webp',
        width: 1920,
        height: 1080
    },
    // Partner logos
    {
        input: 'topDevelopers.png',
        output: 'topDevelopers.webp',
        width: 200,
        height: 60
    },
    {
        input: 'goodfirms-logo-vector.png',
        output: 'goodfirms.webp',
        width: 200,
        height: 60
    },
    {
        input: 'iso.png',
        output: 'iso.webp',
        width: 120,
        height: 60
    }
];

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');

    for (const img of images) {
        const inputPath = path.join(PUBLIC_DIR, img.input);
        const outputPath = path.join(OUTPUT_DIR, img.output);

        if (!fs.existsSync(inputPath)) {
            console.log(`❌ Skipping ${img.input} - file not found`);
            continue;
        }

        try {
            const inputStats = fs.statSync(inputPath);

            await sharp(inputPath, { animated: img.animated })
                .resize(img.width, img.height, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .webp({ quality: 50, effort: 6 })
                .toFile(outputPath);

            const outputStats = fs.statSync(outputPath);
            const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

            console.log(`✅ ${img.input}`);
            console.log(`   → ${img.output} (${img.width}x${img.height})`);
            console.log(`   📉 ${(inputStats.size / 1024).toFixed(1)} KB → ${(outputStats.size / 1024).toFixed(1)} KB (${savings}% smaller)\n`);
        } catch (err) {
            console.error(`❌ Error processing ${img.input}:`, err.message);
        }
    }

    console.log('✨ Image optimization complete!');
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
}

optimizeImages();
