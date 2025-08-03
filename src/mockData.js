export const cities = [
  { name: 'Delhi', code: 'DEL' },
  { name: 'Mumbai', code: 'BOM' },
  { name: 'Bangalore', code: 'BLR' },
  { name: 'Chennai', code: 'MAA' },
  { name: 'Kolkata', code: 'CCU' },
  { name: 'Hyderabad', code: 'HYD' },
  { name: 'Pune', code: 'PNQ' },
  { name: 'Ahmedabad', code: 'AMD' },
];

export const trainStations = [
  { name: 'New Delhi Railway Station', code: 'NDLS' },
  { name: 'Mumbai Central', code: 'BCT' },
  { name: 'Bangalore City Junction', code: 'SBC' },
  { name: 'Chennai Central', code: 'MAS' },
  { name: 'Howrah Junction', code: 'HWH' },
  { name: 'Hyderabad Deccan', code: 'HYB' },
];

export const packageDestinations = [
  { name: 'Goa', code: 'GOA' },
  { name: 'Kerala', code: 'KER' },
  { name: 'Rajasthan', code: 'RAJ' },
  { name: 'Himachal Pradesh', code: 'HP' },
  { name: 'Uttarakhand', code: 'UK' },
  { name: 'Kashmir', code: 'JK' },
];

export const quickDeals = [
  {
    title: 'Delhi to Mumbai',
    description: 'Round trip flights',
    price: '4,999',
    discount: '40% OFF',
    image: '/deal1.jpg'
  },
  {
    title: 'Goa Hotels',
    description: '3 nights stay',
    price: '2,999',
    discount: '50% OFF',
    image: '/deal2.jpg'
  },
  {
    title: 'Kerala Package',
    description: '5 days backwaters',
    price: '12,999',
    discount: '30% OFF',
    image: '/deal3.jpg'
  },
  {
    title: 'Rajasthan Tour',
    description: '7 days heritage',
    price: '18,999',
    discount: '35% OFF',
    image: '/deal4.jpg'
  }
];

export const popularDestinations = [
  {
    name: 'Goa',
    country: 'India',
    description: 'Beautiful beaches and vibrant nightlife',
    startingPrice: '2,999',
    image: '/goa.jpg'
  },
  {
    name: 'Kerala',
    country: 'India',
    description: 'Backwaters and spice plantations',
    startingPrice: '3,999',
    image: '/kerala.jpg'
  },
  {
    name: 'Rajasthan',
    country: 'India',
    description: 'Royal palaces and desert safaris',
    startingPrice: '4,999',
    image: '/rajasthan.jpg'
  }
];

export const holidayPackages = [
  {
    name: 'Goa Beach Paradise',
    duration: '4D/3N',
    includes: 'Flight + Hotel + Meals',
    price: '15,999',
    originalPrice: '25,999',
    image: '/package1.jpg'
  },
  {
    name: 'Kerala Backwaters',
    duration: '5D/4N',
    includes: 'Houseboat + Sightseeing',
    price: '22,999',
    originalPrice: '32,999',
    image: '/package2.jpg'
  },
  {
    name: 'Himachal Adventure',
    duration: '6D/5N',
    includes: 'Adventure Sports + Stay',
    price: '18,999',
    originalPrice: '28,999',
    image: '/package3.jpg'
  }
];

export const customerReviews = [
  {
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing experience! The booking was smooth and the trip was perfectly organized.',
    tripType: 'Kerala Package',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Rajesh Kumar',
    rating: 4,
    comment: 'Great deals on flights. Saved a lot of money compared to other platforms.',
    tripType: 'Flight Booking',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Anita Patel',
    rating: 5,
    comment: 'The hotel recommendations were perfect. Everything was as described.',
    tripType: 'Hotel Booking',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

// Mock search results data
const mockFlights = [
  {
    id: 1,
    airline: 'IndiGo',
    aircraft: 'A320',
    from: 'DEL',
    to: 'BOM',
    departureTime: '06:00',
    arrivalTime: '08:30',
    duration: '2h 30m',
    stops: 0,
    price: '4,999'
  },
  {
    id: 2,
    airline: 'Air India',
    aircraft: 'Boeing 737',
    from: 'DEL',
    to: 'BOM',
    departureTime: '09:15',
    arrivalTime: '11:45',
    duration: '2h 30m',
    stops: 0,
    price: '5,499'
  },
  {
    id: 3,
    airline: 'SpiceJet',
    aircraft: 'A320',
    from: 'DEL',
    to: 'BOM',
    departureTime: '14:20',
    arrivalTime: '17:10',
    duration: '2h 50m',
    stops: 1,
    price: '3,999'
  }
];

const mockHotels = [
  {
    id: 1,
    name: 'Taj Palace Hotel',
    location: 'Central Mumbai',
    rating: 4.5,
    reviews: 1250,
    price: '8,999',
    image: '/hotel1.jpg',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant']
  },
  {
    id: 2,
    name: 'The Oberoi',
    location: 'Marine Drive',
    rating: 4.8,
    reviews: 890,
    price: '12,999',
    image: '/hotel2.jpg',
    amenities: ['Sea View', 'Butler Service', 'Fine Dining', 'Gym']
  },
  {
    id: 3,
    name: 'Hotel Sunshine',
    location: 'Bandra West',
    rating: 4.2,
    reviews: 654,
    price: '4,999',
    image: '/hotel3.jpg',
    amenities: ['Free Breakfast', 'WiFi', 'AC', 'Room Service']
  }
];

const mockTrains = [
  {
    id: 1,
    trainName: 'Rajdhani Express',
    trainNumber: '12951',
    fromStation: 'NDLS',
    toStation: 'BCT',
    departureTime: '16:00',
    arrivalTime: '08:35',
    duration: '16h 35m',
    availableClasses: [
      { class: '1AC', price: '4,500', available: true },
      { class: '2AC', price: '2,800', available: true },
      { class: '3AC', price: '1,900', available: false }
    ]
  },
  {
    id: 2,
    trainName: 'August Kranti Rajdhani',
    trainNumber: '12953',
    fromStation: 'NDLS',
    toStation: 'BCT',
    departureTime: '17:25',
    arrivalTime: '09:50',
    duration: '16h 25m',
    availableClasses: [
      { class: '1AC', price: '4,200', available: true },
      { class: '2AC', price: '2,600', available: true },
      { class: '3AC', price: '1,800', available: true }
    ]
  }
];

const mockBuses = [
  {
    id: 1,
    operatorName: 'Sharma Travels',
    busType: 'Volvo AC Sleeper',
    from: 'Delhi',
    to: 'Mumbai',
    departureTime: '18:00',
    arrivalTime: '12:00',
    duration: '18h 00m',
    price: '1,200',
    seatsAvailable: 12,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket']
  },
  {
    id: 2,
    operatorName: 'RedBus Express',
    busType: 'Mercedes Multi-Axle',
    from: 'Delhi',
    to: 'Mumbai',
    departureTime: '20:30',
    arrivalTime: '14:30',
    duration: '18h 00m',
    price: '1,500',
    seatsAvailable: 8,
    amenities: ['AC', 'Entertainment', 'Snacks', 'Water']
  }
];

const mockPackages = [
  {
    id: 1,
    name: 'Golden Triangle Tour',
    duration: '7 Days / 6 Nights',
    destinations: ['Delhi', 'Agra', 'Jaipur'],
    price: '25,999',
    rating: 4.6,
    reviews: 245,
    image: '/package1.jpg',
    includes: ['Accommodation', 'Meals', 'Transportation', 'Guide']
  },
  {
    id: 2,
    name: 'Kerala Backwater Experience',
    duration: '5 Days / 4 Nights',
    destinations: ['Kochi', 'Alleppey', 'Kumarakom'],
    price: '18,999',
    rating: 4.8,
    reviews: 189,
    image: '/package2.jpg',
    includes: ['Houseboat Stay', 'All Meals', 'Sightseeing', 'Airport Transfer']
  }
];

export const getCityName = (code) => {
  const city = cities.find(c => c.code === code);
  return city ? city.name : code;
};

export const getSearchResults = (searchType, searchData) => {
  // Simulate API call delay and return mock data based on search type
  switch (searchType) {
    case 'flights':
      return mockFlights.filter(flight => 
        (!searchData.from || flight.from === searchData.from) &&
        (!searchData.to || flight.to === searchData.to)
      );
    
    case 'hotels':
      return mockHotels.filter(hotel =>
        !searchData.destination || hotel.location.toLowerCase().includes(searchData.destination.toLowerCase())
      );
    
    case 'trains':
      return mockTrains.filter(train =>
        (!searchData.from || train.fromStation === searchData.from) &&
        (!searchData.to || train.toStation === searchData.to)
      );
    
    case 'buses':
      return mockBuses.filter(bus =>
        (!searchData.from || bus.from.toLowerCase().includes(searchData.from.toLowerCase())) &&
        (!searchData.to || bus.to.toLowerCase().includes(searchData.to.toLowerCase()))
      );
    
    case 'packages':
      return mockPackages.filter(pkg =>
        !searchData.destination || pkg.destinations.some(dest => 
          dest.toLowerCase().includes(searchData.destination.toLowerCase())
        )
      );
    
    default:
      return [];
  }
};