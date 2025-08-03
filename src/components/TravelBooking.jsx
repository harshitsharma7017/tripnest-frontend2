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
      label: 'Flights',
      icon: <Plane className="h-5 w-5" />,
      component: <FlightBooking cities={cities} />
    },
    {
      key: 'hotels',
      label: 'Hotels',
      icon: <Building2 className="h-5 w-5" />,
      component: <HotelBooking cities={cities} />
    },
    {
      key: 'buses',
      label: 'Buses',
      icon: <Bus className="h-5 w-5" />,
      component: <BusBooking cities={cities} />
    },
    {
      key: 'trains',
      label: 'Trains',
      icon: <Train className="h-5 w-5" />,
      component: <TrainBooking cities={cities} />
    },
    {
      key: 'packages',
      label: 'Packages',
      icon: <Package className="h-5 w-5" />,
      component: <HolidayPackages cities={cities} />
    }
  ];

  const renderActiveContent = () => {
    const activeTabData = tabs.find(tab => tab.key === activeTab);
    return activeTabData ? activeTabData.component : null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header Tabs */}
      <div className="mb-6">
    <div className="flex items-center bg-white rounded-xl shadow-sm p-2 border border-gray-100">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`
            flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${activeTab === tab.key
              ? 'bg-blue-600 text-white shadow-md transform scale-105'
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }
          `}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  </div>

      {/* Content Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          {renderActiveContent()}
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 640px) {
          .flex.items-center.space-x-1 {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default TravelBooking;