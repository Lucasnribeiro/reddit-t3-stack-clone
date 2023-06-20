import { RouterOutputs } from "./utils/api";

type allPostsOutput = RouterOutputs["post"]["all"]

export type Post = allPostsOutput[number];