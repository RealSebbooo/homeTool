import styled from "styled-components";
import theme from "./../theme";

export const SelectField = styled.select`
  width: 100%;
  background-color: transparent;
  color: ${theme.white};
  padding: 12px 20px;
  border: 1px solid #ccc;
  background-color: transparent;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 8px 0;

  option {
    color: ${theme.white};
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
