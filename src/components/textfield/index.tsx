import React, { FC } from "react";
import { InputField } from "./styled";

export type TextFieldProps = {
  textInputChanged?: (value: string) => void;
  placeholder?: string;
};
const Textfield: FC<TextFieldProps> = ({
  textInputChanged,
  placeholder = "",
}) => {
  const onchangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e);
    textInputChanged(e?.target?.value);
  };
  return (
    <InputField
      type="text"
      onChange={onchangeMethod}
      placeholder={placeholder}
    ></InputField>
  );
};
export default Textfield;
