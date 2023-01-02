import Head from "next/head";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Game Jammers</title>
        <meta name="description" content="Where the games begin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex min-h-screen bg-stone-900 text-white">
        <div className="flex basis-1/4 bg-stone-800">
          <Navbar />
        </div>
        <div className="flex basis-1/2">{children}</div>
        <div className="flex basis-1/4 bg-stone-800">TODO</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
