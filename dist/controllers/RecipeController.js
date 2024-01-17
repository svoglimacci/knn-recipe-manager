"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipes = exports.addRecipe = void 0;
const recipes = [];
const index_1 = require("../index");
const addRecipe = (recipe) => {
    const data = (0, index_1.readDataFromFile)();
    data.recipes.push(recipe);
    (0, index_1.writeDataToFile)(data);
};
exports.addRecipe = addRecipe;
const getRecipes = () => {
    return recipes;
};
exports.getRecipes = getRecipes;
//# sourceMappingURL=RecipeController.js.map