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

export const price_range_products = createAsyncThunk(
  "product/price_range_products",
  async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get("/home/product-price-range-latest");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, {fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/product-query?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categories: [],
    products: [],
    totalProduct: 0,
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
    priceRange: {
      low: 0,
      high: 10,
    },
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
      })
      .addCase(price_range_products.fulfilled, (state, action) => {
        state.priceRange = action.payload.priceRange;
      })
      .addCase(query_products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalProduct = action.payload.totalProduct;
      });
  },
});

export default homeReducer.reducer;
