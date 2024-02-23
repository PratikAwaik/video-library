import { v4 } from "uuid";
import { getCloudinarySignature } from "~/server/actions/create-video";

export type CloudinarySignature = {
  apiKey: string;
  signature: string;
  cloudName: string;
  timestamp: number;
  folderName: string;
};

export async function processFile(
  file: File,
  onProgress: (percentComplete: number) => void = () => ({}),
  n = 1,
): Promise<{ secure_url: string }> {
  const fileName = `${file.name.split(".")[0]}-${v4()}`;

  const XUniqueUploadId = v4();

  const sliceSize = 6000000;
  const maxSize = 4000000000;
  const size = file.size;

  if (size > maxSize) {
    throw new Error(`File size too large: ${size}`);
  }

  const cloudinaryUploadSignature = await getCloudinarySignature(fileName);

  let secureUrl = ``;
  let piecesCompleted = 0;
  const totalPieces = Math.ceil(size / sliceSize);

  const promises = [];
  for (let start = 0; start < size; start += sliceSize) {
    const end = start + sliceSize > size ? size : start + sliceSize;
    const piece = file.slice(start, end);

    const promise = send(
      piece,
      start,
      end,
      size,
      fileName,
      cloudinaryUploadSignature,
      XUniqueUploadId,
    ).then((result) => {
      piecesCompleted++;
      onProgress(piecesCompleted / totalPieces);
      secureUrl = result.secure_url;
    });

    promises.push(promise);

    if (promises.length === n) {
      await Promise.all(promises);
      promises.length = 0;
    }
  }

  if (promises.length > 0) {
    await Promise.all(promises);
  }

  return { secure_url: secureUrl };
}

export async function send(
  piece: Blob,
  start: number,
  end: number,
  size: number,
  fileName: string,
  cloudinaryUploadSignature: CloudinarySignature,
  XUniqueUploadId: string,
) {
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryUploadSignature.cloudName}/video/upload`;

  const formData = new FormData();
  formData.append("file", piece);
  formData.append("api_key", cloudinaryUploadSignature.apiKey);
  formData.append("timestamp", cloudinaryUploadSignature.timestamp.toString());
  formData.append("signature", cloudinaryUploadSignature.signature);
  formData.append("folder", cloudinaryUploadSignature.folderName);

  formData.append("cloud_name", cloudinaryUploadSignature.cloudName);
  formData.append("public_id", fileName);

  const headers = new Headers();
  headers.append("X-Unique-Upload-Id", XUniqueUploadId);
  headers.append("Content-Range", `bytes ${start}-${end - 1}/${size}`);

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
