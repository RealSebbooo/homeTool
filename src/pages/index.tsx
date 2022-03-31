import React, { useEffect, useState } from "react";
import Layout from "./../components/layout";
import Title from "./../components/title";
import AutocompleteField from "./../components/autocomplete";

import ItemList from "./../components/itemList";
import { ShoppingListType } from "../types";
import { getShoppingList } from "../services/databaseHelper";

const Index = () => {
  return (
    <Layout>
      <Title titleText="Einkaufsliste"></Title>
      <AutocompleteField></AutocompleteField>
      <ItemList></ItemList>
    </Layout>
  );
};
export default Index;
