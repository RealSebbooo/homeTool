import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme, { device } from "./../theme";
import Icon from "./../../icons";
import Modal from "./../modal";
import {
  ItemBox,
  ItemInnerBox,
  ArticleText,
  ItemWrapper,
} from "./../itemList/styled";

type ItemBoxProps = {
  isRecent: boolean;
};

type article = {
  name: string;
  category: string;
  unit: string;
  icon: string;
  id: number;
};

const ItemList = () => {
  const [modal, setModal] = useState(false);

  const disableModal = () => {
    console.log("disable");
    setModal(false);
  };
  return (
    <>
      {modal && <Modal disableModal={disableModal}></Modal>}
      <ItemWrapper>
        {articles?.length > 0 &&
          articles?.map((item) => (
            <ItemBox key={item.id} onClick={() => setModal(item)}>
              <ItemInnerBox>
                <Icon name="a" light={true} />
                <ArticleText>{item.name}</ArticleText>
              </ItemInnerBox>
            </ItemBox>
          ))}
      </ItemWrapper>
    </>
  );
};

export default ItemList;
