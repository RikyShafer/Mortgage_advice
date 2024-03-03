
import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.accessToken; // Access accessToken directly
        },
        logout: (state) => {
            state.token = null;
        },
    },
});


export default authSlice.reducer;

export const { setToken, logout } = authSlice.actions;

export const selectToken =(state)=>state.auth.token
