"use client";

import {
  selectRecipe,
  addStep,
  setEdit,
  editAmount,
  editStep,
  deleteListItem,
} from "@/lib/features/recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Home() {
  const recipe = useAppSelector((state) => state.recipeReducer.recipe);
  const ingredients = useAppSelector(
    (state) => state.recipeReducer.ingredients
  );
  const dispatch = useAppDispatch();

  const handleSelectRecipe = (ingredient: string) => {
    dispatch(selectRecipe(ingredient));
  };

  const handleAddRecipe = (key: string, step: string) => {
    if (key === "Enter") {
      console.log("test", step);

      dispatch(addStep(step));
    }
  };

  const handleEdit = ({
    field,
    value,
  }: {
    field: "ingredients" | "steps";
    value: string | number;
  }) => {
    dispatch(setEdit({ field, value }));
  };

  const handleEditAmount = ({
    name,
    amount,
  }: {
    name: string;
    amount: number;
  }) => {
    dispatch(
      editAmount({
        name,
        amount,
      })
    );
  };

  const handleEditStep = ({
    index,
    value,
  }: {
    index: number;
    value: string;
  }) => {
    dispatch(
      editStep({
        index,
        value,
      })
    );
  };

  const handleDeleteListItem = ({
    field,
    value,
  }: {
    field: "ingredients" | "steps";
    value: string | number;
  }) => {
    dispatch(deleteListItem({ field, value }));
  };

  return (
    <main className="grid grid-cols-3 min-h-screen items-center justify-center">
      <div
        className={`${
          recipe.ingredients.length ? "md:col-span-1" : "md:col-span-3"
        } col-span-3 flex flex-col px-5 justify-center items-center`}
      >
        {ingredients.map((ingredient, i: number) => (
          <button
            key={i}
            className={`${
              recipe.ingredients.find((i) => i.name === ingredient.name)
                ? "hidden"
                : ""
            } border border-black p-2 mb-2 w-[200px] rounded-md`}
            onClick={() => handleSelectRecipe(ingredient.name)}
          >
            {ingredient.name}
          </button>
        ))}
      </div>
      <div
        className={`${
          recipe.ingredients.length ? "md:col-span-2" : "hidden"
        } col-span-3 flex justify-center items-center`}
      >
        <div>
          <div className="border-black border-b-2 p-2">
            <input
              className="bg-transparent outline-none w-full text-center"
              placeholder="Input Recipe Name"
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {recipe.ingredients?.map((ingredient, i: number) => (
              <div key={i} className="flex gap-2 justify-between items-center">
                <div className="flex gap-2">
                  {(recipe.isEditActive?.field === "ingredients" &&
                    recipe.isEditActive?.value === ingredient.name) ||
                  ingredient.amount === 0 ? (
                    <div className="border-black border-b-2">
                      <input
                        type="number"
                        className="bg-transparent outline-none w-[40px] text-center"
                        defaultValue={ingredient.amount}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditAmount({
                              name: ingredient.name,
                              amount: Number(e.currentTarget.value),
                            });
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <p>{ingredient.amount}</p>
                  )}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      handleEdit({
                        field: "ingredients",
                        value: ingredient.name,
                      })
                    }
                  >
                    {ingredient.unit} {ingredient.name}
                  </span>
                </div>
                <div
                  className={`${
                    recipe.isEditActive?.field === "ingredients" &&
                    recipe.isEditActive?.value === ingredient.name
                      ? "flex"
                      : "hidden"
                  } gap-2`}
                >
                  <button
                    className="py-2 px-1 rounded-lg bg-red-500"
                    onClick={() =>
                      handleDeleteListItem({
                        field: "ingredients",
                        value: ingredient.name,
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <br />
          <br />
          <span>Steps :</span>
          <div className="border-black border-b-2 p-2">
            <input
              className="bg-transparent outline-none w-full"
              placeholder="Input Step"
              onKeyDown={(e) => handleAddRecipe(e.key, e.currentTarget.value)}
            />
          </div>
          <div>
            {recipe.steps?.map((step, i: number) => (
              <div className="flex justify-between items-center my-2 gap-5">
                {recipe.isEditActive?.field === "steps" &&
                recipe.isEditActive?.value === i ? (
                  <div className="border-black border-b-2">
                    <input
                      className="bg-transparent outline-none w-full text-center"
                      defaultValue={step}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditStep({
                            index: i,
                            value: e.currentTarget.value,
                          });
                        }
                      }}
                    />
                  </div>
                ) : (
                  <span
                    onClick={() => handleEdit({ field: "steps", value: i })}
                    className="cursor-pointer"
                  >
                    {i + 1}. {step}
                  </span>
                )}

                <div
                  className={`${
                    recipe.isEditActive?.field === "steps" &&
                    i === recipe.isEditActive?.value
                      ? "flex"
                      : "hidden"
                  } gap-2`}
                >
                  <button
                    className="py-2 px-1 rounded-lg bg-red-500"
                    onClick={() =>
                      handleDeleteListItem({ field: "steps", value: i })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
