import React from "react";
import CreatePizza from "../components/CreatePizza";
import CreateDrink from "../components/CreateDrink";
import OrderSummary from "../components/OrderSummary";

const Order = () => {
  return (
    <div>
      <h1>Order Page</h1>
      <CreatePizza />
      <CreateDrink />
      <OrderSummary />
    </div>
  );
};

export default Order;
