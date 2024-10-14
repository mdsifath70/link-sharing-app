import { v2 as cloudinaryV2, UploadApiResponse } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// types
type FolderNames = "sharing-app";

class Cloudinary {
  async uploadUrl({
    fileUrl,
    folder,
  }: {
    fileUrl: string;
    folder: FolderNames;
  }) {
    const res = await cloudinaryV2.uploader.upload(fileUrl, { folder });
    return res;
  }

  async uploadStream({ file, folder }: { file: File; folder: FolderNames }) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const res: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinaryV2.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        uploadStream.end(buffer);
      },
    );
    return res;
  }

  async deleteFile(fileUrl: string) {
    const res = await cloudinaryV2.uploader.destroy(fileUrl);
    return res;
  }
}

export const cloudinary = new Cloudinary();
