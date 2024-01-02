import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    {price, products, shipping_fee, shippingInfo, userId, navigate, items},
    {rejectWithValue, fulfillWithValue}
  ) => {
    try {
      const {data} = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items,
      });
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_all_orders = createAsyncThunk(
  "order/get_all_orders",
  async ({customerId, status}, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/customer/get-all-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    myOrders: [],
    myOrder: {},
  },
  reducers: {
    clearMessage: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(place_order.pending, (state, action) => {
      state.loader = true;
      state.errorMessage = "";
      state.successMessage = "";
    });
    builder.addCase(place_order.fulfilled, (state, action) => {
      state.loader = false;
      state.successMessage = action.payload.msg;
      state.cartProductCount = state.cartProductCount + 1;
    });
    builder.addCase(place_order.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.error;
    });
    builder.addCase(get_all_orders.fulfilled, (state, action) => {
      state.myOrders = action.payload.orders;
    });
  },
});

export default orderReducer.reducer;
export const {clearMessage} = orderReducer.actions;
