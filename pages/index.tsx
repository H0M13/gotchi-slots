import React from "react";
import { Layout } from "components/sections/layout";
import { styled } from "theme";
import { Panel } from "components/ui";
import { GotchiSVG } from "components/ui";
import SlotMachine from '../components/sections/Spinner/SlotMachine';
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
import { FakeTokenBalance, AddFakeFunds, RequestRandomness, ExecuteSpins, OddsDisplay } from "components/sections"

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

const GotchiContainer = styled.div`
  width: 300px;
`;

const Home = () => {
  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiIndex },
  } = useAavegotchi();

  return (
    <Layout>
      <SlotMachine />
      <Panel>
        <Grid>
          <AddFakeFunds />
          <RequestRandomness />
          <ExecuteSpins />
        </Grid>
      </Panel>
      <FakeTokenBalance />
      <OddsDisplay />
      {usersAavegotchis && (
        <GotchiContainer>
          <GotchiSVG
            tokenId={usersAavegotchis[selectedAavegotchiIndex].id}
            options={{ removeBg: true, animate: true }}
          />
        </GotchiContainer>
      )}
      <RoflCommon height={60} />
      <RoflUncommon height={60} />
      <RoflRare height={60} />
      <RoflLegendary height={60} />
      <RoflMythical height={60} />
      <RoflGodlike height={60} />
      <Coconut height={60} />
      <Diamond height={60} />
      <EthCoin height={60} />
      <Fireball height={60} />
      <GhstToken height={60} />
      <Kinship height={60} />
      <KinshipGreater height={60} />
      <Xp height={60} />
      <XpGreater height={60} />
      <Martini height={60} />
      <Milkshake height={60} />
      <Sushi height={60} />
    </Layout>
  );
};

export default Home;
