import React, { FC } from "react";
import { IconTagProps } from "../index";
import { SVG } from "../styled";

export const ArrowLeft: FC<IconTagProps> = ({ fill }) => (
  <SVG
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill={fill}
        d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
      />
    </g>
  </SVG>
);
