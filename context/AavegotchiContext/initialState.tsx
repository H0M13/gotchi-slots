import { Aavegotchi } from "types";

export interface State {
  usersAavegotchis?: Array<Aavegotchi>;
  selectedAavegotchiIndex: number;
  loading: boolean;
  error?: Error;
  networkId?: number;
  requestId?: string;
}

export const initialState: State = {
  loading: false,
  selectedAavegotchiIndex: 0,
}