import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plane, Building2, Package, Bus, Train } from 'lucide-react';

import FlightBooking from './FlightBooking';
import HotelBooking from './HotelBooking';
import HolidayPackages from './HolidayPackages';
import BusBooking from './BusBooking';
import TrainBooking from './TrainBooking';
import { fetchAllCities } from '../store/slices/CitySlice';

const TravelBooking = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.city.city);
  const [activeTab, setActiveTab] = useState('flights');

  useEffect(() => {
    dispatch(fetchAllCities());
  }, [dispatch]);

  const tabs = [
    {
      key: 'flights',
      icon: <Plane className="h-5 w-5" />,
      component: <FlightBooking cities={cities} />,
    },
    {
      key: 'hotels',
      icon: <Building2 className="h-5 w-5" />,
      component: <HotelBooking cities={cities} />,
    },
    {
      key: 'buses',
      icon: <Bus className="h-5 w-5" />,
      component: <BusBooking cities={cities} />,
    },
    {
      key: 'trains',
      icon: <Train className="h-5 w-5" />,
      component: <TrainBooking cities={cities} />,
    },
    {
      key: 'packages',
      icon: <Package className="h-5 w-5" />,
      component: <HolidayPackages cities={cities} />,
    },
  ];

  const renderActiveContent = () => {
    const active = tabs.find((tab) => tab.key === activeTab);
    return active ? active.component : null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4">
      {/* Icons Only Tab Row */}
      <div className="mb-4">
        <div className="flex justify-between bg-white rounded-xl shadow-sm p-2 border border-gray-100">
          {tabs.map((tab) => (
            <button
  key={tab.key}
  onClick={() => setActiveTab(tab.key)}
  className={`flex flex-col sm:flex-row items-center justify-center w-1/5 p-2 gap-1 rounded-md transition-all 
    ${activeTab === tab.key
      ? 'bg-blue-600 text-white shadow'
      : 'text-gray-600 hover:bg-blue-50'}
  `}
>
  {tab.icon}
  <span className="hidden sm:inline text-sm font-medium capitalize">{tab.key}</span>
</button>

          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-8">{renderActiveContent()}</div>
      </div>
    </div>
  );
};

export default TravelBooking;
