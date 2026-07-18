import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../Boxes.jsx/Cards";
import Button from "../NavBar/Button";
import { Plus } from "lucide-react";

const Offers = ({ tShirts, jeans }) => {
  const navigate = useNavigate();
  const offerTShirts = (tShirts || []).slice(0, 2);
  const offerJeans = (jeans || []).slice(0, 2);

  const bogoPairs = offerTShirts.map((tshirt, i) => ({
    tshirt,
    jean: offerJeans[i] || offerJeans[0],
    oldPrice: (tshirt.price + (offerJeans[i]?.price || offerJeans[0]?.price || 0)).toFixed(2),
    newPrice: Math.max(tshirt.price, offerJeans[i]?.price || offerJeans[0]?.price || 0).toFixed(2),
  }));

  return (
    <section
      id="offers"
      className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 my-3 sm:my-4
        p-4 sm:p-8 lg:p-12 overflow-hidden shadow-2xl relative
        h-[calc(100vh-70px)] md:h-[calc(100vh-86px)]
        flex flex-col justify-between"
    >
      {/* 50% OFF Banner */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="bg-[#ff3b3b] text-white text-3xl sm:text-6xl lg:text-8xl font-black italic font-poppins px-5 sm:px-10 py-2 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-red-500/30 transform -rotate-2">
            50% OFF
          </div>
          <div className="absolute -top-2 -right-2 bg-[#fcff45] text-black text-[8px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 rounded-full shadow-lg animate-bounce">
            LIMITED!
          </div>
        </div>
        <p className="text-gray-300 text-[10px] sm:text-base mt-2 sm:mt-4 font-poppins tracking-wider text-center max-w-md px-2">
          Buy One T-Shirt, Get One Jean — Pay for the higher price only!
        </p>
      </div>

      {/* BOGO Offer Cards — always 2 columns */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 flex-1 my-3 sm:my-0">
        {bogoPairs.map((pair, index) => (
          <Cards key={index}>
            <div className="p-3 sm:p-5 h-full flex flex-col justify-between">
              {/* BOGO Label */}
              <div className="flex justify-center mb-2 sm:mb-3">
                <span className="bg-red-700 text-white text-[9px] sm:text-xs font-bold px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-widest">
                  Buy 1 Get 1
                </span>
              </div>

              {/* Product Pair */}
              <div className="flex items-center gap-2 sm:gap-4 flex-1">
                {/* T-Shirt */}
                <div className="flex-1 text-center min-w-0">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square mb-1 sm:mb-2 group bg-white">
                    <img
                      src={pair.tshirt.image}
                      alt={pair.tshirt.name}
                      className="w-full h-full object-cover p-1 sm:p-2 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-[10px] sm:text-sm font-bold text-gray-700 truncate">{pair.tshirt.name}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">T-Shirt</p>
                </div>

                {/* Plus */}
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#fcff45] flex items-center justify-center shadow-md">
                    <Plus className="text-[#272727] w-3 h-3 sm:w-5 sm:h-5" strokeWidth={3} />
                  </div>
                </div>

                {/* Jean */}
                <div className="flex-1 text-center min-w-0">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square mb-1 sm:mb-2 group bg-white">
                    <img
                      src={pair.jean.image}
                      alt={pair.jean.name}
                      className="w-full h-full object-cover p-1 sm:p-2 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-[10px] sm:text-sm font-bold text-gray-700 truncate">{pair.jean.name}</p>
                  <p className="text-[9px] sm:text-xs text-gray-500">Jean</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-3">
                <span className="text-sm sm:text-xl text-gray-500 line-through font-semibold">${pair.oldPrice}</span>
                <span className="text-lg sm:text-3xl font-black text-red-700">${pair.newPrice}</span>
              </div>

              {/* CTA */}
              <Button
                onClick={() => {
                  const user = localStorage.getItem('user');
                  if (user) { navigate(`/offer/${index}`); }
                  else { navigate('/Login'); }
                }}
                className="w-full gap-1 sm:gap-2 py-2 sm:py-3 bg-red-700 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-red-800 shadow-lg text-[10px] sm:text-sm"
              >
                <Plus size={13} />
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