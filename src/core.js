const squoosh = require("@squoosh/lib");
const os = require("os");
const fs = require("fs/promises");

const processImages = async (imgs) => {
  const imagePool = new squoosh.ImagePool(os.cpus().length);
  const images = [];
  for await (const img of imgs) {
    const file = await fs.readFile(img.filePath);
    const stat = await fs.stat(img.filePath);
    const before = stat.size;
    const image = imagePool.ingestImage(file);
    const encodeOptions = {
      mozjpeg: "auto",
    };
    const result = await image.encode(encodeOptions);
    const after = result.mozjpeg.size;
    if(after > before) {
      continue;
    }
    const percent = Math.round(100 - (after / before) * 100);
    const rawEncodedImage = image.encodedWith.mozjpeg.binary;
    images.push({
      filePath: img.filePath,
      repoPath: img.repoPath,
      name: img.filename,
      before: before,
      after: after,
      percent: percent,
    });
    fs.writeFile(img.filePath, rawEncodedImage);
  }

  await imagePool.close();
  return images;
};

module.exports = { processImages };