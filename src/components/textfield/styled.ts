import styled from "styled-components";
import { TextFieldProps } from "./index";
import theme from "./../theme";

export const InputField = styled.input<TextFieldProps>`
  color: ${theme.white};
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  background-color: transparent;
  border-radius: 4px;
  box-sizing: border-box;

  ::placeholder {
    color: #ccc;
    opacity: 1; /* Firefox */
  }
`;
