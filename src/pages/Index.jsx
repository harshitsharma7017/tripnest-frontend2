import { Layout as AntLayout, Card, Button, Row, Col, Typography } from "antd";
import { 
  Plane, 
  Shield, 
  Clock, 
  Headphones, 
  Star,
  Quote,
  Package
} from "lucide-react";
import heroImage from "../assets/travel-hero.jpg";
import TravelBooking from "../components/TravelBooking";
import PopularDestinations from "../components/PopularDestinations";
import TravelDeals from "../components/TravelDeals";

const { Header, Footer, Content } = AntLayout;
const { Title, Paragraph } = Typography;

const Index = () => {
  const features = [
    {
      icon: Plane,
      title: "Best Price Guarantee",
      description: "We match any competitor's price or give you 110%."
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your personal data is safe with 256-bit SSL encryption"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round the clock customer support for all your travel needs"
    },
    {
      icon: Headphones,
      title: "Easy Cancellation",
      description: "Hassle-free cancellation and refund process"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "Amazing experience! The booking process was smooth and the hotel was exactly as shown."
    },
    {
      id: 2,
      name: "Rahul Singh",
      location: "Mumbai",
      rating: 5,
      comment: "Great deals and excellent customer service. Highly recommend for family trips!"
    },
    {
      id: 3,
      name: "Anita Patel",
      location: "Bangalore",
      rating: 5,
      comment: "Best travel app I've used. The prices are unbeatable and booking is super easy."
    }
  ];

  return (
    <AntLayout className="bg-background animate-fade-in">
      <Content>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
          </div>
          <div className="relative z-10 w-full text-center mb-8 px-4 mt-4">
            <Title level={1} className="!text-white text-4xl md:text-6xl font-bold mb-4">
              Your Journey Begins Here
            </Title>
            <Paragraph className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Discover amazing destinations, book flights, hotels and create memories that last a lifetime
            </Paragraph>
            {/* Updated TravelBooking component with tabs */}
            <TravelBooking />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2} className="text-3xl font-bold mb-4">
                Why Choose MakeMyTrip?
              </Title>
              <Paragraph className="text-muted-foreground text-lg">
                Your trusted travel partner with millions of satisfied customers
              </Paragraph>
            </div>
            <Row gutter={[16, 16]}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Col key={index} xs={24} md={12} lg={6}>
                    <Card
                      bordered={false}
                      className="text-center shadow-card hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-primary to-blue-400 rounded-full mb-4 mx-auto">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <Title level={4}>{feature.title}</Title>
                      <Paragraph className="text-muted-foreground text-sm">
                        {feature.description}
                      </Paragraph>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16">
          <PopularDestinations />
        </section>

        {/* Travel Deals */}
        <section className="py-16 bg-muted/30">
          <TravelDeals />
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <Title level={2}>What Our Customers Say</Title>
            <Paragraph className="text-muted-foreground text-lg">
              Trusted by millions of travelers worldwide
            </Paragraph>
          </div>
          <Row gutter={[16, 16]} className="max-w-7xl mx-auto px-4">
            {testimonials.map((t) => (
              <Col key={t.id} xs={24} md={8}>
                <Card bordered={false} className="shadow-card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary mr-3" />
                    <div className="flex">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <Paragraph className="italic text-muted-foreground mb-4">"{t.comment}"</Paragraph>
                  <div>
                    <Paragraph strong className="mb-1">{t.name}</Paragraph>
                    <Paragraph type="secondary" className="text-sm">{t.location}</Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Quick Services Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2} className="text-3xl font-bold mb-4">
                All Your Travel Needs in One Place
              </Title>
              <Paragraph className="text-muted-foreground text-lg">
                From flights to holiday packages, we've got you covered
              </Paragraph>
            </div>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-0">
                  <Plane className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <Title level={4}>Domestic & International Flights</Title>
                  <Paragraph className="text-muted-foreground">
                    Book flights to 1000+ destinations worldwide with best prices guaranteed
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-0">
                  <Package className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <Title level={4}>Holiday Packages</Title>
                  <Paragraph className="text-muted-foreground">
                    Customized holiday packages for families, couples, and solo travelers
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-0">
                  <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <Title level={4}>Travel Insurance</Title>
                  <Paragraph className="text-muted-foreground">
                    Comprehensive travel insurance to protect your journey and peace of mind
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-tr from-primary to-blue-600 text-primary-foreground text-center">
          <div className="max-w-4xl mx-auto px-4">
            <Title className="text-white text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Adventure?
            </Title>
            <Paragraph className="text-white/90 mb-8 text-lg">
              Join millions of travelers who trust MakeMyTrip for their perfect vacation
            </Paragraph>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Button type="primary" size="large" className="bg-white text-primary hover:bg-gray-100">
                  Download App
                </Button>
              </Col>
              <Col>
                <Button size="large" className="border-white text-white hover:bg-white hover:text-primary">
                  Start Planning
                </Button>
              </Col>
            </Row>
          </div>
        </section>
      </Content>

      {/* Footer */}
      <Footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-4">Company</Title>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </Col>
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-4">Support</Title>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </Col>
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-4">Services</Title>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Flights</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Hotels</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Holiday Packages</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Travel Insurance</a></li>
              </ul>
            </Col>
            <Col xs={24} md={6}>
              <Title level={4} className="text-white mb-4">Connect</Title>
              <div className="flex gap-2">
                <Button type="text" className="text-white hover:text-primary">📘</Button>
                <Button type="text" className="text-white hover:text-primary">🐦</Button>
                <Button type="text" className="text-white hover:text-primary">📷</Button>
                <Button type="text" className="text-white hover:text-primary">💼</Button>
              </div>
            </Col>
          </Row>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <Paragraph className="mb-0">
              &copy; 2024 MakeMyTrip. All rights reserved. | Made with ❤️ in India
            </Paragraph>
          </div>
        </div>
      </Footer>
    </AntLayout>
  );
};

export default Index;