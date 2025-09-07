import { useWalls, useCreateWall, useUpdateWall, useDeleteWall } from './useWalls';
import { useUndoStore } from '../../../shared/store';
import type { CreateWallRequest, UpdateWallRequest } from '../../../shared/api';

export function useWallManager(projectId: string) {
  const { data: walls = [], isLoading, error } = useWalls(projectId);
  const createWallMutation = useCreateWall();
  const updateWallMutation = useUpdateWall();
  const deleteWallMutation = useDeleteWall();
  const { addAction } = useUndoStore();

  const handleAdd = async (values: CreateWallRequest) => {
    try {
      const newWall = await createWallMutation.mutateAsync({ projectId, request: values });

      // Add undo action
      addAction({
        type: 'wall',
        action: 'create',
        data: { projectId, wallId: newWall.id, values },
      });

      return newWall;
    } catch (error) {
      console.error('Failed to create wall:', error);
      throw error;
    }
  };

  const handleUpdate = async (wallId: string, values: UpdateWallRequest) => {
    try {
      const updatedWall = await updateWallMutation.mutateAsync({
        projectId,
        wallId,
        request: values,
      });

      // Add undo action
      addAction({
        type: 'wall',
        action: 'update',
        data: { projectId, wallId, values },
      });

      return updatedWall;
    } catch (error) {
      console.error('Failed to update wall:', error);
      throw error;
    }
  };

  const handleRemove = async (wallId: string) => {
    try {
      // Store wall data for undo
      const wallToDelete = walls.find((w) => w.id === wallId);
      if (wallToDelete) {
        addAction({
          type: 'wall',
          action: 'delete',
          data: { projectId, wallId, wall: wallToDelete },
        });
      }

      await deleteWallMutation.mutateAsync({ projectId, wallId });
    } catch (error) {
      console.error('Failed to delete wall:', error);
      throw error;
    }
  };

  return {
    walls,
    isLoading,
    error,
    addWall: handleAdd,
    updateWall: handleUpdate,
    removeWall: handleRemove,
    isCreating: createWallMutation.isPending,
    isUpdating: updateWallMutation.isPending,
    isDeleting: deleteWallMutation.isPending,
  };
}
