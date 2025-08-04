import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Select, Button, Row, Col, Spin, Empty } from 'antd';
import { Package } from 'lucide-react';
import { searchTripPackages } from '../store/slices/TripSlice';

const { Option } = Select;

const HolidayPackages = ({ cities = [] }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { trip, loading } = useSelector((state) => state.trip);

  const handleSearch = (values) => {
    if (values.destination) {
      dispatch(searchTripPackages({ city: values.destination }));
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <div className="flex items-center mb-4">
          <Package className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Find Holiday Packages</h3>
        </div>

        <Form form={form} onFinish={handleSearch} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Destination"
                name="destination"
                rules={[{ required: true, message: 'Please select destination' }]}
              >
                <Select placeholder="Choose your destination" showSearch optionFilterProp="children">
                  {cities.map((city) => (
                    <Option key={city._id} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" size="large" className="w-full md:w-auto">
            Search
          </Button>
        </Form>

        <div className="mt-6">
          {loading ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : trip.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trip.map((trip, index) => (
                <Card key={index} className="shadow-sm border">
                  <h4 className="font-semibold text-lg mb-1">{trip.title}</h4>
                  <p>📍 {trip.city?.name || trip.city}</p>
                  <p>🕒 {trip.duration}</p>
                  <p>💰 ₹{trip.price}</p>
                  <p>🧳 {trip.inclusions?.join(', ')}</p>
                </Card>
              ))}
            </div>
          ) : (
            <Empty description="No packages found" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default HolidayPackages;
