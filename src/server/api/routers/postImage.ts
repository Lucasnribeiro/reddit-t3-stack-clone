import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postImageRouter = createTRPCRouter({ 

    get: publicProcedure
    .input(
      z.object({
        postId: z.string().optional(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
        return await ctx.prisma.postImage.findFirst({
            select: {
                id: true,
                userId: true,
                postId: true,
            },
            where: {
                userId: input.userId ? input.userId : undefined,
                postId: input.postId ? input.postId : undefined,
            }
        });
    }),

    all: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        postId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const images = await ctx.prisma.postImage.findMany({
          select: {
              id: true,
              post: true,
              user: true,

          },
          where:{
            userId: input.userId ? input.userId : undefined,
            postId: input.postId ? input.postId : undefined,
          },
      });
  
      return images
    }),

})