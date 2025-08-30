import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useWallManager } from './useWallManager';
import { useProjectStore } from '../../../app/store/projectStore';

describe('useWallManager', () => {
  beforeEach(() => {
    localStorage.clear();
    useProjectStore.setState({ projects: {} });
  });

  it('adds and removes walls', async () => {
    const project = await useProjectStore.getState().createProject('Walls');
    const { result } = renderHook(() => useWallManager(project.id));

    await act(async () => {
      await result.current.addWall({
        name: 'Wall A',
        length: 10,
        height: 8,
        studSpacing: '16',
        topPlate: 'double',
        bottomPlate: 'standard',
      });
    });

    expect(result.current.walls).toHaveLength(1);
    const wallId = result.current.walls[0].id;

    await act(async () => {
      await result.current.removeWall(wallId);
    });

    expect(result.current.walls).toHaveLength(0);
  });
});
