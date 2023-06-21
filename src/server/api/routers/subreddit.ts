import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const subredditRouter = createTRPCRouter({
    all: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.subreddit.findMany({
          select: {
              id: true,
              createdAt: true,
              title: true,
              user: true,
              admins: true,
              moderators: true,
              
          },
          orderBy: {
              createdAt: "desc",
          },
          take: 20,
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.prisma.subreddit.create({
          data: {
            title: input.title,
            ownerId: ctx.session.user.id,
          },
        });
    }),
});