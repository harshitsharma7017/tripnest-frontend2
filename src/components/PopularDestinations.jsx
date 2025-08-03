import { Card, Tag } from "antd";
import { Star, MapPin } from "lucide-react";
import destination1 from "../assets/destination-1.jpg";
import destination2 from "../assets/destination-2.jpg";
import destination3 from "../assets/destination-3.jpg";
import destination4 from "../assets/destination-4.jpg";

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Maldives",
      location: "Indian Ocean",
      image: destination1,
      rating: 4.8,
      price: "₹45,000",
      duration: "5 Days",
      type: "Beach Paradise",
    },
    {
      id: 2,
      name: "Swiss Alps",
      location: "Switzerland",
      image: destination2,
      rating: 4.9,
      price: "₹85,000",
      duration: "7 Days",
      type: "Mountain Adventure",
    },
    {
      id: 3,
      name: "Taj Mahal",
      location: "Agra, India",
      image: destination3,
      rating: 4.7,
      price: "₹15,000",
      duration: "3 Days",
      type: "Cultural Heritage",
    },
    {
      id: 4,
      name: "Singapore",
      location: "Southeast Asia",
      image: destination4,
      rating: 4.8,
      price: "₹55,000",
      duration: "4 Days",
      type: "City Break",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Destinations</h2>
        <p className="text-gray-500 text-lg">Discover amazing places around the world</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            hoverable
            cover={
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 z-10">
                  <Tag color="default" className="bg-white/90 text-black font-medium text-xs">
                    {destination.type}
                  </Tag>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <Tag color="success" className="text-xs font-medium">
                    {destination.duration}
                  </Tag>
                </div>
              </div>
            }
            className="group overflow-hidden border-0 shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
            bodyStyle={{ padding: "1rem" }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-gray-800">{destination.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{destination.location}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-500">Starting from</span>
                <span className="text-lg font-bold text-blue-600">{destination.price}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
