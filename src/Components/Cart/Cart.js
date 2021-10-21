import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

import Checkout from "./Checkout2";

import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const {
    isLoading: isSendingOrder,
    error: sendOrderError,
    sendRequest: sendOrder,
    requestCompleted: sentComplete,
  } = useHttp();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderBtnHandler = (event) => {
    setIsCheckout(true);
  };

  const applyOnData = (data) => {
    console.log(data);
  };

  const submitOrderHandler = (userData) => {
    sendOrder(
      {
        url: "https://react-http-9445e-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: { user: userData, orderedItems: cartCtx.items },
        headers: { "Content-Type": "application/json" },
      },
      applyOnData
    );

    cartCtx.clearCart();
  };

  const cartListItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      price={item.price}
      amount={item.amount}
      name={item.name}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    ></CartItem>
  ));

  const cartItems = <ul className={classes["cart-items"]}>{cartListItems}</ul>;

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes["button"]} onClick={orderBtnHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout
          onCancel={props.onClose}
          onConfirm={submitOrderHandler}
        ></Checkout>
      )}

      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order...</p>;

  return (
    <Modal onClose={props.onClose}>
      {!sentComplete && !isSendingOrder && !sendOrderError && cartModalContent}
      {isSendingOrder && !sendOrderError && isSubmittingModalContent}
      {sendOrderError && <p>Something went wrong</p>}
      {sentComplete && <p>Order placed successfully!</p>}
    </Modal>
  );
};

export default Cart;
