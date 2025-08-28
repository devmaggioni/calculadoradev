import { Container, Nav, Hamburguer, ToggleTheme } from "./styles";
import { useState, useEffect } from "react";

const options = ["Menu", "Posts", "Sobre Mim", "Contato"];
const breakPointMobile = 650;

export default function Header(props: {
  currentTheme: string;
  toggleTheme: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState(false);

  function handleMenu() {
    if (!hasMounted) setHasMounted(true);
    setMenuIsOpen((prev) => !prev);
  }

  return (
    <Container mobileBreakPoint={breakPointMobile}>
      <div className="content-wrapper">
        <a href="/" className="logo-wrapper">
          <img src="/images/logo.png" alt="logo" />
        </a>
        <Nav
          hasMounted={hasMounted}
          isOpen={menuIsOpen}
          mobileBreakPoint={breakPointMobile}
        >
          <ul>
            {options.map((item, index) => {
              return (
                <li
                  key={index}
                  className={activeIndex === index ? "active" : ""}
                  onClick={() => setActiveIndex(index)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </Nav>
        <ToggleTheme mobileBreakPoint={breakPointMobile}>
          <input
            checked={props.currentTheme === "light" ? true : false}
            onClick={() => props.toggleTheme()}
            type="checkbox"
          />
          <span className="slider"></span>
        </ToggleTheme>
        <div className="user-wrapper"></div>
      </div>
    </Container>
  );
}
