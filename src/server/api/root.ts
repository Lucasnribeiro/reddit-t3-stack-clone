import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";
import { subredditRouter } from "./routers/subreddit";
import { userRouter } from "./routers/user";
import { postImageRouter } from "./routers/postImage";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  subreddit: subredditRouter,
  user: userRouter,
  postImage: postImageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
