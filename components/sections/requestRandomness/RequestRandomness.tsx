import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useAavegotchi, updateTokensWonThisSession } from "context/AavegotchiContext";
import { useSlotsContractSend, useSlotsContractCall } from "actions/web3";
import { updateLatestRequestId } from "context/AavegotchiContext";
import { Button } from "components/ui";

export const RequestRandomness = () => {
  const { user, web3, Moralis } = useMoralis();

  const {
    state: { usersAavegotchis, selectedAavegotchiIndex, requestId },
    dispatch,
  } = useAavegotchi();

  // const checkCanRequestRandomNumber = async () => {
  //   if (!requestId) return true;

  //   const hasGeneratedRandomness = await checkRequestIdHasRandomness();
  //   const hasBeenProcessed = await checkRequestIdHasBeenProcessed();
  //   return hasGeneratedRandomness && hasBeenProcessed;
  // };

  const checkRequestIdHasRandomness = async () => {
    if (requestId) {
      const res = await useSlotsContractCall<string>(web3, {
        name: "requestIdToRandomNumber",
        parameters: [requestId],
      });
      setRequestIdHasRandomness(Boolean(res));
      return Boolean(res);
    }
    setRequestIdHasRandomness(false);
    return false;
  };

  const checkRequestIdHasBeenProcessed = async () => {
    if (requestId) {
      const res = await useSlotsContractCall<boolean>(web3, {
        name: "requestIdToProcessedBool",
        parameters: [requestId],
      });
      setRequestIdHasBeenProcessed(res);
      if (res) {
        setIsRequestingRandomness(false);
        setIsCalculatingSpins(false);
      }
      return res;
    }
    setRequestIdHasBeenProcessed(false);
    return false;
  };

  const requestRandomness = async () => {
    setIsRequestingRandomness(true);
    updateLatestRequestId(dispatch, "");

    const canRequest = !requestId || requestIdHasBeenProcessed;

    if (!canRequest) {
      console.log("User cannot request random number right now");
      return;
    }

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

    updateTokensWonThisSession(dispatch, -10)
  };

  // const queryDbForRandomnessReceived = async () => {
  //   const RandomnessReceived = Moralis.Object.extend("RandomnessReceivedC");
  //   const query = new Moralis.Query(RandomnessReceived);
  //   query.equalTo("requestAddress", user.attributes.accounts[0]);
  //   const results = await query.find();

  //   if (results.length > 0) {
  //     console.log(results.slice(-1)[0].attributes.requestId)
  //     updateLatestRequestId(dispatch, results.slice(-1)[0].attributes.requestId);
  //   }
  // }

  const executeSpins = async () => {
    const userAccount = user.attributes.accounts[0];
    if (userAccount && requestId) {
      setIsCalculatingSpins(true);
      const res = await useSlotsContractSend<string>(
        web3,
        {
          name: "processRandomNumber",
          parameters: [requestId],
        },
        userAccount
      );
    } else {
      console.log("userAccount or requestId are undefined");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkRequestIdHasRandomness();
      checkRequestIdHasBeenProcessed();
    }, 3000);
    return () => clearInterval(interval);
  }, [requestId]);

  const [requestIdHasRandomness, setRequestIdHasRandomness] =
    useState<boolean>(false);
  const [requestIdHasBeenProcessed, setRequestIdHasBeenProcessed] =
    useState<boolean>(false);
  const [isRequestingRandomness, setIsRequestingRandomness] =
    useState<boolean>(false);
  const [isCalculatingSpins, setIsCalculatingSpins] = useState<boolean>(false);

  const canRequestRandomness = !requestId || requestIdHasBeenProcessed;
  const canExecuteSpins = requestIdHasRandomness && !requestIdHasBeenProcessed;

  return (
    <>
      {!canExecuteSpins && (
        <Button
          onClick={requestRandomness}
          disabled={isRequestingRandomness || !canRequestRandomness}
        >
          {isRequestingRandomness
            ? "Getting randomness from Chainlink VRF. Please be patient..."
            : "Request random number"}
        </Button>
      )}
      {canExecuteSpins && (
        <Button onClick={executeSpins} disabled={isCalculatingSpins}>
          {isCalculatingSpins ? "Calculating spins" : "Calculate spins"}
        </Button>
      )}
    </>
  );
};
