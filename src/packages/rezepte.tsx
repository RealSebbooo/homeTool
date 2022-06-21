import React, { FC } from "react";
import RecipesList from "../components/recipesList";
import Title from "../components/title";

const Rezepte: FC = () => {
  return (
    <>
      <Title titleText="Rezepte"></Title>
      <RecipesList></RecipesList>
    </>
  );
};
export default Rezepte;
