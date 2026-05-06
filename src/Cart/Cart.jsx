import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../NavBar/Button';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, clearCart }) => {
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });

  const navigate = useNavigate();
  const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;


  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutClick = () => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      alert('Please login to place an order');
      onClose();
      navigate('/Login');
      return;
    }
    setShowAddressForm(true);
  };

  const [paymentMethod, setPaymentMethod] = useState('Online');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const confirmOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      alert('Please fill all address fields');
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const savedUser = localStorage.getItem('user');
    const user = JSON.parse(savedUser);
    setLoading(true);

    try {
      // 1. Create the order in backend
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          image: item.image.replace(API_BASE_URL, ''),
          price: item.price,
          product: item.id
        })),
        shippingAddress,
        paymentMethod: paymentMethod === 'Online' ? 'Razorpay' : 'Cash on Delivery',
        totalPrice: total
      };

      const orderResponse = await fetch(`${API_BASE_URL}/api/user/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });

      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.message || 'Failed to create order');

      if (paymentMethod === 'Cash on Delivery') {
        setOrderSuccess(true);
        if (clearCart) clearCart();
        return;
      }

      // 2. Step 2: Create Razorpay Order & Open Checkout Window
      const paymentResponse = await fetch(`${API_BASE_URL}/api/user/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ amount: total })
      });

      const razorpayOrder = await paymentResponse.json();
      if (!paymentResponse.ok) throw new Error(razorpayOrder.message || 'Failed to initiate payment');

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Duma Fashion",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            setLoading(true);
            // Step 5: Automatic Verification
            const verifyResponse = await fetch(`${API_BASE_URL}/api/user/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order._id
              })
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyResponse.ok) {
              console.log("Payment Verified Automatically!");
              setOrderSuccess(true);
              if (clearCart) clearCart();
            } else {
              alert(verifyData.message || 'Payment verification failed');
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobile
        },
        theme: { color: "#2563eb" },
        modal: {
          ondismiss: () => { setLoading(false); }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Checkout error:', err);
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      if (paymentMethod === 'Cash on Delivery') setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setShowAddressForm(false);
      setOrderSuccess(false);
    }, 500);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">

          {orderSuccess ? (
            /* Success State Animation */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-fadeIn">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full animate-ping opacity-20" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-gray-900">Order Placed!</h2>
                <p className="text-gray-500 font-medium">Thank you for your purchase. Your order is being processed and will be with you soon.</p>
              </div>

              <div className="w-full bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-600 font-bold">Confirmed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment</span>
                  <span className="text-gray-800 font-bold">{paymentMethod === 'Online' ? 'Online Payment' : 'Cash on Delivery'}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-bold text-gray-800">Total Paid</span>
                  <span className="text-blue-600 font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleClose}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl"
              >
                Back to Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-2">
                  {showAddressForm ? (
                    <>
                      <button onClick={() => setShowAddressForm(false)} className="p-1 hover:bg-gray-100 rounded-full mr-2">
                        <ArrowLeft size={20} className="text-gray-600" />
                      </button>
                      <MapPin className="text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-800">Shipping Info</h2>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    </>
                  )}
                </div>
                <Button
                  onClick={handleClose}
                  aria-label="Close cart"
                  className="p-2 hover:bg-gray-100 text-gray-500"
                >
                  <X size={24} aria-hidden="true" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {!showAddressForm ? (
                  /* Cart Items List */
                  <div className="p-6">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                        <div className="bg-gray-50 p-6 rounded-full">
                          <ShoppingBag size={64} className="text-gray-300" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">Your cart is empty</h3>
                          <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                        </div>
                        <Button
                          onClick={onClose}
                          className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200"
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-4 group">
                            <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 relative group-hover:shadow-md transition-shadow">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div className="flex justify-between">
                                <h3 className="font-bold text-gray-800">{item.name}</h3>
                                <p className="font-bold text-blue-600">${item.price}</p>
                              </div>
                              <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center border border-gray-200 rounded-lg p-1">
                                  <Button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:bg-gray-100 text-gray-600"
                                  >
                                    <Minus size={16} />
                                  </Button>
                                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                  <Button
                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-100 text-gray-600"
                                  >
                                    <Plus size={16} />
                                  </Button>
                                </div>
                                <Button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 size={20} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Address Form */
                  <div className="p-6 space-y-6 animate-fadeIn">
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                      <CheckCircle2 className="text-blue-600 mt-1" size={20} />
                      <div>
                        <h4 className="font-bold text-blue-900">Step 2: Shipping Details</h4>
                        <p className="text-sm text-blue-700">Please provide your delivery address to complete the order.</p>
                      </div>
                    </div>

                    <form id="addressForm" onSubmit={confirmOrder} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Street Address</label>
                        <input
                          required
                          type="text"
                          name="address"
                          value={shippingAddress.address}
                          onChange={handleInputChange}
                          placeholder="e.g. 123 Main St, Apartment 4B"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">City</label>
                          <input
                            required
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleInputChange}
                            placeholder="Chennai"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Postal Code</label>
                          <input
                            required
                            type="text"
                            name="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={handleInputChange}
                            placeholder="600001"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-gray-700">Country</label>
                        <select
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                        >
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>

                      <div className="pt-4">
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('Online')}
                            className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${paymentMethod === 'Online' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400'}`}
                          >
                            Online Payment
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('COD')}
                            className={`py-3 px-4 rounded-xl border font-bold text-sm transition-all ${paymentMethod === 'COD' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400'}`}
                          >
                            Cash on Delivery
                          </button>
                        </div>
                      </div>

                      <div className="pt-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Selected Method:</span>
                            <span className="font-bold text-gray-800">{paymentMethod === 'Online' ? 'Online Payment (Razorpay)' : 'Cash on Delivery'}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-200">
                            <span>Grand Total:</span>
                            <span className="text-blue-600">${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t bg-gray-50 space-y-4">
                  {!showAddressForm ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                          <span>Shipping</span>
                          <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-2xl font-bold text-gray-800 pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button
                        onClick={handleCheckoutClick}
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      form="addressForm"
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-xl shadow-green-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Processing Order...
                        </>
                      ) : (
                        'Confirm & Place Order'
                      )}
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
