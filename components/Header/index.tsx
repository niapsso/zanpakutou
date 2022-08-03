import Link from "next/link";

import ThemeButton from "../ThemeButton";
import getHref from "../../utils/getHref";

interface HeaderProps {
  headerContent: string[];
}

const Header = ({ headerContent }: HeaderProps) => {
  return (
    <header>
      <h1>André Passoni</h1>
      <nav>
        <ul>
          {headerContent.map((value) => (
            <li key={value}>
              <Link href={getHref(value)}>{value}</Link>
            </li>
          ))}
        </ul>
        <ThemeButton />
      </nav>
    </header>
  );
};

export default Header;
