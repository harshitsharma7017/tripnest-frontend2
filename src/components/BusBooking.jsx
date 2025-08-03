import React from 'react';
import { Card, Form, Select, DatePicker, Button, Row, Col, InputNumber, Empty } from 'antd';
import { Bus, ArrowLeftRight, Search } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { searchBuses } from '../store/slices/BusSlice';

const { Option } = Select;

const BusBooking = ({ cities = [] }) => {
  const { bus = [], loading = false, searchPerformed = false, error } = useSelector((state) => state.bus || {});
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const popularRoutes = [
    { from: 'Delhi', to: 'Manali', value: 'delhi-manali' },
    { from: 'Mumbai', to: 'Pune', value: 'mumbai-pune' },
    { from: 'Bangalore', to: 'Chennai', value: 'bangalore-chennai' },
    { from: 'Delhi', to: 'Jaipur', value: 'delhi-jaipur' },
    { from: 'Hyderabad', to: 'Vijayawada', value: 'hyderabad-vijayawada' },
    { from: 'Kolkata', to: 'Siliguri', value: 'kolkata-siliguri' }
  ];

  const handleSearch = (values) => {
    const { from, to, date } = values;

    if (!from || !to || !date) return;

    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    dispatch(searchBuses({ from, to, date: formattedDate }));
  };

  const renderBusResults = () => {
    // Show loading state
    if (loading) {
      return (
        <div className="mt-8 text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Searching for buses...</p>
        </div>
      );
    }

    // Show results if buses are found
    if (bus.length > 0) {
      return (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Available Buses ({bus.length} found):</h4>
          {bus.map((busItem) => (
            <Card key={busItem._id} className="mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-lg font-semibold mb-2">{busItem.operatorName}</p>
                  <p className="text-gray-600 mb-1">{busItem.busType}</p>
                  <p className="text-gray-600 mb-2">{busItem.sourceCity} → {busItem.destinationCity}</p>
                  <p className="text-sm text-gray-500">
                    Departure: {dayjs(busItem.departureTime).format('DD MMM YYYY, hh:mm A')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Seats Available: {busItem.availableSeats}/{busItem.totalSeats}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{busItem.price}</p>
                  <p className="text-sm text-gray-500 mb-3">per person</p>
                  <Button type="primary" size="small">
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      );
    }

    // Show empty state if search was performed but no results found
    if (searchPerformed && bus.length === 0) {
      return (
        <div className="mt-8">
          <Card className="text-center py-12">
            <Empty
              image={<Bus className="h-16 w-16 text-gray-400 mx-auto mb-4" />}
              description={
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-700">No buses found</h4>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    We couldn't find any buses for your selected route and date. 
                    Try adjusting your search criteria.
                  </p>
                  <div className="text-sm text-gray-400 mb-6">
                    <p className="font-medium mb-2">Suggestions:</p>
                    <div className="space-y-1">
                      <p>• Try selecting a different date</p>
                      <p>• Check nearby cities or alternative routes</p>
                      <p>• Consider one of our popular routes below</p>
                    </div>
                  </div>
                </div>
              }
            >
              <Button 
                type="primary" 
                size="large"
                onClick={() => {
                  form.resetFields();
                  // Optionally dispatch an action to reset search state
                }}
              >
                Search Again
              </Button>
            </Empty>
          </Card>
        </div>
      );
    }

    // Don't show anything if no search has been performed yet
    return null;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <div className="flex items-center mb-4">
        <Bus className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Book Bus Tickets</h3>
      </div>
      
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={16}>
          {/* From */}
          <Col xs={24} md={10}>
            <Form.Item
              label="From"
              name="from"
              rules={[{ required: true, message: 'Please select departure city' }]}
            >
              <Select
                placeholder="Select departure city"
                showSearch
                optionFilterProp="children"
              >
                {cities.map(city => (
                  <Option key={city._id} value={city.name}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Swap Button */}
          <Col xs={24} md={1} className="flex items-center justify-center">
            <Button 
              type="text" 
              icon={<ArrowLeftRight className="h-4 w-4" />} 
              className="mt-6"
              onClick={() => {
                const fromValue = form.getFieldValue('from');
                const toValue = form.getFieldValue('to');
                form.setFieldsValue({
                  from: toValue,
                  to: fromValue
                });
              }}
            />
          </Col>

          {/* To */}
          <Col xs={24} md={10}>
            <Form.Item
              label="To"
              name="to"
              rules={[{ required: true, message: 'Please select destination city' }]}
            >
              <Select
                placeholder="Select destination city"
                showSearch
                optionFilterProp="children"
              >
                {cities.map(city => (
                  <Option key={city._id} value={city.name}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Date */}
          <Col xs={24} md={3}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker 
                className="w-full" 
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Popular Routes */}
        <Row className="mb-4">
          <Col span={24}>
            <div className="text-sm text-gray-600 mb-2">Popular Routes:</div>
            <div className="flex flex-wrap gap-2">
              {popularRoutes.slice(0, 4).map(route => (
                <Button 
                  key={route.value}
                  size="small" 
                  type="dashed"
                  onClick={() => {
                    form.setFieldsValue({
                      from: route.from,
                      to: route.to
                    });
                  }}
                >
                  {route.from} → {route.to}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Search Button */}
        <Row>
          <Col span={24}>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large" 
              className="w-full md:w-auto"
              loading={loading}
            >
              Search Buses
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">Search Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Results Section */}
      {renderBusResults()}
    </Card>
  );
};

export default BusBooking;