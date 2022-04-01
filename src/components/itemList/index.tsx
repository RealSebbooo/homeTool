import React, { FC, useEffect, useState } from "react";
import Modal from "./../modal";
import Text from "./../text";
import { ItemWrapper } from "./../item/item.styled";
import { ArticelType, ShoppingListType, recentArticle } from "./../../types";
import {
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

export type ItemBoxProps = {
  isRecent: boolean;
};

const ItemList: FC = () => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ArticelType>();
  const [itemToEditKey, setItemToEditKey] = useState<number>();

  const [shoppingList, setShoppingList] = useState<ShoppingListType>();
  useEffect(() => {
    getShoppingListObjects();
  }, []);

  const getShoppingListObjects = async () => {
    await setShoppingList(await getShoppingList());
    listenToShoppingList("dv1dnjZ1QicYNfQhuMzB");
  };

  const listenToShoppingList = (uid) =>
    onSnapshot(doc(db, "shoppingLists", uid), (doc) => {
      setShoppingList({ ...doc.data(), uid: doc.id });
    });

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  // functions -----------------------------------

  const startCounter = (item: ArticelType, key: number) => {
    if (intervalRef.current) return;
    intervalRef.current = setTimeout(() => {
      console.log("item", item);
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
  getShoppingList();
  const removeItem = (item: ArticelType) => {
    if (!isHoldModal) {
      const index = shoppingList?.activeArticles?.indexOf(item);
      if (index > -1) {
        shoppingList?.activeArticles?.splice(index, 1);
      }
      shoppingList?.recentArticles.push({ ...item, lastUsed: new Date() });

      updateShoppingList(shoppingList);
    }
  };

  const readdItem = (item: recentArticle) => {
    delete item.lastUsed;
    const index = shoppingList?.recentArticles?.indexOf(item);
    if (index > -1) {
      shoppingList?.recentArticles?.splice(index, 1);
    }
    shoppingList?.activeArticles.push(item);
    updateShoppingList(shoppingList);
  };

  const disableModal = () => {
    setIsHoldModal(false);
    stopCounter();
  };

  const itemChanged = (item: ArticelType) => {
    console.log(
      "itemChanged",
      item,
      itemToEditKey,
      shoppingList?.activeArticles
    );

    const index = shoppingList?.activeArticles?.indexOf(itemToEdit);
    if (index > -1) {
      shoppingList?.activeArticles?.splice(index, 1);
    }
    shoppingList?.activeArticles.push(item);
    updateShoppingList(shoppingList);
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
  return (
    <>
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
