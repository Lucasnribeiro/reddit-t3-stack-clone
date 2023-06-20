import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "./server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>
type allPostsOutput = RouterOutputs["post"]["all"]

export type Post = allPostsOutput[];