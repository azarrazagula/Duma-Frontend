const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? "https://duma-backend.onrender.com" 
  : "http://192.168.29.128:5001";

export default API_BASE_URL;
