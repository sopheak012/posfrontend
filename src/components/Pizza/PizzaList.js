import React from "react";
import PizzaItem from "./PizzaItem";

const PizzaList = () => {
  return (
    <div>
      <h2>Premade Pizzas</h2>
      <div>
        <PizzaItem
          imageSrc="pizza1.jpg"
          content="Deluxe Pizza - Pepperoni, sausage, mushrooms, onions, bell peppers"
        />
        <PizzaItem
          imageSrc="pizza2.jpg"
          content="Margherita Pizza - Fresh mozzarella, basil, tomatoes"
        />
        <PizzaItem
          imageSrc="pizza3.jpg"
          content="BBQ Chicken Pizza - Grilled chicken, BBQ sauce, red onions, cilantro"
        />
        {/* Add more PizzaItem components for other premade pizzas */}
      </div>
    </div>
  );
};

export default PizzaList;
