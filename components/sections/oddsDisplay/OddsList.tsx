import React from "react";
import { styled } from "theme";

export interface OddsListProps {
  odds1: number;
  odds2: number;
  odds5: number;
  odds25: number;
  odds100: number;
  oddsJackpot: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Payout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 360px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.span`
  font-size: 2rem;
`;

const Arrow = styled.span`
    font-size: 2rem;
`

const Odds = styled.span`
  font-size: 2.4rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const OddsList = ({
  odds1,
  odds2,
  odds5,
  odds25,
  odds100,
  oddsJackpot,
}) => {

    const toPercent = (amount: number) => `${Math.round((amount * 100) * 1000) / 1000}%`

  return (
    <Container>
      <Payout>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>1</Amount>
        </AmountContainer>
          <Arrow>{">>"}</Arrow>
        <Odds>{toPercent(odds1)}</Odds>
      </Payout>
      <Payout>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>2</Amount>
        </AmountContainer>
        <Arrow>{">>"}</Arrow>
        <Odds>{toPercent(odds2)}</Odds>
      </Payout>
      <Payout>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>5</Amount>
        </AmountContainer>
        <Arrow>{">>"}</Arrow>
        <Odds>{toPercent(odds5)}</Odds>
      </Payout>
      <Payout>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>25</Amount>
        </AmountContainer>
        <Arrow>{">>"}</Arrow>
        <Odds>{toPercent(odds25)}</Odds>
      </Payout>
      <Payout>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>100</Amount>
        </AmountContainer>
        <Arrow>{">>"}</Arrow>
        <Odds>{toPercent(odds100)}</Odds>
      </Payout>
      <Payout>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>Jackpot</Amount>
        </AmountContainer>
        <Arrow>{">>"}</Arrow>
        <Odds>{toPercent(oddsJackpot)}</Odds>
      </Payout>
    </Container>
  );
};
