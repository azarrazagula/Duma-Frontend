import React from "react";
import autumnModel from "../Assets/autumn_edit_model.png";

const HomePage = () => {
  // Smooth scroll helper to navigate to products section
  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="bg-[#0a0a0a] h-[calc(100vh-70px)] md:h-[calc(100vh-86px)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 font-['Inter'] overflow-hidden">
      <div className="max-w-7xl w-full">
        {/* Symmetrical Hero Banner */}
        <div className="relative bg-[#0d0d0d] border border-[#1a1a1a] rounded-3xl overflow-hidden min-h-[600px] lg:h-[620px] flex flex-col lg:flex-row items-center justify-between p-6 sm:p-10 lg:p-16 shadow-2xl gap-8 lg:gap-0">

          {/* Subtle gold/ambient glow behind the banner */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.05)_0%,transparent_70%)] pointer-events-none"></div>

          {/* Left Column: Exclusive Collection & Shop CTA */}
          <div className="w-full lg:w-1/3 z-20 flex justify-center lg:justify-start order-2 lg:order-none">
            <div className="border border-[#c5a880] bg-[#0c0c0c]/90 backdrop-blur-md p-6 sm:p-8 md:p-10 max-w-xs md:max-w-sm w-full transition-transform duration-500 hover:scale-[1.02]">
              <span className="text-[10px] md:text-xs font-serif tracking-[0.25em] text-[#c5a880] uppercase block mb-3">
                Exclusive Collection:
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-tight mb-6 md:mb-8">
                Elevate <br />
                Your Style
              </h1>
              <button
                onClick={scrollToProducts}
                className="border border-white/40 text-white font-serif text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 sm:px-6 sm:py-3 hover:bg-[#c5a880] hover:text-black hover:border-[#c5a880] transition-all duration-350 cursor-pointer active:scale-95"
              >
                Shop Collection
              </button>
            </div>
          </div>

          {/* Center Column: Model Image (Responsive layout) */}
          <div className="w-full lg:w-1/3 h-[300px] sm:h-[380px] lg:h-full flex items-center justify-center order-1 lg:order-none">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-full h-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] overflow-hidden rounded-t-full border border-[#1a1a1a] shadow-2xl relative">
                <img
                  src={autumnModel}
                  alt="Duma Premium Luxury Apparel"
                  className="w-full h-full object-cover object-top scale-100 hover:scale-105 transition-transform duration-700"
                />
                {/* Smooth bottom gradient overlay to blend with dark bg */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-85"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Duma Brand & Purchase Description */}
          <div className="w-full lg:w-1/3 z-20 flex justify-center lg:justify-end text-center lg:text-right order-3 lg:order-none">
            <div className="max-w-xs w-full py-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.2em] text-white uppercase mb-3">
                Duma
              </h2>
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#c5a880] uppercase block mb-4">
                / Premium Luxury /
              </span>
              <p className="text-[11px] md:text-xs tracking-[0.2em] text-gray-400 uppercase leading-relaxed font-light mb-6">
                Shop our premium t-shirts, custom-fit jeans, and curated accessories designed for everyday elegance.
              </p>
              <div className="text-[9px] md:text-[10px] tracking-[0.15em] text-[#c5a880] uppercase font-semibold">
                Free Shipping & Easy Returns
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
