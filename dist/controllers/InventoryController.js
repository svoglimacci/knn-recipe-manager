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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventory = exports.addIngredient = void 0;
const inventory = [];
const index_1 = require("../index");
const addIngredient = (ingredientName, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, index_1.readDataFromFile)();
    const existingIngredientIndex = data.inventory.findIndex((ingredient) => ingredient.name === ingredientName);
    if (existingIngredientIndex !== -1) {
        // Ingredient already exists, increment the quantity
        data.inventory[existingIngredientIndex].quantity += parseInt(quantity, 10);
        console.log(`Quantity of "${ingredientName}" increased to ${data.inventory[existingIngredientIndex].quantity}.`);
    }
    else {
        // Ingredient doesn't exist, add it to the inventory
        const newIngredient = { name: ingredientName, quantity: parseInt(quantity, 10) };
        data.inventory.push(newIngredient);
        console.log(`Ingredient "${ingredientName}" added.`);
    }
    yield (0, index_1.writeDataToFile)(data);
});
exports.addIngredient = addIngredient;
const getInventory = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, index_1.readDataFromFile)();
    console.log('Current Inventory:');
    data.inventory.forEach((ingredient) => {
        console.log(`- ${ingredient.name}: ${ingredient.quantity}`);
    });
});
exports.getInventory = getInventory;
//# sourceMappingURL=InventoryController.js.map