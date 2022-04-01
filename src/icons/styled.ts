import styled from "styled-components";
import { IconTagProps } from "./index";

export const SVG = styled.svg`
  width: 100%;
  height: auto;
`;

export const Iconsizer = styled.div<IconTagProps>`
  margin-right: ${({ clickable }) => (clickable ? "none" : "auto")};
  margin-left: ${({ clickable, right, spaceRight }) =>
    !spaceRight && (clickable && !right ? "none" : "auto")};
  margin-right: ${({ spaceRight }) => spaceRight && "8px"};
  margin-left: ${({ spaceRight }) => spaceRight && "4px"};
  width: ${({ size }) => size};
  min-width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-height: ${({ size }) => size};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "")};
`;
