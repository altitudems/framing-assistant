import type { ApiClient } from './client.interface';
import { MockApiClient } from './adapters/mock.adapter';
import { OfflineApiClient } from './adapters/offline.adapter';
import { LiveApiClient } from './adapters/live.adapter';

export type ApiMode = 'mock' | 'offline' | 'live';

export interface ApiConfig {
  mode: ApiMode;
  baseUrl?: string;
}

export function createApiClient(config: ApiConfig): ApiClient {
  switch (config.mode) {
    case 'mock':
      return new MockApiClient();
    case 'offline':
      return new OfflineApiClient();
    case 'live':
      return new LiveApiClient(config.baseUrl);
    default:
      throw new Error(`Unknown API mode: ${config.mode}`);
  }
}

// Default configuration - can be overridden via environment variables
export const defaultApiConfig: ApiConfig = {
  mode: (import.meta.env.VITE_API_MODE as ApiMode) || 'offline',
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
};

// Singleton instance
let apiClientInstance: ApiClient | null = null;

export function getApiClient(config?: Partial<ApiConfig>): ApiClient {
  if (!apiClientInstance || config) {
    const finalConfig = { ...defaultApiConfig, ...config };
    apiClientInstance = createApiClient(finalConfig);
  }
  return apiClientInstance;
}
