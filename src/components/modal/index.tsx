import React, { FC } from "react";
import Icon from "../../icons";
import Text from "./../text";
import Textfield from "./../textfield";
import {
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalContainer,
  ModalFooter,
} from "./styled";

type ModalProps = {
  disableModal: () => void;
};

const Modal: FC<ModalProps> = ({ disableModal }) => {
  const textInputChanged = (value: string) => {
    console.log("value", value);
  };
  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <Icon
            name="close"
            onClick={() => disableModal()}
            clickable={true}
            light={false}
            right={true}
          />
          <Text bold={true} fontSize="28" content="Modal Header"></Text>
        </ModalHeader>
        <ModalBody>
          <Textfield
            type="text"
            placeholder="Artikel"
            textInputChanged={(value) => textInputChanged(value)}
          ></Textfield>
          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </ModalBody>
        <ModalFooter>
          <Text bold={false} fontSize="24" content="Modal Footer"></Text>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
