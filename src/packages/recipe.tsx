import React, { FC, useEffect, useState } from "react";
import Title from "../components/title";
import { getRecipesFromDatabase } from "../services/databaseHelper";
import { RecipesType } from "../types";
import {
  HorizontalLine,
  RecipeActions,
  RecipeWrapper,
  PortionsWrapper,
  ArticlesWrapper,
} from "../styles/recipe.styled";
import Textfield from "../components/textfield";
import Button from "../components/button";
import { navigate, PageProps } from "gatsby";
import Text from "../components/text";

const Recipe: FC<PageProps> = ({ location }) => {
  if (typeof window == "undefined") return;
  const search = location.search?.substring(1);
  const [isNewItem, setIsNewItem] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipesType>();

  const emptyItem: RecipesType = {
    uid: "",
    name: "Neues Rezept",
    image: "",
    description: "",
    ingredients: [],
    portions: "4",
  };
  useEffect(() => {
    getRecipesList();
  }, []);

  const getRecipesList = async () => {
    if (typeof window == "undefined") return;
    const userRecipesList = JSON.parse(
      localStorage.getItem("htUser") || ""
    )?.recipe;
    const recipes = await getRecipesFromDatabase(userRecipesList);
    if (recipes?.recipes?.length === 0) {
      return activateNewItem();
    }
    const tempRecipe = recipes?.recipes?.find(
      (recipe) => recipe.uid === search.split("=")[1]
    );

    if (tempRecipe) {
      setSelectedRecipe(JSON.parse(JSON.stringify(tempRecipe)));
    } else {
      activateNewItem();
    }
  };

  const activateNewItem = () => {
    setSelectedRecipe(JSON.parse(JSON.stringify(emptyItem)));
    setIsNewItem(true);
  };

  const nameChanged = (name: string) => {
    if (selectedRecipe) selectedRecipe.name = name;
  };
  const portionsChanged = (portions: string) => {
    if (selectedRecipe) selectedRecipe.portions = portions;
  };
  const saveNewItem = () => {
    console.log("save");
  };
  return (
    <>
      {isNewItem.toString()}
      <Title titleText="Rezept" backButton={true} to="/rezepte"></Title>
      <RecipeWrapper>
        <Textfield
          type="text"
          placeholder="Name"
          value={selectedRecipe?.name}
          textInputChanged={(value) => nameChanged(value)}
        ></Textfield>
        <img
          src="https://www.lieferando.de/foodwiki/uploads/sites/8/2018/01/pizza-3.jpg"
          alt=""
          width="100%"
        />
        <div>
          <Text
            fontSize="22"
            bold={false}
            content="Beschreibung"
            light={true}
            heading={true}
          ></Text>
          <br />
          <Text
            fontSize="16"
            bold={false}
            content="
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim sunt modi veritatis laborum est corrupti perferendis dolorum nulla? Alias, amet maiores inventore deserunt labore hic eaque quidem obcaecati non nostrum, provident commodi unde optio molestiae nam saepe repellat molestias sint omnis a blanditiis. Quasi sunt sint voluptate quam molestiae amet hic, dolore fugiat aperiam excepturi eum fugit rem dicta quia, ratione neque nam blanditiis nesciunt accusantium ipsum in tempora aliquid modi. Rerum id provident quos architecto minus non repudiandae quis! Velit odio molestiae et consequuntur eveniet quibusdam officia, fugiat suscipit dicta, animi deleniti maiores pariatur fugit aut laborum ex alias?"
            light={true}
          ></Text>
        </div>
        <HorizontalLine></HorizontalLine>
        <PortionsWrapper>
          <Text
            fontSize="22"
            bold={false}
            content="Portionen"
            light={true}
            heading={true}
          ></Text>
          <Textfield
            type="number"
            placeholder="Portionen"
            value={selectedRecipe?.portions}
            textInputChanged={(value) => portionsChanged(value)}
          ></Textfield>
        </PortionsWrapper>
        <HorizontalLine></HorizontalLine>
        <ArticlesWrapper>
          <Text
            fontSize="22"
            bold={false}
            content="Zutaten"
            light={true}
            heading={true}
          ></Text>
        </ArticlesWrapper>
        <RecipeActions>
          <Button
            value="Abbrechen"
            onClick={() => navigate("/rezepte")}
          ></Button>
          <Button value="Speichern" onClick={() => saveNewItem()}></Button>
        </RecipeActions>
      </RecipeWrapper>
    </>
  );
};

export default Recipe;
