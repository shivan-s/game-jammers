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
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#801818] to-[#151620]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
