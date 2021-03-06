import React, { FC } from "react";
import { IconTagProps } from "../index";
import { SVG } from "../styled";

export const Save: FC<IconTagProps> = ({ fill }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 64 64"
  >
    <path
      fill="none"
      stroke={fill}
      stroke-miterlimit="10"
      d="M58,58H12L6,52V8A2,2,0,0,1,8,6H56a2,2,0,0,1,2,2Z"
    />
    <rect
      width="36"
      height="24"
      x="14"
      y="6"
      fill="none"
      stroke={fill}
      stroke-miterlimit="10"
    />
    <rect
      width="24"
      height="16"
      x="18"
      y="42"
      fill="none"
      stroke={fill}
      stroke-miterlimit="10"
    />
    <line
      x1="26"
      x2="26"
      y1="48"
      y2="58"
      fill="none"
      stroke={fill}
      stroke-miterlimit="10"
    />
  </SVG>
);
