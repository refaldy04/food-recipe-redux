import { createSlice } from "@reduxjs/toolkit";

type Ingredient = {
  name: string;
  unit: string;
  amount?: number;
};

type IngredientState = {
  ingredients: Ingredient[];
  recipe: {
    name?: string;
    ingredients: Ingredient[];
    steps: string[];
    isEditActive?: {
      field: "ingredients" | "steps";
      value: string | number;
    };
  };
};

const initialState: IngredientState = {
  ingredients: [
    {
      name: "Egg",
      unit: "pcs",
      amount: 0,
    },
    {
      name: "flour",
      unit: "oz",
      amount: 0,
    },
    {
      name: "salt",
      unit: "tsp",
      amount: 0,
    },
    {
      name: "water",
      unit: "liters",
      amount: 0,
    },
  ],
  recipe: { ingredients: [], steps: [] },
};

export const recipe = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    selectRecipe: (state, action) => {
      if (
        !state.recipe.ingredients.find(
          (ingredient) => ingredient.name === action.payload
        )
      ) {
        state.recipe.ingredients.push(
          state.ingredients.find(
            (ingredient) => ingredient.name === action.payload
          )!
        );
      }
    },
    addStep: (state, action) => {
      state.recipe.steps?.push(action.payload);
    },

    setEdit: (state, action) => {
      state.recipe.isEditActive = {
        field: action.payload.field,
        value: action.payload.value,
      };
    },

    editAmount: (state, action) => {
      state.recipe.ingredients.find(
        (ingredient) => ingredient.name === action.payload.name
      )!.amount = action.payload.amount;
      state.recipe.isEditActive = undefined;
    },

    editStep: (state, action) => {
      state.recipe.steps[action.payload.index] = action.payload.value;
      state.recipe.isEditActive = undefined;
    },

    deleteListItem: (state, action) => {
      if (action.payload.field === "ingredients") {
        state.recipe.ingredients = state.recipe.ingredients.filter(
          (ingredient) => ingredient.name !== action.payload.value
        );
      } else {
        state.recipe.steps = state.recipe.steps?.filter(
          (_, i) => i !== action.payload.value
        );
      }
      state.recipe.isEditActive = undefined;
    },
  },
});

export const {
  selectRecipe,
  addStep,
  setEdit,
  editAmount,
  editStep,
  deleteListItem,
} = recipe.actions;
export default recipe.reducer;
