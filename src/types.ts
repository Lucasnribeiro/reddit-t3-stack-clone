import React, {ReactNode} from 'react'
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

export interface SelectSubredditProps {
  setSubreddit: (subreddit: string) => string | void,
  optionValue: string,
}

export interface LayoutProps {
  children?: ReactNode
}

export interface ModalButtonProps {
  modalTitle: string;
  className: string;
  children: ReactNode;
  actionText: string;
  buttonText: string;
  // I really don't know how to type this
  onSubmit: (data: any) => any;
}

export interface PopularPostsProps {
  subredditId?: string | undefined
}

export interface PopularPostsFilterProps {
  onFilterChange: (filter: string) => void;
}

export interface ScrollTriggerComponentProps {
  callFunction: () => any,
  isFetchingNextPage:  boolean,
  hasNextPage: boolean | undefined
}

export interface SearchResult {
  id: string;
  title: string;
}
