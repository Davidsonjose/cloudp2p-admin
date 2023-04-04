import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { UserPayload } from '@/interface';
// import {UserPayl}
export interface AuthenticationState {
	user: UserPayload | null;
	token: string | null;
	refreshToken?: string;
}

const initialState: AuthenticationState = {
	user: null,
	token: null,
	refreshToken: '',
};

export const AuthSlice = createSlice({
	initialState,
	name: 'auths',
	reducers: {
		setUser: (state, action: PayloadAction<UserPayload>) => {
			state.user = action.payload;
		},
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
		},
		reset: () => {},
	},
});

export const { setUser, setToken, reset, setRefreshToken } = AuthSlice.actions;

export const selectUser = (state: RootState) => state.auths.user;
export const selectToken = (state: RootState) => state.auths.token;
export const selectRefreshToken = (state: RootState) => state.auths.refreshToken;

export const authReducer = AuthSlice.reducer;
