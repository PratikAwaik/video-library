import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinaryRouter = createTRPCRouter({
  sign: publicProcedure
    .input(z.object({ fileName: z.string() }))
    .query(({ input }) => {
      const timestamp = Math.round(new Date().getTime() / 1000);

      const signature = cloudinary.utils.api_sign_request(
        {
          timestamp: timestamp,
          public_id: String(input.fileName),
          folder: process.env.CLOUDINARY_VIDEO_BUCKET_NAME,
        },
        process.env.CLOUDINARY_API_SECRET!,
      );

      return {
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        apiKey: process.env.CLOUDINARY_API_KEY!,
        folderName: process.env.CLOUDINARY_VIDEO_BUCKET_NAME!,
      };
    }),
});
