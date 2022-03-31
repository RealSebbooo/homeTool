import React, { FC } from "react";
import Icon, { iconNames } from "../../icons";
import Text from "./../text";
import Textfield from "./../textfield";
import Select from "./../select/select";
import { ArticelType } from "./../../types";
import Categories from "../../services/categories";
import {
  saveNewArticleToDatabase,
  deleteArticle,
  saveArticleInDatabase,
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

    disableModal();
  };
  const saveItem = () => {
    if (!item.name || !item.category || !item.icon || !item.unit) return;
    else saveArticleInDatabase(item);

    disableModal();
  };
  const defaultUnits = [
    {
      label: "Menge",
      additionalInfos: "Packung, Stück, Priese, Esslöffel, Teelöffel, Becher",
    },
    {
      label: "Gewicht",
      additionalInfos: "Gramm, Kilogram",
    },
    {
      label: "Flüssigkeit",
      additionalInfos: "Milliliter, Liter",
    },
  ];
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
                light={true}
                right={true}
              />
            </ModalHeader>
            <ModalBody>
              <Textfield
                type="text"
                placeholder="Name"
                value={item.name}
                textInputChanged={(value) => nameChanged(value)}
              ></Textfield>
              <Select
                showAdditionalInfos={true}
                label="Einheit"
                options={defaultUnits}
                value={item.unit}
                onChange={(value) => unitChanged(value)}
              ></Select>
              <Select
                showAdditionalInfos={false}
                label="Kategorie"
                options={Categories}
                value={item.category}
                onChange={(value) => categoryChanged(value)}
              ></Select>
              <Select
                showAdditionalInfos={false}
                label="Icon"
                options={iconNames}
                hasIcon={true}
                value={item.icon}
                onChange={(value) => iconChanged(value)}
              ></Select>
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
                  editItem ? saveItem() : saveNewArticle();
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
