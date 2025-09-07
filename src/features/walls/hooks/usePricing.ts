import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../../shared/hooks/useApiClient';
import type { PricingConfig } from '../../../shared/api';

// Query keys for pricing
export const pricingKeys = {
  all: ['pricing'] as const,
  config: () => [...pricingKeys.all, 'config'] as const,
};

// Hooks for pricing configuration
export function usePricingConfig() {
  const api = useApiClient();

  return useQuery({
    queryKey: pricingKeys.config(),
    queryFn: async () => {
      const response = await api.getPricingConfig();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch pricing config');
      }
      return response.data;
    },
    // Pricing config is relatively stable, so we can cache it longer
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function useUpdatePricingConfig() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: Partial<PricingConfig>) => {
      const response = await api.updatePricingConfig(config);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update pricing config');
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Update the pricing config in cache
      queryClient.setQueryData(pricingKeys.config(), data);
    },
  });
}
