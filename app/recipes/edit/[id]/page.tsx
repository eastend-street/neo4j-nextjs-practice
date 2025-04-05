'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRecipes } from '../../../context/RecipeContext';
import RecipeForm from '../../../components/RecipeForm';
import { RecipeFormData } from '../../../types/recipe';
import Link from 'next/link';

export default function EditRecipe() {
  const params = useParams();
  const router = useRouter();
  const { getRecipe, updateRecipe } = useRecipes();
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

  const handleSubmit = (formData: RecipeFormData) => {
    updateRecipe(recipe.id, formData);
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Recipe</h1>
        <Link
          href={`/recipes/${recipe.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Recipe
        </Link>
      </div>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
    </div>
  );
} 