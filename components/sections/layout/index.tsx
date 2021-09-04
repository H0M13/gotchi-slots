import React, { useEffect, useState } from "react";
import { Footer, Header } from "components/sections";
import { Container } from "components/layout";
import {
  updateNetworkId,
  useAavegotchi,
  updateAavegotchis,
  updateLatestRequestId,
} from "context/AavegotchiContext";
import { useMoralis } from "react-moralis";
import { ErrorModal } from "components/ui";
import Head from "next/head";
import { useSlotsContractCall } from "actions/web3"

interface Props {
  children: React.ReactNode;
  metadetails?: {
    title?: string;
  };
}

export const Layout = ({ children, metadetails }: Props) => {
  const {
    web3,
    isWeb3Enabled,
    web3EnableError,
    enableWeb3,
    isAuthenticated,
    user,
    Moralis,
    logout,
  } = useMoralis();
  const {
    state: { requestId, error },
    dispatch,
  } = useAavegotchi();

  const handleCloseErrorModal = () => {
    dispatch({
      type: "SET_ERROR",
      error: undefined,
    });
  };

  // Update user aavegotchis
  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled && user) {
      updateAavegotchis(dispatch, user.attributes.accounts[0]);
      queryDbForRandomnessReceived()
    }
  }, [isWeb3Enabled, isAuthenticated, user]);

  // Update network
  useEffect(() => {
    if (isWeb3Enabled) {
      updateNetworkId(dispatch, web3);
    } else {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  const queryDbForRandomnessReceived = async () => {
    const RandomnessReceived = Moralis.Object.extend("RandomnessReceivedC");
    const query = new Moralis.Query(RandomnessReceived);
    query.equalTo("requestAddress", user.attributes.accounts[0]);
    const results = await query.find();

    if (results.length > 0) {
      console.log(results.slice(-1)[0].attributes.requestId)
      updateLatestRequestId(dispatch, results.slice(-1)[0].attributes.requestId);
    }
  }

  useEffect(() => {
    requestId 
    && getSpinOutcome(requestId, 0)
    && getSpinOutcome(requestId, 1)
    && getSpinOutcome(requestId, 2)
    && getSpinOutcome(requestId, 3)
    && getSpinOutcome(requestId, 4)
    && getSpinOutcome(requestId, 5)
    && getSpinOutcome(requestId, 6)
    && getSpinOutcome(requestId, 7)
    && getSpinOutcome(requestId, 8)
    && getSpinOutcome(requestId, 9)
  }, [requestId])

  const getSpinOutcome = async (requestId: string, spinIndex: number) => {
    const res = await useSlotsContractCall<string>(web3, {
      name: "requestIdToSpinOutcomes",
      parameters: [requestId, spinIndex],
    });
    console.log(`spin ${spinIndex}: ${web3.utils.fromWei(res)}`);
  }

  // Listeners
  useEffect(() => {
    const accountListener = Moralis.Web3.onAccountsChanged((accounts) => {
      if (!user || accounts[0] !== user.attributes.accounts[0]) {
        logout();
      }
    });

    const chainListener = Moralis.Web3.onChainChanged(() => {
      if (isWeb3Enabled) {
        subscribeToMoralisEvent();
        updateNetworkId(dispatch, web3);
      }
    });

    // Unsubscribe from listeners
    return () => {
      accountListener();
      chainListener();
    };
  }, []);

  const subscribeToMoralisEvent = async () => {
    let query = new Moralis.Query("RandomnessReceivedC");
    let subscription = await query.subscribe();
    subscription.on("create", onRandomnessReceived);
  };

  const onRandomnessReceived = (databaseEntry: any) => {
    console.log("databaseEntry: " + databaseEntry);
    if (
      databaseEntry.attributes.requestAddress == user.attributes.accounts[0]
    ) {
      updateLatestRequestId(dispatch, databaseEntry.attributes.requestId);
    }
  };

  return (
    <>
      <Head>
        <title>{metadetails?.title || "Aavegotchi"}</title>
      </Head>
      {web3EnableError && <ErrorModal error={web3EnableError} />}
      {error && (
        <ErrorModal error={error} onHandleClose={handleCloseErrorModal} />
      )}
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
