import { createReducer } from "./Reducers.js";

export const Admins = createReducer([], {
    SET_ADMINS: (state, action) => [...action.payload],
});

export const CURRENT_ADMIN_ROLE = createReducer(null, {
    SET_CURRENT_ADMIN_ROLE: (state, action) => action.payload,
});

export const CURRENT_ADMIN_ID = createReducer(null, {
    SET_CURRENT_ADMIN_ID: (state, action) => action.payload,
});
