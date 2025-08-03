import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const fetchAllCities = createAsyncThunk("cities/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await API.getAllCities();
    return res.data; // { success, data, message }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


const citySlice = createSlice({
  name: "city",
  initialState: {
    city: [],
    selectedFlight: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedCity: (state) => {
      state.selectedFlight = null;
    },
    clearCityMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.city = action.payload;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.loading = false;
      })
      .addCase(fetchAllCities.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export const { clearSelectedCity, clearCityMessage } = citySlice.actions;
export default citySlice.reducer;
