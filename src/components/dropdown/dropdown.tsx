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
  activeItem: ListDropdownItems;
  itemClicked: (item: string) => void;
  isOpen: boolean;
  setIsOpen: (value) => void;
};
const Dropdown: FC<DropdownProps> = ({
  activeItem,
  items,
  itemClicked,
  isOpen,
  setIsOpen,
}) => {
  const toggling = () => setIsOpen(!isOpen);
  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>{activeItem?.name}</DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {items.map((item, key: number) => {
              return (
                <ListItem key={key} onClick={() => itemClicked(item.id)}>
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
