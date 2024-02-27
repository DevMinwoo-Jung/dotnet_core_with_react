import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";


const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  'catalog/fetch{roductsAsync',
  async() => {
    try {
      return await agent.Catalog.list();
    } catch (err){
      console.error(err)
    }
  }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetch{roductsAsync',
  async(productId) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (err){
      console.error(err)
    }
  }
)


export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: 'idle'
  }),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = 'pendingFetchProducts';
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = 'idle';
    });
  })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)