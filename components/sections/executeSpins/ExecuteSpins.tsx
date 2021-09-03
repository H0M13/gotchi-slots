import React from "react";
import { useMoralis } from "react-moralis";
import { useSlotsContractSend } from "actions/web3";
import { useAavegotchi } from "context/AavegotchiContext";

export const ExecuteSpins = () => {
  const { user, web3 } = useMoralis();
  const {
    state: { requestId },
  } = useAavegotchi();

  const executeSpins = async () => {
    const userAccount = user.attributes.accounts[0];
    if (userAccount && requestId) {
      console.log("requestId: " + requestId);
      const res = await useSlotsContractSend<string>(
        web3,
        {
          name: "processRandomNumber",
          parameters: [requestId],
        },
        userAccount
      );
      console.log("res: " + JSON.stringify(res));
    }
    else {
        console.log("userAccount or requestId are undefined")
    }
  };

  return (
    <>
      <button onClick={executeSpins}>Execute spins</button>
    </>
  );
};
