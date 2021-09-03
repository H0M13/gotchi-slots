import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractCall } from "actions/web3";

export const FakeTokenBalance = () => {
  const { user, web3 } = useMoralis();

  const [amount, setAmount] = useState<string>("");

  const loadFakeTokensAmount = async () => {
    const userAcount = user.attributes.accounts[0];
    const res = await useSlotsContractCall<string>(web3, {
      name: "addressToFakeTokens",
      parameters: [userAcount],
    });
    setAmount(res);
  };

  return (
    <>
      <button onClick={loadFakeTokensAmount}>Fetch</button>
      <span>Fake token balance: {amount}</span>
    </>
  );
};
