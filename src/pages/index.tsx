import React from "react";
import Layout from "./../components/layout";
import Title from "./../components/title";

import ItemList from "./../components/itemList";

const Index = () => {
  return (
    <Layout>
      <Title titleText="Einkaufsliste"></Title>
      <ItemList></ItemList>
    </Layout>
  );
};
export default Index;
