const getLanguageName = (locale: string, currentLocale: string) =>
  new Intl.DisplayNames([currentLocale], {
    type: "language",
  }).of(locale);

export default getLanguageName;
