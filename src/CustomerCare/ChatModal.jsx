import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare, Sparkles } from "lucide-react";

const ChatModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("form"); // 'form' or 'chat'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Product Query",
    message: "",
  });

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-fill user details if logged in
  useEffect(() => {
    if (isOpen) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setFormData((prev) => ({
            ...prev,
            name: user.name || "",
            email: user.email || "",
          }));
        } catch (e) {
          console.error("Error parsing user storage", e);
        }
      }
    }
  }, [isOpen]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStep("chat");
    // Initialize chat with user's initial message and agent response
    const initialUserMsg = {
      sender: "user",
      text: formData.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([initialUserMsg]);
    setIsTyping(true);

    // Agent greeting after a short delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: `Hi ${formData.name}! 👋 Welcome to Duma Support. I see you have a query about "${formData.subject}". How can I help you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Dynamic simulated support response
    const lowercaseMsg = inputMessage.toLowerCase();
    let replyText = "I'd be happy to look into that for you. Could you please provide your order ID if you have one?";

    if (lowercaseMsg.includes("order") || lowercaseMsg.includes("track") || lowercaseMsg.includes("delivery") || lowercaseMsg.includes("shipping")) {
      replyText = "You can easily track all your orders by going to 'My Orders' in your profile menu. Delivery typically takes 2-4 business days. Would you like me to check a specific order?";
    } else if (lowercaseMsg.includes("return") || lowercaseMsg.includes("refund") || lowercaseMsg.includes("exchange")) {
      replyText = "We offer free returns and exchanges within 30 days of delivery. The item must be unworn and have tags attached. You can start a return directly from your profile dashboard under 'My Orders'.";
    } else if (lowercaseMsg.includes("discount") || lowercaseMsg.includes("offer") || lowercaseMsg.includes("promo") || lowercaseMsg.includes("coupon")) {
      replyText = "Check out our 'Offers' page in the top menu to view all active discount codes and promotions! Currently we have a buy-one-get-one-50% off select apparel.";
    } else if (lowercaseMsg.includes("size") || lowercaseMsg.includes("fit") || lowercaseMsg.includes("t-shirt") || lowercaseMsg.includes("jeans")) {
      replyText = "Our t-shirts and jeans are true to standard Western sizes. For absolute precision, we recommend checking the size charts available on each specific product details page.";
    } else if (lowercaseMsg.includes("hello") || lowercaseMsg.includes("hi") || lowercaseMsg.includes("hey")) {
      replyText = `Hello again! Let me know what questions you have about our products or services, and I'll do my best to help.`;
    } else if (lowercaseMsg.includes("thank") || lowercaseMsg.includes("thanks")) {
      replyText = "You're very welcome! Please feel free to ask if you have any other questions. Have a wonderful day!";
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1800);
  };

  const resetAndClose = () => {
    setStep("form");
    setFormData({
      name: "",
      email: "",
      subject: "Product Query",
      message: "",
    });
    setMessages([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[580px] md:h-[620px] relative animate-fadeIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex items-center justify-between text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight flex items-center gap-1.5">
                Duma Support
                {step === "chat" && <span className="inline-block w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>}
              </h3>
              <p className="text-xs text-blue-100 font-medium">
                {step === "form" ? "Fill details to start" : "Chatting with Sarah"}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col justify-between">
          
          {step === "form" ? (
            /* Pre-chat Form */
            <form onSubmit={handleStartChat} className="space-y-4 my-auto">
              <div className="text-center mb-4">
                <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">Start a Live Chat</h4>
                <p className="text-sm text-gray-500">Provide your information to help us assist you better.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">What can we help you with?</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all appearance-none cursor-pointer"
                >
                  <option>Product Query</option>
                  <option>Order Status</option>
                  <option>Return & Exchange</option>
                  <option>Offers & Discounts</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Initial Message</label>
                <textarea
                  name="message"
                  required
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your question here..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mt-6 active:scale-95"
              >
                Start Chat Now
              </button>
            </form>
          ) : (
            /* Live Chat Window */
            <div className="flex flex-col h-full justify-between">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        {msg.sender === "user" ? "You" : "Sarah"}
                      </span>
                      <span className="text-[9px] text-gray-300">•</span>
                      <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-[85%] px-5 py-3 rounded-[1.5rem] text-sm leading-relaxed shadow-sm
                        ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-tr-none"
                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Sarah</span>
                      <span className="text-[9px] text-gray-300">•</span>
                      <span className="text-[10px] text-gray-400">typing...</span>
                    </div>
                    <div className="bg-white border border-gray-100 px-5 py-4 rounded-[1.5rem] rounded-tl-none shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="flex gap-2 bg-white p-2 rounded-2xl border border-gray-200/80 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none border-none"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:scale-100 text-white rounded-xl transition-all active:scale-95"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
