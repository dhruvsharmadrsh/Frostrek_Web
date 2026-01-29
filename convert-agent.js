
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const input = 'public/agent1.png';
const output = 'public/optimized/agent1.webp';

if (fs.existsSync(input)) {
    sharp(input)
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => console.log('Conversion successful'))
        .catch(err => console.error('Error:', err));
} else {
    console.error('Input file not found');
}
