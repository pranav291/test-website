const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // Check if sharp is available
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp temporarily...');
  execSync('npm install --no-save sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

const svgPath = path.join(__dirname, 'public', 'images', 'dta-logo.svg');
const pngPath = path.join(__dirname, 'public', 'images', 'dta-logo.png');

if (!fs.existsSync(svgPath)) {
  console.error('SVG not found at', svgPath);
  process.exit(1);
}

const svgBuffer = fs.readFileSync(svgPath);

sharp(svgBuffer)
  .resize(1200, 1200, {
    fit: 'contain',
    background: { r: 9, g: 9, b: 11, alpha: 1 } // #09090b
  })
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log('Successfully generated dta-logo.png');
  })
  .catch(err => {
    console.error('Error generating PNG:', err);
    process.exit(1);
  });
