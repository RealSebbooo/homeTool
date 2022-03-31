import React, { FC } from "react";
import Icon from "../../icons";
import { ArticleText, ItemBox, ItemInnerBox } from "./item.styled";

type ItemProps = {
  articleTextValue: string;
  emitClick?: () => void;
  emitHold?: () => void;
  emitMouseDown?: () => void;
  emitMouseUp?: () => void;
  emitTouchStart?: () => void;
  emitTouchEnd?: () => void;
  isRecent?: boolean;
};
const Item: FC<ItemProps> = ({
  articleTextValue,
  emitClick,
  emitMouseDown,
  emitMouseUp,
  emitTouchStart,
  emitTouchEnd,
  isRecent,
}) => {
  return (
    <ItemBox
      isRecent={isRecent}
      onClick={emitClick}
      onMouseDown={emitMouseDown}
      onMouseUp={emitMouseUp}
      onTouchStart={emitTouchStart}
      onTouchEnd={emitTouchEnd}
    >
      <ItemInnerBox>
        <Icon name="a" light={true} />
        <ArticleText>{articleTextValue}</ArticleText>
      </ItemInnerBox>
    </ItemBox>
  );
};

export default Item;
