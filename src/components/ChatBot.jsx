import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUserMessage, fetchBotResponse } from "../store/slices/chatbotSlice";
import { SendOutlined } from "@ant-design/icons";
import { Input, Button, Card } from "antd";

const ChatBotWidget = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chatbot);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    dispatch(addUserMessage(message));
    dispatch(fetchBotResponse(message));
    setMessage("");
  };

  const renderBotCard = (item) => {
  switch (item.type) {
    case "flight":
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p><strong>{item.airline}</strong> ({item.flightNumber})</p>
          <p>{item.sourceAirport} ➡ {item.destinationAirport}</p>
          <p>🕒 {new Date(item.departureTime).toLocaleString()} → {new Date(item.arrivalTime).toLocaleString()}</p>
          <p>⏱ Duration: {item.duration}</p>
          <p>💰 ₹{item.price}</p>
        </div>
      );

    case "train":
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p><strong>{item.trainName}</strong> ({item.trainNumber})</p>
          <p>{item.sourceStation} ➡ {item.destinationStation}</p>
          <p>🕒 {new Date(item.departureTime).toLocaleString()} → {new Date(item.arrivalTime).toLocaleString()}</p>
          <p>💰 Sleeper: ₹{item.fare?.sleeper} | AC3: ₹{item.fare?.ac3}</p>
        </div>
      );

    case "bus":
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p><strong>{item.operatorName}</strong> ({item.busType})</p>
          <p>{item.sourceCity} ➡ {item.destinationCity}</p>
          <p>🕒 {new Date(item.departureTime).toLocaleString()} → {new Date(item.arrivalTime).toLocaleString()}</p>
          <p>💰 ₹{item.price}</p>
          <p>Available Seats: {item.availableSeats}</p>
        </div>
      );

    case "hotel":
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p className="font-semibold">{item.name}</p>
          <p>📍 {typeof item.city === "string" ? item.city : item.city?.name}</p>
          <p>💰 ₹{item.pricePerNight} per night</p>
          <p>⭐ {item.rating}</p>
          {item.description && <p>{item.description}</p>}
        </div>
      );

    case "trip":
    case "tripPackage":
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p className="font-semibold">{item.title}</p>
          <p>📍 {item.city}</p>
          <p>{item.duration}</p>
          <p>💰 ₹{item.price}</p>
          <p>🧳 {item.inclusions?.join(", ")}</p>
        </div>
      );

    case "attraction":
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p className="font-semibold">{item.name}</p>
          <p>📍 {item.city}</p>
          {item.description && <p>{item.description}</p>}
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-32 object-cover rounded mt-1"
            />
          )}
        </div>
      );

    default:
      return (
        <div className="border p-2 rounded bg-white shadow">
          <p>Unsupported item type.</p>
        </div>
      );
  }
};


  return (
    <div className="fixed bottom-8 right-16 z-50">
      {open ? (
        <Card
          title="Ask me anything"
          extra={<Button onClick={() => setOpen(false)} type="text">×</Button>}
          className="w-[500px] shadow-2xl rounded-xl"
          bodyStyle={{ maxHeight: 500, overflowY: "auto", paddingBottom: 0 }}
        >
          <div className="flex flex-col gap-3 mb-3 max-h-[400px] overflow-y-auto pr-1">
            {messages.map((msg, index) => (
  <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
    <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
      {msg.text}
    </div>

    {/* If bot response has data (flights), show it nicely */}
    {msg.sender === "bot" && msg.data && Array.isArray(msg.data) && (
        <div className="mt-2 space-y-2">
          {msg.sender === "bot" && Array.isArray(msg.data) && (
            <div className="mt-2 space-y-2">
              {msg.data.map((item, i) => (
                <div key={i}>{renderBotCard(item)}</div>
              ))}
            </div>
          )}
        </div>
          )}
      </div>
      ))}
          </div>
          <div className="flex gap-2 pt-2 border-t mt-2 mb-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSend}
              placeholder="Type a message..."
              disabled={loading}
            />
            <Button
              icon={<SendOutlined />}
              onClick={handleSend}
              type="primary"
              loading={loading}
            />
          </div>
        </Card>
      ) : (
        <Button
          shape="circle"
          type="primary"
          size="large"
          onClick={() => setOpen(true)}
          className="shadow-lg"
        >
          🤖
        </Button>
      )}
    </div>
  );
};

export default ChatBotWidget;
