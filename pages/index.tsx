import React from "react";
import { Layout } from "components/sections/layout";
import { styled } from "theme";
import { Panel } from "components/ui";
import { GotchiSVG } from "components/ui";
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
      {/* <Panel>
        <h1>Aavegotchi Moralis Next.js</h1>
        <p>
          Get started by editing <b>pages/index.tsx</b>.
        </p>
        <Grid>
          <Card
            href="https://nextjs.org/docs/basic-features/pages"
            target="_blank"
          >
            <h3>Next.js Documentation</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </Card>
          <Card href="https://docs.moralis.io/" target="_blank">
            <h3>Moralis Documentation</h3>
            <p>
              Learn about Moralis' suite of features for easy web3 integration.
            </p>
          </Card>
          <Card
            href="https://docs.aavegotchi.com/diamond-facets/aavegotchifacet.sol"
            target="_blank"
          >
            <h3>Aavegotchi Diamond</h3>
            <p>
              Search the Aavegotchi dev wiki for the various contract methods.
            </p>
          </Card>
          <Card href="https://styled-components.com/" target="_blank">
            <h3>Styled components</h3>
            <p>
              Learn about the CSS-in-JS tool that bridges the gap between
              components and styling.
            </p>
          </Card>
        </Grid>
      </Panel> */}
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
