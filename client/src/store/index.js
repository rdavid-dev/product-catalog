import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../slices/productSlices"

const store = configureStore({
    reducer: {
        productReducer: productSlice
    }
})

export default store;