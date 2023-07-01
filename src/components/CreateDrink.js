import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDrink } from "../features/drinkSlice";

const CreateDrink = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAddDrink = () => {
    if (name.trim() !== "") {
      const newDrink = {
        id: Math.random().toString(),
        name: name.trim(),
        price: 1.25,
      };
      dispatch(addDrink(newDrink));
      setName("");
    }
  };

  return (
    <div>
      <h2>Create Drink</h2>
      <input
        type="text"
        placeholder="Enter drink name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddDrink}>Add Drink</button>

      <h3>Popular Canned Drinks</h3>
      <ul>
        <li>
          <button onClick={() => setName("Coca-Cola")}>Coca-Cola</button>
        </li>
        <li>
          <button onClick={() => setName("Pepsi")}>Pepsi</button>
        </li>
        <li>
          <button onClick={() => setName("Sprite")}>Sprite</button>
        </li>
        <li>
          <button onClick={() => setName("Dr. Pepper")}>Dr. Pepper</button>
        </li>
        <li>
          <button onClick={() => setName("Mountain Dew")}>Mountain Dew</button>
        </li>
      </ul>
    </div>
  );
};

export default CreateDrink;
