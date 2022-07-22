import styled from "styled-components";
import Button from "../components/button";
import theme, { device } from "../components/theme";
import { StreetColors } from "../services/streets";

export const MoneyContainer = styled.div``;

export const PlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  @media ${device.mobile} {
    grid-template-columns: 1fr;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
type PlayerCardType = {
  isUserBankrupt: boolean;
};
export const PlayerCard = styled.div<PlayerCardType>`
  background-color: ${({ isUserBankrupt }) =>
    isUserBankrupt ? theme.red : theme.green};
  margin-bottom: 8px;
  margin-left: 0;
  padding: 8px;
  aspect-ratio: 3;
  min-width: 20%;
`;
export const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 20px 0;
`;
export const PlayerInnerBox = styled.div`
  margin-right: auto;
  margin-left: auto;
  position: relative;
`;

export const BankWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const From = styled.div``;
export const Amount = styled.div``;
export const To = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  flex: wrap;
  justify-content: space-between;
`;

export const EndButton = styled(Button)`
  position: absolute;
  top: 0;
`;
export const SettingsButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
`;
export const Tab = styled.div<{ active: boolean }>`
  margin-right: 8px;
  border: 1px solid grey;
  padding: 8px;
  background-color: ${({ active }) => active && "grey"};
`;

export const TabsContents = styled.div`
  display: flex;
`;
export const TabContent = styled.div<{ shown: boolean }>`
  display: flex;
  padding: 8px;
  margin-top: 10px;
  width: 100%;
  display: ${({ shown }) => (shown ? "block" : "none")};
`;

export const StreetsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const StreetGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StreetComp = styled.div<{
  color: StreetColors;
  isTaken: undefined | boolean;
}>`
  aspect-ratio: 1;
  width: 7vw;

  @media ${device.tablet} {
    width: 5vw;
  }

  background-color: ${({ color }) => color};
  border: 2px solid white;
  box-shadow: 0px -2px 4px 1px ${({ isTaken }) => (typeof isTaken === "undefined" ? "rgba(255, 255, 255, 1)" : !isTaken ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 0, 1)")};
  &:not(:first-child) {
    margin-top: -10px;
  }
  display: flex;
  justify-content: start;
`;

export const StreetWrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
    display: flex;
    width: 100%;
  }
  margin-top: 20px;
`;

export const Trade = styled.div`
  margin-top: 16px;
  width: 100%;
  display: block;
  @media ${device.tablet} {
    display: flex;
  }
`;

export const TradeFrom = styled.div`
  border: 1px solid grey;
  padding: 8px;
  width: 100%;
  margin: 4px;
  @media ${device.tablet} {
    width: 50%;
  }
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
export const TradeTo = styled(TradeFrom)``;
export const TotalValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100%;
  margin-top: 20px;
`;

export const TradeActions = styled.div`
  margin-top: 30px;
`;

export const TradeStreet = styled.div<{ color?: string }>`
  padding: 8px;
  background-color: ${({ color }) => color};
  color: ${({ color }) => (color === "#100615" ? "white" : "black")};
  border: 1px solid gray;
  margin-bottom: -1px;
`;
export const Haus = styled.div<{ hotel?: boolean }>`
  background-color: ${({ hotel }) => (hotel ? "red" : "green")};
  border: 1px solid white;
  width: 15%;
  height: 15%;
  aspect-ratio: 1;
  margin-right: 2px;
`;
export const BuildMenu = styled.div`
  width: 100%;
  @media ${device.tablet} {
    width: 50%;
  }
`;
