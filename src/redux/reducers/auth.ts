import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isUndefined } from "lodash";

export interface ICurrentAccount {
  sub?: string;
  email?: string;
  name?: string;
  username?: string;
  givenName?: string;
  familyName?: string;
  emailVerified?: boolean;
  actionPoint: number;
}

interface IState {
  isAuthenticated: boolean;
  isGuest: boolean;
  account: any | null;
  isInitialized: boolean;
  reAuthenticate: number;
  user: any | undefined;
  citizens: any[];
  currentCitizen: any | undefined;
  isLogout: boolean;
}

const initialState: IState = {
  isAuthenticated: false,
  isGuest: false,
  account: null,
  isInitialized: false,
  reAuthenticate: 0,
  user: undefined,
  citizens: [],
  currentCitizen: undefined,
  isLogout: false,
};

const slicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticate: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        account: any | null;
        isGuest?: boolean;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.account = action.payload.account || null;
      state.isGuest = action.payload.isGuest || false;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setReAuthenticate: (state) => {
      state.reAuthenticate = !isUndefined(state.reAuthenticate)
        ? state.reAuthenticate + 1
        : 0;
    },
    setAccount: (state, action) => {
      state.user = action.payload.user;
      state.citizens = action.payload.citizens || [];
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCitizens: (state, action) => {
      state.citizens = action.payload || [];
    },
    setCurrentCitizen: (state, action) => {
      state.currentCitizen = action.payload;
    },
    setStatusLogout: (state, action) => {
      state.isLogout = action.payload;
    },
  },
});

export const {
  setAuthenticate,
  setInitialized,
  setReAuthenticate,
  setAccount,
  setCitizens,
  setCurrentCitizen,
  setStatusLogout,
} = slicer.actions;

export default slicer.reducer;
