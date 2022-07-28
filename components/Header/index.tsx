interface HeaderProps {
  headerContent: string[];
}

const Header = ({ headerContent }: HeaderProps) => {
  return (
    <header className="flex content-between">
      <h1>André Passoni</h1>
      <nav>
        <ul>
          {headerContent.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
