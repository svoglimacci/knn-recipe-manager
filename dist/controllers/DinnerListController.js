"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDinnerListKNN = void 0;
// src/controllers/DinnerListController.ts
const index_1 = require("../index");
const generateDinnerListKNN = (numRecipes) => {
    const data = (0, index_1.readDataFromFile)();
    const recipes = data.recipes;
    const inventory = data.inventory;
    const calculateDistance = (recipe) => {
        // Your adjusted distance calculation logic based on the recipe and inventory
        // For example, summing the squared differences of available ingredients
        const distance = Math.sqrt(inventory.reduce((sum, inventoryIngredient) => {
            const recipeIngredient = recipe.ingredients.find(i => i.name === inventoryIngredient.name);
            const ingredientQuantity = recipeIngredient ? recipeIngredient.quantity : 0;
            const ingredientDiff = inventoryIngredient.quantity - ingredientQuantity;
            return sum + ingredientDiff * ingredientDiff;
        }, 0));
        return distance;
    };
    // Sort recipes based on distance
    const sortedRecipes = recipes.sort((a, b) => calculateDistance(a) - calculateDistance(b));
    // Select the top k recipes as the dinner list
    const dinnerList = sortedRecipes.slice(0, numRecipes);
    // Write generated dinner list to JSON file
    (0, index_1.writeGeneratedListToFile)(dinnerList);
    return dinnerList;
};
exports.generateDinnerListKNN = generateDinnerListKNN;
//# sourceMappingURL=DinnerListController.js.map