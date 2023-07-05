import { PresignedPost } from "aws-sdk/clients/s3";
import { z } from "zod";
import { s3 } from "~/utils/s3";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const subredditRouter = createTRPCRouter({

  all: publicProcedure
  .input(
    z.object({
      subredditTitle: z.string().optional()
    })
  )
  .query(async ({ ctx, input }) => {
    const { subredditTitle } = input
    const subreddits = await ctx.prisma.subreddit.findMany({
        select: {
            id: true,
            createdAt: true,
            title: true,
            image: true,
            admins: true,
            moderators: true,
            members: true,
            subredditHandle: true,
            posts: true,
            user: true,
            ownerId: true,
            _count:{
              select:{
                posts: true,
                members:true
              }
            },
        },
        where:{
          title: {
            contains: subredditTitle ? subredditTitle : undefined,
            mode: 'insensitive'
          }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return subreddits
  }),

  uploadImage: protectedProcedure
  .input(
    z.object({
      image: z.string().url().optional(),
      subredditId: z.string(),
    })
  )
  .mutation( async ({ ctx, input }) => {
      const previousImage = await ctx.prisma.subreddit.findFirst({
        where:{
          id: input.subredditId
        },
        select:{
          image: true
        }
      })

      if(previousImage?.image){
        s3.deleteObject({ Bucket: 'react-clone-bucket', Key: `subreddit/${input.subredditId}/${previousImage.image}` }, (err, data) => {
            console.error(err);
        });
      }

      const subreddit = await ctx.prisma.subreddit.update({
        where:{
          id: input.subredditId
        },
        data:{
          image: crypto.randomUUID(),
        }
      })
      
      const promise = new Promise<PresignedPost> ((resolve, reject) => {
        if(subreddit?.image){
          s3.createPresignedPost({
            Fields:{ 
              key: `subreddit/${subreddit.id}/${subreddit.image}`
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
        }
      })

      return await promise.then((result) => {
        return {
          promise: result,
          image: subreddit.image,
        }
      })
  }),

  get: publicProcedure
    .input(
      z.object({
        title: z.string().optional(),
        subredditHandle: z.string().optional(),
        subredditId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.subreddit.findFirst({
          select: {
              id: true,
              createdAt: true,
              title: true,
              image: true,
              subredditHandle: true,
              user: true,
              ownerId: true,
              admins: true,
              posts: true,
              moderators: true,
              members: true,
              _count:{
                select:{
                  posts: true,
                  members:true
                }
              },
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
            id: input.subredditId ? input.subredditId : undefined,
            subredditHandle: input.subredditHandle ? input.subredditHandle : undefined,
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
        const subreddit = await ctx.prisma.subreddit.create({
          data: {
            title: input.title,
            subredditHandle: input.title,
            ownerId: ctx.session.user.id,
          },
        });

        await ctx.prisma.userSubreddit.create({
          data: {
            userId: ctx.session.user.id,
            subredditId: subreddit.id,
          },
        });
  }),

  update: protectedProcedure
  .input(
    z.object({
      subredditId: z.string(),
      title: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { subredditId, title } = input;

    // Fetch the subreddit from the database
    const subreddit = await ctx.prisma.subreddit.findUnique({
      where: { id: subredditId },
    });

    // Check if the subreddit exists
    if (!subreddit) {
      throw new Error("Subreddit not found");
    }

    // Compare the owner's ID with the authenticated user's ID
    if (subreddit.ownerId !== ctx.session.user.id) {
      throw new Error("Unauthorized: You are not the owner of this subreddit");
    }

    // Update the subreddit title
    const updatedSubreddit = await ctx.prisma.subreddit.update({
      where: { id: subredditId },
      data: { title },
    });

    // Return the updated subreddit
    return updatedSubreddit;
  }),

  getBatch: publicProcedure
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