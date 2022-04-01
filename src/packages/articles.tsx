import React from "react";
import ArticleList from "../components/articleList";
import Title from "../components/title";

const Articles = () => {
  return (
    <>
      <Title titleText="Artikel" backButton={true} to="/account"></Title>
      <ArticleList></ArticleList>
    </>
  );
};

export default Articles;
