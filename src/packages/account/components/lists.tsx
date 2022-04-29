import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import Text from "../../../components/text";
import Textfield from "../../../components/textfield";
import { getShoppingList } from "../../../services/databaseHelper";
import { ShoppingListType, RecipesType, WeekplanType } from "../../../types";
import {
  ListWrapper,
  ListInnerWrapper,
  ListItem,
  ModalCard,
} from "./lists.styled";
type AllListsType = {
  shoppingLists: ShoppingListType[];
  recipesLisst: RecipesType[];
  weekplanLists: WeekplanType[];
};
const Lists = () => {
  const [allLists, setAllLists] = useState<AllListsType>();
  const [editModal, setEditModal] = useState(false);
  const [editName, setEditName] = useState<string>();
  const [itemToEdit, setItemToEdit] = useState<
    ShoppingListType | RecipesType | WeekplanType
  >();
  useEffect(() => {
    getShoppingListFromDatabase();
  }, []);

  const getShoppingListFromDatabase = async () => {
    const tempAllLists = JSON.parse(JSON.stringify(allLists || {}));
    tempAllLists.shoppingLists = await getShoppingList();
    setAllLists(tempAllLists);
  };

  const editClicked = (item: ShoppingListType | RecipesType | WeekplanType) => {
    setItemToEdit(JSON.parse(JSON.stringify(item)));
    setEditName(item.name);
    setEditModal(true);
  };
  const deleteClicked = (
    item: ShoppingListType | RecipesType | WeekplanType
  ) => {
    console.log("delete", item);
  };

  const disableEditModal = () => {
    console.log("disable edit modal");
    setEditModal(false);
    setItemToEdit(null);
  };

  const editNameChanged = (name: string) => {
    setEditName(name);
  };
  return (
    <div>
      {editModal && (
        <Modal
          headText="Bearbeite Liste"
          disableModal={() => disableEditModal()}
        >
          <ModalCard>
            <Textfield
              type="text"
              placeholder="Listenname"
              value={editName}
              disabled={true}
              textInputChanged={(value) => editNameChanged(value)}
            ></Textfield>
            <div>
              <Text
                fontSize="16"
                bold={false}
                content="Standard"
                light={true}
              ></Text>
            </div>
          </ModalCard>
        </Modal>
      )}
      <ListWrapper>
        {allLists &&
          Object.keys(allLists).map((key: string) => (
            <>
              <Text
                fontSize="24"
                bold={false}
                content={key}
                light={true}
                heading={true}
              ></Text>
              <ListInnerWrapper>
                {allLists[key]?.length > 0 ? (
                  allLists[key]?.map((list) => (
                    <ListItem>
                      <Text
                        fontSize="16"
                        bold={false}
                        content={list.name}
                        light={true}
                      ></Text>
                      <div>
                        <Text
                          spaceBetween
                          fontSize="16"
                          bold={false}
                          content="Bearbeiten"
                          light={true}
                          onClick={() => editClicked(list)}
                        ></Text>
                        <Text
                          spaceBetween
                          fontSize="16"
                          bold={false}
                          content="Löschen"
                          light={true}
                          onClick={() => deleteClicked(list)}
                        ></Text>
                      </div>
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <Text
                      fontSize="16"
                      bold={false}
                      content="Keine Liste vorhanden"
                      light={true}
                    ></Text>
                  </ListItem>
                )}
              </ListInnerWrapper>
            </>
          ))}
      </ListWrapper>
    </div>
  );
};

export default Lists;
