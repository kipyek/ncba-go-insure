import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  data: [],
}

export const ServiceSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    setData: (state: any, action: any) => {
      state.data = action.payload;
    },

  }
})

export const {
  setData
} = ServiceSlice.actions;


// Selectors
export const selectData = (state: any) => state.job.data;


export default ServiceSlice.reducer;