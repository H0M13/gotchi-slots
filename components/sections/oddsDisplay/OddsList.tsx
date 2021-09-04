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
`;

export const OddsList = ({
  odds1,
  odds2,
  odds5,
  odds25,
  odds100,
  oddsJackpot,
}) => {
  return (
    <Container>
      <Payout>
        <span>1: </span>
        <span>{odds1}</span>
      </Payout>
      <Payout>
        <span>2: </span>
        <span>{odds2}</span>
      </Payout>
      <Payout>
        <span>5: </span>
        <span>{odds5}</span>
      </Payout>
      <Payout>
        <span>25: </span>
        <span>{odds25}</span>
      </Payout>
      <Payout>
        <span>100: </span>
        <span>{odds100}</span>
      </Payout>
      <Payout>
        <span>Jackpot: </span>
        <span>{oddsJackpot}</span>
      </Payout>
    </Container>
  );
};
