import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post("/chat/customer/add-customer-friend", info);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    loader: false,
    errorMessage: "",
    successMessage: "",
    myFriends: [],
    friendMessages: [],
    currentFriend: "",
  },
  reducers: {
    clearMessage: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, action) => {
      state.friendMessages = [...state.friendMessages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_friend.fulfilled, (state, action) => {
      state.myFriends = action.payload.myFriends;
      state.friendMessages = action.payload.messages;
      state.currentFriend = action.payload.currentFriend;
    });
    builder.addCase(send_message.fulfilled, (state, action) => {
      let tempFriends = state.myFriends;
      let index = tempFriends.findIndex(
        (i) => i.friendId === action.payload.message.receiverId
      );
      while (index > 0) {
        let temp = tempFriends[index];
        tempFriends[index] = tempFriends[index - 1];
        tempFriends[index - 1] = temp;
        index--;
      }
      state.myFriends = tempFriends;
      state.friendMessages = [...state.friendMessages, action.payload.message];
      state.successMessage = "Send message success";
    });
  },
});

export default chatReducer.reducer;
export const {clearMessage, updateMessage} = chatReducer.actions;
