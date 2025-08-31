import styled from 'styled-components';
import type { ThemeAvailableColors } from '../../styles/theme';

export const Form = styled.form<{ theme: ThemeAvailableColors }>`
  position: relative;
  width: clamp(100px, 80vw, 1000px);
  margin: 48px auto;
  padding: 32px;
  background-color: ${(props) => props.theme.form.bg};
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${(props) => props.theme.form.text};

  button.remove {
    all: unset;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    .icon {
      font-size: 30px;
    }
  }
  button.add {
    width: 200px;
    background-color: green;
  }

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-weight: 500;
    font-size: 14px;
    color: ${(props) => props.theme.form.text};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  option {
    background-color: ${(props) => props.theme.form.bg};
    color: ${(props) => props.theme.form.text};
  }

  input,
  select,
  textarea {
    padding: 12px 16px;
    border: 1.5px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;
    background-color: transparent;
    color: ${(props) => props.theme.form.text};
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color: #9ca3af;
    }

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &:hover {
      border-color: #9ca3af;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }

  button {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    background-color: #3b82f6;
    color: white;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease;
    margin-top: 8px;

    &:hover {
      background-color: #2563eb;
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
      transform: none;
    }
  }

  @media (max-width: 640px) {
    margin: 24px 16px;
    padding: 24px;
  }
`;
