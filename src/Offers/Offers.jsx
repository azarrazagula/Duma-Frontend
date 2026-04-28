import React from "react";
import Cards from "../Boxes.jsx/Cards";
import Button from "../NavBar/Button";
import { Plus } from "lucide-react";

const Offers = ({ tShirts, jeans, addToCart }) => {
  // Pick 4 T-shirts and 4 Jeans for the BOGO offers (2 rows of 2 pairs each)
  const offerTShirts = (tShirts || []).slice(0, 4);
  const offerJeans = (jeans || []).slice(0, 4);

  // Create BOGO pairs: each pair = 1 T-shirt + 1 Jean
  const bogoPairs = offerTShirts.map((tshirt, i) => ({
    tshirt,
    jean: offerJeans[i] || offerJeans[0],
    oldPrice: (tshirt.price + (offerJeans[i]?.price || offerJeans[0]?.price || 0)).toFixed(2),
    newPrice: Math.max(tshirt.price, offerJeans[i]?.price || offerJeans[0]?.price || 0).toFixed(2),
  }));

  return (
    <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl mx-4 my-8 p-8 md:p-12 overflow-hidden shadow-2xl relative">
      {/* 50% OFF Banner */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <div className="bg-[#ff3b3b] text-white text-6xl md:text-8xl font-black italic font-poppins px-10 py-4 rounded-2xl shadow-xl shadow-red-500/30 transform -rotate-2">
            50% OFF
          </div>
          <div className="absolute -top-3 -right-3 bg-[#fcff45] text-black text-sm font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
            LIMITED!
          </div>
        </div>
        <p className="text-white/60 text-lg mt-4 font-poppins tracking-wider">
          Buy One T-Shirt, Get One Jean — Pay for the higher price only!
        </p>
      </div>

      {/* BOGO Offer Cards — 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {bogoPairs.map((pair, index) => (
          <Cards key={index}>
            <div className="p-6">
              {/* BOGO Label */}
              <div className="flex justify-center mb-4">
                <span className="bg-[#ff3b3b] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Buy 1 Get 1
                </span>
              </div>

              {/* Product Pair: T-shirt + Jean */}
              <div className="flex items-center gap-4">
                {/* Left — T-Shirt */}
                <div className="flex-1 text-center">
                  <div className="relative overflow-hidden rounded-xl aspect-square mb-3 group">
                    <img
                      src={pair.tshirt.image}
                      alt={pair.tshirt.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-700">{pair.tshirt.name}</p>
                  <p className="text-xs text-gray-400">T-Shirt</p>
                </div>

                {/* Center + */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#fcff45] flex items-center justify-center shadow-lg shadow-yellow-300/30">
                    <Plus size={28} className="text-[#272727]" strokeWidth={3} />
                  </div>
                </div>

                {/* Right — Jean */}
                <div className="flex-1 text-center">
                  <div className="relative overflow-hidden rounded-xl aspect-square mb-3 group">
                    <img
                      src={pair.jean.image}
                      alt={pair.jean.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-sm font-bold text-gray-700">{pair.jean.name}</p>
                  <p className="text-xs text-gray-400">Jean</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-4 mt-6 mb-4">
                <span className="text-xl text-gray-400 line-through font-semibold">
                  ${pair.oldPrice}
                </span>
                <span className="text-3xl font-black text-[#ff3b3b]">
                  ${pair.newPrice}
                </span>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={() => {
                  // Create a single Bundle item for the cart
                  const bundleItem = {
                    id: `bundle-${pair.tshirt.id}-${pair.jean.id}`,
                    name: `BOGO DEAL: ${pair.tshirt.name} + ${pair.jean.name}`,
                    price: parseFloat(pair.newPrice),
                    image: pair.tshirt.image,
                    secondaryImage: pair.jean.image, // Pass the Jean image too
                    description: "Buy One Get One Free Offer"
                  };

                  addToCart(bundleItem);
                }}
                className="w-full gap-2 py-3 bg-[#ff3b3b] text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/20"
              >
                <Plus size={18} />
                Grab This Deal
              </Button>
            </div>
          </Cards>
        ))}
      </div>
    </section>
  );
};

export default Offers;