import React, { FC } from "react";
import Icon from "../../icons";
import Text from "../text";

import { ModalHeader, ModalContent, ModalContainer } from "./styled";

type ModalProps = {
  disableModal: () => void;
  headText: string;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ disableModal, headText, children }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <Text
            fontSize="20"
            bold={false}
            content={headText}
            light={true}
            heading={true}
          ></Text>
          <Icon
            name="close"
            onClick={() => disableModal()}
            clickable={true}
            light={true}
            right={true}
          />
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
