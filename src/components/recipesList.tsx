import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getRecipesFromDatabase } from "../services/databaseHelper";
import Button from "./button";
import Text from "./text";
import { RecipeListType, RecipesType } from "../types";
import { navigate } from "gatsby";

const RecipesList = () => {
  const [recipesList, setRecipesList] = useState<RecipeListType>();
  const [newRecipeModal, setNewRecipeModal] = useState(false);
  useEffect(() => {
    getRecipesList();
  }, []);

  const getRecipesList = async () => {
    if (typeof window == "undefined") return;
    const userRecipesList = JSON.parse(
      localStorage.getItem("htUser") || ""
    )?.recipe;
    await setRecipesList(await getRecipesFromDatabase(userRecipesList));
  };

  const openNewRecipe = () => {
    let newRecipeId = "0";
    if (recipesList === undefined) return;
    if (recipesList?.recipes && recipesList?.recipes?.length > 0)
      newRecipeId = recipesList?.recipes[recipesList?.recipes?.length - 1]?.uid;

    navigate("/recipe/?id=" + newRecipeId);
  };

  return (
    <>
      {recipesList?.recipes && recipesList?.recipes?.length > 0 ? (
        <>
          {recipesList?.recipes.map((recipe) => {
            return "asdasdasdsadad";
          })}
        </>
      ) : (
        <>
          <Text
            fontSize="24"
            bold={false}
            content="Es sind noch keine Rezepte vorhanden."
            light={true}
            heading={true}
          ></Text>
          <br />
          <Button
            value="Neues Rezept anlegen"
            right={false}
            onClick={() => openNewRecipe()}
          ></Button>
        </>
      )}
    </>
  );
};

export default RecipesList;
