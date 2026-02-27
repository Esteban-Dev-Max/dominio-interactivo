import { CATEGORIES } from '../config.js';

export default class AgriculturalEntity {
  constructor({ name, quantity = 0, category }) {
    this.id = Date.now();
    this.name = name;
    this.quantity = quantity;
    this.category = category;
  }

  get categoryInfo() {
    return CATEGORIES[this.category.toUpperCase()];
  }
}