
// import { createSlice } from '@reduxjs/toolkit';
// const authSlice = createSlice({
//     name: 'auth',
//     initialState: { token: null },
//     reducers: {
//         // setToken: (state, action) => {
//         //     console.log("retretreq");
//         //     console.log("action", action);
//         //     state.token = action.payload.accessToken; 
//         //     console.log("state", action);
//         // },
//         setToken: (state, action) => {
//             state.token = action.payload.accessToken; // Update token state with accessToken
//             console.log("state", action);

//           },
//         logout: (state) => {
//             state.token = null;
//         },
//     },
// });


// export default authSlice.reducer;

// export const { setToken, logout } = authSlice.actions;

// export const selectToken =(state)=>state.auth.token



import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.accessToken; // Update token state with accessToken
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;

export const { setToken, logout } = authSlice.actions;

export const selectToken =(state)=>state.auth.token
