import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import Navbar from "~/components/ui/navbar";

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
    <Navbar />
    <main className="flex flex-col items-center">
      <h1 className="text-3xl pt-4">Reddit</h1>
      <p>
        Tutorial for <code>create-t3-app</code>
      </p>
      <div className="pt-10">
        <div>
          {session ? (
            <>
              <p className="mb-4 text-center">hi {session.user?.name}</p>
              <button
                type="button"
                className="mx-auto block rounded-md bg-neutral-800 py-3 px-6 text-center hover:bg-neutral-700"
                onClick={() => {
                  signOut().catch(console.log);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="mx-auto block rounded-md bg-neutral-800 py-3 px-6 text-center hover:bg-neutral-700"
              onClick={() => {
                signIn("discord").catch(console.log);
              }}
            >
              Login with Discord
            </button>
          )}
        </div>
        <div className="pt-10">
        <Posts />
      </div>
      </div>
    </main>
    </>
  );
};
export default Home;