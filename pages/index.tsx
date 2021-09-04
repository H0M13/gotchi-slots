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
  PayoutsDisplay,
  OddsDisplay,
  JackpotBalance,
} from "components/sections";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs"
import 'react-tabs/style/react-tabs.css';

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

const MainGrid = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: max-content 80px;
  grid-template-areas:
    "jackpot handle ."
    "spinner handle gotchi"
    "oddsAndPayouts oddsAndPayouts balance";
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

const StyledOddsPayoutsContainer = styled.div`
  grid-area: oddsAndPayouts;
  padding: 40px;
`;

const StyledBalance = styled(FakeTokenBalance)`
  grid-area: balance;
  align-self: baseline;
`;

const StyledTabPanel = styled(TabPanel)`
  min-width: 600px;
`;

const Name = styled.h1`
font-style: italic;
font-size: 8vw;
background-color: #04B7BC;
color: ${({ theme }) => theme.colors.primary};
display: block;
box-sizing: border-box;
margin-bottom: 0;
padding: .5em;
&:nth-child(2) {
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #04B7BC;
  clip-path: inset(-1% -1% 50% -1%);
}
`

const NameBox = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
  box-sizing: border-box;box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
`

const Home = () => {
  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiIndex },
  } = useAavegotchi();

  return (
    <Layout>
      <NameBox>
      <Name>1 ARM BAANDIT</Name>
      <Name>1 ARM BAANDIT</Name>
      </NameBox>
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
        <StyledOddsPayoutsContainer>
        <Tabs>
          <TabList>
            <Tab>Payouts</Tab>
            <Tab>Odds</Tab>
          </TabList>
          <StyledTabPanel>
            <PayoutsDisplay />
          </StyledTabPanel>
          <StyledTabPanel>
            <OddsDisplay />
          </StyledTabPanel>
        </Tabs>
        </StyledOddsPayoutsContainer>
      </MainGrid>
    </Layout>
  );
};

export default Home;
