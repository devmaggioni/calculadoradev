import { useState, useEffect } from 'react';
import type { HeaderProps } from './types.ts';
import { MOBILE_BREAKPOINT } from './constants.ts';
import { Container } from './styles.ts';
import ChangeTheme from './_self/ChangeTheme/index.tsx';
import Hamburguer from './_self/Hamburguer/index.tsx';
import Nav from './_self/Nav/index.tsx';
import { renderComponent } from '../../App.tsx';

export default function Header(props: HeaderProps) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [asideIsOpen, setAsideIsOpen] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const isMobile = windowWidth <= MOBILE_BREAKPOINT;

  // Resolve bug de menus ficarem animando sozinhos
  useEffect(() => {
    if (!isMobile) {
      setMenuIsOpen(false);
      setHasMounted(false);
    } else {
      setAsideIsOpen(null);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuToggle = () => {
    if (!hasMounted) setHasMounted(true);
    setMenuIsOpen((prev) => !prev);
  };

  const handleAsideMenuToggle = () => {
    if (!hasMounted) setHasMounted(true);

    if (asideIsOpen === null) {
      setAsideIsOpen(true);
    } else {
      setAsideIsOpen((prev) => !prev);
    }
  };

  function toHomeComponent() {
    renderComponent('home', props.toggleTheme, props.theme, localStorage);
  }

  return (
    <Container theme={props.theme}>
      <div className='add-margin' />
      <div className='wrapper'>
        <Nav
          theme={props.theme}
          hasMounted={hasMounted}
          menuIsOpen={menuIsOpen}
          asideIsOpen={asideIsOpen}
          mobileBreakPoint={MOBILE_BREAKPOINT}
          handleAsideMenu={handleAsideMenuToggle}
          items={props.items}
        />

        <div className='align-left'>
          <a onClick={toHomeComponent} href='/'>
            <img src='/images/ico.svg' alt='Logo' />
          </a>
        </div>

        <div className='align-right'>
          <ChangeTheme
            toggleTheme={props.toggleTheme}
            currentTheme={props.currentTheme}
            mobileBreakPoint={MOBILE_BREAKPOINT}
          />
          <Hamburguer
            theme={props.theme}
            handleMenu={handleMenuToggle}
            menuIsOpen={menuIsOpen}
            mobileBreakPoint={MOBILE_BREAKPOINT}
          />
        </div>
      </div>
    </Container>
  );
}
