import React, { FC } from "react";
import styled from "styled-components";
import theme from "./../theme";
import Text from "./../text";

const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 8px 0;
`;

type TitleProps = { titleText: string };

const Title: FC<TitleProps> = ({ titleText }) => {
  return (
    <>
      <Text bold={true} light={true} fontSize="34" content={titleText}></Text>

      <HorizontalLine></HorizontalLine>
    </>
  );
};

export default Title;
