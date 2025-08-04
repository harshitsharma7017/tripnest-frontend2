import React, { useEffect } from 'react';
import { Card, Form, DatePicker, Select, Button, Row, Col, InputNumber, Spin } from 'antd';
import { Building2, MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchHotel } from '../store/slices/HotelSlice';

const { Option } = Select;

const HotelBooking = ({ cities = [] }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { hotels, loading } = useSelector((state) => state.hotel);

  const handleSearch = (values) => {
    const selectedCity = cities.find((city) => city.name === values.destination);

    if (selectedCity?._id) {
        const payload = {
        cityId: selectedCity._id,
        };
        dispatch(searchHotel(payload));
    }
    };


  return (
    <div className='ml-8 flex items-center justify-center'>
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <div className="flex items-center mb-4">
        <Building2 className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Book Hotels</h3>
      </div>
      
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Destination"
              name="destination"
              rules={[{ required: true, message: 'Please enter destination' }]}
            >
              <Select
                placeholder="Select city"
                showSearch
                optionFilterProp="children"
                suffixIcon={<MapPin className="h-4 w-4" />}
              >
                {cities.map(city => (
                  <Option key={city._id} value={city.name}>
                    {city.name} ({city.state})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Check-in"
              name="dates"
              rules={[{ required: true, message: 'Please select dates' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type="primary" htmlType="submit" size="large" className="w-full md:w-auto">
              Search Hotels
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Results */}
      <div className="mt-8 space-y-6">
  {loading ? (
    <Spin />
  ) : hotels.length > 0 ? (
    hotels.map((hotel) => (
      <div
        key={hotel._id}
        className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4"
      >
        <div className="md:w-1/3 w-full">
          <img
            src={hotel.images?.[0]}
            alt={hotel.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-600 ml-40">{hotel.name}</h4>
            <span className="text-sm text-gray-500">⭐ {hotel.rating}</span>
          </div>
          <p className="text-gray-600 mb-1">
            {hotel.city?.name}, {hotel.city?.state}
          </p>
          <p className="text-gray-700 mb-2 mt-2">{hotel.description}</p>
          <p className="text-sm mb-1 text-green-600 mt-4">
            Price: ₹{hotel.pricePerNight.toLocaleString()} / night
          </p>

          <div className="mt-2 flex flex-wrap gap-2 ml-28">
            {hotel.amenities?.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-sm px-2 py-1 rounded-full border"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No hotels found.</p>
  )}
</div>
    </Card>
    </div>
  );
};

export default HotelBooking;
