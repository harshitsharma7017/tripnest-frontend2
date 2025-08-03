// src/components/ChatBotWidget.jsx
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

  return (
    <div className="fixed bottom-8 right-16 z-50">
      {open ? (
        <Card
          title="Ask me anything"
          extra={<Button onClick={() => setOpen(false)} type="text">×</Button>}
          className="w-80 shadow-lg rounded-xl"
          bodyStyle={{ maxHeight: 350, overflowY: "auto", paddingBottom: 0 }}
        >
          <div className="flex flex-col gap-2 mb-2 max-h-60 overflow-y-auto">
            {messages.map((msg, index) => (
  <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
    <div className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
      {msg.text}
    </div>

    {/* If bot response has data (flights), show it nicely */}
    {msg.sender === "bot" && msg.data && Array.isArray(msg.data) && (
      <div className="mt-2 space-y-2">
        {msg.data.map((flight, i) => (
          <div key={i} className="border p-2 rounded-lg bg-white shadow">
            <p><strong>{flight.airline}</strong> ({flight.flightNumber})</p>
            <p>{flight.sourceAirport} ➡ {flight.destinationAirport}</p>
            <p>🕒 {new Date(flight.departureTime).toLocaleString()} → {new Date(flight.arrivalTime).toLocaleString()}</p>
            <p>⏱ Duration: {flight.duration}</p>
            <p>💰 ₹{flight.price}</p>
          </div>
        ))}
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
