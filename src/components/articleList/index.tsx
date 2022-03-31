import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme, { device } from "./../theme";
import Icon from "./../../icons";
import Modal from "./../modal";
import { ArticelType } from "./../../types";

import {
  ItemBox,
  ItemInnerBox,
  ArticleText,
  ItemWrapper,
} from "./../item/item.styled";
import { getArticles } from "../../services/databaseHelper";
import Button from "./../button";

let itemModel: ArticelType = {
  name: "",
  category: "",
  unit: "",
  icon: "",
  uid: "",
  added: new Date(),
};

const backupItemModel: ArticelType = {
  name: "",
  category: "",
  unit: "",
  icon: "",
  uid: "",
  added: new Date(),
};

const ItemList = () => {
  const [modal, setModal] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const [articles, setArticles] = useState([]);

  const getArticleObjects = async () => {
    setArticles(await getArticles());
  };
  getArticleObjects();
  const disableModal = () => {
    console.log("disable");
    setModal(false);
  };

  const openAddModal = () => {
    console.log("open");
    itemModel = JSON.parse(JSON.stringify(backupItemModel));
    setNewItem(true);
    setEditItem(false);
    setModal(true);
  };

  const openEditModal = (item: ArticelType) => {
    itemModel = item;
    setNewItem(false);
    setEditItem(true);
    setModal(true);
  };
  return (
    <>
      {modal && (
        <Modal
          disableModal={disableModal}
          newItem={newItem}
          editItem={editItem}
          item={itemModel}
        ></Modal>
      )}
      <Button value="Neuer Artikel" onClick={() => openAddModal()}></Button>
      <ItemWrapper>
        {articles?.length > 0 &&
          articles?.map((item) => (
            <ItemBox key={item.id} onClick={() => openEditModal(item)}>
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
