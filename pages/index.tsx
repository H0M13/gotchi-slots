import React from "react";
import { Layout } from "components/sections/layout";
import { styled } from "theme";
import { Panel } from "components/ui";
import { GotchiSVG } from "components/ui";
import SlotMachine from "../components/sections/Spinner/SlotMachine";
import { useAavegotchi } from "context/AavegotchiContext";
import {
  RoflCommon,
  RoflUncommon,
  RoflRare,
  RoflLegendary,
  RoflMythical,
  RoflGodlike,
  Coconut,
  Diamond,
  EthCoin,
  Fireball,
  GhstToken,
  Kinship,
  KinshipGreater,
  Xp,
  XpGreater,
  Martini,
  Milkshake,
  Sushi,
} from "components/ui/slotsIcons";
import {
  FakeTokenBalance,
  AddFakeFunds,
  RequestRandomness,
  OddsDisplay,
  JackpotBalance,
} from "components/sections";

const Grid = styled.section`
  display: grid;
  gap: 3.2rem;

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQueries.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.a`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.light2};
  padding: 2.4rem;
  color: ${({ theme }) => theme.colors.dark0};

  :hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primaryAccent};
  }

  p {
    margin: 0;
  }
`;

const Tree = styled.div`
  background-image: url("/assets/tree.png");
  height: 300px;
  width: 300px;
  background-size: 300px;
  background-repeat: no-repeat;
`;

const GotchiContainer = styled.div`
  width: 300px;
`;


const Background = styled.div`
  display: inline-block;
  width: 600px;
  height: 500px;
  position: absolute;
  z-index: -1;
  top: 250px;
  border-radius: 5px;
  border: solid #2b1d0e 4px;
  background: brown url('./wood2.png') repeat;
  background-size: 300px;
`;


const MainGrid = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: max-content 80px;
  grid-template-areas:
    "jackpot handle ."
    "spinner handle gotchi"
    "odds odds balance";
`;

const StyledSlotMachine = styled(SlotMachine)`
  grid-area: spinner;
`;

const StyledJackpot = styled(JackpotBalance)`
  grid-area: jackpot;
`;

const StyledGotchiContainer = styled(GotchiContainer)`
  grid-area: gotchi;
`;

const StyledOdds = styled(OddsDisplay)`
  grid-area: odds;
`;

const StyledBalance = styled(FakeTokenBalance)`
  grid-area: balance;
`;

const Home = () => {
  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiIndex },
  } = useAavegotchi();

  return (
    <Layout>
      <MainGrid>
        <StyledJackpot />
        <StyledSlotMachine />
        {usersAavegotchis && (
          <StyledGotchiContainer>
            <GotchiSVG
              tokenId={usersAavegotchis[selectedAavegotchiIndex].id}
              options={{ removeBg: true, animate: true }}
            />
          </StyledGotchiContainer>
        )}
        <StyledBalance />
        <AddFakeFunds />
        <RequestRandomness />
        <StyledOdds />
        <Background />
      </MainGrid>
      {/* <Panel>
        <Grid>
          <AddFakeFunds />
          <RequestRandomness />
        </Grid>
      </Panel>
      <Tree /> */}
    </Layout>
  );
};

export default Home;
