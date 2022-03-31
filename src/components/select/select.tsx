import React, { FC, useEffect, useState } from "react";
import { SelectField } from "./select.styled";
import Text from "./../text";

type OptionProp = { label: string; additionalInfos?: string };
type SelectProps = {
  label: string;
  options: OptionProp[];
  showAdditionalInfos: boolean;
  onChange: (value: string) => void;
  value: string;
  hasIcon?: boolean;
};

const Select: FC<SelectProps> = ({
  label = "Select",
  options = [],
  showAdditionalInfos = false,
  onChange,
  value,
  hasIcon = false,
}) => {
  const getAdditionalInfos = (e: any) => {
    const value = document.getElementById(`selectId${label}`).selectedIndex;
    setSelectedOption(options[value - 1]);
    returnInfos(options[value - 1]?.label);
  };

  const returnInfos = (value: string) => {
    onChange(value);
  };

  useEffect(() => {
    if (!value) {
      document.getElementById("selectId" + label).selectedIndex = 0;
    } else {
      for (let i = 0; i < options.length; i++) {
        if (options[i].label === value) {
          setSelectedOption(options[i]);
          document.getElementById("selectId" + label).selectedIndex = i + 1;
        }
      }
    }
  }, [value]);

  const [selectedOption, setSelectedOption] = useState<OptionProp>();

  return (
    <>
      <SelectField id={"selectId" + label} onChange={getAdditionalInfos}>
        <option disabled hidden>
          {label}
        </option>
        {options?.map((element, key) => (
          <option value={key.toString()} key={key}>{element.label}</option>
        ))}
      </SelectField>
      {showAdditionalInfos && (
        <Text
          bold={false}
          light={true}
          fontSize="14"
          content={selectedOption?.additionalInfos}
        ></Text>
      )}
    </>
  );
};
export default Select;
