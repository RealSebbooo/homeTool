import styled from "styled-components";
import theme from "../theme";

export const ModalContainer = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: ${theme.surface};
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  max-width: 400px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
`;

export const ModalHeader = styled.div`
  padding: 2px 16px;
  color: black;
`;

export const ModalBody = styled.div`
  padding: 2px 16px;
`;
export const ModalFooter = styled.div`
  display: flex;
  padding: 2px 16px;
  color: black !important;
`;
