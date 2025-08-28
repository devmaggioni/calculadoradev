import { type ReactNode, useState } from "react";
import type { ThemeAvailableColors } from "../../../styles/theme";
import styled, { keyframes, css } from "styled-components";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

type Props = {
  mobileBreakPoint: number;
  menuIsOpen: boolean;
  hasMounted: boolean;
  handleAsideMenu: () => void;
  asideIsOpen: boolean | null;
  theme: ThemeAvailableColors;
  items: {
    text: string;
    url: string;
  }[];
};
export default function Nav(props: Props) {
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  return (
    <Container theme={props.theme}>
      <PrincipalMenu
        hasMounted={props.hasMounted}
        mobileBreakPoint={props.mobileBreakPoint}
        menuIsOpen={props.menuIsOpen}
        asideIsOpen={props.asideIsOpen}
      >
        {props.items.map((item, index) => (
          <li
            key={index}
            className={(index === currentItem && "current-item") || ""}
            onClick={() => setCurrentItem(index)}
          >
            <IoMdArrowDroprightCircle className="icon" />
            {item.text}
          </li>
        ))}
      </PrincipalMenu>
      {props.items.length > 6 && (
        <AsideMenu
          menuIsOpen={props.menuIsOpen}
          asideIsOpen={props.asideIsOpen}
          mobileBreakPoint={props.mobileBreakPoint}
        >
          {(props.asideIsOpen && (
            <IoMdArrowDropleftCircle
              onClick={() => props.handleAsideMenu()}
              className="icon-minimize"
            />
          )) || (
            <IoMdArrowDroprightCircle
              onClick={() => props.handleAsideMenu()}
              className="icon-minimize"
            />
          )}
          {props.items.slice(5).map((item, index) => (
            <li
              key={index + 6}
              className={(index + 6 === currentItem && "current-item") || ""}
              onClick={() => setCurrentItem(index + 6)}
            >
              <IoMdArrowDroprightCircle className="icon" />
              {item.text}
            </li>
          ))}
        </AsideMenu>
      )}
    </Container>
  );
}

/*
************
styles
************
*/

const Container = styled.nav<{
  theme: ThemeAvailableColors;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  li {
    color: ${(props) => props.theme.header.text} !important;
  }
`;

const AsideMenu = styled.ul<{
  mobileBreakPoint: number;
  asideIsOpen: boolean | null;
  menuIsOpen: boolean;
  theme: ThemeAvailableColors;
}>`
  @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
    display: none;
  }
  display: flex;
  position: absolute;
  z-index: 5;
  top: 100px;
  left: 0;
  padding: 50px;
  width: 250px;
  height: 100vh;
  background-color: ${(props) => props.theme.header.bg};
  flex-direction: column;
  box-shadow: 3px 5px 5px 0 rgba(0, 0, 0, 0.3);
  ${(props) =>
    (props.asideIsOpen !== null &&
      css`
        animation: ${!props.asideIsOpen ? hideAsideMenu : showAsideMenu} 0.6s
          ease forwards;
      `) ||
    css`
      animation: ${hideAsideMenu} -0.1s forwards;
    `}

  .icon-minimize {
    font-size: 36px;
    position: absolute;
    right: -5px;
    top: 30px;
    cursor: pointer;
    color: ${(props) => props.theme.header.text};
  }
  li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover {
      color: ${(props) => props.theme.header.textOnHover} !important;
    }
    &.current-item {
      color: ${(props) => props.theme.header.textOnActive} !important;
    }
    &::after {
      display: block;
      content: " ";
      width: 0;
      height: 5px;
      background-color: ${(props) => props.theme.header.textOnHover};
      transition: width 0.3s ease;
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 30px;
    }
    &:hover::after {
      @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
        width: 20%;
      }
      width: 30%;
    }
    &.current-item::after {
      @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
        width: 20%;
      }
      width: 30%;
      background-color: ${(props) => props.theme.header.textOnActive};
    }
  }
  .icon {
    font-size: 28px;
    margin-right: 5px;
  }
`;

const PrincipalMenu = styled.ul<{
  mobileBreakPoint: number;
  menuIsOpen: boolean;
  hasMounted: boolean;
  asideIsOpen: boolean | null;
  theme: ThemeAvailableColors;
}>`
  @media screen and (max-width: 1500px) {
    max-width: 800px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 600px;
  }
  @media screen and (max-width: 1000px) {
    max-width: 500px;
  }
  @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
    display: ${(props) =>
      (!props.hasMounted && !props.menuIsOpen && "none") || "flex"};
    ${(props) =>
      css`
        animation: ${!props.menuIsOpen ? hideMenu : showMenu} 0.6s ease-in
          forwards;
      `}
    position: absolute;
    flex-direction: column;
    background-color: ${(props) => props.theme.header.bg};
    top: 100px;
    right: 0;
    width: 70%;
    padding: 60px 40px;
    height: 100vh;
    li {
      position: relative;
      display: inline-block;
    }
  }

  display: flex;
  gap: 15px;
  max-width: 1100px;
  overflow-x: scroll;

  li {
    @media screen and (min-width: ${(props) => props.mobileBreakPoint}px) {
      &:nth-child(n + 6) {
        display: none;
      }
    }
    position: relative;
    padding: 10px 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      color: ${(props) => props.theme.header.textOnHover} !important;
    }
    &.current-item {
      color: ${(props) => props.theme.header.textOnActive} !important;
    }
    &::after {
      @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
        left: 15px;
        bottom: -5px;
      }
      position: absolute;
      left: 0;
      bottom: 0;
      display: block;
      content: " ";
      width: 0;
      height: 5px;
      background-color: ${(props) => props.theme.header.textOnHover};
      transition: width 0.3s ease;
      border-radius: 20px;
    }
    &:hover::after {
      @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
        width: 25%;
      }
      width: 100%;
    }
    &.current-item::after {
      @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
        width: 25%;
      }
      width: 100%;
      background-color: ${(props) => props.theme.header.textOnActive};
    }
  }
  .icon {
    font-size: 28px;
    margin-right: 5px;
  }
`;

const showMenu = keyframes`
  0% {
    filter: blur(1px);
    opacity: 0;
    transform: translateX(300px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const hideMenu = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    filter: blur(5px);
    opacity: 0;
    transform: translateX(500px);
  }
`;

const showAsideMenu = keyframes`
  0% {
    //filter: blur(5px);
    //opacity: 0;
    transform: translateX(-310px);
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.01);
     backdrop-filter: blur(4px);
     -webkit-backdrop-filter: blur(4px); /* suporte Safari */
     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* sombra suave */;
  }
  100% {
    //opacity: 1;
    transform: translateX(0);
  }
`;

const hideAsideMenu = keyframes`
  0% {
    //opacity: 1;
    transform: translateX(0);
  }
  100% {
    //filter: blur(5px);
    //opacity: 0;
    transform: translateX(-310px);
    height: 5px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.01);
     backdrop-filter: blur(4px);
     -webkit-backdrop-filter: blur(4px); /* suporte Safari */
     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* sombra suave */;
  }
`;
