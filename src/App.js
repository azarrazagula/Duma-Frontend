import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NavBar from "./NavBar/NavBar";
import Cart from "./Cart/Cart";
import AppRouter from "./Router/Router";
import Footer from "./Footer/Footer";
import { useLocation } from "react-router-dom";


const API_BASE_URL = "http://192.168.29.128:5001";
function App() {
  const horizontalTextRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState({ tShirts: [], jeans: [] });
  const [activeSection, setActiveSection] = useState("home");

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
          tShirts: allProducts.filter((p) => p.category && p.category.toLowerCase() === "t-shirt"),
          jeans: allProducts.filter((p) => p.category && p.category.toLowerCase() === "jeans"),
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

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "offers", "about", "customercare"];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (!horizontalTextRef.current) return;
    gsap.to(horizontalTextRef.current, {
      xPercent: -50,
      duration: 15,
      ease: "none",
      repeat: -1,
    });
  });

  const location = useLocation();
  const isAuthPage = location.pathname === "/Login";

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-blue-100">
      {!isAuthPage && (
        <NavBar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
      )}
      <AppRouter
        products={products}
        addToCart={addToCart}
        horizontalTextRef={horizontalTextRef}
      />
      {!isAuthPage && (
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          clearCart={() => setCartItems([])}
        />
      )}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
