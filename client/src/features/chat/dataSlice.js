import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'chat',
  initialState: { data: null },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },

  },
});

export default dataSlice.reducer;

export const { setData } = dataSlice.actions;

export const getData = (state) => state.data;
