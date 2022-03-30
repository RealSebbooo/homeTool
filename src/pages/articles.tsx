import React from "react";
import ArticleList from "../components/articleList";
import Layout from "../components/layout";
import Title from "../components/title";

const Articles = () => {
  return (
    <Layout>
      <Title titleText="Artikel" backButton={true} to="/account"></Title>
      <ArticleList></ArticleList>
    </Layout>
  );
};

export default Articles;
