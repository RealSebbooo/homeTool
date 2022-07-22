import styled from "styled-components";
import theme from "../theme";

export const DropDownContainer = styled.div`
  display: flex;
`;

export const DropDownHeader = styled.div`
  padding: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  color: ${theme.white};
  background: ${theme.surface};
  min-width: 200px;
  min-height: 20px;
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 200px;
`;

export const DropDownList = styled.ul`
  background: ${theme.black};
  border: 1px solid ${theme.surface};
  box-sizing: border-box;
  color: ${theme.white};
`;

export const ListItem = styled.li<{ backgroundColor: string }>`
  border-bottom: 1px solid ${theme.surface};
  padding-left: 12px;
  list-style: none;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background-color: ${({ backgroundColor }) =>
    backgroundColor && backgroundColor};
  color: ${({ backgroundColor }) =>
    !backgroundColor
      ? "white"
      : backgroundColor === "#100615"
      ? "white"
      : "black"};
`;
