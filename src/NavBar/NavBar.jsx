import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Menu, X, Search, ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = ({ cartCount, onCartClick, activeSection, onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial check
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

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


          <div className="flex items-center gap-2">
            {/* Mobile User Info (Small) */}
            {user && (
              <div className="md:hidden flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            )}
            {/* Mobile Menu Button */}
            <Button className="md:hidden p-2 hover:bg-blue-600 focus:outline-none" onClick={toggleMenu} aria-label="toggle menu">
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-3 lg:gap-8 px-2 lg:px-4 cursor-pointer">
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
        <div className="hidden md:flex items-center gap-3 lg:gap-4 px-4 lg:px-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              className="bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 w-32 lg:w-64 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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

          {user ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-100 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-bold text-gray-700 hidden lg:block">{user?.name || 'User'}</span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 animate-fadeIn z-[60]">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl text-white font-bold mb-3 shadow-lg">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{user?.name}</h4>
                    <span className="text-xs text-gray-400">Registered Customer</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => { navigate('/orders'); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-2xl transition-all border border-transparent hover:border-blue-100 group"
                    >
                      <div className="p-2 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Package size={18} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-bold text-gray-800">My Orders</span>
                        <span className="text-[10px] text-gray-400 font-medium">View your history</span>
                      </div>
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                        <User size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Full Name</span>
                        <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                        <Search size={16} /> {/* Using Search as fallback for email/mobile icon if needed, but mail/phone are better */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email Address</span>
                        <span className="text-sm font-semibold text-gray-700 break-all">{user?.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Mobile Number</span>
                        <span className="text-sm font-semibold text-gray-700">{user?.mobile}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate('/Login')}
              className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu (Expandable) */}
        <div className={`md:hidden  overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
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
          <div className="px-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Search..."
              />
            </div>

            {user ? (
              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl text-white font-bold shadow-md">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">{user?.name}</span>
                      <span className="text-xs text-gray-400">Premium Member</span>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <button
                      onClick={() => { navigate('/orders'); setIsOpen(false); }}
                      className="w-full flex items-center gap-3 py-2 text-gray-700"
                    >
                      <Package size={18} className="text-blue-600" />
                      <span className="font-bold">My Orders</span>
                    </button>
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      <span className="text-sm font-medium break-all">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      <span className="text-sm font-medium">{user?.mobile}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => { navigate('/Login'); setIsOpen(false); }}
                className="w-full py-3 bg-black text-white rounded-xl font-bold"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;