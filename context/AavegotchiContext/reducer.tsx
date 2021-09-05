import { State } from "./initialState";

export type Action =
  | {
      type: "SET_USERS_AAVEGOTCHIS";
      usersAavegotchis: State["usersAavegotchis"];
    }
  | {
      type: "SET_SELECTED_AAVEGOTCHI";
      selectedAavegotchiIndex: State["selectedAavegotchiIndex"];
    }
  | {
      type: "START_ASYNC";
    }
  | {
      type: "SET_ERROR";
      error: State["error"];
    }
  | {
      type: "SET_NETWORK_ID";
      networkId: State["networkId"];
    }
  | {
      type: "SET_REQUEST_ID";
      requestId: State["requestId"];
    }
  | {
      type: "SET_TOKENS_WON_THIS_SESSION";
      extraTokens: State["tokensWonThisSession"];
    }
  | {
      type: "END_ASYNC";
    }
  | {
      type: "UPDATE_AAVEGOTCHI_SVG";
      tokenId: string;
      svg: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USERS_AAVEGOTCHIS": {
      return {
        ...state,
        usersAavegotchis: action.usersAavegotchis,
      };
    }
    case "SET_SELECTED_AAVEGOTCHI": {
      return {
        ...state,
        selectedAavegotchiIndex: action.selectedAavegotchiIndex,
      };
    }
    case "START_ASYNC": {
      return {
        ...state,
        loading: true,
      };
    }
    case "END_ASYNC": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case "SET_NETWORK_ID": {
      return {
        ...state,
        networkId: action.networkId,
      };
    }
    case "SET_REQUEST_ID": {
      return {
        ...state,
        requestId: action.requestId,
      };
    }
    case "SET_TOKENS_WON_THIS_SESSION": {
      const { tokensWonThisSession, ...restState } = state
      return {
        ...restState,
        tokensWonThisSession: parseFloat(tokensWonThisSession.toString()) + parseFloat(action.extraTokens.toString()),
      };
    }
    case "UPDATE_AAVEGOTCHI_SVG": {
      if (!state.usersAavegotchis) throw "No Aavegotchis to update.";
      const copyGotchiState = [...state.usersAavegotchis];
      const updatedGotchiIndex = copyGotchiState.findIndex(
        (gotchi) => gotchi.id === action.tokenId
      );

      if (updatedGotchiIndex >= 0) {
        copyGotchiState[updatedGotchiIndex].svg = action.svg;
        return {
          ...state,
          usersAavegotchis: copyGotchiState,
        };
      } else {
        throw "Selected gotchi doesn't exist in state.";
      }
    }
    default:
      throw "Bad action type";
  }
};
