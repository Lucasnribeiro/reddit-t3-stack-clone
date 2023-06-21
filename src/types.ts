import { z } from "zod";
import { RouterOutputs } from "./utils/api";

type allPostsOutput = RouterOutputs["post"]["all"]

export type Post = allPostsOutput[number];

export interface CreateCommunityFormValues {
    title: string;
  }

export const communityInput = z
  .string({
    required_error: "Give a name or handle for your community"
  })
  .min(1)
  .max(21)