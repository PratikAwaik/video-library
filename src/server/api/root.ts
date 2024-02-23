import { videoRouter } from "~/server/api/routers/video";
import { createTRPCRouter } from "~/server/api/trpc";
import { cloudinaryRouter } from "./routers/cloudinary";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  video: videoRouter,
  cloudinary: cloudinaryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
