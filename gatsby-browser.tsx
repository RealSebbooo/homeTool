import React from "react";
import { isLoggedIn } from "./src/services/auth";
import Container from "./src/components/container";
import FooterNav from "./src/components/footer";
// Adds a class name to the body element
export const onRouteUpdate = () => {
  isLoggedIn();
};
// Wraps every page in a component

export const wrapPageElement = ({ element, props }) => {
  return (
    <Container {...props}>
      <div>{element}</div>

      <FooterNav></FooterNav>
    </Container>
  );
};
