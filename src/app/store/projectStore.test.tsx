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
});
