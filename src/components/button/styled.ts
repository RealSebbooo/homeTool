import styled from "styled-components";
import theme from "./../theme";

export const ButtonComp = styled.input`
  border-radius: 4px;
  border: none;
  color: white;
  padding: ${({ dense }) => (dense ? "8px 16px" : "8px 16px")};
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
    color: ${theme.primary};    `
      : !text && !disabled
      ? `background-color: ${theme.primary};`
      : `background-color: ${theme.disabled};`}

  ${({ disabled }) => (disabled ? `cursor: auto` : `cursor: pointer`)};
  ${({ text }) => text && `padding-left: 0px`};
`;
