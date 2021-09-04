import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractCall } from "actions/web3";
import { styled } from "theme";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Amount = styled.span`
  font-size: 3.5rem;
  color: #fff;
`;

export const JackpotBalance = () => {
  const { user, web3 } = useMoralis();

  const [amount, setAmount] = useState<string>("0");

  const loadJackpotAmount = async () => {
    const res = await useSlotsContractCall<string>(web3, {
      name: "jackpotAmount",
      parameters: [],
    });
    setAmount(res);
  };

  useEffect(() => {
    loadJackpotAmount()
    const interval = setInterval(() => {
        loadJackpotAmount();
    }, 3000);
    return () => clearInterval(interval);
  }, [user, web3]);

  return (
    <>
      <h2>Jackpot</h2>
      <Container>
        <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
        <Amount>{web3.utils.fromWei(amount)}</Amount>
      </Container>
    </>
  );
};
