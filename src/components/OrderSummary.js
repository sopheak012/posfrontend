import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { socket } from "../socket/SocketConnection";
import { resetPizzas } from "../features/pizzaSlice"; // Import the resetPizzas action
import { resetDrinks } from "../features/drinkSlice"; // Import the resetDrinks action

const OrderSummary = () => {
  const pizzas = useSelector((state) => state.pizza.pizzas);
  const drinks = useSelector((state) => state.drink);
  const dispatch = useDispatch(); // Create a dispatch function

  const [submitted, setSubmitted] = useState(false); // State to track if the order has been submitted

  const handleSubmitOrder = async (pizza, selectedToppings) => {
    const orderData = {
      pizza: {
        toppings: selectedToppings,
        price: pizza.price,
      },
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

      // Emit a socket.io event to the server with the specific order data
      socket.emit("orderSubmitted", response.data);

      // Reset the fields after successful order submission
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error scenarios or display an error message to the user
    }
  };

  const handleResetOrder = () => {
    // Reset the selected pizzas and drinks
    setSubmitted(false);
    dispatch(resetPizzas()); // Dispatch the resetPizzas action to clear the pizza slice state
    dispatch(resetDrinks()); // Dispatch the resetDrinks action to clear the drink slice state
  };

  if (submitted) {
    // Render a message or component indicating that the order has been submitted
    return (
      <div>
        <h2>Order Submitted</h2>
        <p>Thank you for your order!</p>
        <button onClick={handleResetOrder}>Place Another Order</button>
      </div>
    );
  }

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
      <button
        onClick={() =>
          handleSubmitOrder(
            pizzas[pizzas.length - 1],
            pizzas[pizzas.length - 1]?.toppings
          )
        }
        disabled={pizzas.length === 0}
      >
        Submit Order
      </button>
    </div>
  );
};

export default OrderSummary;
