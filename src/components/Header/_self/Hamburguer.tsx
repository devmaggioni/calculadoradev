import styled from "styled-components";
import type { ThemeAvailableColors } from "../../../styles/theme";

type Props = {
  mobileBreakPoint: number;
  menuIsOpen: boolean;
  handleMenu: () => void;
  theme: ThemeAvailableColors;
};

export default function Hamburguer(props: Props) {
  return (
    <Container mobileBreakPoint={props.mobileBreakPoint}>
      <label className="hamburger">
        <input
          checked={props.menuIsOpen}
          type="checkbox"
          onClick={() => props.handleMenu()}
        />
        <svg viewBox="0 0 32 32">
          <path
            stroke={
              (!props.menuIsOpen === false && props.theme.hamburguer.close) ||
              props.theme.hamburguer.open
            }
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          ></path>
          <path
            stroke={
              (!props.menuIsOpen === false && props.theme.hamburguer.close) ||
              props.theme.hamburguer.open
            }
            className="line"
            d="M7 16 27 16"
          ></path>
        </svg>
      </label>
    </Container>
  );
}

/*
************
styles
************
*/

/* From Uiverse.io by JulanDeAlb */
const Container = styled.div<{
  mobileBreakPoint: number;
}>`
  @media screen and (max-width: ${(props) => props.mobileBreakPoint}px) {
    display: block;
  }
  display: none;
  background-color: transparent;

  .hamburger {
    cursor: pointer;
    display: inline-block;
  }
  .hamburger input {
    display: none;
  }

  .hamburger svg {
    /* The size of the SVG defines the overall size */
    height: 60px;
    /* Define the transition for transforming the SVG */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    /* Define the transition for transforming the Stroke */
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg);
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;
