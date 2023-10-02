import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  firstTime: 1,
  coverType: null,
  motorType: null,
  make: null,
  mode: null,
  manYear: null,
  vehicleUse: null,
  vehicleValue: null,
  windScreen: null,
  eUnit: null,
  capacity: null
}

export const ServiceSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setFirstTime: (state: any, action: any) => {
      state.firstTime = action.payload;
    },
    setCoverType: (state: any, action: any) => {
      state.coverType = action.payload;
    },
    setMotorType: (state: any, action: any) => {
      state.motorType = action.payload;
    },
    setMake: (state: any, action: any) => {
      state.make = action.payload;
    },
    setMode: (state: any, action: any) => {
      state.mode = action.payload;
    },
    setManYear: (state: any, action: any) => {
      state.manYear = action.payload;
    },
    setVehicleUse: (state: any, action: any) => {
      state.vehicleUse = action.payload;
    },
    setVehicleValue: (state: any, action: any) => {
      state.vehicleValue = action.payload;
    },
    setWindScreen: (state: any, action: any) => {
      state.windScreen = action.payload;
    },
    setEUnit: (state: any, action: any) => {
      state.eUnit = action.payload;
    },
    setCapacity: (state: any, action: any) => {
      state.capacity = action.payload;
    },

  }
})

export const {
  setFirstTime,
  setCoverType,
  setMotorType,
  setMake,
  setMode,
  setManYear,
  setVehicleUse,
  setVehicleValue,
  setWindScreen,
  setEUnit,
  setCapacity,
} = ServiceSlice.actions;


// Selectors
export const selectFirstTime = (state: any) => state.job.data;
export const selecCoverType = (state: any) => state.job.data;
export const selectMotorType = (state: any) => state.job.data;
export const selectMake = (state: any) => state.job.data;
export const selectMode = (state: any) => state.job.data;
export const selectManYear = (state: any) => state.job.data;
export const selectedVehicleUse = (state: any) => state.job.data;
export const selectedVehicleValue = (state: any) => state.job.data;
export const selectWindScreen = (state: any) => state.job.data;
export const selectEUnit = (state: any) => state.job.data;
export const selectCapacity = (state: any) => state.job.data;


export default ServiceSlice.reducer;