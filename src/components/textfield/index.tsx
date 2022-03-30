import React, { FC } from "react";
import { InputField } from "./styled";

export type TextFieldProps = {
  textInputChanged?: (value: string) => void;
  placeholder?: string;
  type?: string;
  textColor?: string;
  value?: string;
};
const Textfield: FC<TextFieldProps> = ({
  textInputChanged,
  placeholder = "",
  type = "text",
  textColor = "white",
  value = "",
}) => {
  const onchangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e?.target?.value);
    textInputChanged(e?.target?.value);
  };
  return (
    <InputField
      type={type}
      value={value}
      onChange={onchangeMethod}
      placeholder={placeholder}
      textColor={textColor}
    ></InputField>
  );
};
export default Textfield;
