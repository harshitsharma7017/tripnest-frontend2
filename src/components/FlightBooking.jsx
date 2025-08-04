import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plane, ArrowLeftRight, Users, Calendar, Search, MapPin } from 'lucide-react';
import { searchFlights } from '../store/slices/flightSlice';

const FlightBooking = ({ cities = [] }) => {
  const dispatch = useDispatch();
  const { flights, loading, error } = useSelector(state => state.flight);

  const [formData, setFormData] = useState({
    from: '', to: '', departureDate: '', passengers: 1, class: 'economy'
  });
  const [fareType, setFareType] = useState('regular');

  const handleInputChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSwapCities = () => {
    setFormData(prev => ({ ...prev, from: prev.to, to: prev.from }));
  };

  const handleSearch = () => {
    if (!formData.from || !formData.to || !formData.departureDate) {
      alert('Please fill required fields: From, To, Departure Date');
      return;
    }
    dispatch(searchFlights({
      from: formData.from,
      to: formData.to,
      departureDate: formData.departureDate
    }));
  };

  const fareOptions = [
    { id: 'regular', title: 'Regular', subtitle: 'Regular fares' },
    { id: 'student', title: 'Student', subtitle: 'Extra discounts' },
    { id: 'senior', title: 'Senior Citizen', subtitle: 'Up to ₹600 off', price: '₹600' },
    { id: 'armed', title: 'Armed Forces', subtitle: 'Up to ₹600 off', price: '₹600' },
    { id: 'doctor', title: 'Doctor/Nurse', subtitle: 'Up to ₹600 off', price: '₹600' }
  ];

  const formatDateTime = dateTime => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-IN'),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="px-2 sm:px-4 py-4 w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden ml-2">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-end gap-4 mb-6">
          {/* From */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative border border-gray-300 rounded-lg h-14 bg-white">
              <div className="flex items-center h-full px-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
                <div className="flex-1">
                  <select
                    value={formData.from}
                    onChange={e => handleInputChange('from', e.target.value)}
                    className="w-full text-base font-semibold bg-transparent border-none outline-none"
                  >
                    <option value="">Select departure city</option>
                    {cities.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                  <div className="text-sm text-gray-500 truncate">
                    {formData.from && cities.find(c => c.name === formData.from)?.state}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            </div>
          </div>

          {/* Swap button */}
          <button
            onClick={handleSwapCities}
            className="p-3 hover:bg-blue-50 rounded-full transition border border-gray-200 bg-white"
          >
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
          </button>

          {/* To */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative border border-gray-300 rounded-lg h-14 bg-white">
              <div className="flex items-center h-full px-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3" />
                <div className="flex-1">
                  <select
                    value={formData.to}
                    onChange={e => handleInputChange('to', e.target.value)}
                    className="w-full text-base font-semibold bg-transparent border-none outline-none"
                  >
                    <option value="">Select destination city</option>
                    {cities.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                  <div className="text-sm text-gray-500 truncate">
                    {formData.to && cities.find(c => c.name === formData.to)?.state}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Date and class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
            <div className="relative border border-gray-300 rounded-lg h-14 bg-white">
              <div className="flex items-center h-full px-4">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={e => handleInputChange('departureDate', e.target.value)}
                  className="w-full text-base font-semibold bg-transparent border-none outline-none"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Travellers & Class</label>
            <div className="relative border border-gray-300 rounded-lg h-14 bg-white">
              <div className="flex items-center justify-between h-full px-4 cursor-pointer">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-base font-semibold">
                      {formData.passengers} Traveller{formData.passengers > 1 && 's'}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">{formData.class}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Fare Options */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium">Special fare</span>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">SAVE EXTRA</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-between">
            {fareOptions.map(opt => (
              <div
                key={opt.id}
                className={`border rounded-lg p-3 h-20 w-full sm:w-[18%] flex items-center justify-center cursor-pointer transition ${
                  fareType === opt.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setFareType(opt.id)}
              >
                <div className="text-center text-sm">
                  <div className="font-semibold">{opt.title}</div>
                  <div className="text-xs text-gray-500">{opt.subtitle}</div>
                  {opt.price && <div className="text-xs text-green-600 font-medium mt-1">{opt.price}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search button */}
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white text-lg shadow-md hover:shadow-lg transition`}
          >
            <Search className="w-5 h-5" />
            {loading ? 'SEARCHING...' : 'SEARCH FLIGHTS'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Flight Results */}
      {flights?.length > 0 && (
        <div className="border-t bg-gray-50 p-6">
          <h3 className="text-xl font-semibold mb-4">
            Available Flights ({flights.length} found)
          </h3>
          <div className="grid gap-4">
            {flights.map((flight) => {
              const departure = formatDateTime(flight.departureTime);
              const arrival = formatDateTime(flight.arrivalTime);
              
              return (
                <div key={flight._id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Plane className="w-5 h-5 text-blue-600" />
                        <h4 className="text-lg font-semibold">{flight.airline}</h4>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{flight.flightNumber}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Route</p>
                          <p className="text-gray-600">{flight.sourceAirport} → {flight.destinationAirport}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-gray-700">Departure</p>
                          <p className="text-gray-600">{departure.date}</p>
                          <p className="font-semibold">{departure.time}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-gray-700">Arrival</p>
                          <p className="text-gray-600">{arrival.date}</p>
                          <p className="font-semibold">{arrival.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Duration: {flight.duration}</span>
                        <span>Class: {flight.classType}</span>
                        <span>Available Seats: {flight.availableSeats}</span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-green-600">₹{flight.price}</p>
                      <p className="text-sm text-gray-500 mb-3">per person</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {flights?.length === 0 && !loading && formData.from && formData.to && formData.departureDate && (
        <div className="border-t bg-gray-50 p-6">
          <div className="text-center py-8">
            <Plane className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No flights found</h3>
            <p className="text-gray-500">
              No flights available for your selected route and date. Try different dates or destinations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
