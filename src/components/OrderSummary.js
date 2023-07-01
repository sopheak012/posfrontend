import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderSummary = () => {
  const pizzas = useSelector((state) => state.pizza.pizzas);
  const drinks = useSelector((state) => state.drink);

  const handleSubmitOrder = async (pizzas, drinks) => {
    const orderData = {
      pizzas: pizzas.map((pizza) => ({
        toppings: pizza.toppings.map((topping) => topping.name),
        price: pizza.price,
      })),
      drinks: drinks.map((drink) => ({
        drink: drink.name,
        price: drink.price,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderData
      );
      console.log("Order submitted successfully:", response.data);
      // Handle any additional logic or UI updates after successful order submission
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error scenarios or display an error message to the user
    }
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <p>
        Selected Pizzas:
        {pizzas.length > 0 ? (
          <ul>
            {pizzas.map((pizza) => (
              <li key={pizza.id}>
                Toppings: {pizza.toppings.join(", ")}, Price:{" "}
                {pizza.price ? `$${pizza.price.toFixed(2)}` : "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          "No pizzas in the order"
        )}
      </p>
      <p>
        Selected Drinks:
        {drinks.length > 0 ? (
          <ul>
            {drinks.map((drink) => (
              <li key={drink.id}>
                Drink: {drink.name}, Price: ${drink.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          "No drinks in the order"
        )}
      </p>
      <button onClick={() => handleSubmitOrder(pizzas, drinks)}>
        Submit Order
      </button>
    </div>
  );
};

export default OrderSummary;
