import styled from "styled-components";
import theme from "./../theme";
import { TextProps } from "./index";

export const Textfield = styled.span<TextProps>`
  font-size: ${({ fontSize }) => fontSize + "px"};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  margin-top: ${({ heading }) => (heading ? "16px" : "0px")};
  color: ${({ light }) => (light ? theme.white : theme.background)};
  color: ${({ spaceBetween }) =>
    spaceBetween
      ? "margin-left: 10px; margin-right: 10px"
      : "theme.background"};
`;
