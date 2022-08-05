import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { useCallback } from "react";
import { ThemeProvider } from "next-themes";

import "../styles/globals.scss";
import en from "../lang/en.json";
import pt_BR from "../lang/pt-BR.json";

const messages: { [key: string]: any } = {
  en,
  "pt-BR": pt_BR,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  const getLocale = useCallback(() => {
    if (!locale) return "en";

    return locale;
  }, [locale]);

  return (
    <IntlProvider locale={getLocale()} messages={messages[getLocale()]}>
      <ThemeProvider defaultTheme="system" enableSystem attribute="data-theme">
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
}

export default MyApp;
