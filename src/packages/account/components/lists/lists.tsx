import React, { FC, useEffect, useState } from "react";
import Button from "../../../../components/button";
import Checkbox from "../../../../components/checkbox";
import Modal from "../../../../components/modal";
import Text from "../../../../components/text";
import Textfield from "../../../../components/textfield";
import Icon from "../../../../icons";
import {
  updateRecipe,
  updateShoppingList,
  updateUser,
  updateWeekplan,
  getUserByEmailAdress,
  getUserByUid,
  deleteShoppingList,
  deleteRecipe,
  deleteWeekplan,
  getWeekplans,
  getRecipes,
  createNewShoppingList,
  createNewRecipeList,
  createNewWeekplanList,
  getAllShoppingList,
} from "../../../../services/databaseHelper";
import { ShoppingListType, RecipesType, WeekplanType } from "../../../../types";
import {
  ListWrapper,
  ListInnerWrapper,
  ListItem,
  ModalCard,
  UserBox,
  UserBoxHeader,
  Member,
  MemberList,
  HeaderWrapper,
  HorizontalLine,
} from "./lists.styled";
type AllListsType = {
  shoppingLists?: ShoppingListType[];
  recipesLists?: RecipesType[];
  weekplanLists?: WeekplanType[];
};
const Lists: FC = () => {
  if (typeof window == "undefined") return;
  const user = JSON.parse(localStorage.getItem("htUser"));
  const [allLists, setAllLists] = useState<AllListsType>({});
  const [editModal, setEditModal] = useState(false);
  const [newModal, setNewModal] = useState(false);
  const [newListType, setNewListType] = useState("");
  const [newListName, setNewListName] = useState("");
  const [newUserField, setNewUserField] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [memberList, setMemberList] = useState<{ name: string; uid: string }[]>(
    []
  );
  const [listToEdit, setListToEdit] = useState<
    ShoppingListType | RecipesType | WeekplanType
  >();
  useEffect(() => {
    getShoppingListFromDatabase();
    getWeekplansFromDatabase();
    getRecipesFromDatabase();
  }, []);

  const getShoppingListFromDatabase = async () => {
    allLists.shoppingLists = await getAllShoppingList();
    setAllLists(JSON.parse(JSON.stringify(allLists)));
  };
  const getWeekplansFromDatabase = async () => {
    allLists.weekplanLists = await getWeekplans();
    setAllLists(JSON.parse(JSON.stringify(allLists)));
  };
  const getRecipesFromDatabase = async () => {
    allLists.recipesLists = await getRecipes();
    setAllLists(JSON.parse(JSON.stringify(allLists)));
  };

  const editClicked = (item: ShoppingListType | RecipesType | WeekplanType) => {
    setListToEdit(item);
    setEditModal(true);
    item?.members?.forEach((element) => {
      getUserFromDatabaseByUid(element);
    });
  };
  const deleteClicked = (
    item: ShoppingListType | RecipesType | WeekplanType
  ) => {
    if (item.listType === "shoppingList") deleteShoppingList(item.uid);
    else if (item.listType === "recipe") deleteRecipe(item.uid);
    else if (item.listType === "weekplan") deleteWeekplan(item.uid);
    else return;

    if (typeof window !== "undefined") {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  };

  const disableEditModal = () => {
    setEditModal(false);
    setListToEdit(null);
    setMemberList([]);
  };

  const editNameChanged = (name: string) => {
    listToEdit.name = name;

    if (listToEdit.listType === "shoppingList")
      updateShoppingList(listToEdit as ShoppingListType);
    else if (listToEdit.listType === "recipe")
      updateRecipe(listToEdit as RecipesType);
    else if (listToEdit.listType === "weekplan")
      updateWeekplan(listToEdit as WeekplanType);
    else return;
  };
  const checkboxChanged = () => {
    setListAsActive();
  };
  const setListAsActive = () => {
    if (listToEdit.listType === "shoppingList") {
      if (user.shoppingList === listToEdit.uid) {
        updateUser({ ...user, shoppingList: "" });
      } else {
        updateUser({ ...user, shoppingList: listToEdit.uid });
      }
    } else if (listToEdit.listType === "recipe") {
      if (user.recipe === listToEdit.uid) {
        updateUser({ ...user, recipe: "" });
      } else {
        updateUser({ ...user, recipe: listToEdit.uid });
      }
    } else if (listToEdit.listType === "weekplan") {
      if (user.recipe === listToEdit.uid) {
        updateUser({ ...user, weekplan: "" });
      } else {
        updateUser({ ...user, weekplan: listToEdit.uid });
      }
    } else return;
  };
  const isListActiveList = (): boolean => {
    if (user[listToEdit?.listType] === listToEdit?.uid) {
      return true;
    }
    return false;
  };

  const isUserListAdmin = (
    list: ShoppingListType | RecipesType | WeekplanType
  ) => {
    if (list.owner === user?.uid) return true;
    else return false;
  };
  const activeAddNewUser = () => {
    setNewUserField(!newUserField);
  };
  const addNewUserToList = async () => {
    const user = await getUserByEmailAdress(newUserEmail);
    if (!user) return;
    const updatedList = {
      ...listToEdit,
      members: [...listToEdit.members, user?.uid],
    };
    if (listToEdit.listType === "shoppingList")
      updateShoppingList(updatedList as ShoppingListType);
    else if (listToEdit.listType === "recipe")
      updateRecipe(updatedList as RecipesType);
    else if (listToEdit.listType === "weekplan")
      updateWeekplan(updatedList as WeekplanType);
    else return;
  };
  const userEmailChanged = (email: string) => {
    setNewUserEmail(email);
  };
  const getUserFromDatabaseByUid = async (uid: string) => {
    const userFromDatabase = await getUserByUid(uid);
    if (userFromDatabase)
      memberList.push({
        name: userFromDatabase?.name,
        uid: userFromDatabase?.uid,
      });
    else memberList.push({ name: uid, uid: uid });

    setMemberList(JSON.parse(JSON.stringify(memberList)));
  };
  const removeMemberFromList = (uid: string) => {
    const index = listToEdit?.members?.indexOf(uid);
    if (index > -1) {
      listToEdit?.members?.splice(index, 1);
    }

    if (listToEdit.listType === "shoppingList")
      updateShoppingList(listToEdit as ShoppingListType);
    else if (listToEdit.listType === "recipe")
      updateRecipe(listToEdit as RecipesType);
    else if (listToEdit.listType === "weekplan")
      updateWeekplan(listToEdit as WeekplanType);
    else return;
  };

  const removeMyselfFromList = (
    list: ShoppingListType | RecipesType | WeekplanType
  ) => {
    const index = list?.members?.indexOf(user?.uid);
    if (index > -1) {
      list?.members?.splice(index, 1);
    }

    if (list.listType === "shoppingList")
      updateShoppingList(list as ShoppingListType);
    else if (list.listType === "recipe") updateRecipe(list as RecipesType);
    else if (list.listType === "weekplan") updateWeekplan(list as WeekplanType);
    else return;
  };
  const openNewModal = (key: string) => {
    setNewModal(true);
    setNewListType(key);
  };
  const newListNameChanged = (name: string) => {
    setNewListName(name);
  };
  const addNewList = () => {
    if (newListType === "shoppingLists") createNewShoppingList(newListName);
    else if (newListType === "recipesLists") createNewRecipeList(newListName);
    else if (newListType === "weekplansLists")
      createNewWeekplanList(newListName);
    else return;

    if (typeof window !== "undefined") {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
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
              value={listToEdit.name}
              disabled={!isUserListAdmin(listToEdit)}
              textInputChanged={(value) => editNameChanged(value)}
            ></Textfield>
            <Checkbox
              checked={isListActiveList()}
              label="Standard"
              checkboxChanged={() => checkboxChanged()}
            ></Checkbox>
            {isUserListAdmin(listToEdit) && (
              <UserBox>
                <UserBoxHeader>
                  <Text
                    fontSize="16"
                    bold={false}
                    content="Mitglieder"
                    light={true}
                    heading={false}
                  ></Text>
                  <Text
                    spaceBetween
                    fontSize="12"
                    bold={false}
                    content="Nutzer hinzufügen"
                    light={true}
                    onClick={() => activeAddNewUser()}
                  ></Text>
                </UserBoxHeader>
                <UserBoxHeader>
                  <MemberList>
                    <Member>
                      {newUserField && (
                        <>
                          <Textfield
                            type="text"
                            placeholder="Email"
                            value={newUserEmail}
                            textInputChanged={(value) =>
                              userEmailChanged(value)
                            }
                          ></Textfield>
                          <Button
                            dense
                            value="Speichern"
                            onClick={() => addNewUserToList()}
                          ></Button>
                        </>
                      )}
                    </Member>
                    {memberList?.map((member) => {
                      return (
                        <Member>
                          <>{member.name}</>
                          <Text
                            spaceBetween
                            fontSize="12"
                            bold={false}
                            content="Löschen"
                            light={true}
                            onClick={() => removeMemberFromList(member.uid)}
                          ></Text>
                        </Member>
                      );
                    })}
                  </MemberList>
                </UserBoxHeader>
              </UserBox>
            )}
          </ModalCard>
        </Modal>
      )}

      {newModal && (
        <Modal headText="Neue Liste" disableModal={() => setNewModal(false)}>
          <ModalCard>
            <Textfield
              type="text"
              placeholder="Name"
              value={newListName}
              textInputChanged={(value) => newListNameChanged(value)}
            ></Textfield>
            <Button
              dense
              value="Speichern"
              onClick={() => addNewList()}
            ></Button>
          </ModalCard>
        </Modal>
      )}
      <ListWrapper>
        {allLists &&
          Object.keys(allLists).map((key: string) => (
            <>
              <HeaderWrapper>
                <Text
                  fontSize="24"
                  bold={false}
                  content={key}
                  light={true}
                ></Text>
                <Icon
                  name="plus"
                  light={true}
                  onClick={() => openNewModal(key)}
                  clickable={true}
                ></Icon>
              </HeaderWrapper>
              <ListInnerWrapper>
                {allLists[key]?.length > 0 ? (
                  allLists[key]?.map((list, id: number) => (
                    <>
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
                            onClick={
                              isUserListAdmin(list)
                                ? () => deleteClicked(list)
                                : () => removeMyselfFromList(list)
                            }
                          ></Text>
                        </div>
                      </ListItem>
                      {allLists[key]?.length > 1 &&
                        id !== allLists[key].length - 1 && (
                          <HorizontalLine></HorizontalLine>
                        )}
                    </>
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
