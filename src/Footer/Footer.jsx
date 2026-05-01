import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">
              DUMA<span className="text-blue-500">.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Redefining modern fashion with premium quality and timeless designs. Your journey to style starts here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-blue-600 transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-sky-500 transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8">Shop</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#products" className="hover:text-blue-400 transition-colors">T-Shirts</a></li>
              <li><a href="#products" className="hover:text-blue-400 transition-colors">Jeans</a></li>
              <li><a href="#offers" className="hover:text-blue-400 transition-colors">Exclusive Offers</a></li>
              <li><a href="#products" className="hover:text-blue-400 transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-8">Support</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#customercare" className="hover:text-blue-400 transition-colors">Customer Care</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Returns & Exchanges</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-8">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-500" />
                <span>123 Fashion Ave, New York</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <span>hello@duma.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {currentYear} DUMA. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
