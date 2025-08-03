import { useState } from "react";
import {
  MapPin, Calendar, Phone, Mail,
  Star, Gift, CreditCard, Plane,
  Hotel, Heart, Settings, Bell,
  Globe, Shield, ChevronRight, Trophy,
  Camera, Edit3, MessageCircle, Share2
} from "lucide-react";

const UserProfile = () => {
  const [activeTab] = useState("overview");
  
  const userStats = [
    { label: "Trips Completed", value: "24", icon: Plane, color: "from-blue-500 to-blue-600" },
    { label: "Cities Visited", value: "12", icon: MapPin, color: "from-green-500 to-green-600" },
    { label: "Hotels Booked", value: "18", icon: Hotel, color: "from-purple-500 to-purple-600" },
    { label: "Favorites", value: "6", icon: Heart, color: "from-pink-500 to-pink-600" }
  ];

  const recentTrips = [
    { id: 1, destination: "Paris, France", date: "Dec 2024", type: "Leisure", image: "🗼", rating: 5 },
    { id: 2, destination: "Tokyo, Japan", date: "Nov 2024", type: "Business", image: "🏯", rating: 4 },
    { id: 3, destination: "Bali, Indonesia", date: "Oct 2024", type: "Leisure", image: "🏝️", rating: 5 },
    { id: 4, destination: "New York, USA", date: "Sep 2024", type: "Business", image: "🗽", rating: 4 }
  ];

  const achievements = [
    { title: "Globe Trotter", description: "Visited 10+ countries", icon: "🌍" },
    { title: "Hotel Connoisseur", description: "5-star reviews", icon: "⭐" },
    { title: "Adventure Seeker", description: "Extreme activities", icon: "🏔️" },
    { title: "Culture Explorer", description: "Museum visits", icon: "🎨" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  JS
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Gold
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">John Smith</h1>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center justify-center sm:justify-start">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    john.smith@email.com
                  </p>
                  <p className="flex items-center justify-center sm:justify-start">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    +91 98765 43210
                  </p>
                  <p className="flex items-center justify-center sm:justify-start">
                    <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                    Mumbai, India
                  </p>
                  <p className="flex items-center justify-center sm:justify-start">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    Member since 2020
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                  <Globe className="h-4 w-4 mr-2" />
                  Plan Trip
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {userStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100 overflow-hidden group"
              >
                <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
                <div className="p-4 sm:p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Trips */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Plane className="h-5 w-5 mr-3 text-blue-600" />
                  Recent Trips
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {recentTrips.map(trip => (
                <div key={trip.id} className="group flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                    {trip.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{trip.destination}</h4>
                    <p className="text-sm text-gray-500">{trip.date}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {trip.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`h-4 w-4 ${j < trip.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Trophy className="h-5 w-5 mr-3 text-yellow-500" />
                Achievements
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              {achievements.map((ach, i) => (
                <div key={i} className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 transition-all duration-200 cursor-pointer">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {ach.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 text-sm">{ach.title}</h5>
                    <p className="text-xs text-gray-500 mt-1">{ach.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-yellow-600 transition-colors duration-200" />
                </div>
              ))}
              <button className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg text-sm">
                View All Badges
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: CreditCard, label: "Payment Methods", color: "from-green-500 to-emerald-500" },
                { icon: Bell, label: "Notifications", color: "from-blue-500 to-cyan-500" },
                { icon: Heart, label: "Wishlist", color: "from-pink-500 to-rose-500" },
                { icon: Gift, label: "Rewards", color: "from-purple-500 to-indigo-500" }
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    className="group p-4 sm:p-6 bg-gray-50 hover:bg-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg border border-transparent hover:border-gray-200"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 block text-center">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;