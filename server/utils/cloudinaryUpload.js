const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'artworks',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Cloudinary upload failed');
  }
};

module.exports = { uploadImageToCloudinary };
