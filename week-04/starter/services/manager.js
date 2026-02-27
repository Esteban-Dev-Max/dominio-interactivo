import { saveToStorage, loadFromStorage } from './storage.js';
import { AgriculturalEntity } from '../models/index.js';

export default class Manager {
  constructor() {
    this.entities = loadFromStorage();
  }

  addEntity({ name, quantity, category }) {
    const entity = new AgriculturalEntity({ name, quantity, category });
    this.entities.push(entity);
    saveToStorage(this.entities);
  }

  deleteEntity(id) {
    this.entities = this.entities.filter(({ id: entityId }) => entityId !== id);
    saveToStorage(this.entities);
  }

  search(query) {
    return this.entities.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getAll() {
    return this.entities;
  }
}