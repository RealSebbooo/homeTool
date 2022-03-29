import React, { FC } from "react";
import Icon from "../../icons";
import "./style.css";
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
  return (
    <ModalContainer id="myModal" className="modal">
      <ModalContent className="modal-content">
        <ModalHeader className="modal-header">
          <Icon name="close" onClick={() => disableModal()} clickable={true} />
          <h2>Modal Header</h2>
        </ModalHeader>
        <ModalBody className="modal-body">
          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <h3>Modal Footer</h3>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
