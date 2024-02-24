import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const videoRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        cloudinaryUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { title, description, cloudinaryUrl } = input;

      return ctx.db.video.create({
        data: {
          title,
          description,
          cloudinaryUrl,
          thumbnailUrl: cloudinaryUrl.replace(".mp4", ".webp"),
        },
      });
    }),
  getVideos: publicProcedure
    .input(z.object({ machineId: z.string().optional().nullable() }).optional())
    .query(({ input, ctx }) => {
      const machineId = input?.machineId ?? "";

      return ctx.db.video.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          views: {
            where: {
              machineId,
            },
          },
          likes: {
            where: {
              machineId,
            },
          },
        },
      });
    }),
  getVideoDetails: publicProcedure
    .input(
      z
        .object({
          videoId: z.number(),
          machineId: z.string().optional().nullable(),
        })
        .optional(),
    )
    .query(({ input, ctx }) => {
      const videoId = input?.videoId ?? 0;
      const machineId = input?.machineId ?? undefined;

      return ctx.db.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
        include: {
          likes: {
            where: {
              AND: [
                {
                  videoId: videoId,
                },
                {
                  machineId: machineId,
                },
              ],
            },
          },
          views: {
            where: {
              AND: [
                {
                  videoId: videoId,
                },
                {
                  machineId: machineId,
                },
              ],
            },
          },
        },
      });
    }),
  updateLikes: publicProcedure
    .input(
      z.object({
        machineId: z.string(),
        videoId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { machineId, videoId } = input;

      const likeEntityToUpdate = await ctx.db.like.findUnique({
        where: {
          machineId_videoId: {
            machineId,
            videoId,
          },
        },
      });

      // delete entry and reduce like count because unliking
      if (likeEntityToUpdate?.id) {
        await ctx.db.like.delete({
          where: {
            id: likeEntityToUpdate.id,
          },
        });

        return ctx.db.video.update({
          where: {
            id: videoId,
          },
          data: {
            likesCount: {
              decrement: 1,
            },
          },
        });
      }

      // create new entry in likes table
      await ctx.db.like.create({
        data: {
          machineId,
          videoId,
        },
      });

      return ctx.db.video.update({
        where: {
          id: videoId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      });
    }),
  updateViews: publicProcedure
    .input(
      z.object({
        machineId: z.string(),
        videoId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { machineId, videoId } = input;

      const viewEntityToUpdate = await ctx.db.view.findUnique({
        where: {
          machineId_videoId: {
            machineId,
            videoId,
          },
        },
      });

      if (viewEntityToUpdate?.id) {
        return viewEntityToUpdate;
      }

      // create new entry in views table
      await ctx.db.view.create({
        data: {
          machineId,
          videoId,
        },
      });

      return ctx.db.video.update({
        where: {
          id: videoId,
        },
        data: {
          viewsCount: {
            increment: 1,
          },
        },
      });
    }),
});
