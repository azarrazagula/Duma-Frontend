import React from "react";
import { Plus } from "lucide-react";
import Cards from "../Boxes.jsx/Cards";
import Button from "../NavBar/Button";

const ProductPage = ({ products, addToCart, horizontalTextRef, Jeans }) => {
  return (
    <>
      {/* T-Shirt Section */}
      <section className="bg-[#272727] rounded-3xl mx-4 my-8 p-8 md:p-12 overflow-hidden shadow-2xl">
        <h1 className="text-center pb-8 text-4xl md:text-6xl font-oi italic text-[#fcff45] tracking-tight">
          BUMAS T-SHIRTS
        </h1>

        <div className="overflow-hidden bg-[#fcff45] rounded-2xl mb-12 shadow-inner">
          <p
            ref={horizontalTextRef}
            className="whitespace-nowrap py-4 text-2xl md:text-4xl font-roboto tracking-wider font-extrabold italic text-black uppercase"
            style={{ width: "max-content" }}>
            New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Premium Quality Textures&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Cards key={product.id}>
              <div className="p-4 flex flex-col h-full group">
                <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className="text-lg font-black text-blue-600">${product.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <Button
                  onClick={() => addToCart(product)}
                  className="mt-6 w-full gap-2 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg"
                >
                  <Plus size={18} />
                  Add to Cart
                </Button>
              </div>
            </Cards>
          ))}
        </div>
      </section>

      {/* Jeans Section */}
      <section className="bg-[#272727] rounded-3xl mx-4 my-2 p-4 md:p-12 overflow-hidden shadow-2xl">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#fcff45] inline-block px-8 py-2 rounded-full flex-shrink-0">
            <h2 className="text-center text-4xl font-bold font-poppins tracking-wider italic text-[#272727]">JEANS</h2>
          </div>
          <div className="overflow-hidden flex-1">
            <p
              className="whitespace-nowrap font-bold font-poppins tracking-wider italic text-[#fcff45]"
              style={{ animation: "marquee 20s linear infinite" }}
            >
              Discover the latest collection of jeans for men&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Premium Quality Textures&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Discover the latest collection of jeans for men&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Jeans.map((Jean) => (
            <Cards key={Jean.id}>
              <div className="p-4 flex flex-col h-full group">
                <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
                  <img
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    src={Jean.image}
                    alt={Jean.name}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800">{Jean.name}</h3>
                    <span className="text-lg font-black text-blue-600">${Jean.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {Jean.description}
                  </p>
                </div>
                <Button
                  onClick={() => addToCart(Jean)}
                  className="mt-6 w-full gap-2 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 shadow-lg"
                >
                  <Plus size={18} />
                  Add to Cart
                </Button>
              </div>
            </Cards>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductPage;