import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, MapPin, Calendar, Filter, Loader, AlertCircle, ChevronDown, X } from 'lucide-react';
import { fetchAllAttractions, searchAttractions, clearAttractionsMessage } from '../store/slices/attractionsSlice';
import { fetchAllCities, clearCityMessage } from '../store/slices/CitySlice';

const AttractionsPage = () => {
  const dispatch = useDispatch();
  const { attractions, loading, error, message, success } = useSelector(state => state.attractions);
  const { city: citiesData, loading: citiesLoading, error: citiesError } = useSelector(state => state.city);
  
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchAllAttractions());
    dispatch(fetchAllCities());
    
    return () => {
      dispatch(clearAttractionsMessage());
      dispatch(clearCityMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    const searchParams = {};
    
    if (selectedCity) {
      searchParams.city = selectedCity;
    }
    
    if (searchTerm) {
      searchParams.search = searchTerm;
    }
    
    if (selectedCity || searchTerm) {
      dispatch(searchAttractions(searchParams));
    } else {
      dispatch(fetchAllAttractions());
    }
  }, [selectedCity, searchTerm, dispatch]);

  const cities = useMemo(() => {
    if (Array.isArray(citiesData)) return citiesData;
    if (citiesData?.data) return citiesData.data;
    return [];
  }, [citiesData]);

  const filteredCities = useMemo(() => {
    if (!citySearchTerm) return cities;
    return cities.filter(city => 
      city.name?.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
      city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
  }, [cities, citySearchTerm]);

  const attractionsData = useMemo(() => {
    if (Array.isArray(attractions)) return attractions;
    if (attractions?.data) return attractions.data;
    return [];
  }, [attractions]);

  const filteredAttractions = attractionsData;

  const attractionsByCity = useMemo(() => {
    const grouped = {};
    attractionsData.forEach(attraction => {
      if (!grouped[attraction.city]) {
        grouped[attraction.city] = [];
      }
      grouped[attraction.city].push(attraction);
    });
    return grouped;
  }, [attractionsData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    setCitySearchTerm('');
    setShowCityDropdown(false);
  };

  const clearCityFilter = () => {
    setSelectedCity('');
    setCitySearchTerm('');
  };

  const clearAllFilters = () => {
    setSelectedCity('');
    setSearchTerm('');
    setCitySearchTerm('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.city-dropdown-container')) {
        setShowCityDropdown(false);
      }
    };

    if (showCityDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showCityDropdown]);

  // Loading state
  if (loading || citiesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading attractions and cities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || citiesError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load data</h3>
          <p className="text-gray-600 mb-4">{error || citiesError}</p>
          <button
            onClick={() => {
              dispatch(fetchAllAttractions());
              dispatch(fetchAllCities());
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Attractions</h1>
            <p className="mt-2 text-gray-600">Discover amazing places around the world</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {success && message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search attractions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* City Filter with Search */}
              <div className="relative city-dropdown-container">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <div className="flex">
                    <input
                      type="text"
                      placeholder={selectedCity || "Search cities..."}
                      value={citySearchTerm}
                      onChange={(e) => {
                        setCitySearchTerm(e.target.value);
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      className="pl-10 pr-10 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[200px]"
                    />
                    {selectedCity && (
                      <button
                        onClick={clearCityFilter}
                        className="px-2 border-t border-b border-gray-300 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowCityDropdown(!showCityDropdown)}
                      className="px-2 border border-l-0 border-gray-300 rounded-r-lg bg-white hover:bg-gray-50"
                    >
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Dropdown */}
                  {showCityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="py-1">
                        <button
                          onClick={() => handleCitySelect('')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-900 font-medium"
                        >
                          All Cities
                        </button>
                        {filteredCities.length > 0 ? (
                          filteredCities.map((city, index) => {
                            const cityName = typeof city === 'string' ? city : city.name;
                            return (
                              <button
                                key={index}
                                onClick={() => handleCitySelect(cityName)}
                                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                              >
                                {cityName}
                              </button>
                            );
                          })
                        ) : (
                          <div className="px-4 py-2 text-gray-500 text-sm">
                            No cities found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCity || searchTerm) && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedCity && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  City: {selectedCity}
                  <button
                    onClick={clearCityFilter}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(selectedCity || searchTerm) && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAttractions.length} attraction{filteredAttractions.length !== 1 ? 's' : ''}
            {selectedCity && ` in ${selectedCity}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>

        {/* Attractions Grid/List */}
        {filteredAttractions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedCity || searchTerm ? 'No attractions found' : 'No attractions available'}
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedCity || searchTerm
                ? 'Try adjusting your search criteria or filters.'
                : 'There are no attractions to display at the moment.'
              }
            </p>
            {(selectedCity || searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction._id}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-w-16 aspect-h-9'}>
                  <img
                    src={attraction.imageUrl || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop'}
                    alt={attraction.name}
                    className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                      {attraction.name}
                    </h3>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{attraction.city}</span>
                    {attraction.location && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{attraction.location}</span>
                      </>
                    )}
                  </div>

                  <p className={`text-gray-700 mb-4 ${viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                    {attraction.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Added {formatDate(attraction.createdAt)}</span>
                    </div>

                    <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionsPage;