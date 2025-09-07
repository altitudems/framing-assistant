// Export all API types and interfaces
export type {
  Project,
  Wall,
  PricingConfig,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateWallRequest,
  UpdateWallRequest,
  ApiResponse,
  ApiListResponse,
} from './types';

export type { ApiClient } from './client.interface';
export type { ApiMode, ApiConfig } from './client.factory';

// Export adapters
export { MockApiClient } from './adapters/mock.adapter';
export { OfflineApiClient } from './adapters/offline.adapter';
export { LiveApiClient } from './adapters/live.adapter';

// Export factory and utilities
export { createApiClient, getApiClient, defaultApiConfig } from './client.factory';
