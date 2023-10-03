import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  firstTime: null,
  capacitys: null
}

export const ServiceSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setFirstTime: (state: any, action: any) => {
      state.firstTime = action.payload;
    },
    setCapacitys: (state: any, action: any) => {
      state.capacitys = action.payload;
    },
  }
})

export const {
  setFirstTime,
  setCapacitys,
} = ServiceSlice.actions;


// Selectors
export const selectFirstTime = (state: any) => state.job.data;
export const selectCapacity = (state: any) => state.job.data;


export default ServiceSlice.reducer;