import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchAllTrains = createAsyncThunk("train/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await API.getAllTrains();
    return res.data; // { success, data, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchTrainById = createAsyncThunk("train/fetchById", async (id, thunkAPI) => {
  try {
    const res = await API.getTrainById(id);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const searchTrains = createAsyncThunk("train/search", async (params, thunkAPI) => {
  try {
    const res = await API.searchTrains(params);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const trainSlice = createSlice({
  name: "train",
  initialState: {
    train: [],
    selectedFlight: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedTrain: (state) => {
      state.selectedFlight = null;
    },
    clearTrainMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTrains.fulfilled, (state, action) => {
        state.train = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchAllTrains.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(fetchTrainById.fulfilled, (state, action) => {
        state.selectedTrain = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(fetchTrainById.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(searchTrains.fulfilled, (state, action) => {
        state.train = action.payload;
        state.success = action.payload.success;
        state.message = action.payload.message;
      });
  },
});

export const { clearSelectedTrain, clearTrainMessage } = trainSlice.actions;
export default trainSlice.reducer;
