import React from "react";
import { Target, Eye, Heart, ShieldCheck } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Our Mission",
      description: "To provide premium quality fashion that empowers individuals to express their unique style with confidence.",
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: "Our Vision",
      description: "To become the leading destination for modern, sustainable, and trend-setting apparel worldwide.",
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      title: "Our Values",
      description: "Integrity, innovation, and inclusivity are at the heart of everything we do, from design to delivery.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Quality Promise",
      description: "We source only the finest materials to ensure every piece you wear feels as good as it looks.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our Brand Story
          </p>
          <div className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            Founded with a passion for excellence, we've grown from a small design studio to a global fashion destination.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-2 group border border-transparent hover:border-blue-100"
            >
              <div className="p-3 bg-white w-fit rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-blue-600 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Ready to experience the best?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
            Join thousands of satisfied customers who have made us their go-to fashion destination.
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-lg relative z-10">
            Shop the Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;