import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
    all: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.prisma.post.findMany({
                select: {
                    id: true,
                    createdAt: true,
                    title: true,
                    content: true,
                    user: true,
                    comments: true,
                    upvotes: true,
                    downvotes: true
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        } catch (error) {
            console.log("error", error);
        }
    }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            user: ctx.prisma.user
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});