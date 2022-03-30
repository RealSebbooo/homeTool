import React, { useEffect, useState } from "react";
import Layout from "./../components/layout";
import Textfield from "./../components/textfield";
import { LoginCard } from "./login.styled";
import Button from "./../components/button";
import { UserObjectType } from "../types";
import { register } from "./../services/auth";
import { navigate } from "gatsby";
import Title from "../components/title";

export default function Register() {
  const [userObject, setUserObject] = useState<UserObjectType>();

  const emailValueChanged = (value: string) => {
    console.log("email", value, userObject);
    setUserObject({ ...userObject, email: value });
  };

  const passwordValueChanged = (value: string) => {
    console.log("passwort", value, userObject);
    setUserObject({ ...userObject, password: value });
  };

  return (
    <Layout>
      <LoginCard>
        <Title titleText="Registrieren"></Title>
        <Textfield
          type="text"
          placeholder="Email"
          textInputChanged={(value) => emailValueChanged(value)}
        ></Textfield>
        <Textfield
          type="password"
          placeholder="Password"
          textInputChanged={(value) => passwordValueChanged(value)}
        ></Textfield>
        <Button
          value="Bereits ein Account? Anmelden"
          onClick={() => navigate("/login")}
          dense={true}
          text={true}
        ></Button>
        <br />
        <Button
          value="Registrieren"
          onClick={() => register(userObject)}
          right={true}
        ></Button>
      </LoginCard>
    </Layout>
  );
}
