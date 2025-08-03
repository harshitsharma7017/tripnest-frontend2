import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cityReducer from './slices/CitySlice'
import busReducer from './slices/BusSlice'
import trainReducer from './slices/TrainSlice'
import flightReducer from './slices/flightSlice'
import hotelReducer from './slices/HotelSlice'
import attractionsReducer from './slices/attractionsSlice'
import chatbotReducer from './slices/chatbotSlice'
import TripReducer from './slices/TripSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    city: cityReducer,
    bus: busReducer,
    train: trainReducer,
    flight: flightReducer,
    hotel: hotelReducer,
    attractions: attractionsReducer,
    chatbot: chatbotReducer,
    trip: TripReducer
  },
});

export default store;
