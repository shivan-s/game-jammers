import Head from "next/head";
import { type PropsWithChildren } from "react";
import Footer from "./footer";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Game Jammers</title>
        <meta name="description" content="Where the games begin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex bg-stone-900 font-satoshi text-white">
        <div className="sticky flex min-h-screen w-fit overflow-y-auto bg-stone-800">
          <Navbar />
        </div>
        <div className="container mx-auto flex min-h-screen justify-around">
          {children}
        </div>
        <div className="sticky flex min-h-screen w-fit bg-stone-800">TODO</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
