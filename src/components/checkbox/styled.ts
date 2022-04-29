import styled from "styled-components";

export const StyledInput = styled.input`
  background-color: red;
`;

export const Label = styled.label`
  position: relative;
  display: inline-block;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin: 0.6em 1em;
`;
