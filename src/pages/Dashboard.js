import React, { useEffect, useState } from "react";
import { socket } from "../socket/SocketConnection";
import axios from "axios";
import styles from "../css/DashBoard.module.css";

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
    <div className={styles.dashboardContainer}>
      <h2>Order List</h2>
      {sortedOrders.length > 0 ? (
        <ul className={styles.orderList}>
          {sortedOrders.map((order) => (
            <li key={order._id} className={styles.orderItem}>
              <div className={styles.orderId}>Order ID: {order.orderNum}</div>
              <div className={styles.pizzas}>
                <div>Pizzas:</div>
                <ul>
                  {order.pizzas.map((pizza, index) => (
                    <li key={index} className={styles.pizzaItem}>
                      {pizza.toppings.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.drinks}>
                <div>Drinks:</div>
                <ul>
                  {order.drinks.map((drink, index) => (
                    <li key={index} className={styles.drinkItem}>
                      {drink.drink}
                    </li>
                  ))}
                </ul>
              </div>
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
