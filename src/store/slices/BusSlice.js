import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchAllBuses = createAsyncThunk("bus/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await API.getAllBuses();
    return res.data; // { success, data, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchBusById = createAsyncThunk("bus/fetchById", async (id, thunkAPI) => {
  try {
    const res = await API.getBusById(id);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const searchBuses = createAsyncThunk("bus/search", async (params, thunkAPI) => {
  try {
    const res = await API.searchBuses(params);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const busSlice = createSlice({
  name: "bus",
  initialState: {
    bus: [],
    selectedBus: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedBus: (state) => {
      state.selectedBus = null;
    },
    clearBusMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllBuses
      .addCase(fetchAllBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBuses.fulfilled, (state, action) => {
        state.bus = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchAllBuses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // fetchBusById
      .addCase(fetchBusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusById.fulfilled, (state, action) => {
        state.selectedBus = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchBusById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // searchBuses
      .addCase(searchBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBuses.fulfilled, (state, action) => {
        state.bus = action.payload;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(searchBuses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearSelectedBus, clearBusMessage } = busSlice.actions;
export default busSlice.reducer;
