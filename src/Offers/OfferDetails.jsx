import React, { useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import Button from '../NavBar/Button';
import Cards from '../Boxes.jsx/Cards';

const OfferDetails = ({ offer, onBack, addToCart }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!offer) return null;

  const { tshirt, jean, oldPrice, newPrice } = offer;

  const handleAddToCart = () => {
    const bundleItem = {
      id: `bundle-${tshirt.id}-${jean.id}`,
      name: `BOGO DEAL: ${tshirt.name} + ${jean.name}`,
      price: parseFloat(newPrice),
      image: tshirt.image,
      secondaryImage: jean.image,
      description: "Buy One Get One Free Offer"
    };
    addToCart(bundleItem);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 animate-fade-in min-h-screen">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-lg">Back to Offers</span>
      </button>

      <Cards>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 p-6 md:p-12">
          {/* Images Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center gap-4 bg-[#f8f9fa] rounded-3xl p-8 relative">
             <div className="absolute top-6 left-6 bg-[#ff3b3b] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest z-20 shadow-lg">
               Buy 1 Get 1
             </div>
             
             <div className="flex-1 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 bg-white">
               <img src={tshirt.image} alt={tshirt.name} className="w-full h-auto object-cover p-2 rounded-3xl" />
             </div>
             
             <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10 -mx-6">
               <Plus size={24} className="text-gray-900" strokeWidth={3} />
             </div>
             
             <div className="flex-1 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 bg-white">
               <img src={jean.image} alt={jean.name} className="w-full h-auto object-cover p-2 rounded-3xl" />
             </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 font-bold text-sm uppercase tracking-widest rounded-full mb-6 w-fit">
              Special Bundle Offer
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              {tshirt.name} <br/> + {jean.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-5xl font-black text-[#ff3b3b]">
                ${newPrice}
              </span>
              <span className="text-2xl text-gray-400 line-through font-bold">
                ${oldPrice}
              </span>
            </div>
            
            <div className="w-full h-px bg-gray-100 mb-8" />
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Bundle Description</h3>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Why settle for one when you can have the perfect outfit? Get the premium <strong>{tshirt.name}</strong> paired with our top-selling <strong>{jean.name}</strong>. Pay for the higher priced item only and get the second one absolutely free!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 py-5 bg-[#ff3b3b] text-white rounded-3xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-red-600 transition-all duration-300 shadow-[0_10px_20px_rgba(255,59,59,0.2)] hover:shadow-[0_10px_20px_rgba(255,59,59,0.4)] hover:-translate-y-1"
              >
                <ShoppingCart size={24} />
                Add Bundle to Cart
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-between text-sm font-bold text-gray-400 border-t border-gray-100 pt-8">
              <span className="flex items-center gap-2">✓ Save ${(oldPrice - newPrice).toFixed(2)}</span>
              <span className="flex items-center gap-2">✓ Limited Time Deal</span>
              <span className="flex items-center gap-2">✓ Free Shipping</span>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  );
};

export default OfferDetails;
