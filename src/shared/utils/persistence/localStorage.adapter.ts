import type { PersistenceAdapter } from '../../types/persistence.types';

export const PROJECT_STORAGE_PREFIX = 'framing-project-';

export const localStorageAdapter: PersistenceAdapter = {
  save: async (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load: async (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove: async (key) => {
    localStorage.removeItem(key);
  },
  list: async () => {
    return Object.keys(localStorage).filter((key) => key.startsWith(PROJECT_STORAGE_PREFIX));
  },
};
