import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Button from '../NavBar/Button';
import Cards from '../Boxes.jsx/Cards';

const ProductDetails = ({ products, onBack, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Scroll to the top when the product details page opens
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Find product from the lists
    if (products) {
      const all = [...products.tShirts, ...products.jeans];
      const found = all.find(p => p._id === id);
      setProduct(found);
    }
  }, [id, products]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 animate-fade-in min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-lg">Back to Collection</span>
      </button>

      <Cards>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 p-6 md:p-12">
          {/* Product Image Section */}
          <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-[#f8f9fa] flex items-center justify-center relative group">
            <div className="absolute inset-0  bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto p-6 rounded-[50px] max-h-[600px] object-cover hover:scale-105 transition-transform duration-200 ease-out"
            />
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-bold text-sm uppercase tracking-widest rounded-full mb-6 w-fit">
              {product.category || 'Premium Collection'}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-blue-600">
                ${product.price}
              </span>
              <span className="text-xl text-gray-400 line-through font-bold">
                ${(parseFloat(product.price) * 1.3).toFixed(2)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {product.size && (
                <span className="px-4 py-1.5 bg-gray-100 text-gray-700 font-bold rounded-full border border-gray-200">
                  Size: {product.size}
                </span>
              )}
              {product.stock !== undefined && (
                <span className={`px-4 py-1.5 font-bold rounded-full border ${product.stock > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  {product.stock > 0 ? `${product.stock} items left in stock` : 'Out of stock'}
                </span>
              )}
            </div>

            <div className="w-full h-px bg-gray-100 mb-8" />

            <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              {product.description || 'Experience the perfect blend of comfort and style with this premium piece. Designed for the modern individual who values both aesthetics and unparalleled quality.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button
                onClick={() => addToCart(product)}
                className="flex-1 py-5 bg-gray-900 text-white rounded-3xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:-translate-y-1"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-between text-sm font-bold text-gray-400 border-t border-gray-100 pt-8">
              <span className="flex items-center gap-2">✓ Free Shipping</span>
              <span className="flex items-center gap-2">✓ 30-Day Returns</span>
              <span className="flex items-center gap-2">✓ Secure Checkout</span>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  );
};

export default ProductDetails;
