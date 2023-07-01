import React, { useState } from "react";
import CreatePizza from "../components/CreatePizza";
import OrderSummary from "../components/OrderSummary";

const Order = () => {
  const [pizzas, setPizzas] = useState([]);

  const addPizzaToOrder = (pizza) => {
    setPizzas((prevPizzas) => [...prevPizzas, pizza]);
  };

  return (
    <div>
      <h1>Order Page</h1>
      <CreatePizza addPizzaToOrder={addPizzaToOrder} />
      <OrderSummary pizzas={pizzas} />
    </div>
  );
};

export default Order;
