import styled from "styled-components";
import { IconTagProps } from "./index";

export const SVG = styled.svg`
  width: 100%;
  height: auto;
`;

export const Iconsizer = styled.div<IconTagProps>`
  margin-right: ${({ clickable }) => (clickable ? "none" : "auto")};
  margin-left: ${({ clickable, right }) =>
    clickable && !right ? "none" : "auto"};
  width: ${({ size }) => size};
  min-width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-height: ${({ size }) => size};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "")};
`;
