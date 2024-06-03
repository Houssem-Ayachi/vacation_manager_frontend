import { configureStore } from "@reduxjs/toolkit";

import SessionSlice from "./SessionSlice";
import CurrentSessionUserSlice from "./CurrentSessionUserSlice";

export default configureStore({
    reducer: {
        sessionData: SessionSlice,
        CurrentSessionUserData: CurrentSessionUserSlice
    }
});