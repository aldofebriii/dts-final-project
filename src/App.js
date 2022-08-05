import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useFetch from './hooks/use-fetch';
import UserContext from './data/user-context';
import Orders from './components/Orders/Order';

const  App = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const sendRequest = useFetch()[2];
  const navigation = useNavigate();
  const ctx = useContext(UserContext)
  const { userLogin } = useContext(UserContext);
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

  const orderComponent = <>
  <Header onOpenCloseModal={cartVisibleHandler} />
    <main>
      {cartVisible && <Cart onOpenCloseModal={cartVisibleHandler}/>}
      <Orders />
    </main>
  <Footer />
  </>

  const loginComponent = <GoogleOAuthProvider clientId='828262859736-sqobasl8165s7erkp8vrn5ae2j0g8vf4.apps.googleusercontent.com'>
    <Login />
  </GoogleOAuthProvider>

  //Manage the local storage
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if(userToken){
      sendRequest({uri: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDF-CQDTijZSeAZBMLYz-KCA1eHLkqLPVs', method: 'POST', body: JSON.stringify({idToken: userToken})}, (rawData) => {
        userLogin('email', userToken);
      })
    };
  }, [sendRequest, navigation, userLogin])


  return (
    <Routes>
      <Route path="/" element={ctx.isLoggedIn ? <Navigate to="/meals" replace/> : <Navigate to="/login" replace/>} />
      <Route path="/login" element={!ctx.isLoggedIn ? loginComponent : <Navigate to="/meals" />} /> 
      <Route path="/meals" element={ctx.isLoggedIn ? mealsComponent : <Navigate to="/login" replace/>} />
      <Route path="/orders" element={orderComponent} />
    </Routes>
  );
}

export default App;
