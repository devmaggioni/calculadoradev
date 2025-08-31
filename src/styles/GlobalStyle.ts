import { createGlobalStyle } from 'styled-components';
import type { ThemeAvailableColors } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: ThemeAvailableColors }>`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.scrollbar};
  border-radius: 10px;
}

  body {
    position: relative;
    width: 100%;
    min-height: 100dvh;
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => props.theme.body.bg};
    color: ${(props) => props.theme.body.text};
    //transition: color, background-color .4s ease-in;
  }

.back-button {
  /* Base styles */
  all: unset;
  text-align: center;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin:20px;
  
  /* Animations and transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

.back-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.back-button:hover {
  background: linear-gradient(135deg, #c0392b, #a93226);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

.back-button:hover::before {
  left: 100%;
}

.back-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
  transition: all 0.1s ease;
}

.back-button:focus {
  outline: none;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3), 0 0 0 3px rgba(231, 76, 60, 0.2);
}
  

  ul, li, ol {
    all:unset;
  }
`;
