import React, { FC } from "react";
import Icon from "../../icons";
import { ArticleText, ItemBox, ItemInnerBox, Badge } from "./item.styled";

type ItemProps = {
  articleTextValue: string;
  emitClick?: () => void;
  emitHold?: () => void;
  emitMouseDown?: () => void;
  emitMouseUp?: () => void;
  emitTouchStart?: () => void;
  emitTouchEnd?: () => void;
  isRecent?: boolean;
  tag?: string;
};
const Item: FC<ItemProps> = ({
  articleTextValue,
  emitClick,
  emitMouseDown,
  emitMouseUp,
  emitTouchStart,
  emitTouchEnd,
  isRecent,
  tag,
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
      <ItemInnerBox hasBadge={tag ? true : false}>
        <Icon name="a" light={true} />
        <ArticleText>{articleTextValue}</ArticleText>
      </ItemInnerBox>
      {tag && <Badge>{tag}</Badge>}
    </ItemBox>
  );
};

export default Item;
