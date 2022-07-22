import styled from "styled-components";
import theme, { device } from "../../components/theme";

export const Card = styled.div`
  background-color: white;
  padding: 8px;
  width: 100%;
  @media ${device.tablet} {
    width: 50%;
  }
  border: 1px solid black;
`;
export const Header = styled.div<{ color?: string }>`
  background-color: ${({ color }) => color};
  border: 2px solid black;
  color: ${({ color }) => (color === "#100615" ? "white" : "black")};
  padding: 30px 4px;
  p {
    font-weight: bold;
    font-size: 24px;
  }
  span {
    padding: 0;
    margin-top: -10px;
  }
  display: flex;

  flex-direction: column;
  align-items: center;
`;
export const Miete = styled.div`
  margin-top: 4px;
`;
export const Footer = styled.div``;

export const Row = styled.div<{ activeRow?: boolean }>`
  display: flex;
  color: black;
  padding: 4px 8px;
  font-size: 22px;
  border: ${({ activeRow }) => (activeRow ? `2px solid ${theme.green}` : "")};
`;

export const LeftCol = styled.div`
  width: 70%;
`;
export const RightCol = styled.div`
  width: 30%;
  text-align: right;
`;

export const HorizontalLine = styled.div`
  background-color: ${theme.surface};
  height: 1px;
  margin: 8px 0;
`;
