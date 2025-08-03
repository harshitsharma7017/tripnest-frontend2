import React from 'react';
import { Card, Form, Select, DatePicker, Button, Row, Col, InputNumber, Radio } from 'antd';
import { Package, Calendar } from 'lucide-react';

const { Option } = Select;
const { RangePicker } = DatePicker;

const HolidayPackages = () => {
  const [form] = Form.useForm();

  const destinations = [
    { value: 'goa', label: 'Goa Beach Holiday' },
    { value: 'kerala', label: 'Kerala Backwaters' },
    { value: 'rajasthan', label: 'Rajasthan Heritage Tour' },
    { value: 'himachal', label: 'Himachal Hill Stations' },
    { value: 'kashmir', label: 'Kashmir Valley' },
    { value: 'golden-triangle', label: 'Golden Triangle' },
    { value: 'south-india', label: 'South India Temple Tour' },
    { value: 'northeast', label: 'Northeast Explorer' }
  ];

  const packageTypes = [
    { value: 'honeymoon', label: 'Honeymoon Packages' },
    { value: 'family', label: 'Family Packages' },
    { value: 'adventure', label: 'Adventure Tours' },
    { value: 'pilgrimage', label: 'Pilgrimage Tours' },
    { value: 'wildlife', label: 'Wildlife Safari' },
    { value: 'beach', label: 'Beach Holidays' },
    { value: 'hill-station', label: 'Hill Station Tours' },
    { value: 'heritage', label: 'Heritage Tours' }
  ];

  const handleSearch = (values) => {
    console.log('Package search:', values);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <div className="flex items-center mb-4">
        <Package className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Holiday Packages</h3>
      </div>
      
      <Form form={form} onFinish={handleSearch} layout="vertical">
        <Row gutter={16}>
          {/* Destination */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Destination"
              name="destination"
              rules={[{ required: true, message: 'Please select destination' }]}
            >
              <Select
                placeholder="Choose your destination"
                showSearch
                optionFilterProp="children"
              >
                {destinations.map(dest => (
                  <Option key={dest.value} value={dest.value}>
                    {dest.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Package Type */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Package Type"
              name="packageType"
              rules={[{ required: true, message: 'Please select package type' }]}
            >
              <Select placeholder="Select package type">
                {packageTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Travel Dates */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Travel Dates"
              name="dates"
              rules={[{ required: true, message: 'Please select travel dates' }]}
            >
              <RangePicker 
                className="w-full" 
                suffixIcon={<Calendar className="h-4 w-4" />}
              />
            </Form.Item>
          </Col>

          {/* Duration */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Duration"
              name="duration"
            >
              <Select placeholder="Select duration">
                <Option value="2-3">2-3 Days</Option>
                <Option value="4-5">4-5 Days</Option>
                <Option value="6-7">6-7 Days</Option>
                <Option value="8-10">8-10 Days</Option>
                <Option value="11-15">11-15 Days</Option>
                <Option value="15+">15+ Days</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          {/* Travelers */}
          <Col xs={24} md={8}>
            <Form.Item
              label="Adults"
              name="adults"
              initialValue={2}
            >
              <InputNumber min={1} max={20} className="w-full" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Children"
              name="children"
              initialValue={0}
            >
              <InputNumber min={0} max={10} className="w-full" />
            </Form.Item>
          </Col>

          {/* Budget */}
          <Col xs={24} md={8}>
            <Form.Item
              label="Budget (per person)"
              name="budget"
            >
              <Select placeholder="Select budget">
                <Option value="budget">₹10,000 - ₹25,000</Option>
                <Option value="mid">₹25,000 - ₹50,000</Option>
                <Option value="premium">₹50,000 - ₹1,00,000</Option>
                <Option value="luxury">₹1,00,000+</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Departure City */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Departure City"
              name="departureCity"
              rules={[{ required: true, message: 'Please select departure city' }]}
            >
              <Select placeholder="Select departure city">
                <Option value="delhi">Delhi</Option>
                <Option value="mumbai">Mumbai</Option>
                <Option value="bangalore">Bangalore</Option>
                <Option value="kolkata">Kolkata</Option>
                <Option value="chennai">Chennai</Option>
                <Option value="hyderabad">Hyderabad</Option>
                <Option value="pune">Pune</Option>
                <Option value="ahmedabad">Ahmedabad</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Travel Style */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Travel Style"
              name="travelStyle"
            >
              <Radio.Group className="w-full">
                <Radio value="comfort">Comfort</Radio>
                <Radio value="standard">Standard</Radio>
                <Radio value="luxury">Luxury</Radio>
              </Radio.Group>
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
            >
              Find Packages
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default HolidayPackages;