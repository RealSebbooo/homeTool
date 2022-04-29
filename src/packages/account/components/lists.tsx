import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/checkbox";
import Modal from "../../../components/modal";
import Text from "../../../components/text";
import Textfield from "../../../components/textfield";
import {
  getShoppingList,
  updateRecipe,
  updateShoppingList,
  updateUser,
  updateWeekplan,
} from "../../../services/databaseHelper";
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
  if (typeof window == "undefined") return;
  const user = JSON.parse(localStorage.getItem("htUser"));
  const [allLists, setAllLists] = useState<AllListsType>();
  const [editModal, setEditModal] = useState(false);
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
    setItemToEdit(item);
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
    itemToEdit.name = name;
    if (itemToEdit.listType === "shoppingList")
      updateShoppingList(itemToEdit as ShoppingListType);
    else if (itemToEdit.listType === "recipe")
      updateRecipe(itemToEdit as RecipesType);
    else if (itemToEdit.listType === "weekplan")
      updateWeekplan(itemToEdit as WeekplanType);
    else return;
  };
  const checkboxChanged = (checked: boolean) => {
    console.log("changed", checked);
    setListAsActive();
  };
  const setListAsActive = () => {
    if (itemToEdit.listType === "shoppingList") {
      if (user.shoppingList === itemToEdit.uid) {
        updateUser({ ...user, shoppingList: "" });
      } else {
        updateUser({ ...user, shoppingList: itemToEdit.uid });
      }
    } else if (itemToEdit.listType === "recipe") {
      if (user.recipe === itemToEdit.uid) {
        updateUser({ ...user, recipe: "" });
      } else {
        updateUser({ ...user, recipe: itemToEdit.uid });
      }
    } else if (itemToEdit.listType === "weekplan") {
      if (user.recipe === itemToEdit.uid) {
        updateUser({ ...user, weekplan: "" });
      } else {
        updateUser({ ...user, weekplan: itemToEdit.uid });
      }
    } else return;
  };
  const isListActiveList = (): boolean => {
    console.log("user", user, itemToEdit);
    if (user[itemToEdit?.listType] === itemToEdit?.uid) {
      return true;
    }
    return false;
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
              value={itemToEdit.name}
              disabled={false}
              textInputChanged={(value) => editNameChanged(value)}
            ></Textfield>
            <Checkbox
              checked={isListActiveList()}
              label="Standard"
              checkboxChanged={(value) => checkboxChanged(value)}
            ></Checkbox>
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
