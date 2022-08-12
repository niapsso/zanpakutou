import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

import styles from "@/styles/LangSelector.module.scss";
import getLanguageName from "@/utils/getLanguageName";

const LangSelector = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(router.locale);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setSelected(value);

    router.push(router.asPath, undefined, { locale: value });
  };

  return (
    <select className={styles.select} onChange={handleSelect} value={selected}>
      {router.locales?.map((locale) => (
        <option key={locale} value={locale}>
          {getLanguageName(locale, selected as string)}
        </option>
      ))}
    </select>
  );
};

export default LangSelector;
