import React, { useState } from "react";
import styled from "styled-components";
import theme, { device } from "./../theme";
import Icon from "./../../icons";

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
`;
const ItemBox = styled.div`
  background-color: ${theme.primary};
  aspect-ratio: 1;
  border-radius: 4px;

  border: none;
  color: white;
  text-align: center;
  align-content: center;
  text-decoration: none;
  display: flex;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`;

const ItemInnerBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 30%;
`;

const Text = styled.p`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: auto;
  margin-right: auto;
  @media ${device.mobile} {
    max-width: 110px;
  }

  @media ${device.tablet} {
    max-width: 100px;
  }

  @media ${device.laptop} {
    max-width: 90px;
  }

  word-break: break-all;
`;
const items = [];

for (let i = 0; i < 50; i++) {
  items.push({
    name: "Paulaner Spezi",
    category: "mehl",
    unit: "KG",
    icon: "asdasd",
    added: new Date().toLocaleDateString(),
    id: i,
  });
}
console.log("items", items);

const ItemList = () => {
  const intervalRef = React.useRef(null);
  const [isHoldModal, setIsHoldModal] = useState(false);

  React.useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  // functions -----------------------------------

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setTimeout(() => {
      console.log("hold");
      setIsHoldModal(true);
    }, 2000);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const removeItem = () => {
    if (!isHoldModal) {
      console.log("remoev");
    }
  };
  return (
    <ItemWrapper>
      {items?.map((item, key) => (
        <ItemBox
          key={key}
          onClick={removeItem}
          onMouseDown={startCounter}
          onMouseUp={stopCounter}
        >
          <ItemInnerBox>
            <Icon name="a" />
            <Text>{item.name}</Text>
          </ItemInnerBox>
        </ItemBox>
      ))}
    </ItemWrapper>
  );
};

export default ItemList;
