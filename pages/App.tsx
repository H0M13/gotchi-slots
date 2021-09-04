import React from 'react'
import { Modal } from 'components/ui'
import { Error } from 'components/Error/Error'
import AavegotchiProvider from "context/AavegotchiContext"
import { MoralisProvider } from "react-moralis";
import { IntlProvider } from 'react-intl';
import { getLabels, validLocale, intlShape } from '../utils/locale';
import { useAavegotchi } from "../context/AavegotchiContext";
import { compose } from "redux";
import { injectIntl } from 'react-intl'

import styles from './App.module.scss';

export interface AppProps {
  Component: any;
  pageProps: any;
  intl: intlShape;
}

const App = ({
  Component,
  pageProps,
  intl: {
		messages: {
      moralisError
		}
	},
} : AppProps) => {
  const hasMoralisError = !process.env.MORALIS_APPLICATION_ID || !process.env.MORALIS_SERVER_ID;

  return (
    <div className={styles.appContainer}>
      {
        hasMoralisError ? (
          <Error message={moralisError}/>
        ) : (
          <MoralisProvider 
            appId={process.env.MORALIS_APPLICATION_ID || ""} 
            serverUrl={process.env.MORALIS_SERVER_ID || ""}
          >
            <Component {...pageProps} />
          </MoralisProvider>
        )
      }
    </div>
  );
};

const hocChain = compose(
	injectIntl,
);

export default hocChain(App);