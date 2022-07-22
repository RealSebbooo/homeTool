import React, { FC, useEffect, useState } from "react";
import { ListDropdownItems } from "../itemList";
import {
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownListContainer,
  ListItem,
} from "./dropdown.styled";

type DropdownProps = {
  items: ListDropdownItems[];
  activeItem?: ListDropdownItems;
  itemClicked: (item: string) => void;
};
const Dropdown: FC<DropdownProps> = ({ activeItem, items, itemClicked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>{activeItem?.name}</DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {items.map((item, key: number) => {
              return (
                <ListItem
                  backgroundColor={item?.color}
                  key={key}
                  onClick={() => {
                    itemClicked(item.id);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </ListItem>
              );
            })}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
