
import fs from 'fs';
import { addRecipe, getRecipes } from "./controllers/RecipeController";
import { addIngredient, getInventory } from "./controllers/InventoryController";
import { generateDinnerListKNN } from "./controllers/DinnerListController";
const { Command } = require("commander"); // add this line
const figlet = require("figlet");

//add the following line
const commander = new Command();

const dataFilePath = 'data.json';
const generatedListFilePath = 'generated-list.json';

export const readDataFromFile = (): any => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { recipes: [], inventory: [] };
  }
};

export const writeDataToFile = (data: any): void => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const writeGeneratedListToFile = (generatedList: any): void => {
  fs.writeFileSync(generatedListFilePath, JSON.stringify(generatedList, null, 2), 'utf-8');
};

console.log(figlet.textSync("Recipe Manager"));

commander
  .command('add-recipe')
  .description('Add a new recipe')
  .action(() => {
    // Logic to interactively add a recipe through the CLI
    // You can use inquirer or simply read from command line arguments
    // For simplicity, let's assume the recipe details are passed as command line arguments
    const recipe = {
      id: Math.random(),
      name: process.argv[3],
      ingredients: JSON.parse(process.argv[4])
    };
    addRecipe(recipe);
    console.log('Recipe added successfully!');
  });

  commander
  .command('show-inventory')
  .action(async () => {
    await getInventory();
  });

  commander
  .command('add-ingredient')
  .description('Add an ingredient to the inventory')
  .action(() => {
    // Logic to interactively add an ingredient through the CLI
    // For simplicity, let's assume the ingredient details are passed as command line arguments
    const ingredient = {
      name: process.argv[3],
      quantity: parseFloat(process.argv[4])
    };
    addIngredient(ingredient.name, ingredient.quantity.toString());
    console.log('Ingredient added to inventory!');
  });

commander
  .command('generate-dinner-list')
  .description('Generate a dinner list based on ingredient availability')
  .option('-n, --num-recipes <value>', 'Number of recipes to include in the dinner list', parseInt)
  .action((options: { numRecipes: number; }) => {
    const numRecipes = options.numRecipes || 3; // Default to 3 recipes
    const dinnerList = generateDinnerListKNN(numRecipes);
      // Log the dinner list in a more readable format
  console.log('Generated Dinner List:');
  dinnerList.forEach((recipe: { name: any; ingredients: any[]; }, index: number) => {
    console.log(`Recipe #${index + 1}: ${recipe.name}`);
    console.log('Ingredients:');
    recipe.ingredients.forEach((ingredient: { name: any; quantity: any; }) => {
      console.log(`- ${ingredient.name}: ${ingredient.quantity}`);
    });
    console.log('------------------------');
  });
  });

commander.parse(process.argv);

