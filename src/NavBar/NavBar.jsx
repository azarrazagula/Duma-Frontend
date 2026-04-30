import React, { useState } from 'react';
import Button from './Button';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = ({ cartCount, onCartClick, activeSection, onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => onNavClick(id), 100);
    } else {
      onNavClick(id);
    }
  };

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }


  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Offers', id: 'offers' },
    { name: 'About', id: 'about' },
    { name: 'Customer Care', id: 'customercare' },
  ];

  return (
    <div className="w-full px-4 py-4 sticky top-0 z-50 ">
      <header className={`bg-white/70 backdrop-blur-xl shadow-lg max-w-6xl mx-auto rounded-3xl md:rounded-full h-auto md:h-20 w-full flex flex-col md:flex-row justify-between items-center transition-all duration-100 border border-white/20 ${isOpen ? 'rounded-3xl' : 'rounded-full'}`} >
        <div className="flex justify-between items-center w-full md:w-auto px-6 md:px-10 h-20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PICTURE
          </h1>

          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <Button className="md:hidden p-2 hover:bg-blue-600 focus:outline-none" onClick={toggleMenu} aria-label="toggle menu">
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8 px-4 cursor-pointer">
            {navLinks.map((link) => (
              <div
                key={link.name}
                onClick={() => handleLinkClick(link.id)}
                className={`relative lg:text-lg md:text-sm font-semibold transition-all duration-300 py-2 cursor-pointer
                  ${activeSection === link.id && location.pathname === '/' ? 'text-blue-600 after:w-full' : 'text-gray-600 hover:text-blue-600 after:w-0'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300`}
              >
                {link.name}
              </div>
            ))}
          </ul>
        </nav>

        {/* Desktop Search & Cart */}
        <div className="hidden md:flex items-center gap-4 px-6 lg:px-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              className="bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 w-48 lg:w-64 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="Search..."
            />
          </div>
          <Button
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-100"
          >
            <ShoppingCart size={24} className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Button>
          <Button
            onClick={() => navigate('/Login')}
            className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
          >
            Login
          </Button>
        </div>

        {/* Mobile Menu (Expandable) */}
        <div className={`md:hidden  overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
          <nav className="px-6 pb-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  onClick={() => { handleLinkClick(link.id); setIsOpen(false); }}
                  className={`text-xl font-bold transition-colors list-none cursor-pointer border-l-4 pl-4 py-2
                    ${activeSection === link.id && location.pathname === '/' ? 'text-blue-600 border-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 border-transparent'}`}
                >
                  {link.name}
                </div>
              ))}
            </ul>
          </nav>
          <div className="px-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Search..."
              />
            </div>
            <Button
              onClick={() => { navigate('/Login'); setIsOpen(false); }}
              className="w-full mt-4 py-3 bg-black text-white rounded-xl font-bold"
            >
              Login
            </Button>
          </div>
        </div>
      </header>
    </div >
  );
};

export default NavBar;