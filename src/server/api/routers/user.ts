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




})