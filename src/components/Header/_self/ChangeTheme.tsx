import styled from "styled-components";

type Props = {
  mobileBreakPoint: number;
  currentTheme: string;
  toggleTheme: () => void;
};
export default function ChangeTheme(props: Props) {
  return (
    <Container mobileBreakPoint={props.mobileBreakPoint}>
      <input
        checked={props.currentTheme === "light" ? true : false}
        onClick={() => props.toggleTheme()}
        type="checkbox"
      />
      <span className="slider"></span>
    </Container>
  );
}

/*
************
styles
************
*/

const Container = styled.div<{
  mobileBreakPoint: number;
}>`
  position: relative;
  font-size: 17px;
  display: inline-block;
  width: 3.5em;
  height: 2em;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 2; /* acima do slider */
  }

  /* The slider */
  .slider {
    --background: #8252eb;
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
    box-shadow: inset 8px -4px 0px 0px #ffdfa2;
    background: var(--background);
    transition: 0.5s;
  }

  input:checked + .slider {
    background-color: #3a03ff;
  }

  input:checked + .slider:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px #fff000;
  }
`;
