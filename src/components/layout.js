import React from "react";
import styled from "styled-components";

import FooterNav from "./footer";

import "./../styles/index.css";
const Container = styled.div`
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  padding: 16px;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <div className="content">{children}</div>
      <FooterNav></FooterNav>
    </Container>
  );
}
