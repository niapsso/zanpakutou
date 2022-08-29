import Head from "next/head";
import type { NextPage } from "next";

import { useEffect } from "react";

import useFormattedMessage from "@/hooks/useFormattedMessage";
import Header from "@/components/Header";
import TechsList from "@/components/TechsList";
import { useTechs } from "providers/Techs";

const Home: NextPage = () => {
  const { getTechs, techs } = useTechs();

  const description = useFormattedMessage("page.home.head.meta.description");

  useEffect(() => {
    getTechs();
  }, [getTechs]);

  return (
    <div>
      <Head>
        <title>Zanpakutou</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <TechsList techs={techs} />
        <h1>Ola er u ninha &apos;</h1>
        <TechsList techs={techs} reverse />
      </main>
    </div>
  );
};

export default Home;
