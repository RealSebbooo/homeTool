import styled from "styled-components";
import { TextFieldProps } from "./index";
import theme from "./../theme";

export const InputField = styled.input<TextFieldProps>`
  color: ${theme.white};
  width: ${({ short }) => (short ? "30%" : "100%")};
  padding: ${({ dense }) => (dense ? "6px 20px" : "12px 20px")};
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
