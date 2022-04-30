import styled from "styled-components";
import theme from "../theme";

export const DropDownContainer = styled.div`
  width: 10.5em;
  margin-bottom: 12px;
  display: flex;
`;

export const DropDownHeader = styled.div`
  padding: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  color: ${theme.white};
  background: ${theme.surface};
  min-width: 200px;
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

export const ListItem = styled.li`
  border-bottom: 1px solid ${theme.surface};
  padding-left: 12px;
  list-style: none;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;
