import React from "react";
import Layout from "./../components/layout";
import Title from "./../components/title";

import ItemList from "./../components/itemList";

import { getShoppinglistItems } from "./../services/databaseHelper";

const Index = () => {
  getShoppinglistItems();
  return (
    <Layout>
      <Title titleText="Einkaufsliste"></Title>
      <ItemList></ItemList>
    </Layout>
  );
};
export default Index;
