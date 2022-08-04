import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Footer from './components/Layout/Footer';

const  App = () => {
  const [cartVisible, setCartVisible] = useState(false);

  const cartVisibleHandler = () => {
    setCartVisible((previousVisible) => {
      return !previousVisible
    });
  };

  const mealsComponent = <CartProvider>
    <Header onOpenCloseModal={cartVisibleHandler} />
    <main>
      {cartVisible && <Cart onOpenCloseModal={cartVisibleHandler}/>}
      <Meals />
    </main>
    <Footer />
  </CartProvider>
  

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/meals" replace/>} />
      <Route path="/meals" element={mealsComponent} />
    </Routes>
  );
}

export default App;
