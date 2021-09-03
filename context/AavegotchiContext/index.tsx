import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import { State, initialState } from "./initialState";
import { useSubgraph } from "actions/subgraph";
import {
  AavegotchisOfOwner,
  getAllAavegotchisOfOwner,
} from "actions/subgraph/queries";
import { Action, reducer } from "./reducer";
import { useMoralis } from "react-moralis"

const AavegotchiContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const updateAavegotchis = async (
  dispatch: React.Dispatch<Action>,
  owner: string
) => {
  try {
    const res = await useSubgraph<AavegotchisOfOwner>(
      getAllAavegotchisOfOwner(owner)
    );
    dispatch({
      type: "SET_USERS_AAVEGOTCHIS",
      usersAavegotchis: res.aavegotchis,
    });
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      error: err,
    });
  }
};

const updateNetworkId = async (dispatch: React.Dispatch<Action>, web3: any) => {
  dispatch({ type: "START_ASYNC" });
  try {
    const networkId = await web3.eth.net.getId();
    dispatch({ type: "SET_NETWORK_ID", networkId });
    dispatch({ type: "END_ASYNC" });
  } catch (error) {
    dispatch({ type: "SET_ERROR", error });
  }
};

const updateLatestRequestId = async (dispatch: React.Dispatch<Action>, requestId: string) => {
  try {
    dispatch({ type: "SET_REQUEST_ID", requestId });
  } catch (error) {
    dispatch({ type: "SET_ERROR", error });
  }
};

const AavegotchiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AavegotchiContext.Provider value={value}>
      {children}
    </AavegotchiContext.Provider>
  );
};

const useAavegotchi = () => useContext(AavegotchiContext);

export default AavegotchiContextProvider;
export { useAavegotchi, updateNetworkId, updateAavegotchis, updateLatestRequestId };
