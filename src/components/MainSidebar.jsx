
import { useState } from "react";
import { 
  Home,
  MapPin,
  Calendar,
  Heart,
  User,
  CreditCard,
  Gift,
  Settings,
  HelpCircle,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const MainSidebar = ({ collapsed, onToggle, onNavigate }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/" },
    { title: "Attractions", icon: MapPin, path: "/attractions" },
    { title: "My Trips", icon: Calendar, path: "/trips" },
  ];

  const accountItems = [
    { title: "Profile", icon: User, path: "/profile" },
    { title: "Payment Methods", icon: CreditCard, path: "/" },
    { title: "Rewards", icon: Gift, path: "/" },
    { title: "Settings", icon: Settings, path: "/" },
    { title: "Help", icon: HelpCircle, path: "/help" },
  ];

  const handleItemClick = (title, path) => {
    setActiveItem(title);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div 
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-screen shadow-sm`}
    >
      {/* Header with Toggle Button */}
      <div className={`${collapsed ? 'p-2' : 'p-4'} border-b border-gray-200 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed ? (
          <>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">JS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Smith</p>
                <p className="text-xs text-gray-500">john.smith@email.com</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold">JS</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <ChevronRight className="h-3 w-3 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Gold Member Badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1.5 rounded-full border border-yellow-200">
            <Star className="h-3 w-3 text-yellow-600 fill-yellow-500" />
            <span className="text-xs font-medium text-yellow-700">Gold Member</span>
          </div>
        </div>
      )}

      {/* Collapsed Gold Badge */}
      {collapsed && (
        <div className="px-2 py-2 border-b border-gray-200 flex justify-center">
          <div className="p-1 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-full border border-yellow-200">
            <Star className="h-3 w-3 text-yellow-600 fill-yellow-500" />
          </div>
        </div>
      )}

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-hidden py-4">
        {/* Travel Section */}
        <div className={`${collapsed ? 'px-2' : 'px-4'} mb-6`}>
          {!collapsed && (
            <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
              Travel
            </p>
          )}
          <div className="space-y-1">
            {menuItems.map(({ title, icon: Icon, path }) => (
              <button
                key={title}
                onClick={() => handleItemClick(title, path)}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2'} rounded-lg text-left transition-all duration-200 group relative ${
                  activeItem === title
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                title={collapsed ? title : ""}
              >
                <Icon className={`${collapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 ${
                  activeItem === title ? 'text-blue-600' : ''
                }`} />
                {!collapsed && <span className="text-sm font-medium">{title}</span>}
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {title}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className={`${collapsed ? 'px-2' : 'px-4'}`}>
          {!collapsed && (
            <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
              Account
            </p>
          )}
          <div className="space-y-1">
            {accountItems.map(({ title, icon: Icon, path }) => (
              <button
                key={title}
                onClick={() => handleItemClick(title, path)}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-2 py-3' : 'space-x-3 px-3 py-2'} rounded-lg text-left transition-all duration-200 group relative ${
                  activeItem === title
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                title={collapsed ? title : ""}
              >
                <Icon className={`${collapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 ${
                  activeItem === title ? 'text-blue-600' : ''
                }`} />
                {!collapsed && <span className="text-sm font-medium">{title}</span>}
                
                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {title}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;