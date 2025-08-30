import { useProjectStore } from '../../../app/store/projectStore';
import type { WallFormValues } from '../types/WallForm.types';

export const useWallManager = (projectId: string) => {
  const { projects, addWall, removeWall } = useProjectStore();
  const walls = projects[projectId]?.walls ?? [];

  const handleAdd = async (values: WallFormValues) => {
    await addWall(projectId, values);
  };

  const handleRemove = async (wallId: string) => {
    await removeWall(projectId, wallId);
  };

  return { walls, addWall: handleAdd, removeWall: handleRemove };
};
