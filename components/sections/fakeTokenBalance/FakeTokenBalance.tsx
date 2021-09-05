import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractCall } from "actions/web3";
import { styled } from "theme" 
import { useAavegotchi } from "context/AavegotchiContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

const Amount = styled.span`
  font-size: 3.5rem;
  color: #000;
`

export const FakeTokenBalance = ({ className = ""}: any) => {
  const { user, web3 } = useMoralis();

  const {
    state: { tokensWonThisSession },
  } = useAavegotchi();

  const [amount, setAmount] = useState<string>("0");
  const [initialAmount, setInitialAmount] = useState<string>("0")

  const loadFakeTokensAmount = async () => {
    if (!user || !web3) return;
    const userAcount = user.attributes.accounts[0];
    const res = await useSlotsContractCall<string>(web3, {
      name: "addressToFakeTokens",
      parameters: [userAcount],
    });
    setAmount(res);
    setInitialAmount(res);
  };

  useEffect(() => {
    if (user && web3) {
      loadFakeTokensAmount();
    }
  }, [user, web3]);

  useEffect(() => {
    console.log(tokensWonThisSession)
    setAmount((parseFloat(initialAmount) + tokensWonThisSession).toString())
  }, [tokensWonThisSession])

  return (
    <Container className={className}>
      <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
      <Amount>{parseFloat((web3.utils.fromWei(amount))).toFixed(2)}</Amount>
    </Container>
  );
};
