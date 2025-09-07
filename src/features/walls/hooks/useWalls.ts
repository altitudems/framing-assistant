import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../../shared/hooks/useApiClient';
import { projectKeys } from '../../projects/hooks/useProjects';
import type { CreateWallRequest, UpdateWallRequest } from '../../../shared/api';

// Query keys for walls
export const wallKeys = {
  all: ['walls'] as const,
  lists: () => [...wallKeys.all, 'list'] as const,
  list: (projectId: string) => [...wallKeys.lists(), projectId] as const,
  details: () => [...wallKeys.all, 'detail'] as const,
  detail: (projectId: string, wallId: string) =>
    [...wallKeys.details(), projectId, wallId] as const,
};

// Hooks for walls
export function useWalls(projectId: string) {
  const api = useApiClient();

  return useQuery({
    queryKey: wallKeys.list(projectId),
    queryFn: async () => {
      const response = await api.getWalls(projectId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch walls');
      }
      return response.data;
    },
    enabled: !!projectId,
  });
}

export function useWall(projectId: string, wallId: string) {
  const api = useApiClient();

  return useQuery({
    queryKey: wallKeys.detail(projectId, wallId),
    queryFn: async () => {
      const response = await api.getWall(projectId, wallId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch wall');
      }
      return response.data;
    },
    enabled: !!projectId && !!wallId,
  });
}

export function useCreateWall() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      request,
    }: {
      projectId: string;
      request: CreateWallRequest;
    }) => {
      const response = await api.createWall(projectId, request);
      if (!response.success) {
        throw new Error(response.error || 'Failed to create wall');
      }
      return response.data;
    },
    onSuccess: (_, { projectId }) => {
      // Invalidate walls list for this project
      queryClient.invalidateQueries({ queryKey: wallKeys.list(projectId) });
      // Update the project cache to include the new wall
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
    },
  });
}

export function useUpdateWall() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      wallId,
      request,
    }: {
      projectId: string;
      wallId: string;
      request: UpdateWallRequest;
    }) => {
      const response = await api.updateWall(projectId, wallId, request);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update wall');
      }
      return response.data;
    },
    onSuccess: (data, { projectId, wallId }) => {
      // Update the specific wall in cache
      queryClient.setQueryData(wallKeys.detail(projectId, wallId), data);
      // Invalidate walls list for this project
      queryClient.invalidateQueries({ queryKey: wallKeys.list(projectId) });
      // Update the project cache
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
    },
  });
}

export function useDeleteWall() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, wallId }: { projectId: string; wallId: string }) => {
      const response = await api.deleteWall(projectId, wallId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete wall');
      }
    },
    onSuccess: (_, { projectId, wallId }) => {
      // Remove the wall from cache
      queryClient.removeQueries({ queryKey: wallKeys.detail(projectId, wallId) });
      // Invalidate walls list for this project
      queryClient.invalidateQueries({ queryKey: wallKeys.list(projectId) });
      // Update the project cache
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
    },
  });
}
