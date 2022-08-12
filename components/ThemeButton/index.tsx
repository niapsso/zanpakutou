import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

import styles from "@/styles/ThemeButton.module.scss";

const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const changeTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button className={styles.themeButton} onClick={() => changeTheme()}>
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeButton;
