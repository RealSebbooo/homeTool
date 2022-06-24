import { Theme } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../theme";
import { ButtonComp } from "./styled";
type ButtonProps = {
  value?: string;
  onClick: () => void;
  right?: boolean;
  text?: boolean;
  dense?: boolean;
  disabled?: boolean;
  strech?: boolean;
  color?: theme;
};
const Button: FC<ButtonProps> = ({
  value,
  onClick,
  right,
  text = false,
  dense = false,
  disabled = false,
  strech = false,
  color,
}) => {
  const buttonClicked = () => {
    if (!disabled) onClick();
  };
  return (
    <ButtonComp
      disabled={disabled}
      dense={dense}
      right={right}
      type="button"
      value={value}
      onClick={buttonClicked}
      text={text}
      strech={strech}
      color={color}
    ></ButtonComp>
  );
};
export default Button;
