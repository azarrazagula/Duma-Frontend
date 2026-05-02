import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import Button from '../NavBar/Button';
import Cards from '../Boxes.jsx/Cards';

const OfferDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (products && products.tShirts && products.jeans) {
      const offerTShirts = (products.tShirts || []).slice(0, 4);
      const offerJeans = (products.jeans || []).slice(0, 4);

      const index = parseInt(id);
      const tshirt = offerTShirts[index];
      const jean = offerJeans[index] || offerJeans[0];

      if (tshirt && jean) {
        setOffer({
          tshirt,
          jean,
          oldPrice: (tshirt.price + jean.price).toFixed(2),
          newPrice: Math.max(tshirt.price, jean.price).toFixed(2),
        });
      }
    }
  }, [id, products]);

  if (!offer) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

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
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 animate-fade-in min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-lg">Back to Offers</span>
      </button>

      <Cards>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 p-6 md:p-12">
          {/* Images Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 bg-[#f8f9fa] rounded-3xl p-6 md:p-10 relative">
            <div className="absolute top-6 left-6 bg-[#ff3b3b] text-white text-[10px] md:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest z-20 shadow-lg">
              Buy 1 Get 1
            </div>

            <div className="w-full rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 bg-white">
              <img src={tshirt.image} alt={tshirt.name} className="w-full h-auto object-contain p-2" />
            </div>

            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10 -my-4">
               <span className="text-gray-400 font-bold text-xl md:text-2xl">+</span>
            </div>

            <div className="w-full rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500 bg-white">
              <img src={jean.image} alt={jean.name} className="w-full h-auto object-contain p-2" />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 md:space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-4 leading-tight">
                {tshirt.name} <br className="hidden lg:block" /> & {jean.name}
              </h1>
              <div className="flex items-center gap-6">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[#ff3b3b]">
                  ${newPrice}
                </span>
                <span className="text-xl md:text-2xl text-gray-400 line-through font-bold">
                  ${oldPrice}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">BOGO Offer Details:</h3>
                <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                  <li>• High quality premium materials</li>
                  <li>• Regular fit for all-day comfort</li>
                  <li>• Perfect for casual or semi-formal wear</li>
                  <li>• Save ${(parseFloat(oldPrice) - parseFloat(newPrice)).toFixed(2)} instantly</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 md:py-5 bg-gray-900 text-white font-bold text-lg rounded-xl hover:bg-black transition-all shadow-xl active:scale-95"
                >
                  Add Bundle to Cart
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  className="px-8 py-4 md:py-5 bg-white text-gray-900 font-bold border-2 border-gray-900 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Go Back
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
               <span>✓ Free Shipping</span>
               <span>✓ 7 Days Return</span>
               <span>✓ Quality Assured</span>
            </div>
          </div>
        </div>
      </Cards>
    </div>
  );
};

export default OfferDetails;
