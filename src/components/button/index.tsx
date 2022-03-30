import React, { FC } from "react";
import { ButtonComp } from "./styled";
export type ButtonProps = {
  value?: string;
  onClick?: () => void;
  right?: boolean;
  text?: boolean;
  dense?: boolean;
  disabled?: string;
};
const Button: FC<ButtonProps> = ({
  value,
  onClick,
  right,
  text = false,
  dense = false,
  disabled = false,
}) => {
  const buttonClicked = () => {
    console.log("hier");
    onClick();
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
    ></ButtonComp>
  );
};
export default Button;
