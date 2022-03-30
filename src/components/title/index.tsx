import React, { FC } from "react";
import styled from "styled-components";
import theme from "./../theme";
import Text from "./../text";
import Icon from "../../icons";
import { TitleHeader } from "./styled";

const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 8px 0;
`;

type TitleProps = { titleText: string; backButton?: boolean; to?: string };

const Title: FC<TitleProps> = ({ titleText, backButton = false, to = "/" }) => {
  return (
    <>
      <TitleHeader>
        {backButton && (
          <Icon
            name="arrowLeft"
            light={true}
            backButton={true}
            size="50px"
            clickable={true}
            to={to}
          />
        )}
        <Text bold={true} light={true} fontSize="34" content={titleText}></Text>
      </TitleHeader>

      <HorizontalLine></HorizontalLine>
    </>
  );
};

export default Title;
