import React, { useState } from "react";
import { Button } from "components/ui";
import { styled } from "theme";
import { OddsList } from "./OddsList";

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

const StyledCollateralsImgsContainer = styled.div`
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
`

const Lore = styled.span`
    text-align: center;
    font-style: italic;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.secondary};
    padding: 20px;
`

export const OddsDisplay = ({ className = "" }: any) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const renderCollaterals = () => {
    switch (currentTab) {
      case 0:
        return (
          <StyledCollateralsImgsContainer>
            <StyledCollateralsImg src={"assets/collaterals/dai.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/usdt.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/tusd.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/usdc.svg"} />
          </StyledCollateralsImgsContainer>
        );
      case 1:
        return (
          <StyledCollateralsImgsContainer>
            <StyledCollateralsImg src={"assets/collaterals/eth.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/btc.svg"} />
          </StyledCollateralsImgsContainer>
        );
      case 2:
        return (
          <StyledCollateralsImgsContainer>
            <StyledCollateralsImg src={"assets/collaterals/matic.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/uni.svg"} />
          </StyledCollateralsImgsContainer>
        );
      case 3:
        return (
          <StyledCollateralsImgsContainer>
            <StyledCollateralsImg src={"assets/collaterals/link.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/yfi.svg"} />
            <StyledCollateralsImg src={"assets/collaterals/aave.svg"} />
          </StyledCollateralsImgsContainer>
        );
    }
  };


  const renderLore = () => {
    switch (currentTab) {
        case 0:
          return (
            <Lore>Stablecoin spirit force empowers your gotchi with safer odds. You have a greater chance of winning every spin but a lower chance of winning higher prizes.</Lore>
          );
        case 1:
          return (
            <Lore>BTC or ETH spirit forces give your gotchi partial degen powers. You have slightly higher odds of winning the top prizes but also slightly higher odds of spinning a loss.</Lore>
          );
        case 2:
          return (
            <Lore>MATIC or UNI spirit force gives your gotchi medium degen powers. You have higher odds of winning the top prizes but also higher odds of spinning a loss.</Lore>
          );
        case 3:
          return (
            <Lore>LINK, YFI and AAVE spirit forces give your gotchi full degen powers. You have the highest odds of winning the top prizes but also the highest odds of spinning a loss.</Lore>
          );
      }
  }

  const renderOdds = () => {
    switch (currentTab) {
      case 0:
        return (
          <OddsList
            odds1={0.25}
            odds2={0.125}
            odds5={0.033}
            odds25={0.007}
            odds100={0.0015}
            oddsJackpot={0.00001}
          />
        );
      case 1:
        return (
          <OddsList
            odds1={0.225}
            odds2={0.105}
            odds5={0.031}
            odds25={0.008}
            odds100={0.002}
            oddsJackpot={0.00001}
          />
        );
      case 2:
        return (
          <OddsList
            odds1={0.191}
            odds2={0.092}
            odds5={0.028}
            odds25={0.009}
            odds100={0.0025}
            oddsJackpot={0.00001}
          />
        );
      case 3:
        return (
          <OddsList
            odds1={0.16}
            odds2={0.0775}
            odds5={0.025}
            odds25={0.01}
            odds100={0.003}
            oddsJackpot={0.00001}
          />
        );
    }
  };

  const handleLeftClick = () => {
    const newValue = currentTab === 0 ? 3 : currentTab - 1;
    setCurrentTab(newValue);
  };

  const handleRightClick = () => {
    const newValue = currentTab === 3 ? 0 : currentTab + 1;
    setCurrentTab(newValue);
  };

  return (
    <Container className={className}>
      <ButtonsContainer>
        <Button onClick={handleLeftClick}>{"<<"}</Button>
        <Button onClick={handleRightClick}>{">>"}</Button>
      </ButtonsContainer>
      {renderCollaterals()}
      {renderLore()}
      {renderOdds()}
      <StyledHeading>Your gotchi's collateral type gives you different odds in the smart contract!</StyledHeading>
      <StyledHeading>Check this table to see the odds you're playing with.</StyledHeading>
      <StyledHeading>Note that the total payout remains the same (99.5%) for all collateral types.</StyledHeading>
    </Container>
  );
};
