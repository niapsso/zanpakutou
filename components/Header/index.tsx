import Link from "next/link";
import { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

import useFormattedMessage from "../../hooks/useFormattedMessage";
import styles from "../../styles/Header.module.scss";
import ThemeButton from "../ThemeButton";
import LangSelector from "../LangSelector";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth / 16 <= 48);
    };

    handleResize();

    if (!isMobile) {
      setMobileMenu(false);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const [home, projects, contact] = useFormattedMessage(
    "page.header.content"
  ).split(", ");

  return (
    <header className={styles.header}>
      <h1>André Passoni</h1>
      <nav>
        <ul
          className={
            mobileMenu
              ? `${styles.listContainer} ${styles.active}`
              : styles.listContainer
          }
        >
          <li>
            <Link href="/">{home}</Link>
          </li>
          <li>
            <Link href="/projects">{projects}</Link>
          </li>
          <li>
            <Link href="/contact">{contact}</Link>
          </li>
          <li>
            <LangSelector />
          </li>
          <li>
            <ThemeButton />
          </li>
        </ul>
        {isMobile && (
          <Hamburger
            label="Show menu"
            rounded
            color="#f8f9fa"
            toggled={mobileMenu}
            toggle={setMobileMenu}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
