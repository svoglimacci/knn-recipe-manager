import { Ingredient } from '../models/Ingredient';

const inventory: Ingredient[] = [];

import { readDataFromFile, writeDataToFile } from '../index';

export const addIngredient = async (ingredientName: string, quantity: string): Promise<void> => {
  const data = await readDataFromFile();
  const existingIngredientIndex = data.inventory.findIndex((ingredient: { name: string; }) => ingredient.name === ingredientName);

  if (existingIngredientIndex !== -1) {
    // Ingredient already exists, increment the quantity
    data.inventory[existingIngredientIndex].quantity += parseInt(quantity, 10);
    console.log(`Quantity of "${ingredientName}" increased to ${data.inventory[existingIngredientIndex].quantity}.`);
  } else {
    // Ingredient doesn't exist, add it to the inventory
    const newIngredient = { name: ingredientName, quantity: parseInt(quantity, 10) };
    data.inventory.push(newIngredient);
    console.log(`Ingredient "${ingredientName}" added.`);
  }

  await writeDataToFile(data);
};

export const getInventory = async (): Promise<void> => {
  const data = await readDataFromFile();
  console.log('Current Inventory:');
  data.inventory.forEach((ingredient: { name: any; quantity: any; }) => {
    console.log(`- ${ingredient.name}: ${ingredient.quantity}`);
  });
};