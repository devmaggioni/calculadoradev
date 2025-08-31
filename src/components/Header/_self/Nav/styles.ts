import styled, { css } from 'styled-components';
import type { ThemeAvailableColors } from '../../../../styles/theme';
import { showMenu, hideMenu, showAsideMenu, hideAsideMenu } from './animations';

/**
 * Container principal da navegação
 * Centraliza o conteúdo e aplica cor padrão aos itens de menu
 */
export const Container = styled.nav<{
  theme: ThemeAvailableColors;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;

  /* Cor padrão para todos os itens de lista */
  li {
    color: ${(props) => props.theme.header.text} !important;
  }
`;

/**
 * Menu principal responsivo
 * No desktop: exibe horizontalmente com scroll
 * No mobile: transforma em menu lateral com animações
 */
export const PrincipalMenu = styled.ul<{
  $mobileBreakPoint: number;
  $menuIsOpen: boolean;
  $hasMounted: boolean;
  $asideIsOpen: boolean | null;
  theme: ThemeAvailableColors;
}>`
  /* === RESPONSIVIDADE DESKTOP === */
  /* Ajusta largura máxima baseada no tamanho da tela */
  @media screen and (max-width: 1500px) {
    max-width: 800px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 600px;
  }
  @media screen and (max-width: 1000px) {
    max-width: 500px;
  }

  /* === COMPORTAMENTO MOBILE === */
  @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
    /* Controla exibição: oculta se não foi montado e está fechado */
    display: ${(props) =>
      (!props.$hasMounted && !props.$menuIsOpen && 'none') || 'flex'};

    /* Aplica animações de abertura/fechamento do menu */
    ${(props) => css`
      animation: ${!props.$menuIsOpen ? hideMenu : showMenu} 0.6s ease-in
        forwards;
    `}

    /* Transforma em menu lateral */
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

  /* === LAYOUT DESKTOP PADRÃO === */
  display: flex;
  gap: 15px;
  max-width: 1100px;
  overflow-x: scroll; /* Scroll horizontal quando necessário */

  /* === ESTILOS DOS ITENS DE MENU === */
  li {
    /* Oculta itens extras no desktop (após o 6º item) */
    @media screen and (min-width: ${(props) => props.$mobileBreakPoint}px) {
      &:nth-child(n + 6) {
        display: none;
      }
    }

    /* Layout básico do item */
    position: relative;
    padding: 10px 25px;
    cursor: pointer;
    display: flex;
    align-items: center;

    /* === ESTADOS INTERATIVOS === */
    &:hover {
      color: ${(props) => props.theme.header.textOnHover} !important;
    }

    &.current-item {
      color: ${(props) => props.theme.header.textOnActive} !important;
    }

    /* === INDICADOR VISUAL (linha embaixo) === */
    &::after {
      /* Posicionamento no mobile */
      @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
        left: 15px;
        bottom: -5px;
      }

      /* Configuração da linha indicadora */
      position: absolute;
      left: 0;
      bottom: 0;
      display: block;
      content: ' ';
      width: 0; /* Inicia invisível */
      height: 5px;
      background-color: ${(props) => props.theme.header.textOnHover};
      transition: width 0.3s ease;
      border-radius: 20px;
    }

    /* Expansão da linha no hover */
    &:hover::after {
      @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
        width: 25%; /* Menor no mobile */
      }
      width: 100%; /* Largura total no desktop */
    }

    /* Linha do item ativo */
    &.current-item::after {
      @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
        width: 25%;
      }
      width: 100%;
      background-color: ${(props) => props.theme.header.textOnActive};
    }
  }

  /* Ícone ao lado do texto */
  .icon {
    font-size: 28px;
    margin-right: 5px;
  }
`;

/**
 * Menu lateral para itens extras
 * Aparece apenas no desktop quando há mais de 6 itens
 * Inclui animações de deslizamento lateral
 */
export const AsideMenu = styled.ul<{
  $mobileBreakPoint: number;
  $asideIsOpen: boolean | null;
  $menuIsOpen: boolean;
  theme: ThemeAvailableColors;
}>`
  /* Oculta no mobile */
  @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
    display: none;
  }

  /* === LAYOUT BASE === */
  display: flex;
  position: absolute;
  z-index: 5; /* Sobrepõe outros elementos */
  top: 100px; /* Abaixo do header */
  left: 0;
  padding: 50px;
  width: 250px;
  height: 100vh;
  background-color: ${(props) => props.theme.header.bg};
  flex-direction: column;
  box-shadow: 3px 5px 5px 0 rgba(0, 0, 0, 0.3);

  /* === ANIMAÇÕES DE ABERTURA/FECHAMENTO === */
  ${(props) =>
    (props.$asideIsOpen !== null &&
      css`
        /* Anima baseado no estado (aberto/fechado) */
        animation: ${!props.$asideIsOpen ? hideAsideMenu : showAsideMenu} 0.6s
          ease forwards;
      `) ||
    css`
      /* Estado inicial fechado */
      animation: ${hideAsideMenu} -0.1s forwards;
    `}

  /* === ÍCONE DE MINIMIZAR/EXPANDIR === */
  .icon-minimize {
    font-size: 36px;
    position: absolute;
    right: -5px; /* Fica na borda do menu */
    top: 30px;
    cursor: pointer;
    color: ${(props) => props.theme.header.text};
  }

  /* === ITENS DO MENU LATERAL === */
  li {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: color 0.3s ease;

    /* Estados interativos */
    &:hover {
      color: ${(props) => props.theme.header.textOnHover} !important;
    }

    &.current-item {
      color: ${(props) => props.theme.header.textOnActive} !important;
    }

    /* === INDICADOR VISUAL === */
    &::after {
      display: block;
      content: ' ';
      width: 0;
      height: 5px;
      background-color: ${(props) => props.theme.header.textOnHover};
      transition: width 0.3s ease;
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 30px;
    }

    /* Expansão no hover */
    &:hover::after {
      @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
        width: 20%;
      }
      width: 30%; /* Menor que o menu principal */
    }

    /* Indicador do item ativo */
    &.current-item::after {
      @media screen and (max-width: ${(props) => props.$mobileBreakPoint}px) {
        width: 20%;
      }
      width: 30%;
      background-color: ${(props) => props.theme.header.textOnActive};
    }
  }

  /* Ícone dos itens */
  .icon {
    font-size: 28px;
    margin-right: 5px;
  }
`;
