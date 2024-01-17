"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGeneratedListToFile = exports.writeDataToFile = exports.readDataFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
const RecipeController_1 = require("./controllers/RecipeController");
const InventoryController_1 = require("./controllers/InventoryController");
const DinnerListController_1 = require("./controllers/DinnerListController");
const { Command } = require("commander"); // add this line
const figlet = require("figlet");
//add the following line
const commander = new Command();
const dataFilePath = 'data.json';
const generatedListFilePath = 'generated-list.json';
const readDataFromFile = () => {
    try {
        const data = fs_1.default.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        return { recipes: [], inventory: [] };
    }
};
exports.readDataFromFile = readDataFromFile;
const writeDataToFile = (data) => {
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};
exports.writeDataToFile = writeDataToFile;
const writeGeneratedListToFile = (generatedList) => {
    fs_1.default.writeFileSync(generatedListFilePath, JSON.stringify(generatedList, null, 2), 'utf-8');
};
exports.writeGeneratedListToFile = writeGeneratedListToFile;
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
    (0, RecipeController_1.addRecipe)(recipe);
    console.log('Recipe added successfully!');
});
commander
    .command('show-inventory')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, InventoryController_1.getInventory)();
}));
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
    (0, InventoryController_1.addIngredient)(ingredient.name, ingredient.quantity.toString());
    console.log('Ingredient added to inventory!');
});
commander
    .command('generate-dinner-list')
    .description('Generate a dinner list based on ingredient availability')
    .option('-n, --num-recipes <value>', 'Number of recipes to include in the dinner list', parseInt)
    .action((options) => {
    const numRecipes = options.numRecipes || 3; // Default to 3 recipes
    const dinnerList = (0, DinnerListController_1.generateDinnerListKNN)(numRecipes);
    // Log the dinner list in a more readable format
    console.log('Generated Dinner List:');
    dinnerList.forEach((recipe, index) => {
        console.log(`Recipe #${index + 1}: ${recipe.name}`);
        console.log('Ingredients:');
        recipe.ingredients.forEach((ingredient) => {
            console.log(`- ${ingredient.name}: ${ingredient.quantity}`);
        });
        console.log('------------------------');
    });
});
commander.parse(process.argv);
//# sourceMappingURL=index.js.map