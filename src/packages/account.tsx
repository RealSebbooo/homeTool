import React, { FC } from "react";
import Title from "../components/title";
import Button from "../components/button";
import { navigate } from "gatsby";
import Textfield from "../components/textfield";
import Icon from "../icons";
import Row from "../components/row";
import Text from "../components/text";
import { useState } from "react";
import { updateUser } from "../services/databaseHelper";
import styled from "styled-components";
import theme from "../components/theme";

import Lists from "../components/lists";

const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 8px 0;
`;
const Account: FC = () => {
  const [editName, setEditName] = useState(false);
  const [username, setUsername] = useState(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("htUser"))?.name
  );
  const [email] = useState(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("htUser"))?.email
  );
  const handleClick = () => {
    if (editName) {
      updateUser({
        ...(typeof window !== "undefined" &&
          JSON.parse(localStorage.getItem("htUser"))),
        name: username,
      });
    }
    setEditName(!editName);
  };

  const nameChanged = (name: string) => {
    setUsername(name);
  };
  return (
    <>
      <Title titleText="Account" hasLogoutButton={true}></Title>
      <Row>
        <Icon name="user" light={true} spaceRight={true} clickable={false} />
        {editName ? (
          <Textfield
            short={true}
            dense={true}
            value={username}
            textInputChanged={(value) => nameChanged(value)}
            placeholder="Username"
          ></Textfield>
        ) : (
          <Text
            bold={false}
            light={true}
            fontSize="18"
            content={username}
          ></Text>
        )}
        <Icon
          size="16px"
          name={editName ? "save" : "pencil"}
          light={true}
          clickable={true}
          spaceRight={true}
          onClick={handleClick}
        />
      </Row>
      <Row>
        <Icon name="email" light={true} spaceRight={true} clickable={false} />
        <Text bold={false} light={true} fontSize="18" content={email}></Text>
      </Row>

      <HorizontalLine></HorizontalLine>
      <Lists></Lists>
      <HorizontalLine></HorizontalLine>
      <Button
        value="Artikel"
        onClick={() => navigate("/artikel")}
        right={true}
      ></Button>
    </>
  );
};
export default Account;
