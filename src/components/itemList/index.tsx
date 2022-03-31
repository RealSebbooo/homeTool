import React, { FC, useEffect, useState } from "react";
import Icon from "./../../icons";
import Modal from "./../modal";
import Text from "./../text";
import {
  ItemBox,
  ItemInnerBox,
  ArticleText,
  ItemWrapper,
} from "./../item/item.styled";
import { ArticelType, ShoppingListType, recentArticle } from "./../../types";
import {
  getShoppingList,
  updateShoppingList,
} from "./../../services/databaseHelper";
import { doc, onSnapshot } from "firebase/firestore";
import db from "./../../services/firebase";

export type ItemBoxProps = {
  isRecent: boolean;
};

const ItemList: FC = () => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);

  const [shoppingList, setShoppingList] = useState<ShoppingListType>();
  useEffect(() => {
    getShoppingListObjects();
  }, []);

  const getShoppingListObjects = async () => {
    await setShoppingList(await getShoppingList());
    listenToShoppingList("GqzKcwVlYEobK5an1HaQ");
  };

  const listenToShoppingList = (uid) =>
    onSnapshot(doc(db, "shoppingLists", uid), (doc) => {
      setShoppingList({ ...doc.data(), uid: doc.id });
    });

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  // functions -----------------------------------

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setTimeout(() => {
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
  return (
    <>
      {isHoldModal && <Modal disableModal={disableModal}></Modal>}
      <ItemWrapper>
        {shoppingList?.activeArticles?.length > 0 &&
          shoppingList?.activeArticles?.map((item, key) => (
            <ItemBox
              key={key}
              onClick={() => removeItem(item)}
              onMouseDown={startCounter}
              onMouseUp={stopCounter}
              onTouchStart={startCounter}
              onTouchEnd={stopCounter}
            >
              <ItemInnerBox>
                <Icon name="a" light={true} />
                <ArticleText>{item.name}</ArticleText>
              </ItemInnerBox>
            </ItemBox>
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
                <ItemBox
                  isRecent={true}
                  key={key}
                  onClick={() => readdItem(item)}
                >
                  <ItemInnerBox>
                    <Icon name="a" light={true} />
                    <ArticleText>{item.name}</ArticleText>
                  </ItemInnerBox>
                </ItemBox>
              ))}
          </ItemWrapper>
        </>
      )}
    </>
  );
};

export default ItemList;
