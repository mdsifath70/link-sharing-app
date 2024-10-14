import { writeFile } from "fs/promises";
import path from "path";

export default async function fileUploadToLocal(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filenameExt = path.extname(file.name);
  const filename =
    file.name.replaceAll(" ", "-").replace(filenameExt, "") +
    "-" +
    Date.now() +
    filenameExt;

  const uploadPath = path.join(process.cwd(), "public/uploads/" + filename);
  await writeFile(uploadPath, buffer);
  return { url: uploadPath };
}
