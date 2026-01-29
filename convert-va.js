
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const input = 'public/frostrek_VA.png';
const output = 'public/optimized/frostrek_VA.webp';

if (fs.existsSync(input)) {
    sharp(input)
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => console.log('Conversion successful: ' + output))
        .catch(err => console.error('Error:', err));
} else {
    console.error('Input file not found: ' + input);
}
