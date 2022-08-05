import Head from "next/head";
import type { NextPage } from "next";

import useFormattedMessage from "../hooks/useFormattedMessage";
import Header from "../components/Header";

const Home: NextPage = () => {
  const description = useFormattedMessage("page.home.head.meta.description");

  const [home, projects, contact] = useFormattedMessage(
    "page.header.content"
  ).split(", ");

  return (
    <div>
      <Head>
        <title>Zanpakutou</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header {...{ home, projects, contact }} />
    </div>
  );
};

export default Home;
