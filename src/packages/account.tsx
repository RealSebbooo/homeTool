import React from "react";
import Title from "./../components/title";
import Button from "./../components/button";
import { logout } from "./../services/auth";
import { navigate } from "gatsby";

const Account = () => {
  return (
    <>
      <Title titleText="Account"></Title>

      <Button
        value="Artikel"
        onClick={() => navigate("/artikel")}
        right={true}
      ></Button>
      <Button value="Abmelden" onClick={() => logout()} right={true}></Button>
    </>
  );
};
export default Account;
