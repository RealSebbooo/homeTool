import React from "react";
import Layout from "./../components/layout";
import Title from "./../components/title";
import Button from "./../components/button";
import { logout } from "./../services/auth";

const Account = () => {
  return (
    <Layout>
      <Title titleText="Account"></Title>

      <Button value="Abmelden" onClick={() => logout()} right={true}></Button>
    </Layout>
  );
};
export default Account;
