import styled from "styled-components";
import Button from "../components/button";

export const MoneyContainer = styled.div``;

export const PlayerWrapper = styled.div`
  display: flex;
  flex: wrap;
`;
export const PlayerCard = styled.div`
  background-color: grey;
  margin: 8px;
  margin-left: 0;
  padding: 8px;
  aspect-ratio: 3;
  min-width: 20%;
`;
export const PlayerInnerBox = styled.div`
  margin-right: auto;
  margin-left: auto;
  position: relative;
`;

export const BankWrapper = styled.div`
  display: flex;
  flex: wrap;
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
