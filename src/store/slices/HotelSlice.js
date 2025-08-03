import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

export const searchHotel = createAsyncThunk("hotel/search", async (cityId, thunkAPI) => {
  try {
    const res = await API.getHotelByCity(cityId);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotels: [],
    selectedHotel: null,
    loading: false,
    success: false,
    message: "",
    error: null,
  },
  reducers: {
    clearSelectedHotel: (state) => {
      state.selectedHotel = null;
    },
    clearHotelMessage: (state) => {
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
        state.success = true;
        state.message = "Hotels loaded";
      })
      .addCase(searchHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch hotels";
      });
  },
});

export const { clearSelectedHotel, clearHotelMessage } = hotelSlice.actions;
export default hotelSlice.reducer;
