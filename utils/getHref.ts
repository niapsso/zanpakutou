const getHref = (value: string) =>
  ((value) => (value === "home" ? "/" : value))(
    value.split("-")[0].toLowerCase().trim()
  );

export default getHref;
