import React, { useState } from "react";

const CreatePizza = () => {
  const [selectedToppings, setSelectedToppings] = useState(new Set());

  const handleToppingSelection = (topping) => {
    if (selectedToppings.has(topping)) {
      // If the topping is already selected, remove it
      selectedToppings.delete(topping);
    } else {
      // If the topping is not selected, add it
      selectedToppings.add(topping);
    }
    setSelectedToppings(new Set(selectedToppings)); // Trigger state update
  };

  const handleSubmit = () => {
    // Handle submission logic (e.g., add pizza with selected toppings to order)
    console.log("Pizza with toppings:", Array.from(selectedToppings));
    setSelectedToppings(new Set()); // Reset selected toppings
  };

  return (
    <div>
      <h2>Create Pizza</h2>
      <div>
        <button
          onClick={() => handleToppingSelection("Pepperoni")}
          className={selectedToppings.has("Pepperoni") ? "active" : ""}
        >
          Pepperoni
        </button>
        <button
          onClick={() => handleToppingSelection("Sausage")}
          className={selectedToppings.has("Sausage") ? "active" : ""}
        >
          Sausage
        </button>
        <button
          onClick={() => handleToppingSelection("Pineapple")}
          className={selectedToppings.has("Pineapple") ? "active" : ""}
        >
          Pineapple
        </button>
        {/* Add more buttons for other toppings */}
      </div>
      <div>
        <p>Selected Toppings: {Array.from(selectedToppings).join(", ")}</p>
        <button onClick={handleSubmit}>Add to Order</button>
      </div>
    </div>
  );
};

export default CreatePizza;
