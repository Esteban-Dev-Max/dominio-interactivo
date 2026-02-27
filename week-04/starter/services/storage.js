import { APP_CONFIG } from '../config.js';

export const saveToStorage = data =>
  localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(data));

export const loadFromStorage = () =>
  JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_KEY)) || [];