import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Menu, X, Search, ShoppingCart, LogOut, Package, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = ({ cartCount, onCartClick, activeSection, onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  const handleLinkClick = (id) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => onNavClick(id), 100);
    } else {
      onNavClick(id);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Offers', id: 'offers' },
    { name: 'About', id: 'about' },
    { name: 'Customer Care', id: 'customercare' },
  ];

  return (
    <>
      <div className="w-full px-4 py-4 sticky top-0 z-50">
        <header className="bg-white/80 backdrop-blur-xl shadow-sm max-w-7xl mx-auto rounded-full h-16 md:h-20 w-full flex justify-between items-center px-6 md:px-10 border border-white/40">

          {/* Logo */}
          <div onClick={() => navigate('/')} className="flex items-center cursor-pointer group">
            <span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
              DUMA<span className="text-blue-600">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative text-sm font-bold uppercase tracking-widest cursor-pointer transition-all duration-300
                    ${activeSection === link.id && location.pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {link.name}
                  {activeSection === link.id && location.pathname === '/' && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop Only Search */}
            <div className="hidden lg:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                type="search"
                className="bg-gray-50 border border-transparent rounded-full pl-10 pr-4 py-2 w-48 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 transition-all text-sm"
                placeholder="Search products..."
              />
            </div>

            <Button onClick={onCartClick} className="relative p-2.5 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={22} className="text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* User Profile (Desktop) */}
            {user ? (
              <div className="hidden lg:block relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition-all"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 animate-fadeIn z-[60]">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-100">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-bold text-gray-900">{user?.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                    </div>
                    <div className="space-y-2">
                      <button onClick={() => { navigate('/orders'); setIsUserMenuOpen(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-2xl text-gray-700 font-bold text-sm transition-colors group">
                        <Package size={18} className="text-blue-600" />
                        My Orders
                        <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-2xl text-red-600 font-bold text-sm transition-colors">
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => navigate('/Login')} className="hidden lg:block px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all">
                Login
              </button>
            )}

            {/* Mobile/iPad Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2.5 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>
      </div>

      {/* Side Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Side Drawer Content */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[80%] sm:max-w-sm bg-white z-[101] shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
          <span className="text-2xl font-black text-gray-900">DUMA<span className="text-blue-600">.</span></span>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="mb-10 p-6 bg-blue-600 rounded-[2rem] text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xl font-bold border border-white/30">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-lg leading-none">{user?.name}</h4>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Gold Member</span>
              </div>
            </div>
            <button onClick={() => { navigate('/orders'); setIsOpen(false); }} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors border border-white/10">
              <Package size={18} /> My Orders
            </button>
          </div>
        )}

        <nav className="mb-10">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-2xl font-black transition-all flex items-center justify-between group
                  ${activeSection === link.id && location.pathname === '/' ? 'text-blue-600 translate-x-2' : 'text-gray-400 hover:text-gray-900'}`}
              >
                {link.name}
                <ChevronRight size={24} className={`transition-all ${activeSection === link.id && location.pathname === '/' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 pt-8 border-t border-gray-100 pb-12">
          {!user ? (
            <button onClick={() => { navigate('/Login'); setIsOpen(false); }} className="w-full py-4 bg-black text-white rounded-2xl font-black text-lg shadow-xl shadow-gray-200">
              Login Account
            </button>
          ) : (
            <button onClick={handleLogout} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2">
              <LogOut size={20} /> Logout
            </button>
          )}
          <p className="text-center text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">© 2026 AzarIbrahim</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;