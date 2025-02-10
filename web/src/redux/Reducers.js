export const createReducer = (initialState, actionHandlers) => 
    (state = initialState, action) => {
        if (actionHandlers.hasOwnProperty(action.type)) {
            return actionHandlers[action.type](state, action);
        }
        return state;
    };


export const Spinner = createReducer(false, {
    'SET_SPINNER': (state, action) => action.payload
});
