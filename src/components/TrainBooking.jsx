import React from 'react';
import {
  Card,
  Form,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Empty
} from 'antd';
import { Train, ArrowLeftRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { searchTrains } from '../store/slices/TrainSlice';

const { Option } = Select;

const TrainBooking = ({ cities = [] }) => {
  const dispatch = useDispatch();
  const { train = [], loading = false, searchPerformed = false, error } = useSelector((state) => state.train || {});
  const [form] = Form.useForm();

  const handleSearch = (values) => {
    const { from, to, date } = values;

    if (!from || !to || !date) return;

    const formattedDate = dayjs(date).format("YYYY-MM-DD");

    const searchParams = {
      from,
      to,
      date: formattedDate
    };

    dispatch(searchTrains(searchParams));
  };

  const renderTrainResults = () => {
    if (loading) {
      return (
        <div className="mt-8 text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Searching for trains...</p>
        </div>
      );
    }

    if (train.length > 0) {
      return (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Available Trains ({train.length} found):</h4>
          {train.map((trainItem, index) => (
            <Card key={trainItem._id || index} className="mb-4">
              <div className="flex justify-between items-start flex-wrap">
                <div className="flex-1 min-w-[260px]">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Departure</p>
                      <p className="font-semibold">
                        {dayjs(trainItem.departureTime).format('DD MMM YYYY, hh:mm A')}
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700">Arrival</p>
                      <p className="font-semibold">
                        {dayjs(trainItem.arrivalTime).format('DD MMM YYYY, hh:mm A')}
                      </p>
                    </div>

                    <div className="mt-3">
                      <p className="font-medium text-gray-700">Available Seats</p>
                      <ul className="text-gray-600 list-disc list-inside">
                        {Object.entries(trainItem.availableSeats || {}).map(([cls, count]) => (
                          <li key={cls}>
                            {cls.toUpperCase()}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <p className="font-medium text-gray-700">Fare</p>
                      <ul className="text-gray-600 list-disc list-inside">
                        {Object.entries(trainItem.fare || {}).map(([cls, price]) => (
                          <li key={cls}>
                            {cls.toUpperCase()}: ₹{price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-4 min-w-[120px] mt-4 md:mt-0">
                  <p className="text-2xl font-bold text-green-600">₹{trainItem.fare?.sleeper || trainItem.fare?.ac3 || 'N/A'}</p>
                  <p className="text-sm text-gray-500 mb-3">from (lowest)</p>
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
                }}
              >
                Search Again
              </Button>
            </Empty>
          </Card>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='ml-6 flex items-center justify-center'>
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <div className="flex items-center mb-4">
          <Train className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Book Train Tickets</h3>
        </div>

        <Form form={form} onFinish={handleSearch} layout="vertical">
          <Row gutter={16}>
  {/* From */}
  <Col xs={24} md={7}>
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
  <Col xs={24} md={7}>
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

  {/* Spacer Column */}
  <Col xs={0} md={2} />

  {/* Date */}
  <Col xs={24} md={6}>
    <Form.Item
      label="Date"
      name="date"
      rules={[{ required: true, message: 'Please select date' }]}
    >
      <DatePicker
        className="w-full"
        popupClassName="z-50"
        disabledDate={(current) => current && current < dayjs().startOf('day')}
      />
    </Form.Item>
  </Col>
</Row>

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

        {/* Results */}
        {renderTrainResults()}
      </Card>
    </div>
  );
};

export default TrainBooking;
