import React, { useEffect, useState } from "react";
import Icon from "./../../icons";
import Modal from "./../modal";
import Text from "./../text";
import { ItemBox, ItemInnerBox, ArticleText, ItemWrapper } from "./styled";

export type ItemBoxProps = {
  isRecent: boolean;
};

type ArticelType = {
  name: string;
  category: string;
  unit: string;
  icon: string;
  id: number;
};

interface recentArticle extends ArticelType {
  lastUsed: Date;
}

type shoppingListType = {
  owner: string;
  members: string[];
  activeArticles: ArticelType[];
  recentArticles: recentArticle[];
};

const ItemList = () => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);
  const [shoppingList, setShoppingList] = useState<shoppingListType>();
  useEffect(() => {
    const list = {
      owner: "Sebbooo",
      members: ["Sebbooo"],
      activeArticles: [],
      recentArticles: [],
    };
    for (let i = 0; i < 50; i++) {
      list?.activeArticles?.push({
        name: "Paulaner Spezi " + i.toString(),
        category: "mehl",
        unit: "KG",
        icon: "asdasd",
        id: i,
      });
    }
    setShoppingList(list);
  }, []);

  React.useEffect(() => {
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

  const removeItem = (item: article) => {
    if (!isHoldModal) {
      console.log("remoev", item);
      const index = shoppingList?.activeArticles?.indexOf(item);
      if (index > -1) {
        shoppingList?.activeArticles?.splice(index, 1);
      }
      shoppingList?.recentArticles.push({ ...item, lastUsed: new Date() });
      console.log("first", shoppingList);
      const arr = JSON.parse(JSON.stringify(shoppingList));
      setShoppingList(arr);
    }
  };

  const readdItem = (item: recentArticle) => {
    delete item.lastUsed;
    const index = shoppingList?.recentArticles?.indexOf(item);
    if (index > -1) {
      shoppingList?.recentArticles?.splice(index, 1);
    }
    shoppingList?.activeArticles.push(item);
    const arr = JSON.parse(JSON.stringify(shoppingList));
    setShoppingList(arr);
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
              key={item.id}
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
                  key={item.id}
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
