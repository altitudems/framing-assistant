import { createContext } from 'react';
import type { ApiClient } from '../api';

interface ApiContextValue {
  api: ApiClient;
}

export const ApiContext = createContext<ApiContextValue | null>(null);
