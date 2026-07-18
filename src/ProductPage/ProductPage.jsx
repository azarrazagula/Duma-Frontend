import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Cards from "../Boxes.jsx/Cards";
import Button from "../NavBar/Button";

const ProductCard = ({ product, onClick }) => (
  <Cards>
    <div className="p-2 sm:p-4 flex flex-col h-full group">
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square mb-2 sm:mb-3">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={product.image}
          alt={product.name}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xs sm:text-base font-extrabold text-gray-950 leading-tight line-clamp-1">{product.name}</h3>
            <span className="text-xs sm:text-base font-black text-blue-600 ml-1 shrink-0">${product.price}</span>
          </div>
          <p className="text-[9px] sm:text-xs text-gray-600 font-semibold leading-snug line-clamp-2">{product.description}</p>
          {(product.size || product.stock !== undefined) && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {product.size && (
                <span className="text-[8px] sm:text-xs font-black px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded-full border border-gray-200">
                  Size: {product.size}
                </span>
              )}
              {product.stock !== undefined && (
                <span className={`text-[8px] sm:text-xs font-black px-1.5 py-0.5 rounded-full border ${product.stock > 0 ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                  {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                </span>
              )}
            </div>
          )}
        </div>
        <Button
          onClick={onClick}
          className="mt-2.5 sm:mt-3.5 w-full gap-1 sm:gap-2 py-1.5 sm:py-2.5 bg-gray-950 text-white font-black rounded-lg sm:rounded-xl hover:bg-blue-600 shadow-lg flex items-center justify-center text-[9px] sm:text-xs uppercase tracking-wider transition-all"
        >
          <ArrowRight size={12} className="sm:w-[14px]" />
          Buy Now
        </Button>
      </div>
    </div>
  </Cards>
);

const ProductSection = ({ items, desktopHeightClass, emptyMessage, onBuy, children }) => (
  <section
    className={`bg-[#272727] rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 my-2 sm:my-4
      p-3 sm:p-8 lg:p-12 overflow-hidden shadow-2xl
      h-auto ${desktopHeightClass}
      flex flex-col justify-between gap-6 lg:gap-0`}
  >
    {children}

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
      {items && items.length > 0 ? (
        items.slice(0, 4).map((item) => (
          <ProductCard
            key={item._id || item.id}
            product={item}
            onClick={() => onBuy(item._id || item.id)}
          />
        ))
      ) : (
        <div className="col-span-full py-10 text-center">
          <p className="text-white/75 text-base sm:text-xl font-medium">{emptyMessage}</p>
        </div>
      )}
    </div>
  </section>
);

const ProductPage = ({ products, horizontalTextRef, Jeans }) => {
  const navigate = useNavigate();

  const handleBuy = (id) => {
    const user = localStorage.getItem('user');
    if (user) navigate(`/product/${id}`);
    else navigate('/Login');
  };

  return (
    <div id="products">
      {/* ── T-Shirt Section ── */}
      <ProductSection
        items={products}
        desktopHeightClass="lg:h-[calc(100vh-100px)]"
        emptyMessage="No T-Shirts available at the moment."
        onBuy={handleBuy}
      >
        <h2 className="text-center text-2xl sm:text-4xl lg:text-6xl font-oi italic text-[#fcff45] tracking-tight">
          BUMAS T-SHIRTS
        </h2>

        <div className="overflow-hidden bg-[#fcff45] rounded-xl sm:rounded-2xl shadow-inner">
          <p
            ref={horizontalTextRef}
            className="whitespace-nowrap py-2 sm:py-4 text-sm sm:text-2xl lg:text-4xl font-roboto tracking-wider font-extrabold italic text-black uppercase"
            style={{ width: "max-content" }}
          >
            New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Premium Quality Textures&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;New Collection Out Now&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </ProductSection>

      {/* ── Jeans Section ── */}
      <ProductSection
        items={Jeans}
        desktopHeightClass="lg:h-[calc(100vh-0px)]"
        emptyMessage="No Jeans available at the moment."
        onBuy={handleBuy}
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-[#fcff45] inline-block px-5 sm:px-8 py-1.5 sm:py-2 rounded-full flex-shrink-0">
            <h2 className="text-xl sm:text-3xl font-bold font-poppins tracking-wider italic text-[#272727]">JEANS</h2>
          </div>
          <div className="overflow-hidden flex-1">
            <p
              className="whitespace-nowrap text-sm sm:text-base font-bold font-poppins tracking-wider italic text-[#fcff45]"
              style={{ animation: "marquee 20s linear infinite" }}
            >
              Discover the latest collection of jeans&nbsp;&nbsp;★&nbsp;&nbsp;New Collection Out Now&nbsp;&nbsp;★&nbsp;&nbsp;Limited Edition Drop&nbsp;&nbsp;★&nbsp;&nbsp;Premium Quality&nbsp;&nbsp;★&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </ProductSection>
    </div>
  );
};

export default ProductPage;