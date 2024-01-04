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

export const get_one_product = createAsyncThunk(
  "product/get_one_product",
  async (slug, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(`/home/product-get-one/${slug}`);
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

export const customer_rating = createAsyncThunk(
  "product/customer_rating",
  async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post("/home/customer-rating", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_customer_rating = createAsyncThunk(
  "product/delete_customer_rating",
  async ({id, customerId}, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post(`/home/delete-customer-rating`, {
        id,
        customerId,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_customer_rating = createAsyncThunk(
  "product/get_customer_rating",
  async ({productId, pageNumber}, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/get-customer-rating/${productId}?pageNumber=${pageNumber}`
      );
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
    totalProduct: 0,
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
    priceRange: {
      low: 0,
      high: 10,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    errorMessage: "",
    successMessage: "",
    ratings: [],
    reviews: [],
    countReview: 0,
  },
  reducers: {
    clearMessage: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
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
      })
      .addCase(get_one_product.fulfilled, (state, action) => {
        state.product = action.payload.product;
        state.relatedProducts = action.payload.relatedProducts;
        state.moreProducts = action.payload.moreProducts;
      })
      .addCase(customer_rating.pending, (state, action) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(customer_rating.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.msg;
      })
      .addCase(customer_rating.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(get_customer_rating.fulfilled, (state, action) => {
        state.ratings = action.payload.ratingArr;
        state.reviews = action.payload.allReviews;
        state.countReview = action.payload.countReview;
      })
      .addCase(delete_customer_rating.pending, (state, action) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(delete_customer_rating.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.msg;
      })
      .addCase(delete_customer_rating.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export default homeReducer.reducer;
export const {clearMessage} = homeReducer.actions;
