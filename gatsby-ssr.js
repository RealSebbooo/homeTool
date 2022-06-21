import React from "react";
import { isLoggedIn } from "./src/services/auth";
import Container from "./src/components/container";
import FooterNav from "./src/components/footer";
import "./src/styles/index.css";

exports.onRouteUpdate = () => {
  isLoggedIn();
};

exports.wrapPageElement = ({ element, props }) => {
  return (
    <Container {...props}>
      <div>{element}</div>

      <FooterNav></FooterNav>
    </Container>
  );
};
