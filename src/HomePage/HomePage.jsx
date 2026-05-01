import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cards from "../Boxes.jsx/Cards";
import Img from "../Assets/one.webp";
import Img2 from "../Assets/two.webp";
import bgDark from "../Assets/bg-dark-fashion.png";


const images = [Img, Img2];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]); // Reset interval when index changes manually or nextSlide changes

  // Swipe logic
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="relative" style={{ backgroundImage: `url(${bgDark})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
    <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
      <div className="text-center">
        <h2 className="text-sm font-semibold text-blue-400 tracking-wide uppercase">
          Introducing Picture
        </h2>
        <p className="mt-2 text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          Capture every{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            moment
          </span>{" "}
          with style.
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
          A premium experience designed for the modern web. Responsive, fast,
          and beautiful across all your devices.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button 
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            Get Started
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all active:scale-95">
            Learn More
          </button>
        </div>
      </div>

      {/* Sliding Image Carousel */}
      <div className="mt-20 relative group max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 blur-3xl opacity-20 -z-10"></div>

        <div
          className="overflow-hidden aspect-video relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Image Track */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 p-4">
                <Cards>
                  <div className="w-full h-full">
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full rounded-2xl "
                    />
                  </div>
                </Cards>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-full shadow-xl text-gray-700 hover:bg-white hover:text-blue-600 transition-all active:scale-90 opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/80 backdrop-blur-lg border border-gray-100 rounded-full shadow-xl text-gray-700 hover:bg-white hover:text-blue-600 transition-all active:scale-90 opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={28} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? "w-8 bg-blue-600" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default LandingPage;
