import { useState, useEffect } from "react";

import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import {CartContextProvider} from "./store/CartContext.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/Checkout.jsx";

function App() {



  return (
      <CartContextProvider>
          <UserProgressContextProvider>
              <Header />
              <Meals />
              <Cart />
              <Checkout />
          </UserProgressContextProvider>
      </CartContextProvider>
  );
}

export default App;
