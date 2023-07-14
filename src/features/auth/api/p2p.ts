import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { UserPayload } from "@/interface";
// import {UserPayl}
export interface AuthenticationState {
  allP2PTrades: [];
  allP2POffers: [];
}

const initialState: AuthenticationState = {
  allP2PTrades: [],
  allP2POffers: [],
};

export const AuthSlice = createSlice({
  initialState,
  name: "p2p",
  reducers: {
    setAllP2PTrades: (state, action) => {
      state.allP2PTrades = action.payload;
    },
    setAllP2POffers: (state, action) => {
      state.allP2POffers = action.payload;
    },

    reset: () => {},
  },
});

export const { setAllP2PTrades, setAllP2POffers } = AuthSlice.actions;

export const selectAllP2PTrades = (state: RootState) => state.p2p.allP2PTrades;
export const selectAllP2POffers = (state: RootState) => state.p2p.allP2POffers;
export const p2pReducer = AuthSlice.reducer;
