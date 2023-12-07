import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../helpers/axios";

export const fetchProductList = createAsyncThunk(
    'products/fetchProductList',
    async () => {
      return await get('/products');
    }
  )

const initialState = {
    products: [],
    unfilteredProducts: [],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    status: 'idle'
}

export const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setProductFiltered: (state, action) => {
        state.products = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProductList.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchProductList.fulfilled, (state, action) => {
        // Add user to the state array
        state.status = 'succeeded';
        state.products = action.payload;

        state.unfilteredProducts = action.payload;
    })
  }  
})

export const {setProductFiltered} = productSlice.actions;

export default productSlice.reducer;