import { Card, Button, Tag } from "antd";
import { Clock, Users, Zap, Gift } from "lucide-react";

const TravelDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Flash Sale: Goa Package",
      discount: "40% OFF",
      originalPrice: "₹25,000",
      salePrice: "₹15,000",
      description: "3 Days 2 Nights with flights and hotel",
      timeLeft: "6 hours left",
      type: "flash",
      icon: Zap,
      features: ["Flight included", "Beach resort", "Breakfast included"]
    },
    {
      id: 2,
      title: "Weekend Getaway",
      discount: "25% OFF",
      originalPrice: "₹18,000",
      salePrice: "₹13,500",
      description: "2 Days 1 Night hill station package",
      timeLeft: "2 days left",
      type: "weekend",
      icon: Clock,
      features: ["AC transport", "Sightseeing", "Meals included"]
    },
    {
      id: 3,
      title: "Group Booking Special",
      discount: "30% OFF",
      originalPrice: "₹40,000",
      salePrice: "₹28,000",
      description: "4+ people Kerala backwaters",
      timeLeft: "Limited slots",
      type: "group",
      icon: Users,
      features: ["Houseboat stay", "All meals", "Pick up & drop"]
    },
    {
      id: 4,
      title: "Early Bird Offer",
      discount: "35% OFF",
      originalPrice: "₹65,000",
      salePrice: "₹42,250",
      description: "Europe tour package - 10 days",
      timeLeft: "Book 30 days in advance",
      type: "early",
      icon: Gift,
      features: ["8 countries", "4-star hotels", "Visa assistance"]
    }
  ];

  const getTagColor = (type) => {
    switch (type) {
      case "flash":
        return "red";
      case "weekend":
        return "blue";
      case "group":
        return "default";
      case "early":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Exclusive Travel Deals</h2>
        <p className="text-gray-500 text-lg">Limited time offers you don't want to miss</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal) => {
          const Icon = deal.icon;
          return (
            <Card
              key={deal.id}
              className="relative overflow-hidden border-0 shadow-card hover:shadow-travel transition-all duration-300 group"
              bodyStyle={{ padding: '1rem' }}
              title={
                <div className="pb-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <Tag color={getTagColor(deal.type)} className="text-xs m-0">
                      {deal.timeLeft}
                    </Tag>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{deal.title}</div>
                </div>
              }
            >
              {/* Discount badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 text-white px-3 py-1 rounded-bl-lg shadow-md z-10">
                <span className="font-bold text-sm">{deal.discount}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4">{deal.description}</p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {deal.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400 line-through">{deal.originalPrice}</span>
                  <span className="text-xl font-bold text-blue-600">{deal.salePrice}</span>
                </div>

                <Button
                  type="primary"
                  block
                  className="rounded-full font-semibold group-hover:scale-105 transition-transform duration-200"
                >
                  Book Now
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TravelDeals;
