import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import Navbar from "~/components/ui/navbar";
import PopularPosts from "~/components/PopularPosts";
import CreatePostCreateCommunityCard from "~/components/ui/CreatePostCreateCommunityCard";

const Posts = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <div>Fetching posts...</div>;

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post, index) => {
        return (
          <div key={index}>
            <p>{post.title}</p>
            <span>{post.content}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <>
      <div className="flex gap-6">
        <div className="w-full">
          <PopularPosts />
        </div>

        <div className="w-1/2">
          <CreatePostCreateCommunityCard/>
        </div>
      </div>
    </>
  );
};
export default Home;