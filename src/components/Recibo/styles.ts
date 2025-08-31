import styled from 'styled-components';
import type { ThemeAvailableColors } from '../../styles/theme';

export const Container = styled.div<{
  theme: ThemeAvailableColors;
}>`
  min-height: 200px;
  background: ${(props) => props.theme.body.bg};
  padding: 40px;
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 30px;
  }

  @media screen and (max-width: 750px) {
    padding: 15px;
    gap: 20px;
  }

  /* Container dos botões - posicionado à direita */
  .actions-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 280px;
    position: sticky;
    top: 40px;

    @media screen and (max-width: 1024px) {
      position: static;
      flex-direction: row;
      justify-content: center;
      min-width: unset;
      width: 100%;
      max-width: 600px;
    }

    @media screen and (max-width: 750px) {
      flex-direction: column;
      max-width: 100%;
    }
  }

  /* Botões modernizados */
  .action-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 18px 32px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow:
      0 4px 15px rgba(102, 126, 234, 0.3),
      0 1px 3px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    font-family:
      'Inter',
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow:
        0 8px 25px rgba(102, 126, 234, 0.4),
        0 3px 10px rgba(0, 0, 0, 0.15);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px);
      box-shadow:
        0 4px 15px rgba(102, 126, 234, 0.3),
        0 1px 5px rgba(0, 0, 0, 0.1);
    }

    /* Segundo botão com gradiente diferente */
    &.secondary {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      box-shadow:
        0 4px 15px rgba(17, 153, 142, 0.3),
        0 1px 3px rgba(0, 0, 0, 0.1);

      &:hover {
        box-shadow:
          0 8px 25px rgba(17, 153, 142, 0.4),
          0 3px 10px rgba(0, 0, 0, 0.15);
      }

      &:active {
        box-shadow:
          0 4px 15px rgba(17, 153, 142, 0.3),
          0 1px 5px rgba(0, 0, 0, 0.1);
      }
    }

    @media screen and (max-width: 1024px) {
      flex: 1;
      min-height: 55px;
      padding: 16px 24px;
      font-size: 15px;
    }

    @media screen and (max-width: 750px) {
      min-height: 50px;
      padding: 14px 20px;
      font-size: 14px;
    }
  }

  /* Container do recibo */
  .content-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    max-width: calc(100% - 320px);
    box-shadow: 1px 1px 10px ${(props) => props.theme.recibo.shadows} !important;

    @media screen and (max-width: 1024px) {
      max-width: 100%;
    }
  }

  .content {
    position: relative;
    background: ${(props) => props.theme.recibo.bg};
    min-height: 500px;
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.1),
      0 8px 25px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    font-family:
      'Inter',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      sans-serif;

    /* Cabeçalho */
    h2 {
      background: linear-gradient(
        135deg,
        ${(props) => props.theme.recibo.header} 0%,
        ${(props) => props.theme.recibo.empashis} 100%
      );
      color: ${(props) => props.theme.recibo.title};
      padding: 40px 20px;
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 2px;
      position: relative;
      margin: 0;
    }

    /* Container principal das informações */
    > div:not(.values) {
      margin: 30px 40px 1px;
      padding: 20px;
      background: ${(props) => props.theme.recibo.bg};
      border-left: 4px solid ${(props) => props.theme.recibo.empashis};
      box-shadow: 0 2px 8px ${(props) => props.theme.recibo.shadows};
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-bottom: 1px solid ${(props) => props.theme.recibo.text};
      border-radius: 0 8px 8px 0;

      strong {
        font-size: 16px;
        font-weight: 600;
        color: ${(props) => props.theme.recibo.text};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 5px;
      }

      p {
        font-size: 18px;
        color: ${(props) => props.theme.recibo.text};
        line-height: 1.5;
        margin: 0;
        font-weight: 400;
      }
    }

    /* Seção de valores */
    .values {
      margin: 20px 40px;
      padding: 25px;
      box-shadow: 0 4px 12px ${(props) => props.theme.recibo.shadows};
      border: 2px solid ${(props) => props.theme.recibo.text};

      background: ${(props) => props.theme.recibo.bg};

      > div {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 15px 0;
        border-bottom: 1px solid ${(props) => props.theme.recibo.bg};
        margin: 0;

        &:last-child {
          border-bottom: none;
        }

        strong {
          font-size: 16px;
          font-weight: 500;
          color: ${(props) => props.theme.recibo.text};
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;

          span {
            font-size: 14px;
            color: ${(props) => props.theme.recibo.text};
            font-weight: 400;
            margin-left: 10px;

            &::before {
              content: '•';
              margin-right: 8px;
              color: ${(props) => props.theme.recibo.text};
            }
          }
        }

        p {
          font-size: 18px;
          font-weight: 600;
          color: ${(props) => props.theme.recibo.text};
          margin: 0;
          text-align: right;
          min-width: 120px;
        }

        /* Linha do total */
        &.total {
          margin-top: 10px;
          padding-top: 20px;
          border-top: 2px solid ${(props) => props.theme.recibo.text};
          background: ${(props) => props.theme.recibo.bg};
          margin-left: -25px;
          margin-right: -25px;
          padding-left: 25px;
          padding-right: 25px;

          strong {
            font-size: 18px;
            font-weight: 700;
            color: ${(props) => props.theme.recibo.text};
          }

          p {
            font-size: 24px;
            font-weight: 800;
            color: ${(props) => props.theme.recibo.text};
            background-clip: text;
          }
        }
      }
    }

    /* Seção de mensalidade */
    > div:last-of-type {
      background: ${(props) => props.theme.recibo.bg};
      border-left: 4px solid ${(props) => props.theme.recibo.empashis};
      margin: 10px 20px 40px 20px;
      border-radius: 0 8px 8px 0;

      strong {
        color: ${(props) => props.theme.recibo.text};
      }

      p {
        color: ${(props) => props.theme.recibo.text};
        font-weight: 500;
      }
    }
  }

  /* Responsividade para tablets */
  @media (max-width: 1024px) {
    .content {
      max-width: 700px;
    }
  }

  /* Responsividade para mobile */
  @media (max-width: 768px) {
    .content {
      border-radius: 12px;

      h2 {
        font-size: 24px;
        padding: 30px 15px;
      }

      > div:not(.values) {
        margin: 20px 20px 15px;
        padding: 15px;
        border-radius: 0 6px 6px 0;
      }

      .values {
        margin: 15px 20px;
        padding: 20px;
        border-radius: 8px;

        > div {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;

          p {
            text-align: left;
            min-width: unset;
          }

          &.total {
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
            border-radius: 6px;
          }
        }
      }

      > div:last-of-type {
        border-radius: 0 6px 6px 0;
      }
    }
  }

  /* Estilos para impressão/PDF */
  @media print {
    background: white;
    padding: 0;

    .actions-container {
      display: none;
    }

    .content-wrapper {
      max-width: 100%;
    }

    .content {
      box-shadow: none;
      border-radius: 0;
      background: white !important;
      max-width: 100%;

      > div:not(.values) {
        box-shadow: none;
        background: white !important;
        border-radius: 0;
      }

      .values {
        box-shadow: none;
        border-radius: 0;

        .total {
          background: ${(props) => props.theme.recibo.bg} !important;
          border-radius: 0;
        }
      }

      > div:last-of-type {
        border-radius: 0;
      }
    }
  }
`;
