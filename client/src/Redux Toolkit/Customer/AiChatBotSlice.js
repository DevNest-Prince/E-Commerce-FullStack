import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// Initial State
const initialState = {
  response: null,
  loading: false,
  error: null,
  messages: [],
};

// Async thunk - chatBot
export const chatBot = createAsyncThunk(
  "aiChatBot/generateResponse",
  async ({ prompt, productId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/chat", prompt, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        params: { userId, productId },
      });

      console.log("response ", productId, response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to generate chatbot response"
      );
    }
  }
);

// askProductQuestion Thunk
export const askProductQuestion = createAsyncThunk(
  "aiChatBot/askProductQuestion",
  async ({ productId, question }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/chat/product/${productId}`, {
        question,
      });

      console.log("chat answer ----- ", response.data);
      return response.data.answer;
    } catch (error) {
      console.log("error --- ", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to get answer";
      return rejectWithValue(message);
    }
  }
);

// Create Slice
const aiChatBotSlice = createSlice({
  name: "aiChatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ---- chatBot ----
      .addCase(chatBot.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        const { prompt } = action.meta.arg;
        const userPrompt = { message: prompt.prompt, role: "user" };
        state.messages.push(userPrompt);
      })

      .addCase(chatBot.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.messages.push(action.payload);
      })

      .addCase(chatBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---- askProductQuestion ----
      .addCase(askProductQuestion.pending, (state, action) => {
        state.loading = true;
        state.messages.push({
          role: "user",
          message: action.meta.arg.question,
        });
      })

      .addCase(askProductQuestion.fulfilled, (state, action) => {
        state.loading = false;
        console.log("ans - ", action.payload);
        state.messages.push({ role: "res", message: action.payload });
      })

      .addCase(askProductQuestion.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default aiChatBotSlice.reducer;
