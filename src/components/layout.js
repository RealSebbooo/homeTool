import React, { useEffect } from "react";
import styled from "styled-components";
import FooterNav from "./footer";
import { isLoggedIn } from "./../services/auth";
import "./../styles/index.css";
import { navigate, useStaticQuery, graphql } from "gatsby";
import { globalHistory } from "@reach/router";

const Container = styled.div`
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  padding: 16px;
  margin-bottom: 75px;
`;

export default function Layout({ children }) {
  useEffect(() => {
    const path = globalHistory.location.pathname;
    console.log("hier", isLoggedIn(), path);
    if (!isLoggedIn() && path !== "/login") {
      navigate("/login");
    }
  }, []);
  return (
    <Container>
      <div className="content">{children}</div>
      <FooterNav></FooterNav>
    </Container>
  );
}
