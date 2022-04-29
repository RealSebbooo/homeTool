import React, { FC, useEffect, useState } from "react";
import Icon, { iconNames } from "../../icons";
import Text from "../text";
import Textfield from "../textfield";
import Select from "../select/select";
import { ArticelType } from "../../types";
import Categories from "../../services/categories";
import {
  saveNewArticleToDatabase,
  deleteArticle,
  saveArticleInDatabase,
} from "../../services/databaseHelper";

import {
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalContainer,
  ModalFooter,
} from "./styled";
import Button from "../button";
import {
  AmountUnitsFluessigkeiten,
  AmountUnitsGewicht,
  AmountUnitsMengen,
} from "../../services/amountUnits";

type ModalProps = {
  disableModal: () => void;
  newItem?: boolean;
  item?: ArticelType;
  editItem?: boolean;
  editItemAmount?: boolean;
  itemChanged?: (item) => void;
};

const Modal: FC<ModalProps> = ({
  disableModal,
  newItem = false,
  item,
  editItem = false,
  editItemAmount = false,
  itemChanged,
}) => {
  const [amount, setAmount] = useState<string>();
  const [amountUnit, setAmountUnit] = useState<string>();

  useEffect(() => {
    if (editItemAmount) {
      setAmount(item?.amount);
      setAmountUnit(item?.amountUnit);
    }
  }, []);

  const nameChanged = (value: string) => {
    item.name = value;
  };
  const unitChanged = (value: string) => {
    item.unit = value;
  };
  const categoryChanged = (value: string) => {
    item.category = value;
  };
  const iconChanged = (value: string) => {
    item.icon = value;
  };
  const amountChanged = (value: string) => {
    setAmount(value);
  };
  const amountUnitChanged = (value: string) => {
    setAmountUnit(value);
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
  const getOptions = () => {
    console.log("itemUnit", item.unit, AmountUnitsMengen);
    if (item.unit === "all") {
      return [
        ...AmountUnitsMengen,
        ...AmountUnitsFluessigkeiten,
        ...AmountUnitsGewicht,
      ];
    } else if (item.unit === "Menge") {
      return AmountUnitsMengen;
    } else if (item.unit === "Flüssigkeit") {
      return AmountUnitsFluessigkeiten;
    } else if (item.unit === "Gewicht") {
      return AmountUnitsGewicht;
    }
  };

  const saveEditedItem = () => {
    item.amount = amount;
    item.amountUnit = amountUnit;
    itemChanged(item);
  };
  return (
    <>
      {editItemAmount ? (
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
                placeholder="Menge"
                value={item.amount}
                textInputChanged={(value) => amountChanged(value)}
              ></Textfield>
              <Select
                showAdditionalInfos={true}
                label="Einheit"
                options={getOptions()}
                value={item.amountUnit}
                onChange={(value) => amountUnitChanged(value)}
              ></Select>
            </ModalBody>
            <ModalFooter>
              <Button value="Abbrechen" onClick={() => disableModal()}></Button>

              <Button
                value="Speichern"
                right={true}
                onClick={() => saveEditedItem()}
              ></Button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      ) : (
        (newItem || editItem) && (
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
                  right={true}
                  onClick={() => {
                    editItem ? saveItem() : saveNewArticle();
                  }}
                ></Button>
              </ModalFooter>
            </ModalContent>
          </ModalContainer>
        )
      )}
    </>
  );
};

export default Modal;
