import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  Home,
  Plane,
  Hotel,
  Train,
  Bus,
  Calendar,
  Heart,
  User,
  CreditCard,
  Gift,
  Settings,
  HelpCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bell,
  ShoppingBag,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainSidebar from "./MainSidebar";
import { logout } from "../store/slices/authSlice";

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <MainSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        onNavigate={navigate}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-2 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-600">TripNest</h1>
                <p className="text-xs text-gray-500">Your Travel Partner</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 flex justify-center">
              <input
                type="text"
                placeholder="Search destinations, trips, etc."
                className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Heart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">1</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children || (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to MakeMyTrip Dashboard
              </h1>
              <p className="text-gray-600 mb-8">
                Your travel companion for booking flights, hotels, trains, and more.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Plane className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Book Flights</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Find and book domestic and international flights at the best prices.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Hotel className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Book Hotels</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Discover and book hotels, resorts, and accommodations worldwide.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Train className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Book Trains</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Book train tickets with real-time availability and seat selection.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
