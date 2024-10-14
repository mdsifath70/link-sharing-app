export async function urlToFile(url: string, filename?: string) {
  if (!url) return null;

  const response = await fetch(url);
  const blob = await response.blob();
  const mimeType = blob.type;

  let filenameResolved = filename;
  if (!filenameResolved) {
    const extension = mimeType.split("/")[1] || "";
    filenameResolved = `file-${Date.now()}.${extension}`;
  }

  const file = new File([blob], filenameResolved, { type: mimeType });
  return file;
}

interface ValidationResult {
  url?: string;
  fileName?: string;
  errorMessage?: string;
}
export function validateImageFile(
  file: File,
  maxSize?: number,
  maxDimension?: number,
): Promise<ValidationResult | null> {
  return new Promise((resolve) => {
    if (!maxSize && !maxDimension) {
      resolve(null);
      return;
    }

    if (maxSize && file.size > maxSize) {
      resolve({
        errorMessage: `File size exceeds the maximum limit of ${(maxSize / 1000000).toFixed(2)} MB.`,
      });
      return;
    }

    if (!maxDimension) {
      resolve({
        url: URL.createObjectURL(file),
        fileName: file.name,
      });
      return;
    }

    const image = new Image();
    const objectUrl = URL.createObjectURL(file);
    image.src = objectUrl;

    image.onload = () => {
      const { width, height } = image;

      if (width > maxDimension || height > maxDimension) {
        resolve({
          errorMessage: `Image dimension ${width}x${height}px exceed, maximum allowed size ${maxDimension}x${maxDimension}px`,
        });
        URL.revokeObjectURL(objectUrl);
        return;
      }

      // response
      resolve({
        url: objectUrl,
        fileName: file.name,
      });
    };

    image.onerror = () => {
      resolve({
        errorMessage:
          "Failed to load the image. Please try again with a valid image file.",
      });
    };
  });
}
