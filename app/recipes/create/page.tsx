'use client';

import { useRouter } from 'next/navigation';
import { useRecipes } from '../../context/RecipeContext';
import RecipeForm from '../../components/RecipeForm';
import { RecipeFormData } from '../../types/recipe';
import Link from 'next/link';

export default function CreateRecipe() {
  const router = useRouter();
  const { addRecipe } = useRecipes();

  const handleSubmit = (formData: RecipeFormData) => {
    addRecipe(formData);
    router.push('/');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Recipe</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Back to Recipes
        </Link>
      </div>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
} 