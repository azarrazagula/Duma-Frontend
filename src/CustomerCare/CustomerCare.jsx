import React from "react";
import { Mail, Phone, MapPin, Truck, RotateCcw, HelpCircle, MessageSquare } from "lucide-react";

const CustomerCare = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      label: "Email Us",
      value: "support@duma.com",
      description: "Response within 24 hours",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      label: "Call Us",
      value: "+1 (234) 567-890",
      description: "Mon - Fri, 9am - 6pm EST",
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      label: "Visit Us",
      value: "123 Fashion Ave, NY",
      description: "Our flagship store",
    },
  ];

  const services = [
    {
      icon: <Truck className="w-10 h-10 text-blue-600" />,
      title: "Fast Shipping",
      description: "Free express shipping on all orders over $100. Track your order in real-time.",
    },
    {
      icon: <RotateCcw className="w-10 h-10 text-blue-600" />,
      title: "Easy Returns",
      description: "Not satisfied? Return any item within 30 days for a full refund or exchange.",
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-blue-600" />,
      title: "24/7 Support",
      description: "Our dedicated support team is always here to help you with any questions.",
    },
  ];

  return (
    <section id="customercare" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
            Customer Care
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            How can we help you?
          </p>
          <div className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            We're here to provide you with the best shopping experience possible.
          </div>
        </div>

        {/* Quick Links / Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{info.label}</p>
                    <p className="text-xl font-bold text-gray-900 mb-1">{info.value}</p>
                    <p className="text-gray-600">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Live Chat Support</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-sm">
              Our support agents are available right now to help you with your queries.
            </p>
            <button className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95">
              Start Chat Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerCare;