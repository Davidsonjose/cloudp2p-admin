import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { UserPayload } from "@/interface";
// import {UserPayl}
export interface AuthenticationState {
  alluser: [];
  adminuser: [];
  totalActiveUsers: object;
  totalRegisteredUsers: object;
  totalLoggedInUsers: object;
}

const initialState: AuthenticationState = {
  alluser: [],
  totalActiveUsers: {},
  totalRegisteredUsers: {},
  totalLoggedInUsers: {},
  adminuser: [],
};

export const AuthSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    setAllUsers: (state, action) => {
      state.alluser = action.payload;
    },
    setAllAdminUsers: (state, action) => {
      state.adminuser = action.payload;
    },
    setTotalActiveUsers: (state, action) => {
      state.totalActiveUsers = action.payload;
    },
    setTotalRegisteredUsers: (state, action) => {
      state.totalRegisteredUsers = action.payload;
    },
    setTotalLoggedInUsers: (state, action) => {
      state.totalLoggedInUsers = action.payload;
    },

    reset: () => {},
  },
});

export const {
  setAllUsers,
  setAllAdminUsers,
  reset,
  setTotalActiveUsers,
  setTotalLoggedInUsers,
  setTotalRegisteredUsers,
} = AuthSlice.actions;

export const selectAllUsers = (state: RootState) => state.users.alluser;

export const selectAllActiveUsers = (state: RootState) =>
  state.users.totalActiveUsers;
export const selectAllRegisteredUsers = (state: RootState) =>
  state.users.totalRegisteredUsers;
export const selectTotalLoggedInUsers = (state: RootState) =>
  state.users.totalLoggedInUsers;

export const selectAllAdminUsers = (state: RootState) => state.users.adminuser;
export const usersReducers = AuthSlice.reducer;
