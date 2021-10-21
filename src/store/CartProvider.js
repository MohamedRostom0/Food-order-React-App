import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const exsistingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[exsistingItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[exsistingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      return {
        items: updatedItems,
        totalAmount: +updatedTotalAmount.toFixed(2),
      };

    case "REMOVE":
      console.log(action.id);
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];

      const updatedTotalAmt = state.totalAmount - existingItem.price;

      let updatedCartItems;
      if (existingItem.amount === 1) {
        // Last item in cart
        updatedCartItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedCartItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedCartItems = [...state.items];
        updatedCartItems[existingCartItemIndex] = updatedCartItem;
      }
      return {
        items: updatedCartItems,
        totalAmount: +updatedTotalAmt.toFixed(2),
      };

    case "CLEAR":
      return {
        items: [],
        totalAmount: 0,
      };

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartItemsHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
