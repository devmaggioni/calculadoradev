import type { ThemeAvailableColors } from '../../styles/theme';

export interface NavItem {
  text: string;
  url: string;
}

export interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
  theme: ThemeAvailableColors;
  items: NavItem[];
}

export interface ChangeThemeProps {
  mobileBreakPoint: number;
  currentTheme: string;
  toggleTheme: () => void;
}

export interface HamburguerProps {
  mobileBreakPoint: number;
  menuIsOpen: boolean;
  handleMenu: () => void;
  theme: ThemeAvailableColors;
}

export interface NavProps {
  mobileBreakPoint: number;
  menuIsOpen: boolean;
  hasMounted: boolean;
  handleAsideMenu: () => void;
  asideIsOpen: boolean | null;
  theme: ThemeAvailableColors;
  items: NavItem[];
}
