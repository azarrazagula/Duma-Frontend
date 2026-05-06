import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import ProductPage from '../ProductPage/ProductPage';
import Offers from '../Offers/Offers';
import About from '../About/About';
import CustomerCare from '../CustomerCare/CustomerCare';

const ProductDetails = lazy(() => import('../ProductPage/ProductDetails'));
const OfferDetails = lazy(() => import('../Offers/OfferDetails'));
const Login = lazy(() => import('../Auth/Login'));
const MyOrders = lazy(() => import('../Orders/MyOrders'));

const AppRouter = ({ products, addToCart, horizontalTextRef }) => {
  return (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <ProductPage
              products={products.tShirts}
              Jeans={products.jeans}
              horizontalTextRef={horizontalTextRef}
            />
            <Offers
              tShirts={products.tShirts}
              jeans={products.jeans}
            />
            <About />
            <CustomerCare />
          </>
        } />

        {/* Detail Routes */}
        <Route path="/product/:id" element={
          <ProductDetails addToCart={addToCart} products={products} />
        } />

        <Route path="/offer/:id" element={
          <OfferDetails addToCart={addToCart} products={products} />
        } />

        <Route path="/orders" element={<MyOrders />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
