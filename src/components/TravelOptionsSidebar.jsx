import { useState } from "react";
import { Card, Button, Tag, Divider } from "antd";
import {
  X, MapPin, Calendar, Users,
  Plane, Hotel, Car, Umbrella,
  Clock, Star, SlidersHorizontal
} from "lucide-react";

const TravelOptionsSidebar = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const quickOptions = [
    // ... same data as before
  ];
  const recentSearches = [
    // ... same data
  ];
  const popularDestinations = [
    // ... same data
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Travel Options</h2>
            <p className="text-sm text-gray-500">Personalized for you</p>
          </div>
          <Button type="text" icon={<X className="h-4 w-4 text-gray-600" />} onClick={onClose} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <SlidersHorizontal className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Quick Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", "flights", "hotels", "packages"].map(f => (
              <Button
                key={f}
                type={activeFilter === f ? "default" : "dashed"}
                size="small"
                onClick={() => setActiveFilter(f)}
                className="text-xs hover:scale-105"
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Options */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-600" />
            Quick Options
          </h3>
          {quickOptions.map(opt => {
            const Icon = opt.icon;
            return (
              <Card
                key={opt.id}
                hoverable
                onClick={() => {}}
                className={`transition-all duration-200 hover:shadow-md hover:scale-[1.02] border ${opt.urgent ? "border-red-200 bg-red-50" : "border-gray-200"} cursor-pointer`}
                bodyStyle={{ padding: "0.75rem" }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${opt.urgent ? "bg-red-100" : "bg-blue-50"}`}>
                    <Icon className={`h-4 w-4 ${opt.urgent ? "text-red-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{opt.title}</h4>
                      {opt.urgent && <Tag color="red" className="text-xs animate-pulse">URGENT</Tag>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{opt.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-blue-600">{opt.price}</span>
                      <Tag color="blue" className="text-xs">{opt.discount}</Tag>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Divider />

        {/* Recent Searches */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            Recent Searches
          </h3>
          {recentSearches.map((s, idx) => (
            <Card
              key={idx}
              hoverable
              className="cursor-pointer transition-all duration-200 hover:bg-gray-100 border border-gray-200"
              bodyStyle={{ padding: "0.75rem" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.route}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{s.date}</span>
                    <span className="flex items-center"><Users className="h-3 w-3 mr-1" />{s.passengers}</span>
                  </div>
                </div>
                <Button type="text" size="small" className="text-xs">Search</Button>
              </div>
            </Card>
          ))}
        </div>

        <Divider />

        {/* Trending Destinations */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            Trending Destinations
          </h3>
          {popularDestinations.map((dest, idx) => (
            <Card
              key={idx}
              hoverable
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border border-gray-200"
              bodyStyle={{ padding: "0.75rem" }}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{dest.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{dest.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-medium">{dest.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-blue-600 mt-1">Starting {dest.price}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-6 bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500 text-white border-0">
          <div className="p-4 text-center">
            <h4 className="text-sm font-semibold mb-2">Get Personalized Recommendations</h4>
            <p className="text-xs opacity-80 mb-3">Tell us your preferences for better suggestions</p>
            <Button type="primary" size="small" className="w-full">Take Quiz</Button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default TravelOptionsSidebar;