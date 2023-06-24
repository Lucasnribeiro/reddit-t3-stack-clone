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

  get: publicProcedure
    .input(
      z.object({
        title: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.subreddit.findFirst({
          select: {
              id: true,
              createdAt: true,
              title: true,
              user: true,
              admins: true,
              moderators: true,
              members: true,
              /* this can be optimized by not returning all members: 
                members: {
                  select: {
                    id: true,
                  },
                  where: { id: currentUserID },
                  take: 1,
                },
              */
              
          },
          where: {
            title: input.title ? input.title : undefined,
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
            subredditHandle: input.title,
            ownerId: ctx.session.user.id,
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
        userId: z.string().optional(),
      })
    )
    .query(async({ ctx, input }) => {
      const { limit, skip, userId, cursor } = input;
      const items = await ctx.prisma.subreddit.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'asc',
        },
        where: {
          ownerId: userId ? userId : undefined,
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

    joinSubreddit: protectedProcedure
    .input(
      z.object({
        subredditId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.prisma.userSubreddit.create({
          data: {
            userId: ctx.session.user.id,
            subredditId: input.subredditId,
          },
        });
    }),

    leaveSubreddit: protectedProcedure
    .input(
      z.object({
        subredditId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.prisma.userSubreddit.delete({
          where: {
              userId_subredditId: {
                userId: ctx.session.user.id,
                subredditId: input.subredditId
              }
          }
        });
    }),

});