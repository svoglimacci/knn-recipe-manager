import { Recipe } from '../models/Recipe';

const recipes: Recipe[] = [];

import { readDataFromFile, writeDataToFile } from '../index';

export const addRecipe = (recipe: Recipe): void => {
  const data = readDataFromFile();
  data.recipes.push(recipe);
  writeDataToFile(data);
};

export const getRecipes = (): Recipe[] => {
  return recipes;
};