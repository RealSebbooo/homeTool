import React, { useEffect, useState } from "react";
import Modal from "./../modaltest";
import { ArticelType } from "./../../types";

import { ItemWrapper } from "./../item/item.styled";
import { getArticles } from "../../services/databaseHelper";
import Button from "./../button";
import { collection, doc, onSnapshot } from "firebase/firestore";
import db from "./../../services/firebase";
import Item from "../item/item";

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
    listenToArticleList();
  };
  useEffect(() => {
    getArticleObjects();
  }, []);

  const listenToArticleList = () =>
    onSnapshot(collection(db, "articles"), (snapshot) => {
      const itemsDoc = [];
      snapshot.forEach((element) => {
        itemsDoc.push({ ...element.data(), uid: element.id });
      });
      setArticles(itemsDoc);
    });
  const disableModal = () => {
    setModal(false);
  };

  const openAddModal = () => {
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
          articles?.map((item, key) => (
            <Item
              isRecent={false}
              key={key}
              emitClick={() => openEditModal(item)}
              articleTextValue={item.name}
            ></Item>
          ))}
      </ItemWrapper>
    </>
  );
};

export default ItemList;
