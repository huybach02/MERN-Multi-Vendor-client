import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data",
  async (userId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    recentOrders: [],
    totalOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
  },
  reducers: {
    clearMessage: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_dashboard_index_data.fulfilled, (state, action) => {
      state.totalOrders = action.payload.totalOrders;
      state.recentOrders = action.payload.recentOrders;
      state.pendingOrders = action.payload.pendingOrders;
      state.cancelledOrders = action.payload.cancelledOrders;
    });
  },
});

export default dashboardReducer.reducer;
export const {clearMessage} = dashboardReducer.actions;
