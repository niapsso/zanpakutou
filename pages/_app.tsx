import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";

import "../styles/globals.css";
import en from "../lang/en.json";
import pt_BR from "../lang/pt-BR.json";

const messages: { [key: string]: any } = {
  en,
  "pt-BR": pt_BR,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  const getLocale = () => {
    if (!locale) return "en";

    return locale;
  };

  return (
    <IntlProvider locale={getLocale()} messages={messages[getLocale()]}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}

export default MyApp;
