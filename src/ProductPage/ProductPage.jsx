import React from "react";
import { useNavigate } from "react-router-dom";

import Cards from "../Boxes.jsx/Cards";
import Button from "../NavBar/Button";

const ProductPage = ({ products, horizontalTextRef, Jeans }) => {
  const navigate = useNavigate();
  return (
    <div id="products">
      {/* T-Shirt Section */}
      <section className="bg-[#272727] rounded-3xl mx-4 my-8 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        <h2 className="text-center pb-8 text-3xl sm:text-5xl lg:text-6xl font-oi italic text-[#fcff45] tracking-tight">
          BUMAS T-SHIRTS
        </h2>

        <div className="overflow-hidden bg-[#fcff45] rounded-2xl mb-12 shadow-inner">
          <p
            ref={horizontalTextRef}
            className="whitespace-nowrap py-4 text-xl sm:text-3xl lg:text-4xl font-roboto tracking-wider font-extrabold italic text-black uppercase"
            style={{ width: "max-content" }}>
            New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Premium Quality Textures&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <Cards key={product.id}>
                {/* ... existing card content ... */}
                <div className="p-4 flex flex-col h-full group">
                  <div className="relative overflow-hidden rounded-3xl aspect-square mb-4">
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
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {product.size && (
                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                          Size: {product.size}
                        </span>
                      )}
                      {product.stock !== undefined && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${product.stock > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {product.stock > 0 ? `${product.stock} available stocks` : 'Out of stock'}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const user = localStorage.getItem('user');
                      if (user) {
                        navigate(`/product/${product._id}`);
                      } else {
                        navigate('/Login');
                      }
                    }}
                    className="mt-6 w-full py-3 bg-gray-900 text-white font-bold rounded-3xl hover:bg-blue-600 shadow-lg"
                  >
                    Buy Now
                  </Button>
                </div>
              </Cards>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/75 text-xl font-medium">No T-Shirts available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Jeans Section */}
      <section className="bg-[#272727] rounded-3xl mx-4 my-2 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#fcff45] inline-block px-8 py-2 rounded-full flex-shrink-0">
            <h2 className="text-center text-3xl sm:text-4xl font-bold font-poppins tracking-wider italic text-[#272727]">JEANS</h2>
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
          {Jeans.length > 0 ? (
            Jeans.map((Jean) => (
              <Cards key={Jean.id}>
                {/* ... existing card content ... */}
                <div className="p-4 flex flex-col h-full group">
                  <div className="relative overflow-hidden rounded-3xl aspect-square mb-4">
                    <img
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                      src={Jean.image}
                      alt={Jean.name}
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800">{Jean.name}</h3>
                      <span className="text-lg font-black text-blue-600">${Jean.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {Jean.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {Jean.size && (
                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                          Size: {Jean.size}
                        </span>
                      )}
                      {Jean.stock !== undefined && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${Jean.stock > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {Jean.stock > 0 ? `${Jean.stock} available stocks` : 'Out of stock'}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const user = localStorage.getItem('user');
                      if (user) {
                        navigate(`/product/${Jean._id}`);
                      } else {
                        navigate('/Login');
                      }
                    }}
                    className="mt-6 w-full py-3 bg-gray-900 text-white font-bold rounded-3xl hover:bg-blue-600 shadow-lg"
                  >
                    Buy Now
                  </Button>
                </div>
              </Cards>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/75 text-xl font-medium">No Jeans available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductPage;