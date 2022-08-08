import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { BsGithub } from "react-icons/bs";

import useFormattedMessage from "../../hooks/useFormattedMessage";
import styles from "../../styles/Header.module.scss";
import ThemeButton from "../ThemeButton";
import LangSelector from "../LangSelector";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const router = useRouter();

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
      {isMobile && (
        <h1>{router.pathname === "/" ? "home" : router.pathname.slice(1)}</h1>
      )}
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
          <li className={styles.sourceCodeBtn}>
            <Link href="https://github.com/niapsso/zanpakutou">
              <a>
                <BsGithub />
                {useFormattedMessage("page.header.source-code-btn")}
              </a>
            </Link>
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
