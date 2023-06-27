import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({ 

    get: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),

      })
    )
    .query(async ({ ctx, input }) => {
        return await ctx.prisma.user.findFirst({
            select: {
                id: true,
                comments: true,
                email: true,
                image: true,
                name: true,
            },
            where: {
                name: input.name ? input.name : undefined,
            }
        });
    }),

    all: publicProcedure
    .input(
      z.object({
        username: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const { username } = input
      const users = await ctx.prisma.user.findMany({
          select: {
              id: true,
              name: true,
              comments: true,
              upvotes: true,
              downvotes: true,
              subreddits: true,
              image: true,
              posts: true,
          },
          where:{
            name: {
              contains: username ? username : undefined,
              mode: 'insensitive'
            }
          },
      });
  
      return users
    }),


})