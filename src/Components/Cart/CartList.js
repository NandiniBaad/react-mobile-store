import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  //value is props.value -> destructuring
  const { cart } = value;
  //   console.log(cart);
  return (
    <div className="container-fluid">
      {cart.map((cartItem) => {
        return <CartItem key={cartItem.id} item={cartItem} value={value} />;
      })}
    </div>
  );
}
