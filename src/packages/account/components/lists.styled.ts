import styled from "styled-components";
import theme from "../../../components/theme";

export const ListWrapper = styled.div``;

export const ListInnerWrapper = styled.div`
  margin: 4px;
  border: 1px solid white;
`;

export const ListItem = styled.div`
  margin-left: 4px;
  display: flex;
  justify-content: space-between;
`;
export const ModalCard = styled.div`
  margin: 8px 16px;
`;

export const UserBox = styled.div`
  border: 1px solid white;
  padding: 4px;
`;

export const UserBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Member = styled.div`
  margin-bottom: 4px;
  justify-content: space-between;
  display: flex;
`;

export const MemberList = styled.div`
  display: block;
  width: 100%;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 8px 0;
`;
