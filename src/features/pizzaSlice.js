import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
};

const calculatePrice = (toppings) => {
  const prices = [8.75, 10.75, 12.75, 15.0];
  const maxToppings = prices.length - 1;

  if (toppings.length <= maxToppings) {
    return prices[toppings.length - 1];
  } else {
    return prices[maxToppings];
  }
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const newPizza = {
        id:
          state.pizzas.length > 0
            ? state.pizzas[state.pizzas.length - 1].id + 1
            : 1,
        ...action.payload,
        price: calculatePrice(action.payload.toppings),
      };
      state.pizzas.push(newPizza);
    },
    removePizza: (state, action) => {
      state.pizzas = state.pizzas.filter(
        (pizza) => pizza.id !== action.payload
      );
    },
    updatePizza: (state, action) => {
      const { id, toppings } = action.payload;
      const pizza = state.pizzas.find((pizza) => pizza.id === id);
      if (pizza) {
        pizza.toppings = toppings;
        pizza.price = calculatePrice(toppings);
      }
    },
    resetPizzas: (state) => {
      state.pizzas = [];
    },
  },
});

export const { addPizza, removePizza, updatePizza, resetPizzas } =
  pizzaSlice.actions;
export default pizzaSlice.reducer;
