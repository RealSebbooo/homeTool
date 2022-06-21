import React, { FC } from "react";
import { IconTagProps } from "../index";
import { SVG } from "../styled";

export const ArrowRightIcon: FC<IconTagProps> = ({ fill }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="256"
    height="256"
    viewBox="0 0 256 256"
  >
    <desc>Created with Fabric.js 1.7.22</desc>
    <defs></defs>
    <g transform="translate(128 128) scale(0.72 0.72)">
      <g
        fill={fill}
        transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)"
      >
        <polygon
          fill={fill}
          points="90,45 55.07,4.97 40.76,17.45 64.8,45 40.76,72.55 55.07,85.03 "
          transform="  matrix(1 0 0 1 0 0) "
        />
        <polygon
          fill={fill}
          points="49.24,45 14.31,4.97 0,17.45 24.04,45 0,72.55 14.31,85.03 "
          transform="  matrix(1 0 0 1 0 0) "
        />
      </g>
    </g>
  </SVG>
);
