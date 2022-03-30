import React, { useEffect } from "react";
import styled from "styled-components";
import FooterNav from "./footer";
import "./../styles/index.css";
import { isLoggedIn } from "./../services/auth";

const Container = styled.div`
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  padding: 16px;
  margin-bottom: 75px;
`;

export default function Layout({ children }) {
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <Container>
      <div className="content">{children}</div>
      <FooterNav></FooterNav>
    </Container>
  );
}
