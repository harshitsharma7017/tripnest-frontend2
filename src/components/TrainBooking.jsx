import React from 'react';
import { Card, Form, Select, DatePicker, Button, Row, Col, InputNumber, Checkbox, Empty } from 'antd';
import { Train, ArrowLeftRight, Search } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { searchTrains } from '../store/slices/TrainSlice';

const { Option } = Select;

const TrainBooking = ({ cities = [] }) => {
  const dispatch = useDispatch();
  const { train = [], loading = false, searchPerformed = false, error } = useSelector((state) => state.train || {});
  const [form] = Form.useForm();

  const classes = [
    { value: '1A', label: 'First AC (1A)' },
    { value: '2A', label: 'Second AC (2A)' },
    { value: '3A', label: 'Third AC (3A)' },
    { value: 'SL', label: 'Sleeper (SL)' },
    { value: 'CC', label: 'Chair Car (CC)' },
    { value: 'EC', label: 'Executive Chair Car (EC)' },
    { value: '2S', label: 'Second Sitting (2S)' }
  ];

  const quotas = [
    { value: 'GN', label: 'General' },
    { value: 'TQ', label: 'Tatkal' },
    { value: 'PT', label: 'Premium Tatkal' },
    { value: 'LD', label: 'Ladies' },
    { value: 'SS', label: 'Senior Citizen' },
    { value: 'HP', label: 'Handicapped' }
  ];

  const handleSearch = (values) => {
    const { from, to, date } = values;

    if (!from || !to || !date) return;

    // Format date to YYYY-MM-DD
    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    const searchParams = {
      from,
      to,
      date: formattedDate
    };

    dispatch(searchTrains(searchParams));
  };

  const renderTrainResults = () => {
    // Show loading state
    if (loading) {
      return (
        <div className="mt-8 text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Searching for trains...</p>
        </div>
      );
    }

    // Show results if trains are found
    if (train.length > 0) {
      return (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Available Trains ({train.length} found):</h4>
          {train.map((trainItem, index) => (
            <Card key={trainItem._id || index} className="mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="text-lg font-semibold">{trainItem.trainName}</h5>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">#{trainItem.trainNumber}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="font-medium text-gray-700">Route</p>
                      <p className="text-gray-600">{trainItem.sourceStation} → {trainItem.destinationStation}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700">Class</p>
                      <p className="text-gray-600">{trainItem.classType}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Departure</p>
                      <p className="font-semibold">{dayjs(trainItem.departureTime).format('DD MMM YYYY, hh:mm A')}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-gray-700">Arrival</p>
                      <p className="font-semibold">{dayjs(trainItem.arrivalTime).format('DD MMM YYYY, hh:mm A')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-green-600">₹{trainItem.price}</p>
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
    if (searchPerformed && train.length === 0) {
      return (
        <div className="mt-8">
          <Card className="text-center py-12">
            <Empty
              image={<Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />}
              description={
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-700">No trains found</h4>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    We couldn't find any trains for your selected route and date. 
                    Please try different search criteria.
                  </p>
                  <div className="text-sm text-gray-400 mb-6">
                    <p className="font-medium mb-2">Suggestions:</p>
                    <div className="space-y-1">
                      <p>• Try selecting a different date</p>
                      <p>• Check nearby railway stations</p>
                      <p>• Consider alternative travel dates</p>
                      <p>• Verify the route is available</p>
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
        <Train className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Book Train Tickets</h3>
      </div>
      
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={16}>
          {/* From */}
          <Col xs={24} md={10}>
            <Form.Item
              label="From"
              name="from"
              rules={[{ required: true, message: 'Please select departure station' }]}
            >
              <Select
                placeholder="Select departure station"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {cities.map(city => (
                  <Option key={city._id} value={city.name}>
                    {city.name} ({city.state})
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
                const from = form.getFieldValue('from');
                const to = form.getFieldValue('to');
                form.setFieldsValue({ from: to, to: from });
              }}
            />
          </Col>

          {/* To */}
          <Col xs={24} md={10}>
            <Form.Item
              label="To"
              name="to"
              rules={[{ required: true, message: 'Please select destination station' }]}
            >
              <Select
                placeholder="Select destination station"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {cities.map(city => (
                  <Option key={city._id} value={city.name}>
                    {city.name} ({city.state})
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

        {/* Additional Options Row */}
        <Row gutter={16} className="mb-4">
          <Col xs={24} md={8}>
            <Form.Item label="Class" name="class">
              <Select placeholder="Select class (optional)">
                {classes.map(cls => (
                  <Option key={cls.value} value={cls.value}>
                    {cls.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item label="Quota" name="quota">
              <Select placeholder="Select quota (optional)">
                {quotas.map(quota => (
                  <Option key={quota.value} value={quota.value}>
                    {quota.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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
              Search Trains
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
      {renderTrainResults()}
    </Card>
  );
};

export default TrainBooking;