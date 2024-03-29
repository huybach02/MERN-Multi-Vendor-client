import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (productData, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post("/home/product/add-to-cart", productData);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products",
  async (userId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(`/home/product/get-cart-products/${userId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_product_from_cart = createAsyncThunk(
  "cart/delete_product_from_cart",
  async (cartId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.delete(
        `/home/product/delete-cart-product/${cartId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const increment_quantity = createAsyncThunk(
  "cart/increment_quantity",
  async (cartId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/product/increment_quantity/${cartId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reduce_quantity = createAsyncThunk(
  "cart/reduce_quantity",
  async (cartId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(`/home/product/reduce_quantity/${cartId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (productData, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post(
        "/home/product/add-to-wishlist",
        productData
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/product/get-wishlist-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const remove_wishlist_product = createAsyncThunk(
  "wishlist/remove_wishlist_product",
  async (wishlistId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/product/remove-wishlist-product/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    cartProducts: [],
    wishListProducts: [],
    cartProductCount: 0,
    wishListCount: 0,
    price: 0,
    shippingFee: 0,
    outOfStockProducts: [],
    buyProductItem: 0,
  },
  reducers: {
    clearMessage: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    resetCount: (state, action) => {
      state.cartProductCount = 0;
      state.wishListCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_to_cart.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(add_to_cart.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
    });
    builder.addCase(add_to_cart.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(get_cart_products.fulfilled, (state, action) => {
      state.cartProducts = action.payload.cartProducts;
      state.price = action.payload.price;
      state.outOfStockProducts = action.payload.outOfStockProducts;
      state.cartProductCount = action.payload.cartProductCount;
      state.shippingFee = action.payload.shippingFee;
      state.buyProductItem = action.payload.buyProductItem;
    });
    builder.addCase(delete_product_from_cart.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(delete_product_from_cart.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
    });
    builder.addCase(delete_product_from_cart.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(increment_quantity.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(increment_quantity.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
    });
    builder.addCase(increment_quantity.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(reduce_quantity.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(reduce_quantity.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
    });
    builder.addCase(reduce_quantity.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(add_to_wishlist.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(add_to_wishlist.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
    });
    builder.addCase(add_to_wishlist.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(get_wishlist_products.fulfilled, (state, action) => {
      state.wishListProducts = action.payload.wishListProducts;
      state.wishListCount = action.payload.wishListCount;
    });
    builder.addCase(remove_wishlist_product.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(remove_wishlist_product.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
    });
    builder.addCase(remove_wishlist_product.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
  },
});

export default cartReducer.reducer;
export const {clearMessage, resetCount} = cartReducer.actions;
