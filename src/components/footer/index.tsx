import React, { FC } from "react";
import styled from "styled-components";
import theme from "./../theme";
import Icon from "./../../icons";

const FooterNav = styled.div`
  justify-content: space-around;
  display: flex;
  position: fixed;
  height: 50px;
  background-color: black;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
  align-items: center;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
`;
const FooterButton = styled.div`
  background-color: ${theme.primary};
  justify-content: space-around;
  border: none;
  color: white;
  padding: 15px 8px;
  text-align: center;
  align-content: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;
type TextProps = {
  width: number;
  numberOfItems: number;
};
const ButtonText = styled.p<TextProps>`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${({ width, numberOfItems }) =>
    (width / numberOfItems - 20).toString() + "px" || "100px"};
`;
type NavItemType = {
  name: string;
  to: string;
  icon: string;
};

const Footer: FC = () => {
  const handleClickOfButton = (to: string) => {
    console.log("click", to);
    location.href = to;
  };
  const navItems = [
    {
      name: "Einkaufsliste",
      to: "/",
      icon: "a",
    },
    {
      name: "Rezepte",
      to: "/rezepte",
      icon: "b",
    },
    {
      name: "Wochenplan",
      to: "/wochenplan",
      icon: "a",
    },
    {
      name: "Account",
      to: "/account",
      icon: "b",
    },
  ];
  const isBrowser = () => typeof window !== "undefined";
  const windowWidth = isBrowser() ? window.innerWidth : 0;
  return (
    <FooterNav>
      {navItems.map((element: NavItemType, key: number) => (
        <FooterButton onClick={() => handleClickOfButton(element.to)} key={key}>
          <div>
            <Icon name={element.icon} />
            <ButtonText width={windowWidth} numberOfItems={navItems.length}>
              {element.name}
            </ButtonText>
          </div>
        </FooterButton>
      ))}
    </FooterNav>
  );
};

export default Footer;
