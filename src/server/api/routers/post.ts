import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
    all: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.post.findMany({
          select: {
              id: true,
              createdAt: true,
              title: true,
              content: true,
              user: true,
              comments: true,
              upvotes: true,
              downvotes: true,
              subreddit: true,
          },
          orderBy: {
              createdAt: "desc",
          },
          take: 20,
      });
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        subredditId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            user: ctx.prisma.user,
            subreddit: {
              connect: {
                id: input.subredditId
              }
            }
          },
        });
    }),
});