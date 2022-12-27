import Head from "next/head";
import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Game Jammers</title>
        <meta name="description" content="Where the games begin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#801818] to-[#151620]">
        {children}
      </main>
    </>
  );
};

export default Layout;
