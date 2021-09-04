import React, { useEffect, useState } from "react";
import * as Styled from "./styles";
import { useMoralis } from "react-moralis";
import { Button, GotchiSVG, Modal } from "components/UI";
import { GotchiSelectModal, ConnectButton  } from "../sections";
import { useAavegotchi, updateAavegotchis } from "context/AavegotchiContext";
import { Aavegotchi } from "types";
import ReactFlagsSelect from 'react-flags-select';

import styles from './Header.module.scss';

const LoadingButton = () => {
  return (
    <Button disabled={true}>
      <Styled.ButtonContents>
        <Styled.GotchiIconWrapper>
          <img src="/assets/gifs/loading.gif" />
        </Styled.GotchiIconWrapper>
        <Styled.AavegotchiDetails>
          <p>Loading</p>
          <p>Aavegotchis</p>
        </Styled.AavegotchiDetails>
      </Styled.ButtonContents>
    </Button>
  );
};

const BuyButton = () => {
  return (
    <a
      href="https://aavegotchi.com/baazaar/aavegotchis?sort=latest"
      target="_blank"
    >
      <Button>Buy Aavegotchi</Button>
    </a>
  );
};

const GotchiSelectButton = ({ gotchi, onClick }: { gotchi: Aavegotchi, onClick: () => void }) => {
  return (
    <Button onClick={onClick}>
      <Styled.ButtonContents>
        <Styled.GotchiIconWrapper>
          <GotchiSVG tokenId={gotchi.id} />
        </Styled.GotchiIconWrapper>
        <Styled.AavegotchiDetails>
          <p>({gotchi.id})</p>
          <p>{gotchi.name}</p>
        </Styled.AavegotchiDetails>
      </Styled.ButtonContents>
    </Button>
  );
};

const Header = () => {
  const { isAuthenticated } = useMoralis();
  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiIndex },
    dispatch
  } = useAavegotchi();

  const [isGotchiSelectModalOpen, setIsGotchiSelectModalOpen] = useState(false);

  const countries = {
    GB: { primary: "GB", secondary: "en-gb" },
    DE: { primary: "DE", secondary: "de-de" },
    FR: { primary: "FR", secondary: "fr-fr" },
  };

  const [selected, setSelected] = useState("GB");
  const onSelect = (code: string): void => {
    setSelected(code);
    dispatch({
      type: "SET_LOCALE",
      locale: countries[code].secondary,
    });
  };

  

  return (
    <div className={styles.headerContainer}>
      {isGotchiSelectModalOpen && <GotchiSelectModal onHandleClose={() => setIsGotchiSelectModalOpen(false)} />}

      <div className={styles.localePicker}>
        <ReactFlagsSelect
          selected={selected}
          onSelect={onSelect}
          countries={Object.keys(countries)}
          showSecondaryOptionLabel={false}
          showSecondarySelectedLabel={false}
          customLabels={countries}
        />
      </div>

      <div className={styles.headerMiddle}>
        Gotchi Slots
      </div>
      
      <Styled.ButtonContainer>
        {isAuthenticated &&
          networkId === 137 &&
          (usersAavegotchis === undefined ? (
            <LoadingButton />
          ) : usersAavegotchis.length === 0 ? (
            <BuyButton />
          ) : (
            <GotchiSelectButton
              onClick={() => setIsGotchiSelectModalOpen(true)}
              gotchi={usersAavegotchis[selectedAavegotchiIndex]}
            />
          ))}
        <ConnectButton />
      </Styled.ButtonContainer>

    </div>
  );
};

export default Header;
