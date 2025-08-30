import { beforeEach, describe, expect, it } from 'vitest';
import { useProjectStore } from './projectStore';

describe('projectStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useProjectStore.setState({ projects: {} });
  });

  it('creates, loads, and deletes projects', async () => {
    const created = await useProjectStore.getState().createProject('Test Project');
    expect(useProjectStore.getState().projects[created.id]).toBeTruthy();
    expect(localStorage.getItem(`framing-project-${created.id}`)).toBeTruthy();

    // reset state and reload from storage
    useProjectStore.setState({ projects: {} });
    await useProjectStore.getState().loadProjects();
    expect(useProjectStore.getState().projects[created.id]?.name).toBe('Test Project');

    await useProjectStore.getState().deleteProject(created.id);
    expect(useProjectStore.getState().projects[created.id]).toBeUndefined();
    expect(localStorage.getItem(`framing-project-${created.id}`)).toBeNull();
  });

  it('adds and removes walls from a project', async () => {
    const project = await useProjectStore.getState().createProject('Walls');
    const wall = await useProjectStore.getState().addWall(project.id, {
      name: 'Wall A',
      length: 10,
      height: 8,
      studSpacing: '16',
      topPlate: 'double',
      bottomPlate: 'standard',
    });
    expect(useProjectStore.getState().projects[project.id].walls).toHaveLength(1);
    await useProjectStore.getState().removeWall(project.id, wall.id);
    expect(useProjectStore.getState().projects[project.id].walls).toHaveLength(0);
  });
});
