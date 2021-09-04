import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractCall, useSlotsContractSend } from "actions/web3";

export const AddFakeFunds = () => {
  const { user, web3 } = useMoralis();

  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  const tryMintFakeChips = async () => {
    const hasClaimed = await checkAlreadyMintedFakeChips();

    if (!hasClaimed) {
      await mintFakeChips();
    }
  };

  const checkAlreadyMintedFakeChips = async () => {
    const userAccount = user.attributes.accounts[0];
    const res = await useSlotsContractCall<boolean>(web3, {
      name: "addressToClaimedFakeTokensBool",
      parameters: [userAccount],
    });
    setHasClaimed(res);
    return res;
  };

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
      <button onClick={tryMintFakeChips}>{ hasClaimed ? "Demo GHST already claimed" : "Mint demo GHST"}</button>
    </>
  );
};
