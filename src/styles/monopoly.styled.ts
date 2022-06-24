import styled from "styled-components";
import Button from "../components/button";
import theme from "../components/theme";

export const MoneyContainer = styled.div``;

export const PlayerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
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
