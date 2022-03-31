import styled, { keyframes } from "styled-components";
import theme from "./../theme";

export const AutocompleteTextfield = styled.input`
  color: ${theme.white};
  justify-content: space-around;
  display: flex;
  position: fixed;
  height: 50px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 64px;
  align-items: center;
  max-width: 782px;
  margin-right: auto;
  margin-left: auto;
  padding: 0px 8px;

  border: 1px solid ${theme.white};
  border-bottom: none;
  background-color: ${theme.background};
  z-index: 100;
  ::placeholder {
    color: #ccc;
    opacity: 1; /* Firefox */
  }
`;

const inputAnimation = keyframes`
    0% {
  margin-bottom: -200px;
    }
    100% {
  margin-bottom: 116px;
     }
`;
export const AutocompleteBox = styled.div`
  color: ${theme.white};
  display: none;
  background-color: ${theme.surface};
  position: fixed;
  max-height: 200px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 116px;
  max-width: 766px;
  margin-right: auto;
  margin-left: auto;
  padding: 16px 16px 50px 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 16px 16px 0px 0px;

  animation-name: ${inputAnimation};
  animation-duration: 0.7s;
`;
