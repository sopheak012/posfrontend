import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { socket } from "../socket/SocketConnection";
import { resetPizzas, removePizza } from "../features/pizzaSlice";
import { resetDrinks, deleteDrink } from "../features/drinkSlice";

const OrderSummary = () => {
  const pizzas = useSelector((state) => state.pizza.pizzas);
  const drinks = useSelector((state) => state.drink);
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitOrder = async () => {
    const orderData = {
      pizzas: pizzas.map((pizza) => ({
        toppings: pizza.toppings,
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

      socket.emit("orderSubmitted", response.data);

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error scenarios or display an error message to the user
    }
  };

  const handleResetOrder = () => {
    setSubmitted(false);
    dispatch(resetPizzas());
    dispatch(resetDrinks());
  };

  const handleRemovePizza = (id) => {
    dispatch(removePizza(id));
  };

  const handleRemoveDrink = (id) => {
    dispatch(deleteDrink(id));
  };

  if (submitted) {
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
      <div>
        <p>Selected Pizzas:</p>
        {pizzas.length > 0 ? (
          <ul>
            {pizzas.map((pizza) => (
              <li key={pizza.id}>
                Toppings: {pizza.toppings.join(", ")}, Price:{" "}
                {pizza.price ? `$${pizza.price.toFixed(2)}` : "N/A"}
                <button onClick={() => handleRemovePizza(pizza.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pizzas in the order</p>
        )}
      </div>
      <div>
        <p>Selected Drinks:</p>
        {drinks.length > 0 ? (
          <ul>
            {drinks.map((drink) => (
              <li key={drink.id}>
                Drink: {drink.name}, Price: ${drink.price.toFixed(2)}
                <button onClick={() => handleRemoveDrink(drink.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No drinks in the order</p>
        )}
      </div>
      <button onClick={handleSubmitOrder} disabled={pizzas.length === 0}>
        Submit Order
      </button>
    </div>
  );
};

export default OrderSummary;
