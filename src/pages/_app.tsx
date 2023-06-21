import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import '~/styles/RichTextEditor.css'
import Layout from "~/components/Layout";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout {...{Component, pageProps}}>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
