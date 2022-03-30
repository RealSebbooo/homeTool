import React, { FC, useEffect, useState } from "react";
import Icon from "./../../icons";
import Modal from "./../modal";
import Text from "./../text";
import { ItemBox, ItemInnerBox, ArticleText, ItemWrapper } from "./styled";
import { ArticelType, ShoppingListType, recentArticle } from "./../../types";
import {
  getShoppingList,
  updateShoppingList,
} from "./../../services/databaseHelper";

export type ItemBoxProps = {
  isRecent: boolean;
};
type ItemListProp = {
  shoppingList: ShoppingListType;
};

const ItemList: FC<ItemListProp> = ({ shoppingList }) => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  // functions -----------------------------------

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setTimeout(() => {
      console.log("hold");
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
      console.log("remoev", item);
      const index = shoppingList?.activeArticles?.indexOf(item);
      if (index > -1) {
        shoppingList?.activeArticles?.splice(index, 1);
      }
      shoppingList?.recentArticles.push({ ...item, lastUsed: new Date() });
      console.log("first", shoppingList);

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
    console.log("disable");
    setIsHoldModal(false);
    stopCounter();
  };
  return (
    <>
      {isHoldModal && <Modal disableModal={disableModal}></Modal>}
      <ItemWrapper>
        {shoppingList?.activeArticles?.length > 0 &&
          shoppingList?.activeArticles?.map((item) => (
            <ItemBox
              key={item.uid}
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
              shoppingList?.recentArticles?.map((item) => (
                <ItemBox
                  isRecent={true}
                  key={item.uid}
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
