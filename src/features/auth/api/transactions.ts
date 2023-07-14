import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
export interface AuthenticationState {
  alltransactions: [];
  sendAndReceiveTransactions: [];
  swapTransactions: [];
  transferTransactions: [];
  totalTransactions: object;
}

const initialState: AuthenticationState = {
  alltransactions: [],
  sendAndReceiveTransactions: [],
  swapTransactions: [],
  transferTransactions: [],
  totalTransactions: {},
};

export const AuthSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {
    setAllTransactions: (state, action) => {
      state.alltransactions = action.payload;
    },
    setAllSendAndReceiveTransactions: (state, action) => {
      state.sendAndReceiveTransactions = action.payload;
    },
    setSwapTransactions: (state, action) => {
      state.swapTransactions = action.payload;
    },
    setTransferTransactions: (state, action) => {
      state.transferTransactions = action.payload;
    },
    setTotalTransactions: (state, action) => {
      state.totalTransactions = action.payload;
    },
    reset: () => {},
  },
});

export const {
  setAllSendAndReceiveTransactions,
  setSwapTransactions,
  setTransferTransactions,
  setAllTransactions,
  setTotalTransactions,
  reset,
} = AuthSlice.actions;

export const selectAllTransactions = (state: RootState) =>
  state.transactions.alltransactions;
export const selectAllSendAndReceiveTransactions = (state: RootState) =>
  state.transactions.sendAndReceiveTransactions;
export const selectAllSwapTransactions = (state: RootState) =>
  state.transactions.swapTransactions;
export const selectTransferTransactions = (state: RootState) =>
  state.transactions.transferTransactions;
export const selectTotalTransactions = (state: RootState) =>
  state.transactions.totalTransactions;
export const transactionsReducer = AuthSlice.reducer;
