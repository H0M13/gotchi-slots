import { Aavegotchi } from "types";

export interface State {
  usersAavegotchis?: Array<Aavegotchi>;
  selectedAavegotchiIndex: number;
  loading: boolean;
  error?: Error;
  networkId?: number;
  requestId?: string;
  tokensWonThisSession: number;
}

export const initialState: State = {
  loading: false,
  selectedAavegotchiIndex: 0,
  tokensWonThisSession: 0
}