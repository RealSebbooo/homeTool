import React, { useEffect, useState } from "react";
import Layout from "./../components/layout";
import Title from "./../components/title";

import ItemList from "./../components/itemList";
import { ShoppingListType } from "../types";
import { getShoppingList } from "../services/databaseHelper";

const Index = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListType>();

  useEffect(async () => {
    setShoppingList(await getShoppingList());
  }, []);
  return (
    <Layout>
      <Title titleText="Einkaufsliste"></Title>
      <ItemList shoppingList={shoppingList}></ItemList>
    </Layout>
  );
};
export default Index;
