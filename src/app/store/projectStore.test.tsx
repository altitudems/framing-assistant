import { describe, expect, it, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { useProjectStore } from './projectStore';

describe('projectStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useProjectStore.setState({ projects: {} });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

  it('uses bound crypto.randomUUID when available', () => {
    const randomUUID = vi.fn(function (this: unknown) {
      return '123e4567-e89b-12d3-a456-426614174000';
    }) as unknown as Crypto['randomUUID'] & Mock;
    const cryptoMock: Pick<Crypto, 'randomUUID'> = {
      randomUUID,
    };
    vi.stubGlobal('crypto', cryptoMock as Crypto);

    const created = useProjectStore.getState().createProject('Test Project');
    expect(created.id).toBe('123e4567-e89b-12d3-a456-426614174000');
    expect(randomUUID).toHaveBeenCalled();
    expect(randomUUID.mock.instances[0]).toBe(cryptoMock);
  });
});
