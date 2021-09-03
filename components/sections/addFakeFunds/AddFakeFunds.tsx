import React from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractSend } from "actions/web3";

export const AddFakeFunds = () => {
  const { user, web3 } = useMoralis();

  const mintFakeChips = async () => {
    const userAccount = user.attributes.accounts[0];
    const res = await useSlotsContractSend<string>(
      web3,
      {
        name: "mintFakeTokens",
        parameters: [userAccount],
      },
      userAccount
    );
    console.log("res: " + JSON.stringify(res));
  };

  return (
    <>
      <button onClick={mintFakeChips}>Mint 100 more fake chips</button>
    </>
  );
};
