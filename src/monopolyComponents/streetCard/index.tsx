import React, { FC } from "react";
import { StreetType } from "../../services/streets";
import {
  Card,
  Footer,
  Header,
  HorizontalLine,
  LeftCol,
  Miete,
  RightCol,
  Row,
} from "./styled";

type StreetCardType = {
  street: StreetType;
};
const StreetCard: FC<StreetCardType> = ({ street }) => {
  return (
    <Card>
      <Header color={street?.farbe}>
        <p>{street.name.toUpperCase()}</p>
        {street.takenBy && <span>Gehört {street.takenBy}</span>}
      </Header>
      {street.straße && (
        <Miete>
          <Row>
            <LeftCol>Miete</LeftCol>
            <RightCol>{street?.miete}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete bei ganzer Farbgruppe</LeftCol>
            <RightCol>{street?.mieteGesamt}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 1 Haus</LeftCol>
            <RightCol>{street?.miete1Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 2 Häuser</LeftCol>
            <RightCol>{street?.miete2Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 3 Häuser</LeftCol>
            <RightCol>{street?.miete3Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 4 Häuser</LeftCol>
            <RightCol>{street?.miete4Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete Hotel</LeftCol>
            <RightCol>{street?.mieteHotel}</RightCol>
          </Row>
        </Miete>
      )}
      {street.bahnhof && (
        <Miete>
          <Row>
            <LeftCol>Miete</LeftCol>
            <RightCol>{street?.miete1Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 2 Bahnhöfe</LeftCol>
            <RightCol>{street?.miete2Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 3 Bahnhöfe</LeftCol>
            <RightCol>{street?.miete3Haus}</RightCol>
          </Row>
          <Row>
            <LeftCol>Miete 4 Bahnhöfe</LeftCol>
            <RightCol>{street?.miete4Haus}</RightCol>
          </Row>
        </Miete>
      )}

      {street.sonderstraße && (
        <Miete>
          <Row>
            Wenn man ein Versorgungswerk besitzt, so ist die Miete 4-mal so
            hoch, wie Augen auf den zwei Würfeln sind.
          </Row>
          <Row>
            Wenn man beide Versorgungswerke besitzt, so ist die Miete 10-mal so
            hoch, wie Augen auf den zwei Würfeln sind.
          </Row>
        </Miete>
      )}

      {street.straße && (
        <>
          <HorizontalLine></HorizontalLine>
          <Footer>
            <Row>
              <LeftCol>1 Haus kostet</LeftCol>
              <RightCol>{street?.bauenKosten}</RightCol>
            </Row>
            <Row>
              <LeftCol>
                1 Hotel kostet
                <br />
                (+ 4 Häuser)
              </LeftCol>
              <RightCol>{street?.bauenKosten}</RightCol>
            </Row>
          </Footer>
        </>
      )}
    </Card>
  );
};
export default StreetCard;
