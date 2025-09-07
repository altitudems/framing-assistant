import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../../shared/hooks/useApiClient';
import type { CreateProjectRequest, UpdateProjectRequest } from '../../../shared/api';

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Hooks for projects
export function useProjects() {
  const api = useApiClient();

  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: async () => {
      const response = await api.getProjects();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch projects');
      }
      return response.data;
    },
  });
}

export function useProject(id: string) {
  const api = useApiClient();

  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const response = await api.getProject(id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch project');
      }
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateProject() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateProjectRequest) => {
      const response = await api.createProject(request);
      if (!response.success) {
        throw new Error(response.error || 'Failed to create project');
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useUpdateProject() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, request }: { id: string; request: UpdateProjectRequest }) => {
      const response = await api.updateProject(id, request);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update project');
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Update the specific project in cache
      queryClient.setQueryData(projectKeys.detail(data.id), data);
      // Invalidate projects list to ensure consistency
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useDeleteProject() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.deleteProject(id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete project');
      }
    },
    onSuccess: (_, id) => {
      // Remove the project from cache
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) });
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useDuplicateProject() {
  const api = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.duplicateProject(id);
      if (!response.success) {
        throw new Error(response.error || 'Failed to duplicate project');
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate projects list to show the new duplicated project
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
