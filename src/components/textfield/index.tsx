import React, { FC, useEffect, useState } from "react";
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
    textInputChanged(e?.target?.value);
  };
  const [inputValue] = useState(value);
  useEffect(() => {
    if (value) {
      document.getElementById("inputFieldValue").value = JSON.parse(
        JSON.stringify(value)
      );
    }
  }, []);

  return (
    <InputField
      name="fakeusernameremembered"
      id="inputFieldValue"
      type={type}
      onChange={onchangeMethod}
      placeholder={placeholder}
      textColor={textColor}
    ></InputField>
  );
};
export default Textfield;
