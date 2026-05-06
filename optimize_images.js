const sharp = require('sharp');
const fs = require('fs');

async function processImages() {
  try {
    console.log("Processing bg-dark-fashion.png...");
    await sharp('src/Assets/bg-dark-fashion.png')
      .webp({ quality: 80 })
      .toFile('public/bg-dark-fashion.webp');

    console.log("Processing one.webp...");
    await sharp('src/Assets/one.webp')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('src/Assets/one-optimized.webp');

    console.log("Processing two.webp...");
    await sharp('src/Assets/two.webp')
      .resize(800)
      .webp({ quality: 80 })
      .toFile('src/Assets/two-optimized.webp');
      
    console.log("Done!");
  } catch (err) {
    console.error(err);
  }
}

processImages();
