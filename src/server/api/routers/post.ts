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
      });
    }),
  create: protectedProcedure
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
            userId: ctx.session.user.id,
            subredditId: input.subredditId
          },
        });
    }),
    getBatch: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        // cursor is a reference to the last item in the previous batch
        // it's used to fetch the next batch
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        subredditId: z.string().optional(),
      })
    )
    .query(async({ ctx, input }) => {
      const { limit, skip, subredditId, cursor } = input;
      const items = await ctx.prisma.post.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
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
        where: {
          subredditId: subredditId ? subredditId : undefined
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});