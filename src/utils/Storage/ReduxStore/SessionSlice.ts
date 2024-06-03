import { createSlice } from "@reduxjs/toolkit";

import TokenHandler from "../TokenHandler";

const tokenHandler = new TokenHandler();

export type session_state_type = {
    token: string
    adminLevel: number
}

const DEFAULT_STATE: session_state_type = {
    token: "",
    adminLevel: -1,
}

export const sessionStateSlice = createSlice({
    name: "session_state",
    initialState: DEFAULT_STATE,
    reducers: {
        setData: (state, {payload}) =>{
            state.adminLevel = payload.adminLevel;
            state.token = payload.token;
        },
        setToken: (state, {payload}) => {
            state.token = payload;
            tokenHandler.registerToken(payload);
        },
        removeToken: state => {
            state.token = "";
            tokenHandler.deleteToken();
        },
        setAdminLevel: (state, {payload}) => {
            state.adminLevel = payload;
        },
        setStateDefault: (state) => {
            state = DEFAULT_STATE;
        }
    }
});

export const { setToken, removeToken, setAdminLevel, setData, setStateDefault } = sessionStateSlice.actions;

export default sessionStateSlice.reducer;