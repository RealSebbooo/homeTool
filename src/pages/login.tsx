import React, { FC, useState } from "react";
import Layout from "./../components/layout";
import Textfield from "./../components/textfield";
import { login } from "./../services/auth";

import { LoginCard } from "../styles/login.styled";
import { UserObjectType } from "../types";
import Button from "./../components/button";
import { navigate } from "gatsby";
import Title from "../components/title";

const Login: FC = () => {
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
        <Title titleText="Login"></Title>
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
          value="Noch kein Account? Registrieren"
          onClick={() => navigate("/register")}
          dense={true}
          text={true}
        ></Button>
        <br />
        <Button
          value="Anmelden"
          onClick={() => login(userObject)}
          right={true}
        ></Button>
      </LoginCard>
    </Layout>
  );
};
export default Login;
