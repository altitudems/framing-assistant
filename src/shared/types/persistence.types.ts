export interface PersistenceAdapter {
  save: (key: string, data: unknown) => Promise<void>;
  load: (key: string) => Promise<unknown>;
  remove: (key: string) => Promise<void>;
  list: () => Promise<string[]>;
}
