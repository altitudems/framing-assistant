import { useMemo } from 'react';
import { useApiClient } from './useApiClient';
import { ProjectService, WallService, PricingService } from '../services';

/**
 * Hook to access all domain services.
 * Services are memoized to prevent unnecessary re-creation.
 */
export function useServices() {
  const api = useApiClient();

  return useMemo(
    () => ({
      projects: new ProjectService(api),
      walls: new WallService(api),
      pricing: new PricingService(api),
    }),
    [api],
  );
}

/**
 * Hook to access a specific service.
 */
export function useProjectService() {
  const api = useApiClient();
  return useMemo(() => new ProjectService(api), [api]);
}

export function useWallService() {
  const api = useApiClient();
  return useMemo(() => new WallService(api), [api]);
}

export function usePricingService() {
  const api = useApiClient();
  return useMemo(() => new PricingService(api), [api]);
}
