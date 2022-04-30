import React from "react";
import { StyledInput, Label } from "./styled";

type CheckboxProps = {
  checked: boolean;
  label?: string;
  checkboxChanged?: () => void;
  disabled?: boolean;
};
const Checkbox = ({ checked, label, checkboxChanged, disabled = false }) => {
  return (
    <Label>
      {label}
      <StyledInput
        type="checkbox"
        label={label}
        value={checked}
        checked={checked}
        onChange={() => checkboxChanged()}
        disabled={disabled}
      />
    </Label>
  );
};

export default Checkbox;
