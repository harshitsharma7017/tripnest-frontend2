import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const searchTripPackages = createAsyncThunk("tripPackages/search", async (city, thunkAPI) => {
  try {
    const res = await API.searchTripPackages(city);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const TripSlice = createSlice({
  name: "Trip",
  initialState: {
    trip: [],
    selectedTrip: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedTrip: (state) => {
      state.selectedTrip = null;
    },
    clearTripMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTripPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTripPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.trip = action.payload;
        state.success = true;
        state.message = "Trips loaded";
      })
      .addCase(searchTripPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Trips";
      });
  },
});

export const { clearSelectedTrip, clearTripMessage } = TripSlice.actions;
export default TripSlice.reducer;
