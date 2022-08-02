import Link from "next/link";

import ThemeButton from "../ThemeButton";
import getHref from "../../utils/getHref";

interface HeaderProps {
  headerContent: string[];
}

const Header = ({ headerContent }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-64 py-5">
      <h1 className="text-slate-900 dark:text-slate-300">André Passoni</h1>
      <nav className="flex items-center justify-center">
        <ul className="flex items-center justify-center gap-24">
          {headerContent.map((value) => (
            <li key={value} className="text-slate-900 dark:text-slate-300">
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
