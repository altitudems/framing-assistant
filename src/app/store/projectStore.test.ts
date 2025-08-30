import { describe, expect, it, beforeEach } from 'vitest';
import { useProjectStore } from './projectStore';

describe('projectStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useProjectStore.setState({ projects: {} });
  });

  it('creates and loads projects', () => {
    const created = useProjectStore.getState().createProject('Test Project');
    expect(useProjectStore.getState().projects[created.id]).toBeTruthy();
    expect(localStorage.getItem(`framing-project-${created.id}`)).toBeTruthy();

    // reset state and reload from storage
    useProjectStore.setState({ projects: {} });
    useProjectStore.getState().loadProjects();
    expect(useProjectStore.getState().projects[created.id]?.name).toBe('Test Project');
  });
});
