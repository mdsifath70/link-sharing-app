import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Cloudinary {
  async uploadFile({
    fileUrl,
    folder,
  }: {
    fileUrl: string;
    folder: "sharing-app";
  }) {
    const res = await cloudinaryV2.uploader.upload(fileUrl, { folder });
    return res;
  }

  async deleteFile(fileUrl: string) {
    const res = await cloudinaryV2.uploader.destroy(fileUrl);
    return res;
  }
}

export const cloudinary = new Cloudinary();
