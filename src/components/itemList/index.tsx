import React, { FC, useEffect, useState } from "react";
import Modal from "./../modaltest";
import Text from "./../text";
import { ItemWrapper } from "./../item/item.styled";
import { ArticelType, ShoppingListType, recentArticle } from "./../../types";
import {
  getAllShoppingList,
  getShoppingList,
  updateShoppingList,
} from "./../../services/databaseHelper";
import { doc, onSnapshot } from "firebase/firestore";
import db from "./../../services/firebase";
import Item from "../item/item";
import {
  AmountUnitsFluessigkeiten,
  AmountUnitsGewicht,
  AmountUnitsMengen,
} from "../../services/amountUnits";
import Dropdown from "../dropdown/dropdown";

export type ItemBoxProps = {
  isRecent: boolean;
};
export type ListDropdownItems = {
  name: string;
  id: string;
};

const ItemList: FC = () => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ArticelType>();
  const [itemToEditKey, setItemToEditKey] = useState<number>();
  const [userLists, setUserLists] = useState<ListDropdownItems[]>();
  const [activeUserList, setActiveUserList] = useState<ListDropdownItems>();

  const [shoppingList, setShoppingList] = useState<ShoppingListType>();
  useEffect(() => {
    getShoppingListObjects();
  }, []);

  const getShoppingListObjects = async () => {
    if (typeof window == "undefined") return;
    const userShoppingList = JSON.parse(
      localStorage.getItem("htUser") || ""
    )?.shoppingList;
    await setShoppingList(await getShoppingList(userShoppingList));
    console.log(
      "await getShoppingList(userShoppingList)",
      await getShoppingList(userShoppingList)
    );
    fillShoppingListArray(userShoppingList);
    if (typeof window == "undefined") return;
    const user = JSON.parse(localStorage.getItem("htUser") || "");
    listenToShoppingList(user?.shoppingList);
  };

  const fillShoppingListArray = async (userShoppingList: string) => {
    const lists = await getAllShoppingList();
    console.log("lists", lists, userShoppingList);

    const mappedLists = lists?.map((list) => {
      return {
        name: list.name,
        id: list.uid,
      };
    });

    setUserLists(mappedLists);
    const activeList = lists?.find((list) => list.uid === userShoppingList);
    const mappedActiveList = { name: activeList?.name || "", id: activeList?.uid || "" };
    setActiveUserList(mappedActiveList);
  };

  const listenToShoppingList = (uid:string) =>
    onSnapshot(doc(db, "shoppingLists", uid), (doc) => {
      if (doc?.data())
        setShoppingList({
          ...(doc.data() as ShoppingListType),
          uid: doc.id,
        });
    });

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  const startCounter = (item: ArticelType, key: number) => {
    if (intervalRef.current) return;
    intervalRef.current = setTimeout(() => {
      setItemToEdit(item);
      setItemToEditKey(key);
      setIsHoldModal(true);
    }, 400);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  if (typeof window == "undefined") return;
  const userShoppingList = JSON.parse(
    localStorage.getItem("htUser") || ""
  )?.shoppingList;
  getShoppingList(userShoppingList);
  const removeItem = (item: ArticelType) => {
    if (!isHoldModal) {
      const index = shoppingList?.activeArticles?.indexOf(item) || -1;
      if (index > -1) {
        shoppingList?.activeArticles?.splice(index, 1);
      }
      shoppingList?.recentArticles.push({ ...item, lastUsed: new Date() });

      updateShoppingList(shoppingList as ShoppingListType);
    }
  };

  const readdItem = (item: recentArticle) => {
    delete item.lastUsed;
    const index = shoppingList?.recentArticles?.indexOf(item) || -1;
    if (index > -1) {
      shoppingList?.recentArticles?.splice(index, 1);
    }
    shoppingList?.activeArticles.push(item);
    updateShoppingList(shoppingList as ShoppingListType);
  };

  const disableModal = () => {
    setIsHoldModal(false);
    stopCounter();
  };

  const itemChanged = (item: ArticelType) => {
    const index = shoppingList?.activeArticles?.indexOf(itemToEdit as ArticelType) || -1;
    if (index > -1) {
      shoppingList?.activeArticles?.splice(index, 1);
    }
    shoppingList?.activeArticles.push(item);
    updateShoppingList(shoppingList as ShoppingListType);
    disableModal();
  };

  const getShortAmountUnit = (item: ArticelType) => {
    if (item.unit === "all") {
      return [
        ...AmountUnitsMengen,
        ...AmountUnitsFluessigkeiten,
        ...AmountUnitsGewicht,
      ]?.find((element) => element.label === item.amountUnit)?.short;
    } else if (item.unit === "Menge") {
      return AmountUnitsMengen?.find(
        (element) => element.label === item.amountUnit
      )?.short;
    } else if (item.unit === "Flüssigkeit") {
      return AmountUnitsFluessigkeiten?.find(
        (element) => element.label === item.amountUnit
      )?.short;
    } else if (item.unit === "Gewicht") {
      return AmountUnitsGewicht?.find(
        (element) => element.label === item.amountUnit
      )?.short;
    }
  };
  const itemHasClicked = (item: string) => {
    console.log("item", item);
    setIsOpen(false);
  };
  return (
    <>
      <Dropdown
        activeItem={activeUserList}
        items={userLists}
        itemClicked={(value) => itemHasClicked(value)}
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value)}
      ></Dropdown>
      {isHoldModal && (
        <Modal
          disableModal={disableModal}
          editItemAmount={true}
          item={itemToEdit}
          itemChanged={(item) => itemChanged(item)}
        ></Modal>
      )}
      <ItemWrapper>
        {shoppingList?.activeArticles?.length > 0 &&
          shoppingList?.activeArticles?.map((item, key) => (
            <Item
              isRecent={false}
              key={key}
              emitClick={() => removeItem(item)}
              articleTextValue={item.name}
              emitMouseDown={() => startCounter(item, key)}
              emitMouseUp={() => stopCounter()}
              emitTouchStart={() => startCounter(item, key)}
              emitTouchEnd={() => stopCounter()}
              tag={
                item.amount && item.amountUnit
                  ? `${item.amount} ${getShortAmountUnit(item)}`
                  : null
              }
            ></Item>
          ))}
      </ItemWrapper>
      {shoppingList?.recentArticles?.length > 0 && (
        <>
          <Text
            fontSize="24"
            bold={false}
            content="Zuletzt verwendet"
            light={true}
            heading={true}
          ></Text>
          <ItemWrapper>
            {shoppingList?.recentArticles?.length > 0 &&
              shoppingList?.recentArticles?.map((item, key) => (
                <Item
                  isRecent={true}
                  key={key}
                  emitClick={() => readdItem(item)}
                  articleTextValue={item.name}
                  tag={
                    item.amount && item.amountUnit
                      ? `${item.amount} ${getShortAmountUnit(item)}`
                      : null
                  }
                ></Item>
              ))}
          </ItemWrapper>
        </>
      )}
    </>
  );
};

export default ItemList;
