import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchAllFlights = createAsyncThunk("flight/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await API.getAllFlights();
    return res.data; // { success, data, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const fetchFlightById = createAsyncThunk("flight/fetchById", async (id, thunkAPI) => {
  try {
    const res = await API.getFlightById(id);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const searchFlights = createAsyncThunk("flight/search", async (params, thunkAPI) => {
  try {
    const res = await API.searchFlights(params);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    flights: [],
    selectedFlight: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedFlight: (state) => {
      state.selectedFlight = null;
    },
    clearFlightMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFlights.fulfilled, (state, action) => {
        state.flights = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchAllFlights.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(fetchFlightById.fulfilled, (state, action) => {
        state.selectedFlight = action.payload.data;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(fetchFlightById.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(searchFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
        state.success = action.payload.success;
        state.message = action.payload.message;
      });
  },
});

export const { clearSelectedFlight, clearFlightMessage } = flightSlice.actions;
export default flightSlice.reducer;
