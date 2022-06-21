import styled from "styled-components";
import theme from "./../theme";

type ButtonProps = {
  value?: string;
  onClick: () => void;
  right?: boolean;
  text?: boolean;
  dense?: boolean;
  disabled?: boolean;
  strech?: boolean;
  color?: theme;
};

export const ButtonComp = styled.input<ButtonProps>`
  border-radius: 4px;
  border: none;
  color: white;
  padding: ${({ dense }) => (dense ? "4px 16px" : "8px 16px")};
  width: ${({ strech }) => strech && "100%"};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  ${({ text, disabled }) =>
    text && disabled
      ? `background-color: transparent;
    color: ${theme.disabled};
    `
      : text && !disabled
      ? `background-color: transparent;
    color: ${theme.primary};`
      : !text && !disabled
      ? `background-color: ${theme.primary};`
      : `background-color: ${theme.disabled};`};

  ${({ disabled }) => (disabled ? `cursor: auto` : `cursor: pointer`)};
  ${({ text }) => text && `padding-left: 0px`};
  ${({ right }) => right && "margin-left: auto"};

  background-color: ${({ color }) => color && color};
`;
