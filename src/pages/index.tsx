import { useSession } from "next-auth/react";
import Head from "next/head";
import CreatePostCreateCommunityCard from "~/components/CreatePostCreateCommunityCard";
import PopularPosts from "~/components/PopularPosts";

const Home = () => {
  const { data: session, status } = useSession();

  return (
    <>
    <Head>
      <title>Reddit T3 Clone</title>
    </Head>
    <div className="flex flex-col pt-7 pb-7 bg-gray-200 mx-auto min-h-screen max-w-6xl lg:max-w-7xl xl:max-w-8xl">
      <div className="flex gap-8">
        <div className="w-full">
          <PopularPosts />
        </div>

        <div className="hidden w-1/2 md:block">
          <CreatePostCreateCommunityCard/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;