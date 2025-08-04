import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchBotResponse = createAsyncThunk(
  "chatbot/fetchBotResponse",
  async (userMessage, thunkAPI) => {
    try {
      const res = await API.sendChatMessage(userMessage);
      return {
        text: res.data.reply,
        sender: "bot",
        data: res.data.data || [],
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Bot error");
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ sender: "user", text: action.payload });
    },
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBotResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBotResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(fetchBotResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUserMessage, clearChat } = chatbotSlice.actions;

export default chatbotSlice.reducer;
