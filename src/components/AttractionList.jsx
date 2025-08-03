// components/AttractionList.jsx
import { useSelector } from "react-redux";

const AttractionList = () => {
  const { attractions, loading, error } = useSelector((state) => state.attractions);

  if (loading) return <p className="text-center mt-6">Loading attractions...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!attractions.length) return <p className="text-center mt-6">No attractions found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {attractions.map((attr) => (
        <div key={attr._id} className="bg-white rounded-lg shadow border p-4">
          <img
            src={attr.imageUrl}
            alt={attr.name}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h2 className="text-lg font-semibold">{attr.name}</h2>
          <p className="text-sm text-gray-500">{attr.description}</p>
          <p className="text-xs text-gray-400 mt-1">📍 {attr.location}, {attr.city}</p>
        </div>
      ))}
    </div>
  );
};

export default AttractionList;
