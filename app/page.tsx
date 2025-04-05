'use client';

import { useRecipes } from './context/RecipeContext';
import RecipeCard from './components/RecipeCard';
import Link from 'next/link';

export default function Home() {
  const { recipes, deleteRecipe } = useRecipes();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
        <Link
          href="/recipes/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No recipes yet. Start by adding your first recipe!</p>
          <Link
            href="/recipes/create"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Create Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={deleteRecipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}
