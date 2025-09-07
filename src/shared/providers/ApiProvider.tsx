import type { ReactNode } from 'react';
import type { ApiClient } from '../api';
import { getApiClient } from '../api/client.factory';
import { ApiContext } from '../contexts/ApiContext';

interface ApiProviderProps {
  children: ReactNode;
  api?: ApiClient;
}

export function ApiProvider({ children, api }: ApiProviderProps) {
  const apiClient = api || getApiClient();

  return <ApiContext.Provider value={{ api: apiClient }}>{children}</ApiContext.Provider>;
}
