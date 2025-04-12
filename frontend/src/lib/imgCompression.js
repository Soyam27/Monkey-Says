import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.01, // Max size = 1MB
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  return await imageCompression(file, options);
};
