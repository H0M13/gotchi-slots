import React, { useEffect } from 'react'
import { updateNetworkId, useAavegotchi, updateAavegotchis } from 'context/AavegotchiContext'
import { useMoralis } from 'react-moralis'
import { ErrorModal } from 'components/UI'
import Head from 'next/head'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Spinner from '../Spinner/Spinner'

import styles from './layout.module.scss';

interface Props {
  metadetails?: {
    title?: string;
  }
}

export const Layout = ({metadetails}: Props) => {
  const { web3, isWeb3Enabled, web3EnableError, enableWeb3, isAuthenticated, user, Moralis, logout  } = useMoralis();
  const { state: {error} , dispatch } = useAavegotchi();

  const handleCloseErrorModal = () => {
    dispatch({
      type: "SET_ERROR",
      error: undefined,
    })
  };

  // Update user aavegotchis
  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled && user) {
      updateAavegotchis(dispatch, user.attributes.accounts[0]);
    }
  }, [isWeb3Enabled, isAuthenticated, user]);

  // Update network
  useEffect(() => {
    if (isWeb3Enabled) {
      updateNetworkId(dispatch, web3);
    } else {
      enableWeb3();
    }
  }, [isWeb3Enabled])

  // Listeners
  useEffect(() => {
    const accountListener = Moralis.Web3.onAccountsChanged((accounts) => {
      if (!user || accounts[0] !== user.attributes.accounts[0]) {
        logout();
      }
    })

    const chainListener = Moralis.Web3.onChainChanged(() => {
      if (isWeb3Enabled) {
        updateNetworkId(dispatch, web3);
      }
    })

    // Unsubscribe from listeners
    return () => {
      accountListener();
      chainListener();
    };
  }, [])

  return (
    <>
      <Head>
        <title>Gotchi Slots</title>
      </Head>

      {web3EnableError && <ErrorModal error={web3EnableError} />}
      {error && <ErrorModal error={error} onHandleClose={handleCloseErrorModal} />}

      <Header />

      <div className={styles.mainContainer}>
        <Spinner />

      </div>

      <Footer />

    </>
  )
}
