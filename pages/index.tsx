import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>André Passoni</title>
        <meta name="description" content="General infos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Hello world, from next!</h1>
      </header>
    </div>
  );
};

export default Home;
