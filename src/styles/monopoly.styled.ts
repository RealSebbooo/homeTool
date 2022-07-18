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
  justify-content: space-between;
`;

export const StreetGroups = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StreetComp = styled.div<{ color: StreetColors; isTaken: boolean }>`
  aspect-ratio: 1;
  min-width: 55px;
  background-color: ${({ color }) => color};
  border: 2px solid white;
  box-shadow: 0px -2px 4px 1px ${({ isTaken }) => (isTaken ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 0, 1)")};
  &:not(:first-child) {
    margin-top: -15px;
  }
`;
