import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useDuplicateProject,
} from './useProjects';
import { useUndoStore } from '../../../shared/store';
import type { CreateProjectRequest, UpdateProjectRequest } from '../../../shared/api';

export function useProjectManager() {
  const { data: projects = [], isLoading, error } = useProjects();
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const duplicateProjectMutation = useDuplicateProject();
  const { addAction } = useUndoStore();

  const handleCreate = async (values: CreateProjectRequest) => {
    try {
      const newProject = await createProjectMutation.mutateAsync(values);

      // Add undo action
      addAction({
        type: 'project',
        action: 'create',
        data: { projectId: newProject.id, values },
      });

      return newProject;
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  };

  const handleUpdate = async (id: string, values: UpdateProjectRequest) => {
    try {
      const updatedProject = await updateProjectMutation.mutateAsync({ id, request: values });

      // Add undo action
      addAction({
        type: 'project',
        action: 'update',
        data: { projectId: id, values },
      });

      return updatedProject;
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Store project data for undo
      const projectToDelete = projects.find((p) => p.id === id);
      if (projectToDelete) {
        addAction({
          type: 'project',
          action: 'delete',
          data: { projectId: id, project: projectToDelete },
        });
      }

      await deleteProjectMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const duplicatedProject = await duplicateProjectMutation.mutateAsync(id);

      // Add undo action
      addAction({
        type: 'project',
        action: 'create',
        data: { projectId: duplicatedProject.id, originalId: id },
      });

      return duplicatedProject;
    } catch (error) {
      console.error('Failed to duplicate project:', error);
      throw error;
    }
  };

  const handleArchive = async (id: string) => {
    return handleUpdate(id, { archived: true });
  };

  const handleUnarchive = async (id: string) => {
    return handleUpdate(id, { archived: false });
  };

  return {
    projects,
    isLoading,
    error,
    createProject: handleCreate,
    updateProject: handleUpdate,
    deleteProject: handleDelete,
    duplicateProject: handleDuplicate,
    archiveProject: handleArchive,
    unarchiveProject: handleUnarchive,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    isDeleting: deleteProjectMutation.isPending,
    isDuplicating: duplicateProjectMutation.isPending,
  };
}
