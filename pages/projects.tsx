import type { NextPage } from "next";
import Head from "next/head";

import Header from "../components/Header";
import useFormattedMessage from "../hooks/useFormattedMessage";

const Projects: NextPage = () => {
  const title = useFormattedMessage("page.projects.head.title");

  const description = useFormattedMessage(
    "page.projects.head.meta.description"
  );

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  );
};

export default Projects;
