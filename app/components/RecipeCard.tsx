'use client';

import { Recipe } from '../types/recipe';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  }[recipe.difficulty];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${difficultyColor}`}>
          {recipe.difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span>🕒 {recipe.cookingTime} mins</span>
        <span>👥 {recipe.servings} servings</span>
      </div>
      
      <div className="flex justify-between items-center">
        <Link 
          href={`/recipes/${recipe.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View Details
        </Link>
        
        <div className="flex gap-2">
          <Link
            href={`/recipes/edit/${recipe.id}`}
            className="text-gray-600 hover:text-gray-800"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(recipe.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 