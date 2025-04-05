"use client";

import { useState } from "react";
import { Recipe, RecipeFormData, Ingredient, Step } from "../types/recipe";

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (data: RecipeFormData) => void;
}

export default function RecipeForm({ initialData, onSubmit }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        description: initialData.description,
        cookingTime: initialData.cookingTime,
        servings: initialData.servings,
        difficulty: initialData.difficulty,
        category: initialData.category,
        ingredients: initialData.ingredients,
        steps: initialData.steps,
      };
    }
    return {
      name: "",
      description: "",
      cookingTime: 30,
      servings: 4,
      difficulty: "Medium",
      category: "",
      ingredients: [],
      steps: [],
    };
  });

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: 0,
    unit: "",
  });

  const [newStep, setNewStep] = useState("");

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.amount && newIngredient.unit) {
      setFormData({
        ...formData,
        ingredients: [
          ...formData.ingredients,
          { ...newIngredient, id: crypto.randomUUID() },
        ],
      });
      setNewIngredient({ name: "", amount: 0, unit: "" });
    }
  };

  const removeIngredient = (id: string) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((ing) => ing.id !== id),
    });
  };

  const addStep = () => {
    if (newStep.trim()) {
      setFormData({
        ...formData,
        steps: [
          ...formData.steps,
          {
            id: crypto.randomUUID(),
            description: newStep,
            order: formData.steps.length + 1,
          },
        ],
      });
      setNewStep("");
    }
  };

  const removeStep = (id: string) => {
    setFormData({
      ...formData,
      steps: formData.steps
        .filter((step) => step.id !== id)
        .map((step, index) => ({ ...step, order: index + 1 })),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            value={formData.cookingTime}
            onChange={(e) =>
              setFormData({ ...formData, cookingTime: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Servings
          </label>
          <input
            type="number"
            value={formData.servings}
            onChange={(e) =>
              setFormData({ ...formData, servings: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({
                ...formData,
                difficulty: e.target.value as "Easy" | "Medium" | "Hard",
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newIngredient.name}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, name: e.target.value })
              }
              placeholder="Ingredient name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newIngredient.amount || ""}
              onChange={(e) =>
                setNewIngredient({
                  ...newIngredient,
                  amount: Number(e.target.value),
                })
              }
              placeholder="Amount"
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="text"
              value={newIngredient.unit}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, unit: e.target.value })
              }
              placeholder="Unit"
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {formData.ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <span>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Steps</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="Add a step"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {formData.steps.map((step) => (
              <li
                key={step.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <span>
                  {step.order}. {step.description}
                </span>
                <button
                  type="button"
                  onClick={() => removeStep(step.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialData ? "Update Recipe" : "Create Recipe"}
        </button>
      </div>
    </form>
  );
}
