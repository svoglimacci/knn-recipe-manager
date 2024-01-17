import { Recipe } from '../models/Recipe';
import { Ingredient } from '../models/Ingredient';
import { getRecipes } from './RecipeController';
import { getInventory } from './InventoryController';
import fs from 'fs';

// src/controllers/DinnerListController.ts
import { readDataFromFile, writeGeneratedListToFile } from '../index';

export const generateDinnerListKNN = (numRecipes: number): Recipe[] => {
  const data = readDataFromFile();
  const recipes = data.recipes;
  const inventory = data.inventory;

  const calculateDistance = (recipe: Recipe): number => {
    // Your adjusted distance calculation logic based on the recipe and inventory
    // For example, summing the squared differences of available ingredients
    const distance = Math.sqrt(
      inventory.reduce((sum: number, inventoryIngredient: { name: string; quantity: number; }) => {
        const recipeIngredient = recipe.ingredients.find(i => i.name === inventoryIngredient.name);
        const ingredientQuantity = recipeIngredient ? recipeIngredient.quantity : 0;
        const ingredientDiff = inventoryIngredient.quantity - ingredientQuantity;
        return sum + ingredientDiff * ingredientDiff;
      }, 0)
    );

    return distance;
  };



  // Sort recipes based on distance
  const sortedRecipes = recipes.sort((a: Recipe, b: Recipe) => calculateDistance(a) - calculateDistance(b));

  // Select the top k recipes as the dinner list
  const dinnerList = sortedRecipes.slice(0, numRecipes);

  // Write generated dinner list to JSON file
  writeGeneratedListToFile(dinnerList);

  return dinnerList;
};
