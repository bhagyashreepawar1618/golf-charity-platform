import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// -------------------
// Configure Cloudinary
// -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// -------------------
// Multer memory storage
// -------------------
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// -------------------
// Helper function to upload buffer to Cloudinary
// -------------------
export const uploadOnCloudinary = (fileBuffer, folder = 'profiles') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(fileBuffer);
  });
};
