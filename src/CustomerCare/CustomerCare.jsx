import React, { useState } from "react";
import { Mail, Phone, MapPin, Truck, RotateCcw, HelpCircle, MessageSquare } from "lucide-react";
import ChatModal from "./ChatModal";

const CustomerCare = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      label: "Email Us",
      value: "azaribrahim.com",
      description: "Response within 24 hours",
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      label: "Call Us",
      value: "+91 12345 67890",
      description: "Mon–Fri, 9am–6pm EST",
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
      label: "Visit Us",
      value: "123 Fashion Ave, NY",
      description: "Our flagship store",
    },
  ];

  const services = [
    {
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "Fast Shipping",
      description: "Free express on orders over $100",
    },
    {
      icon: <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "Easy Returns",
      description: "30-day full refund or exchange",
    },
    {
      icon: <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
      title: "24/7 Support",
      description: "Always here to help you",
    },
  ];

  return (
    <section
      id="customercare"
      className="bg-white rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 my-3 sm:my-4 p-4 sm:p-8 lg:p-12
        overflow-hidden shadow-2xl border border-gray-100
        h-[calc(100vh-70px)] md:h-[calc(100vh-86px)]
        flex flex-col justify-between"
    >
      {/* Header */}
      <div className="text-center">
        <p className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-widest uppercase">
          Customer Care
        </p>
        <h2 className="mt-1 text-xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          How can we help you?
        </h2>
        <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm lg:text-lg text-gray-400">
          We're here to provide you the best shopping experience.
        </p>
      </div>

      {/* Services — 3 columns always */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center"
          >
            <div className="flex justify-center mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-full">
                {service.icon}
              </div>
            </div>
            <h3 className="text-[11px] sm:text-base lg:text-lg font-bold text-gray-900 mb-0.5 sm:mb-2">{service.title}</h3>
            <p className="text-[9px] sm:text-xs lg:text-sm text-gray-500 leading-snug">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Get in Touch */}
      <div>
        <h3 className="text-sm sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">Get in Touch</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
                <div className="p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-xl flex-shrink-0">
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">{info.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{info.value}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Chat CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100 flex flex-col justify-center items-center text-center">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 shadow-lg shadow-blue-200">
              <MessageSquare className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Live Chat Support</h3>
            <p className="text-[10px] sm:text-sm text-gray-500 mb-3 sm:mb-5 max-w-xs">
              Support agents available right now to help.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full sm:w-auto px-5 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white font-bold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-xs sm:text-sm"
            >
              Start Chat Now
            </button>
          </div>
        </div>
      </div>

      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </section>
  );
};

export default CustomerCare;