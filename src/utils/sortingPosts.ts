import { Post } from "~/types";

export const sortPostsByBest = (posts: Post[]): Post[] => {
    const sortedPosts = [...posts];

    sortedPosts.sort((a, b) => {
      // Calculate a score for each post based on factors like upvotes, downvotes, comments, etc.
      const scoreA = calculateScoreByBest(a);
      const scoreB = calculateScoreByBest(b);
  
      // Sort in descending order based on the score
      return scoreB - scoreA;
    });
  
    return sortedPosts;
  };

 const calculateScoreByBest = (post: Post): number => {
    // Implement your own scoring algorithm based on factors like upvotes, downvotes, comments, etc.
    const upvotes: number = post.upvotes.length || 0;
    const downvotes: number = post.downvotes.length || 0;
    const comments: number = post.comments.length || 0;

    // You can assign different weights to each factor as per your requirements
    const score: number = upvotes + (comments * 0.5) - (downvotes * 0.2);

    return score;
};

export const sortPostsByHot = (posts: Post[]): Post[] => {
    const sortedPosts = [...posts];
  
    sortedPosts.sort((a, b) => {
      const scoreA = calculateHotScore(a);
      const scoreB = calculateHotScore(b);
  
      // Sort in descending order based on the "Hot" score
      return scoreB - scoreA;
    });
  
    return sortedPosts;
  };

 const calculateHotScore = (post: Post): number => {
    // Implement your own scoring algorithm for "Hot" sorting
    const upvotes: number = post.upvotes.length || 0;
    const downvotes: number = post.downvotes.length || 0;
    const comments: number = post.comments.length || 0;
    const createdAt = post.createdAt.getTime() / 1000;

    const now: number = Date.now() / 1000; // Current timestamp in seconds
  
    // Assign weights to factors and calculate the "Hot" score
    const score: number = (upvotes - downvotes) + (comments * 0.5) + (now - createdAt) / 45000;
  
    return score;
};

export const sortPostsByTop = (posts: Post[]): Post[] => {
    const sortedPosts = posts.sort((a, b) => {
      // Calculate a score for each post based on factors like upvotes, downvotes, comments, etc.
      const scoreA = calculateScoreByTop(a);
      const scoreB = calculateScoreByTop(b);
  
      // Sort in descending order based on the score
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      } else {
        // If scores are equal, sort by the creation date in descending order
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  
    return sortedPosts;
  };

const calculateScoreByTop = (post: Post): number => {
    const upvotes = post.upvotes.length || 0;
    const downvotes = post.downvotes.length || 0;
    const comments = post.comments.length || 0;

    // You can assign different weights to each factor as per your requirements
    const score = upvotes + (comments * 0.5) - (downvotes * 0.2);

    return score;
};

export const sortPostsByNew = (posts: Post[]): Post[] => {

    return posts
}

