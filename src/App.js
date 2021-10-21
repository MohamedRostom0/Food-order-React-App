import { useState } from "react";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";

import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartProvider>
      {cartIsVisible && <Cart onClose={hideCartHandler}></Cart>}

      <Header onShowCart={showCartHandler}></Header>

      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
};

export default App;
