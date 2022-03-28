import React from "react";
import styled from "styled-components";
import theme, { breakpoints } from "./../theme";

type ItemWrapperProps = {
  windowWidth: number;
};
const ItemWrapper = styled.div<ItemWrapperProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  grid-template-columns: ${({ windowWidth }) =>
    windowWidth <= breakpoints.xl && "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"};
  grid-template-columns: ${({ windowWidth }) =>
    windowWidth <= breakpoints.lg && "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"};
  grid-template-columns: ${({ windowWidth }) =>
    windowWidth <= breakpoints.md && "1fr 1fr 1fr 1fr 1fr"};
  grid-template-columns: ${({ windowWidth }) =>
    windowWidth <= breakpoints.sm && "1fr 1fr 1fr 1fr"};
  grid-template-columns: ${({ windowWidth }) =>
    windowWidth <= breakpoints.xs && "1fr 1fr 1fr"};
`;
const ItemBox = styled.div`
  background-color: ${theme.primary};
  aspect-ratio: 1;
  border-radius: 4px;
`;

const items = [];

for (let i = 0; i < 50; i++) {
  items.push({
    name: "Mehl",
    category: "mehl",
    unit: "KG",
    icon: "asdasd",
    added: new Date().toLocaleDateString(),
  });
}
console.log("items", items);
const isBrowser = () => typeof window !== "undefined";
const windowWidth = isBrowser() ? window.innerWidth : 0;
const ItemList = () => {
  return (
    <ItemWrapper windowWidth={windowWidth}>
      {items?.map((item, key) => (
        <ItemBox key={key}>{item.name}</ItemBox>
      ))}
    </ItemWrapper>
  );
};

export default ItemList;
