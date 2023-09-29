import { configureStore } from '@reduxjs/toolkit'
import ServiceSlice from './Slices/QuoteSlice'

export const store = configureStore({
    reducer: {
        Quote: ServiceSlice,
    },
})