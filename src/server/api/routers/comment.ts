import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { comment } from "postcss";

export const commentRouter = createTRPCRouter({

  all: publicProcedure
  .input(
    z.object({
      postId: z.string().optional(),
      parentId: z.string().optional()
    })
  )
  .query(async ({ ctx, input }) => {
    const { postId, parentId } = input
    const comments = await ctx.prisma.comment.findMany({
        select: {
            id: true,
            createdAt: true,
            content: true,
            post: true,
            user: true,
            upvotes: true,
            downvotes: true,
        },
        where:{
            postId: postId ? postId : undefined,
            parentId: parentId ? parentId : undefined
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return comments
  }),

  get: publicProcedure
  .input(
    z.object({
      postId: z.string().optional(),
      commentId: z.string().optional(),
      parentId: z.string().optional()
    })
  )
  .query(async ({ ctx, input }) => {
    const { postId, commentId, parentId } = input
    const comment = await ctx.prisma.comment.findFirst({
        select: {
            id: true,
            createdAt: true,
            content: true,
            user: true,
            post: true,
            upvotes: true,
            downvotes: true,
        },
        where:{
          id: commentId ? commentId : undefined,
          postId: postId ? postId : undefined,
          parentId: parentId ? parentId : undefined
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return comment
  }),
    
  create: protectedProcedure
  .input(
    z.object({
      content: z.string(),
      postId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.create({
        data: {
          content: input.content,
          userId: ctx.session.user.id,
          postId: input.postId
        },
      });
  }),

  reply: protectedProcedure
  .input(
    z.object({
      content: z.string(),
      parentId: z.string(),
      postId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.comment.create({
        data: {
          content: input.content,
          userId: ctx.session.user.id,
          parentId: input.parentId,
          postId: input.postId
        },
      });
  }),

  getBatch: publicProcedure
  .input(
    z.object({
      limit: z.number(),
      // cursor is a reference to the last item in the previous batch
      // it's used to fetch the next batch
      cursor: z.string().nullish(),
      skip: z.number().optional(),
      postId: z.string().optional(),
    })
  )
  .query(async({ ctx, input }) => {
    const { limit, skip, postId, cursor } = input;
    const items = await ctx.prisma.comment.findMany({
      take: limit + 1,
      skip: skip,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        content: true,
        user: true,
        upvotes: true,
        downvotes: true,
      },
      where: {
        postId: postId ? postId : undefined,
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

  upvoteComment: protectedProcedure
  .input(
    z.object({
      commentId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.upvote.create({
        data: {
          commentId: input.commentId,
          userId: ctx.session.user.id
        },
      });
  }),

  unUpovoteComment: protectedProcedure
  .input(
    z.object({
      commentId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.upvote.delete({
        where: {
          userId_commentId: {
            commentId: input.commentId,
            userId: ctx.session.user.id
          }
        }
      });
  }),

  downvoteComment: protectedProcedure
  .input(
    z.object({
      commentId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.downvote.create({
        data: {
          commentId: input.commentId,
          userId: ctx.session.user.id
        },
      });
  }),

  unDownvoteComment: protectedProcedure
  .input(
    z.object({
      commentId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.downvote.delete({
        where: {
          userId_commentId: {
            commentId: input.commentId,
            userId: ctx.session.user.id
          }
        }
      });
  }),

});