import styled, { keyframes, css } from "styled-components";

const showMenu = keyframes`
  0% {
    filter: blur(5px);
    opacity: 0;
    display: block;
    transform: translateX(100px);
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
    display: block;
    transform: translateX(200px);
  }
`;

export const Container = styled.header<{ mobileBreakPoint: number }>`
  height: 100px;
  .content-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100px;
    background-color: #01aeffff;
    display: flex;
    align-items: center;
    padding: 20px 30px;
    gap: 20px;

    .logo-wrapper {
      cursor: pointer;
      img {
        width: 60px;
        height: 60px;
      }
    }

    .user-wrapper {
      @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
        display: none;
      }
      width: 200px;
      height: 40px;
      background-color: white;
    }
  }
`;

export const Nav = styled.nav<{
  hasMounted: boolean;
  mobileBreakPoint: number;
  isOpen: boolean;
}>`
  @media screen and (max-width: 820px) {
    display: ${(props) =>
      (!props.hasMounted && !props.isOpen && "none") || "block"};
    position: absolute;
    overflow: hidden;
    padding: 20px 40px 60px 40px;
    border-radius: 0 0 0 20px;
    box-shadow: -2px 2px 1px 1px rgba(0, 0, 0, 0.2);
    background-color: black;
    top: 120px;
    right: 0;
    ${(props) =>
      css`
        animation: ${!props.isOpen ? hideMenu : showMenu} 0.5s ease forwards;
      `}
  }
  @media screen and (max-width: 1600px) {
    max-width: 800px;
  }
  @media screen and (max-width: 1300px) {
    max-width: 500px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 350px;
  }
  position: relative;
  margin-left: auto;
  max-width: 1000px;
  overflow-x: scroll;
  ul {
    @media screen and (max-width: 820px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      li {
        &:hover::after,
        &.active::after {
          width: 100% !important;
        }
      }
    }
    position: relative;
    width: 100%;
    display: flex;
    gap: 5px;
    li {
      position: relative;
      font-size: 20px;
      cursor: pointer;
      padding: 10px 20px;
      white-space: nowrap;
      &::after {
        position: absolute;
        display: block;
        content: " ";
        width: 0;
        height: 5px;
        background-color: rgba(255, 255, 255, 0.5);
        bottom: 0;
        left: 0;
        transition: background-color, width 0.3s ease-in;
      }
      &:hover::after {
        width: 90%;
      }
      &.active::after {
        width: 90%;
        background-color: red;
      }
    }
  }
`;

export const Hamburguer = styled.button<{ mobileBreakPoint: number }>`
  @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
    margin-left: auto;
    display: block;
  }
  display: none;
`;

export const ToggleTheme = styled.label<{ mobileBreakPoint: number }>`
  /* From Uiverse.io by alexruix */
  @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
    display: none;
  }
  /* The switch - the box around the slider */
  display: block;
  margin-left: auto;
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    --background: #28096b;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow: inset 8px -4px 0px 0px #fff000;
    background: var(--background);
    transition: 0.5s;
  }

  input:checked + .slider {
    background-color: #522ba7;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px #fff000;
  }
`;
