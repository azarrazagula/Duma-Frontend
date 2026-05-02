import React, { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../NavBar/Button';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "http://192.168.29.128:5001";

  useEffect(() => {
    const fetchOrders = async () => {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) {
        navigate('/Login');
        return;
      }

      const user = JSON.parse(savedUser);

      try {
        const response = await fetch(`${API_BASE_URL}/api/user/orders/my-orders`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'Delivered': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'Shipped': return <Truck size={16} className="text-blue-600" />;
      case 'Failed': return <Clock size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-amber-600" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-50 text-green-700 border-green-100';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Failed': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Orders</h1>
            <p className="text-gray-500 mt-2 font-medium">Track and manage your recent purchases</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-sm">
            <span className="text-sm text-gray-400">Total Orders:</span>
            <span className="ml-2 font-bold text-gray-900">{orders.length}</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-gray-100 shadow-sm space-y-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">No orders yet</h3>
              <p className="text-gray-500">When you buy something, it will appear here.</p>
            </div>
            <Button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 mx-auto"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order._id}
                className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="p-6 sm:p-8">
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID: #{order._id.slice(-6)}</p>
                      <p className="text-sm font-medium text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {order.isPaid && (
                        <div className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-[10px] font-black uppercase tracking-wider">
                          Paid
                        </div>
                      )}
                      <div className={`px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                          <img 
                            src={item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.qty} × ${item.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Timeline (Conditional) */}
                  {expandedOrder === order._id && (
                    <div className="mt-8 pt-8 border-t border-gray-100 animate-fadeIn">
                      <h5 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Order Tracking</h5>
                      <div className="relative flex justify-between">
                        {/* Timeline Line */}
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0" />
                        <div 
                          className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-1000" 
                          style={{ 
                            width: order.status === 'Delivered' ? '100%' : 
                                   order.status === 'Shipped' ? '66%' : 
                                   order.status === 'Paid' ? '33%' : '0%' 
                          }} 
                        />

                        {/* Nodes */}
                        {[
                          { label: 'Placed', status: 'Pending', icon: Clock },
                          { label: 'Paid', status: 'Paid', icon: CheckCircle2 },
                          { label: 'Shipped', status: 'Shipped', icon: Truck },
                          { label: 'Delivered', status: 'Delivered', icon: Package }
                        ].map((node, i) => {
                          const isActive = order.status === node.status || 
                            (node.status === 'Pending' && ['Paid', 'Shipped', 'Delivered'].includes(order.status)) ||
                            (node.status === 'Paid' && ['Shipped', 'Delivered'].includes(order.status)) ||
                            (node.status === 'Shipped' && order.status === 'Delivered');
                          
                          return (
                            <div key={i} className="relative z-10 flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-gray-100 text-gray-300'}`}>
                                <node.icon size={18} />
                              </div>
                              <p className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                {node.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Order Footer */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping To</p>
                        <p className="text-sm font-semibold text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                        <p className="text-2xl font-black text-blue-600">${order.totalPrice.toFixed(2)}</p>
                      </div>
                      <button 
                        onClick={() => toggleExpand(order._id)}
                        className={`p-3 rounded-full transition-all duration-300 ${expandedOrder === order._id ? 'bg-blue-600 text-white rotate-90' : 'bg-gray-50 text-gray-400 hover:bg-gray-200'}`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
