import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import ProductPage from '../ProductPage/ProductPage';
import Offers from '../Offers/Offers';
import About from '../About/About';
import CustomerCare from '../CustomerCare/CustomerCare';
import ProductDetails from '../ProductPage/ProductDetails';
import OfferDetails from '../Offers/OfferDetails';
import Login from '../Auth/Login';

const AppRouter = ({ products, addToCart, horizontalTextRef }) => {
  return (
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

      <Route path="/Login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
