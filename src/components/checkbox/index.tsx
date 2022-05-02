import React, { FC } from "react";
import { StyledInput, Label } from "./styled";

type CheckboxProps = {
  checked: boolean;
  label?: string;
  checkboxChanged: () => void;
  disabled?: boolean;
};
const Checkbox: FC<CheckboxProps> = ({
  checked,
  label,
  checkboxChanged,
  disabled = false,
}) => {
  return (
    <Label>
      {label}
      <StyledInput
        type="checkbox"
        checked={checked}
        onClick={() => checkboxChanged()}
        disabled={disabled}
      />
    </Label>
  );
};

export default Checkbox;
