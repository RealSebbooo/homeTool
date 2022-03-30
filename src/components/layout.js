import React, { useEffect } from "react";
import styled from "styled-components";
import FooterNav from "./footer";
import { isLoggedIn } from "./../services/auth";
import "./../styles/index.css";
import { navigate } from "gatsby";
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
    const check = async () => {
      const path = globalHistory.location.pathname;
      if (!(await isLoggedIn()) && path !== "/login" && path !== "/register") {
        navigate("/login");
      }
    };
    check();
  }, []);
  return (
    <Container>
      <div className="content">{children}</div>
      <FooterNav></FooterNav>
    </Container>
  );
}
