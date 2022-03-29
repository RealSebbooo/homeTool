import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme, { device } from "./../theme";
import Icon from "./../../icons";
import Modal from "./../modal";
import Text from "./../text";

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  @media ${device.mobile} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;
type ItemBoxProps = {
  isRecent: boolean;
};
const ItemBox = styled.div<ItemBoxProps>`
  background-color: ${({ isRecent }) =>
    isRecent ? theme.surface : theme.primary};
  aspect-ratio: 1;
  border-radius: 4px;

  border: none;
  color: white;
  text-align: center;
  align-content: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;

const ItemInnerBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30%;
`;

const ArticleText = styled.p`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.white};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-left: auto;
  margin-right: auto;
  @media ${device.mobile} {
    max-width: 110px;
  }

  @media ${device.tablet} {
    max-width: 100px;
  }

  @media ${device.laptop} {
    max-width: 90px;
  }

  word-break: break-all;
`;

type article = {
  name: string;
  category: string;
  unit: string;
  icon: string;
  id: number;
};

interface recentArticle extends article {
  lastUsed: Date;
}

type shoppingListType = {
  owner: string;
  members: string[];
  activeArticles: article[];
  recentArticles: recentArticle[];
};

const ItemList = () => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);
  const [shoppingList, setShoppingList] = useState<shoppingListType>();
  const [refresh, setRefresh] = React.useState(1);
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
          refresh &&
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
              refresh &&
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
