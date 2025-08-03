import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchAllAttractions = createAsyncThunk("attractions/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await API.getAllAttractions();
    return res.data; // { success, data, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const searchAttractions = createAsyncThunk("attractions/search", async (params, thunkAPI) => {
  try {
    const res = await API.searchAttractions(params);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


const attractionsSlice = createSlice({
  name: "attractions",
  initialState: {
    attractions: [],
    selectedAttraction: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedAttractions: (state) => {
      state.selectedAttraction= null;
    },
    clearAttractionsMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAttractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAttractions.fulfilled, (state, action) => {
        state.attractions = action.payload;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchAllAttractions.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(searchAttractions.fulfilled, (state, action) => {
              state.attractions = action.payload;
              state.success = action.payload.success;
              state.message = action.payload.message;
            });
  },
});

export const { clearSelectedAttractions, clearAttractionsMessage } = attractionsSlice.actions;
export default attractionsSlice.reducer;
