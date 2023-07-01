import React from "react";

const OrderSummary = ({ pizzas }) => {
  return (
    <div>
      <h2>Order Summary</h2>
      {pizzas.length > 0 ? (
        <ul>
          {pizzas.map((pizza, index) => (
            <li key={index}>
              <h3>Pizza {index + 1}</h3>
              <ul>
                {pizza.toppings.map((topping, toppingIndex) => (
                  <li key={toppingIndex}>{topping}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pizzas added to the order yet.</p>
      )}
    </div>
  );
};

export default OrderSummary;
