import React from "react";
import Title from "./../components/title";
import AutocompleteField from "./../components/autocomplete";

import ItemList from "./../components/itemList";

const Index = () => {
  return (
    <>
      <Title titleText="Einkaufsliste"></Title>
      <AutocompleteField></AutocompleteField>
      <ItemList></ItemList>
    </>
  );
};
export default Index;
