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
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  align-content: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
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
      name: "Home",
      to: "/",
      icon: "home",
    },
    {
      name: "About",
      to: "/about",
      icon: "home",
    },
    {
      name: "Contact",
      to: "/contact",
      icon: "home",
    },
  ];
  const [value, setValue] = React.useState(0);
  return (
    <FooterNav>
      {navItems.map((element: NavItemType) => (
        <FooterButton
          onClick={() => handleClickOfButton(element.to)}
          value={element.name}
        >
          <Icon name={"close"} />
          <p>{element.name}</p>
        </FooterButton>
      ))}
    </FooterNav>
  );
};

export default Footer;
