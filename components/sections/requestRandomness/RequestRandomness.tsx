import React from "react";
import { useMoralis } from "react-moralis";
import { useAavegotchi } from "context/AavegotchiContext";
import { useSlotsContractSend } from "actions/web3";

export const RequestRandomness = () => {
  const { user, web3 } = useMoralis();

  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiIndex },
  } = useAavegotchi();

  const executeSpins = async () => {
    const userAccount = user.attributes.accounts[0];
    const gotchiIdToUse =
      usersAavegotchis &&
      parseInt(usersAavegotchis[selectedAavegotchiIndex].id);
    if (userAccount && gotchiIdToUse) {
      const res = await useSlotsContractSend<string>(
        web3,
        {
          name: "getRandomNumber",
          parameters: [gotchiIdToUse],
        },
        userAccount
      );
      console.log("res: " + JSON.stringify(res));
    } else {
      console.log("userAccount or gotchiIdToUse are undefined");
    }
  };

  return (
    <>
      <button onClick={executeSpins}>Request random number</button>
    </>
  );
};
