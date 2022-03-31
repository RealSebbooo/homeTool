import styled from "styled-components";
import { device } from "./../theme";

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
