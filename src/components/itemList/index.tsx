import React from "react";
import styled from "styled-components";
import theme, { breakpoints, device } from "./../theme";

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;

  @media ${device.mobile} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${device.laptopL} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media ${device.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
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
const ItemList = () => {
  return (
    <ItemWrapper>
      {items?.map((item, key) => (
        <ItemBox key={key}>{item.name}</ItemBox>
      ))}
    </ItemWrapper>
  );
};

export default ItemList;
