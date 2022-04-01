import React from "react";
import Layout from "./../components/layout";
import Title from "./../components/title";
import Button from "./../components/button";
import { logout } from "./../services/auth";
import { navigate } from "gatsby";

const Account = () => {
  return (
    <Layout>
      <Title titleText="Account"></Title>

      <Button
        value="Artikel"
        onClick={() => navigate("/artikel")}
        right={true}
      ></Button>
      <Button value="Abmelden" onClick={() => logout()} right={true}></Button>
    </Layout>
  );
};
export default Account;
