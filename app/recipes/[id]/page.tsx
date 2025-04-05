'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRecipes } from '../../context/RecipeContext';
import Link from 'next/link';

export default function RecipeDetail() {
  const params = useParams();
  const router = useRouter();
  const { getRecipe, deleteRecipe } = useRecipes();
  const recipe = getRecipe(params.id as string);

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    router.push('/');
  };

  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  }[recipe.difficulty];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Recipes
          </Link>
          <Link
            href={`/recipes/edit/${recipe.id}`}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-center gap-4">
          <span className={`px-2 py-1 rounded-full text-sm ${difficultyColor}`}>
            {recipe.difficulty}
          </span>
          <span className="text-gray-600">🕒 {recipe.cookingTime} mins</span>
          <span className="text-gray-600">👥 {recipe.servings} servings</span>
          <span className="text-gray-600">📂 {recipe.category}</span>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="text-gray-600">
                • {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.id} className="text-gray-600">
                <span className="font-medium text-gray-900">{step.order}.</span>{' '}
                {step.description}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-sm text-gray-500">
          <p>Created: {new Date(recipe.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(recipe.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
} 