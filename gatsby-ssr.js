import React from "react";
import { isLoggedIn, showFooter } from "./src/services/auth";
import Container from "./src/components/container";
import FooterNav from "./src/components/footer";
import "./src/styles/index.css";

export const onRenderBody = () => {
  isLoggedIn();
};

export const wrapPageElement = ({ element, props }) => {
  return (
    <Container {...props}>
      <div>{element}</div>

      {!showFooter() && <FooterNav></FooterNav>}
    </Container>
  );
};
