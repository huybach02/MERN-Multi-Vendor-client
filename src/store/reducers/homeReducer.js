import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_categories = createAsyncThunk(
  "category/get_categories",
  async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get("/home/category-get-all");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get("/home/product-get-all");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
    products: [],
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_categories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.latestProducts = action.payload.latestProducts;
        state.topRatedProducts = action.payload.topRatedProducts;
        state.discountProducts = action.payload.discountProducts;
      });
  },
});

export default homeReducer.reducer;
