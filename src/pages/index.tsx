import { useSession } from "next-auth/react";
import PopularPosts from "~/components/PopularPosts";
import CreatePostCreateCommunityCard from "~/components/CreatePostCreateCommunityCard";

const Home = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="flex gap-8">
        <div className="w-full">
          <PopularPosts />
        </div>

        <div className="hidden w-1/2 md:block">
          <CreatePostCreateCommunityCard/>
        </div>
      </div>
    </>
  );
};
export default Home;