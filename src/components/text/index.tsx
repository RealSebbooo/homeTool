import React, { FC } from "react";
import { Textfield } from "./styled";

export type TextProps = {
  bold?: boolean;
  fontSize?: string;
  content?: string;
  light?: boolean;
  heading?: boolean;
  spaceBetween?: boolean;
  onClick?: () => void;
};

const Text: FC<TextProps> = ({
  bold = false,
  fontSize = "14",
  content,
  light,
  heading,
  spaceBetween,
  onClick,
}) => {
  return (
    <Textfield
      bold={bold}
      fontSize={fontSize}
      light={light}
      heading={heading}
      spaceBetween={spaceBetween}
      onClick={onClick ? () => onClick() : null}
    >
      {content}
    </Textfield>
  );
};
export default Text;
