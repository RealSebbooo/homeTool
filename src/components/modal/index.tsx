import React, { FC } from "react";
import Icon from "../../icons";
import Text from "./../text";
import Textfield from "./../textfield";
import { ArticelType } from "./../../types";
import {
  saveNewArticleToDatabase,
  deleteArticle,
} from "./../../services/databaseHelper";

import {
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalContainer,
  ModalFooter,
} from "./styled";
import Button from "../button";

type ModalProps = {
  disableModal: () => void;
  newItem?: boolean;
  item?: ArticelType;
  editItem?: boolean;
};

const Modal: FC<ModalProps> = ({
  disableModal,
  newItem = false,
  item,
  editItem = false,
}) => {
  const nameChanged = (value: string) => {
    item.name = value;
    console.log("nameChanged", value);
  };
  const unitChanged = (value: string) => {
    item.unit = value;
    console.log("unitChanged", value);
  };
  const categoryChanged = (value: string) => {
    item.category = value;
    console.log("categoryChanged", value);
  };
  const iconChanged = (value: string) => {
    item.icon = value;
    console.log("iconChanged", value);
  };
  const saveNewArticle = () => {
    item.added = new Date();

    if (!item.name || !item.category || !item.icon || !item.unit) return;
    else saveNewArticleToDatabase(item);
  };

  if (editItem) {
  }
  return (
    <>
      {newItem || editItem ? (
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
            </ModalHeader>
            <ModalBody>
              <Textfield
                type="text"
                placeholder="Name"
                textInputChanged={(value) => nameChanged(value)}
              ></Textfield>
              <Textfield
                type="text"
                placeholder="Standardeinheit"
                textInputChanged={(value) => unitChanged(value)}
              ></Textfield>
              <Textfield
                type="text"
                placeholder="Kategorie"
                textInputChanged={(value) => categoryChanged(value)}
              ></Textfield>
              <Textfield
                type="text"
                placeholder="Icon"
                textInputChanged={(value) => iconChanged(value)}
              ></Textfield>
            </ModalBody>
            <ModalFooter>
              {editItem ? (
                <Button
                  value="Löschen"
                  onClick={() => {
                    deleteArticle(item.uid);
                    disableModal();
                  }}
                ></Button>
              ) : (
                <Button
                  value="Abbrechen"
                  onClick={() => disableModal()}
                ></Button>
              )}

              <Button
                value="Speichern"
                onClick={() => {
                  saveNewArticle();
                  disableModal();
                }}
              ></Button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      ) : (
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
            </ModalBody>
            <ModalFooter>
              <Text bold={false} fontSize="24" content="Modal Footer"></Text>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;
