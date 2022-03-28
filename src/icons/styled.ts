import styled from "styled-components";
import { IconTagProps } from "./index";

export const SVG = styled.svg`
  width: 100%;
  height: auto;
`;

export const Iconsizer = styled.div<IconTagProps>`
  margin-left: auto;
  margin-right: auto;
  width: ${({ size }) => size};
  min-width: ${({ size }) => size};
  height: ${({ size }) => size};
  min-height: ${({ size }) => size};
`;
