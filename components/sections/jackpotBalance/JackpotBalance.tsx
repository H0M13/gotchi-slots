import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractCall } from "actions/web3";
import { styled } from "theme";

const Flex = styled.div`
    display: flex;
    align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Amount = styled.span`
  font-size: 3.5rem;
  color: #000;
`;

const JackpotLabel = styled.span`
    font-size: 2.5rem;
`

export const JackpotBalance = ({ className = ""}: any) => {
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
    <Flex className={className}>
      <JackpotLabel>Jackpot</JackpotLabel>
      <Container>
        <img src="/assets/gifs/ghst_doubleside.gif" width="80" />
        <Amount>{web3.utils.fromWei(amount)}</Amount>
      </Container>
    </Flex>
  );
};
