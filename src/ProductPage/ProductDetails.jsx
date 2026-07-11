import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';
import Button from '../NavBar/Button';

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to the top when the product details page opens
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Find product from the lists
    if (products) {
      const all = [...(products.tShirts || []), ...(products.jeans || [])];
      const found = all.find(p => (p._id === id || p.id === id));
      setProduct(found);
    }
  }, [id, products]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-lg">Back to Collection</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center bg-gray-50 relative">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-sm mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
            {product.stock === 0 && (
              <div className="absolute top-8 left-8 bg-red-500 text-white font-bold px-4 py-2 rounded-full uppercase tracking-widest text-sm shadow-lg">
                Out of Stock
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                {product.category || "Premium Apparel"}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 font-poppins">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black text-blue-600">${product.price}</span>
              <div className="flex items-center text-yellow-400 border-l-2 border-gray-200 pl-4 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
                <span className="text-gray-500 text-sm ml-2 font-medium">(128 reviews)</span>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description || "Experience premium quality with this meticulously crafted piece. Designed for both comfort and style, it's the perfect addition to your everyday wardrobe."}
            </p>

            {product.size && (
               <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Selected Size</h3>
                <div className="flex items-center gap-3">
                   <span className="px-5 py-2 border-2 border-black rounded-lg font-bold bg-black text-white shadow-md">
                     {product.size}
                   </span>
                </div>
               </div>
            )}

            <div className="flex items-center gap-6 mb-8">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Quantity</h3>
                <div className="flex items-center border-2 border-gray-200 rounded-lg w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-100 font-bold transition-colors text-xl"
                  >-</button>
                  <span className="px-4 py-2 font-bold text-gray-900 w-12 text-center text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-100 font-bold transition-colors text-xl"
                  >+</button>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                for(let i=0; i<quantity; i++) addToCart(product);
              }}
              className="w-full py-4 bg-gray-900 text-white font-bold text-lg rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              <ShoppingCart size={24} />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-3 text-gray-600">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-sm font-medium">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Truck size={24} />
                </div>
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
