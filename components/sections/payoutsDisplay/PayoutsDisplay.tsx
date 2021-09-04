import React, { useState } from "react";
import { Button } from "components/ui";
import { styled } from "theme";
// import { OddsList } from "./OddsList";
import {
  RoflCommon,
  RoflUncommon,
  RoflRare,
  RoflLegendary,
  RoflMythical,
  RoflGodlike,
} from "components/ui/slotsIcons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  max-width: 600px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledSpinItemsImgsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledCollateralsImg = styled.img`
  width: 50px;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Payout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 500px;
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
`;

const Odds = styled.span`
  font-size: 2.4rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const PayoutsDisplay = ({ className = "" }: any) => {
  return (
    <Container className={className}>
      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflCommon width={40} />
          <RoflCommon width={40} />
          <RoflCommon width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>1</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflUncommon width={40} />
          <RoflUncommon width={40} />
          <RoflUncommon width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>2</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflRare width={40} />
          <RoflRare width={40} />
          <RoflRare width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>5</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflRare width={40} />
          <RoflRare width={40} />
          <RoflRare width={40} />
          <RoflRare width={40} />
          <RoflRare width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>25</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflLegendary width={40} />
          <RoflLegendary width={40} />
          <RoflLegendary width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>25</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflMythical width={40} />
          <RoflMythical width={40} />
          <RoflMythical width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>25</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflLegendary width={40} />
          <RoflLegendary width={40} />
          <RoflLegendary width={40} />
          <RoflLegendary width={40} />
          <RoflLegendary width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>100</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflMythical width={40} />
          <RoflMythical width={40} />
          <RoflMythical width={40} />
          <RoflMythical width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>100</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflGodlike width={40} />
          <RoflGodlike width={40} />
          <RoflGodlike width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>100</Amount>
        </AmountContainer>
      </Payout>

      <Payout>
        <StyledSpinItemsImgsContainer>
          <RoflGodlike width={40} />
          <RoflGodlike width={40} />
          <RoflGodlike width={40} />
          <RoflGodlike width={40} />
          <RoflGodlike width={40} />
        </StyledSpinItemsImgsContainer>
        <Arrow>{">>"}</Arrow>
        <AmountContainer>
          <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
          <Amount>Jackpot</Amount>
        </AmountContainer>
      </Payout>
    </Container>
  );
};
