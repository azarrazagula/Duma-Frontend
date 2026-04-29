import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NavBar from "./NavBar/NavBar";
import HomePage from "./HomePage/HomePage";
import Cart from "./Cart/Cart";
import ProductPage from "./ProductPage/ProductPage";
import Offers from "./Offers/Offers.jsx";
import About from "./About/About.jsx";
import CustomerCare from "./CustomerCare/CustomerCare.jsx";
import ProductDetails from "./ProductPage/ProductDetails";
import OfferDetails from "./Offers/OfferDetails";

const API_BASE_URL = "http://localhost:5001";

function App() {
  const horizontalTextRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState({ tShirts: [], jeans: [] });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user/products`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const allProducts = data.map((p) => {
          let imageUrl = p.image;
          // Handle valid image paths
          if (imageUrl) {
            if (!imageUrl.startsWith("http")) {
              imageUrl = `${API_BASE_URL}${imageUrl}`;
            }
          } else {
            imageUrl = "https://via.placeholder.com/300?text=No+Image"; // Fallback image
          }

          return {
            ...p,
            id: p._id, // Keep cart functionality working
            image: imageUrl,
          };
        });

        setProducts({
          tShirts: allProducts.filter((p) => p.category === "T-Shirt"),
          jeans: allProducts.filter((p) => p.category === "Jeans"),
        });
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  useGSAP(() => {
    gsap.to(horizontalTextRef.current, {
      xPercent: -50,
      duration: 15,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-blue-100">
      <NavBar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />
      ) : selectedOffer ? (
        <OfferDetails
          offer={selectedOffer}
          onBack={() => setSelectedOffer(null)}
          addToCart={addToCart}
        />
      ) : (
        <>
          <HomePage />
          <ProductPage
            products={products.tShirts}
            onProductClick={setSelectedProduct}
            horizontalTextRef={horizontalTextRef}
            Jeans={products.jeans}
          />
          <Offers
            tShirts={products.tShirts}
            jeans={products.jeans}
            onOfferClick={setSelectedOffer}
          />
          <About />
          <CustomerCare />
        </>
      )}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
