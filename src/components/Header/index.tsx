import { useState, useEffect } from "react";
import type { ThemeAvailableColors } from "../../styles/theme";

import { Container } from "./styles";
import ChangeTheme from "./_self/ChangeTheme";
import Hamburguer from "./_self/Hamburguer";
import Nav from "./_self/Nav";

type Props = {
  toggleTheme: () => void;
  currentTheme: string;
  theme: ThemeAvailableColors;
  items: {
    text: string;
    url: string;
  }[];
};

const mobileBP = 750;

export default function Header(props: Props) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [asideIsOpen, setAsideIsOpen] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  // isso resolve bug de menus ficarem animando sozinhos
  useEffect(() => {
    if (width > mobileBP) {
      setMenuIsOpen(false);
      setHasMounted(false);
    } else {
      setAsideIsOpen(null);
    }
  }, [width, mobileBP]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  ///

  function handleMenu() {
    if (!hasMounted) setHasMounted(true);
    setMenuIsOpen((prev) => !prev);
  }

  function handleAsideMenu() {
    if (!hasMounted) setHasMounted(true);
    if (asideIsOpen === null) {
      setAsideIsOpen(true);
    } else {
      setAsideIsOpen((prev) => !prev);
    }
  }

  return (
    <Container theme={props.theme}>
      <div className="add-margin" />
      <div className="wrapper">
        <Nav
          theme={props.theme}
          hasMounted={hasMounted}
          menuIsOpen={menuIsOpen}
          asideIsOpen={asideIsOpen}
          mobileBreakPoint={mobileBP}
          handleAsideMenu={handleAsideMenu}
          items={props.items}
        />
        <div className="align-left">
          <a href="">
            <img src="/images/logo.png" />
          </a>
        </div>
        <div className="align-right">
          <ChangeTheme
            toggleTheme={props.toggleTheme}
            currentTheme={props.currentTheme}
            mobileBreakPoint={mobileBP}
          />
          <Hamburguer
            theme={props.theme}
            handleMenu={handleMenu}
            menuIsOpen={menuIsOpen}
            mobileBreakPoint={mobileBP}
          />
        </div>
      </div>
    </Container>
  );
}
