import React, { FC, useEffect, useState } from "react";
import { InputField } from "./styled";

export type TextFieldProps = {
  textInputChanged?: (value: string) => void;
  placeholder?: string;
  type?: string;
  textColor?: string;
  value?: string;
  short?: boolean;
  dense?: boolean;
  disabled?: boolean;
};
const Textfield: FC<TextFieldProps> = ({
  textInputChanged,
  placeholder = "",
  type = "text",
  textColor = "white",
  value = "",
  short = false,
  dense = false,
  disabled = false,
}) => {
  const onchangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    textInputChanged(e?.target?.value);
  };
  const [inputValue] = useState(value);
  useEffect(() => {
    if (typeof window == "undefined") return;
    if (value) {
      document.getElementById("inputFieldValue").value = JSON.parse(
        JSON.stringify(value)
      );
    }
  }, [value]);

  return (
    <InputField
      name="fakeusernameremembered"
      id="inputFieldValue"
      type={type}
      dense={dense}
      onChange={onchangeMethod}
      placeholder={placeholder}
      textColor={textColor}
      short={short}
      disabled={disabled}
    ></InputField>
  );
};
export default Textfield;
