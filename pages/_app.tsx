import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from 'theme/globalStyles'
import AavegotchiProvider from "context/AavegotchiContext"
import Reset from 'theme/reset'
import { theme } from 'theme'
import { IntlProvider } from 'react-intl';
import { getLabels, validLocale, intlShape } from '../utils/locale';
import { useAavegotchi } from "../context/AavegotchiContext";
import App from './App'

const AppWrapper = ({ Component, pageProps }) => {

  const {
    state: { locale },
    dispatch,
  } = useAavegotchi();

  return (
    <IntlProvider messages={getLabels(locale)} locale={locale} defaultLocale="en-GB">
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <App Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </IntlProvider>
  );
}

const AavegotchiProviderWrapper = ({ Component, pageProps }) => {
  return (
    <AavegotchiProvider>
      <AppWrapper  Component={Component} pageProps={pageProps} />
    </AavegotchiProvider>
  );
}

export default AavegotchiProviderWrapper;

