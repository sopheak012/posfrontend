import React from "react";
import CreatePizza from "../components/CreatePizza";
import CreateDrink from "../components/CreateDrink";
import OrderSummary from "../components/OrderSummary";
import "../css/OrderPage.css"; // Import the CSS file for styling

const Order = () => {
  return (
    <div className="order-container">
      <h1>Order Page</h1>
      <div className="order-content">
        <div className="create-pizza">
          <CreatePizza />
        </div>
        <div className="create-drink">
          <CreateDrink />
        </div>
        <div className="order-summary">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Order;
