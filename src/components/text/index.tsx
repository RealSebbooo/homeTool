import React, { FC } from "react";
import { Textfield } from "./styled";

export type TextProps = {
  bold?: boolean;
  fontSize?: string;
  content?: string;
  light?: boolean;
  heading?: boolean;
};

const Text: FC<TextProps> = ({
  bold = false,
  fontSize = "14",
  content,
  light,
  heading,
}) => {
  return (
    <Textfield bold={bold} fontSize={fontSize} light={light} heading={heading}>
      {content}
    </Textfield>
  );
};
export default Text;
