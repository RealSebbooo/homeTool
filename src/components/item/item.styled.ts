import styled from "styled-components";
import theme, { device } from "./../theme";

export type ItemBoxProps = {
  isRecent: boolean;
};
export const ItemBox = styled.div<ItemBoxProps>`
  background-color: ${({ isRecent }) =>
    isRecent ? theme.surface : theme.primary};
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
type InnerBoxType = {
  hasBadge?: boolean;
};
export const ItemInnerBox = styled.div<InnerBoxType>`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: ${({ hasBadge }) => (hasBadge ? "20%" : "30%")};
`;

export const ArticleText = styled.p`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.white};
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
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

export const ItemWrapper = styled.div`
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
export const Badge = styled.div`
  position: absolute;
  margin-top: 80px;
  margin-left: 4px;
  height: 20px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 14px;
  border-radius: 25px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: ${theme.white};
  background-color: rgba(0, 0, 0, 0.25);
`;
