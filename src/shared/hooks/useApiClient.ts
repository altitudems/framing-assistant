import { useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import type { ApiClient } from '../api';

export function useApiClient(): ApiClient {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiClient must be used within an ApiProvider');
  }
  return context.api;
}
