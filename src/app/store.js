import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "../features/pizzaSlice";
import drinkReducer from "../features/drinkSlice";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    drink: drinkReducer,
  },
});
