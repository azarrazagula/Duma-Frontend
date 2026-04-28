import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NavBar from "./NavBar/NavBar";
import HomePage from "./HomePage/HomePage";
import Cart from "./Cart/Cart";
import Index from "./Assets/Index";
import ProductPage from "./ProductPage/ProductPage";
import Offers from "./Offers/Offers.jsx";
import About from "./About/About.jsx";
import CustomerCare from "./CustomerCare/CustomerCare.jsx";
function App() {
  const horizontalTextRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    Red,
    Blue,
    Black,
    Yellow,
    Pink,
    Lavander,
    Grey,
    White,
    BlackJean,
    BlueJean,
    WhiteJean,
    DarkJean,
  } = Index;
  const T_Shirts = [
    {
      id: 101,
      name: "Crimson Rush",
      price: 49.99,
      description: "Deep red premium texture for the bold.",
      image: Red,
    },
    {
      id: 102,
      name: "Ocean Breeze",
      price: 54.99,
      description: "Calming blue tones for a modern look.",
      image: Blue,
    },
    {
      id: 103,
      name: "Midnight Black",
      price: 59.99,
      description: "The classic choice for ultimate elegance.",
      image: Black,
    },
    {
      id: 104,
      name: "Solar Flare",
      price: 44.99,
      description: "Bright yellow energy for your space.",
      image: Yellow,
    },
    {
      id: 105,
      name: "Petal Pink",
      price: 47.99,
      description: "Soft pink hues for a delicate touch.",
      image: Pink,
    },
    {
      id: 106,
      name: "Lavander Mist",
      price: 52.99,
      description: "Soothing lavander for a peaceful vibe.",
      image: Lavander,
    },
    {
      id: 107,
      name: "Cloud White",
      price: 42.99,
      description: "Pure white for a clean, minimal aesthetic.",
      image: White,
    },
    {
      id: 108,
      name: "Stone Grey",
      price: 46.99,
      description: "Sophisticated grey for any environment.",
      image: Grey,
    },
  ];
  const Jean = [
    {
      id: 201,
      name: "Crimson Rush",
      price: 49.99,
      description: "Styles up your look Made In Thailand.",
      image: WhiteJean,
    },
    {
      id: 202,
      name: "Ocean Breeze",
      price: 54.99,
      description: "Calming blue tones for a modern look.",
      image: BlueJean,
    },
    {
      id: 203,
      name: "Midnight Black",
      price: 59.99,
      description: "The classic choice for ultimate elegance.",
      image: BlackJean,
    },
    {
      id: 204,
      name: "Solar Flare",
      price: 44.99,
      description: "Bright Your Days Styles up your look Made In Turkey.",
      image: DarkJean,
    },
  ];

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
      <HomePage />
      <ProductPage
        products={T_Shirts}
        addToCart={addToCart}
        horizontalTextRef={horizontalTextRef}
        Jeans={Jean}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
      <Offers tShirts={T_Shirts} jeans={Jean} addToCart={addToCart} />
      <About />
      <CustomerCare />
    </div>
  );
}

export default App;
