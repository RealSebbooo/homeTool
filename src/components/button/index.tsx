import React, { FC } from "react";
import { ButtonComp } from "./styled";
type ButtonProps = {
  value?: string;
  onClick: () => void;
  right?: boolean;
  text?: boolean;
  dense?: boolean;
  disabled?: boolean;
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
    ></ButtonComp>
  );
};
export default Button;
