import React, { FC } from "react";
import styled from "styled-components";
import theme from "./../theme";

const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 8px 0;
`;

type TitleProps = { titleText: string };

const Title: FC<TitleProps> = ({ titleText }) => {
  return (
    <>
      <h1>{titleText}</h1>

      <HorizontalLine></HorizontalLine>
    </>
  );
};

export default Title;
