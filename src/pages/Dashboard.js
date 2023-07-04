import React, { useEffect, useState } from "react";
import { socket } from "../socket/SocketConnection";
import axios from "axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders when the component mounts
    fetchOrders();

    // Listen for the "orderUpdated" socket event
    socket.on("orderUpdated", handleOrderUpdated);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("orderUpdated", handleOrderUpdated);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/orders");
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error scenarios or display an error message to the user
    }
  };

  const handleOrderUpdated = (updatedOrder) => {
    setOrders((prevOrders) => {
      // Find the index of the updated order in the array
      const orderIndex = prevOrders.findIndex(
        (order) => order._id === updatedOrder._id
      );

      if (orderIndex !== -1) {
        // If the order exists, update it in the orders array
        const updatedOrders = [...prevOrders];
        updatedOrders[orderIndex] = updatedOrder;
        return updatedOrders;
      } else {
        // If the order is new, add it to the beginning of the orders array
        return [updatedOrder, ...prevOrders];
      }
    });
  };

  const sortedOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div>
      <h2>Order List</h2>
      {sortedOrders.length > 0 ? (
        <ul>
          {sortedOrders.map((order) => (
            <li key={order._id}>
              <div>Order ID: {order.orderNum}</div>
              <div>Pizzas:</div>
              <ul>
                {order.pizzas.map((pizza) => (
                  <li key={pizza._id}>
                    Toppings: {pizza.toppings.join(", ")}, Price: $
                    {pizza.price.$numberDecimal}
                  </li>
                ))}
              </ul>
              <div>Drinks:</div>
              <ul>
                {order.drinks.map((drink) => (
                  <li key={drink._id}>
                    Drink: {drink.drink}, Price: ${drink.price.$numberDecimal}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default Dashboard;
