import { configureStore } from "@reduxjs/toolkit";

import { Admins, CURRENT_ADMIN_ID, CURRENT_ADMIN_ROLE } from "./AdminReducers.js";

import { Spinner } from "./Reducers.js";

const Store = configureStore({
    reducer: {
        Admins,
        CURRENT_ADMIN_ROLE,
        CURRENT_ADMIN_ID,
        Spinner
    },
    devTools: process.env.REACT_APP_STAGE === "development",
});

export default Store;
