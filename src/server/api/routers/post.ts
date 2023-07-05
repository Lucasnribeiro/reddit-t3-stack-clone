import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { s3 } from "~/utils/s3";
import { PresignedPost } from "aws-sdk/clients/s3";
import { Image } from "~/types";

export const postRouter = createTRPCRouter({

  all: publicProcedure
  .input(
    z.object({
      postTitle: z.string().optional()
    })
  )
  .query(async ({ ctx, input }) => {
    const { postTitle } = input
    const posts = await ctx.prisma.post.findMany({
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
            images: true,
            _count:{
              select:{
                comments: true
              }
            },
        },
        where:{
          title: {
            contains: postTitle ? postTitle : undefined,
            mode: 'insensitive'
          }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return posts
  }),

  get: publicProcedure
  .input(
    z.object({
      postId: z.string().optional(),
      onlyRootComments: z.boolean().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const { postId, onlyRootComments } = input
    const post = await ctx.prisma.post.findFirst({
        select: {
            id: true,
            createdAt: true,
            title: true,
            content: true,
            user: true,
            comments: {
              include:{
                downvotes: true,
                user: true,
                parentComment: true,
                post: true,
                upvotes: true,
              }, 
              where: {
                parentId: onlyRootComments ? null : undefined,
              }
              
            },
            _count:{
              select:{
                comments: true
              }
            },
            upvotes: true,
            downvotes: true,
            subreddit: true,
            images: true
        },
        where:{
          id: postId ? postId : undefined
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return post
  }),
    
  create: protectedProcedure
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
      subredditId: z.string(),
      images: z.array(z.string()).max(4).optional()
    })
  )
  .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.user.id,
          subredditId: input.subredditId
        },
      });

      if(input.images){
        input.images.map( async (imageId) => {
          await ctx.prisma.postImage.update({
            where: {
              id: imageId
            },
            data: {
              postId: post.id
            }
          })
        })
      }
  }),

  uploadImage: protectedProcedure
  .input(
    z.object({
      image: z.string().url().optional(),
    })
  )
  .mutation( async ({ ctx, input }) => {
      const image = await ctx.prisma.postImage.create({
        data:{
          userId: ctx.session.user.id,
        }
      })
      
      const promise = new Promise<PresignedPost> ((resolve, reject) => {

         s3.createPresignedPost({
          Fields:{ 
            key: `images/${ctx.session.user.id}/${image.id}`
          }, 
          Conditions: [
            ["starts-with", "$Content-Type", "image/"],
          ], 
          Expires: 900,
          Bucket: 'react-clone-bucket',

        }, (error, signed) => {
          if (error) return reject(error);
          resolve(signed)
        })

      })

      return await promise.then((result) => {
        return {
          promise: result,
          image: image,
        }
      })
  }),

  getBatch: publicProcedure
  .input(
    z.object({
      limit: z.number(),
      // cursor is a reference to the last item in the previous batch
      // it's used to fetch the next batch
      cursor: z.string().nullish(),
      skip: z.number().optional(),
      subredditId: z.string().optional(),
      subredditTitle: z.string().optional()
    })
  )
  .query(async({ ctx, input }) => {
    const { limit, skip, subredditId, subredditTitle, cursor } = input;
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
        comments: {
          include:{
            downvotes: true,
            user: true,
            post: true,
            upvotes: true,
            _count: true
          }
        },
        _count:{
          select:{
            comments: true
          }
        },
        upvotes: true,
        downvotes: true,
        subreddit: true,
        images: true
      },
      where: {
        subredditId: subredditId ? subredditId : undefined,
        title: subredditTitle ? subredditTitle : undefined
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

  upvotePost: protectedProcedure
  .input(
    z.object({
      postId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.upvote.create({
        data: {
          postId: input.postId,
          userId: ctx.session.user.id
        },
      });
  }),

  unUpovotePost: protectedProcedure
  .input(
    z.object({
      postId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.upvote.delete({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: ctx.session.user.id
          }
        }
      });
  }),

  downvotePost: protectedProcedure
  .input(
    z.object({
      postId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.downvote.create({
        data: {
          postId: input.postId,
          userId: ctx.session.user.id
        },
      });
  }),

  unDownvotePost: protectedProcedure
  .input(
    z.object({
      postId: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
      await ctx.prisma.downvote.delete({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: ctx.session.user.id
          }
        }
      });
  }),



});