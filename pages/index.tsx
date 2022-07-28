import Head from "next/head";
import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";

import Header from "../components/Header";

const Home: NextPage = () => {
  const intl = useIntl();

  const description = intl.formatMessage({
    id: "page.home.head.meta.description",
  });

  const headerContent = intl
    .formatMessage({
      id: "page.header.content",
    })
    .split(", ");

  return (
    <div>
      <Head>
        <title>André Passoni</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header headerContent={headerContent} />
    </div>
  );
};

export default Home;
