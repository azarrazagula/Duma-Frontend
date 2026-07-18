import React from "react";
import { Target, Eye, Heart, ShieldCheck } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-600" />,
      title: "Our Mission",
      description: "Premium quality fashion that empowers individuals to express their unique style.",
    },
    {
      icon: <Eye className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-600" />,
      title: "Our Vision",
      description: "The leading destination for modern, sustainable, trend-setting apparel worldwide.",
    },
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-600" />,
      title: "Our Values",
      description: "Integrity, innovation, and inclusivity at the heart of everything we do.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-blue-600" />,
      title: "Quality Promise",
      description: "Only the finest materials so every piece feels as good as it looks.",
    },
  ];

  return (
    <section
      id="about"
      className="bg-white rounded-2xl sm:rounded-3xl mx-3 sm:mx-4 my-3 sm:my-4 p-4 sm:p-8 lg:p-12
        overflow-hidden shadow-2xl border border-gray-100
        h-[calc(100vh-70px)] md:h-[calc(100vh-86px)]
        flex flex-col justify-between"
    >
      {/* Header */}
      <div className="text-center">
        <p className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-widest uppercase">
          About Us
        </p>
        <h2 className="mt-1 text-xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our Brand Story
        </h2>
        <p className="mt-1 sm:mt-2 max-w-2xl mx-auto text-[11px] sm:text-sm lg:text-lg text-gray-400">
          From a small design studio to a global fashion destination.
        </p>
      </div>

      {/* Feature Cards — 2×2 on mobile, 4-col on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-3 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl lg:rounded-3xl
              hover:shadow-md hover:-translate-y-0.5 transition-all group border border-transparent hover:border-blue-100 h-full"
          >
            <div className="p-2 sm:p-3 bg-white w-fit rounded-lg sm:rounded-xl shadow-sm mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-[10px] sm:text-xs lg:text-sm text-gray-500 leading-snug">{item.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="p-4 sm:p-8 lg:p-12 bg-blue-600 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl pointer-events-none" />
        <h3 className="text-sm sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-3 relative z-10">
          Ready to experience the best?
        </h3>
        <p className="hidden sm:block text-white/80 text-xs sm:text-sm max-w-xl mx-auto mb-3 sm:mb-6 relative z-10">
          Join thousands of satisfied customers who have made us their go-to fashion destination.
        </p>
        <button className="px-4 py-1.5 sm:px-8 sm:py-3 bg-white text-blue-600 font-bold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-lg relative z-10 text-xs sm:text-sm">
          Shop the Collection
        </button>
      </div>
    </section>
  );
};

export default About;