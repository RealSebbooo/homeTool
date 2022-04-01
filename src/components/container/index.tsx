import React, { FC } from "react";
import { ContainerBox } from "./styled";

const Container: FC = ({ children }) => {
  return <ContainerBox>{children}</ContainerBox>;
};

export default Container;
