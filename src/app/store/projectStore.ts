import { create } from 'zustand';
import {
  PROJECT_STORAGE_PREFIX,
  localStorageAdapter,
} from '../../shared/utils/persistence/localStorage.adapter';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

interface ProjectState {
  projects: Record<string, Project>;
  loadProjects: () => Promise<void>;
  createProject: (name: string) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: {},
  loadProjects: async () => {
    const projects: Record<string, Project> = {};
    const keys = await localStorageAdapter.list();
    for (const key of keys) {
      try {
        const project = (await localStorageAdapter.load(key)) as Project | null;
        if (project) {
          projects[project.id] = project;
        }
      } catch {
        /* ignore invalid entries */
      }
    }
    set({ projects });
  },
  createProject: async (name) => {
    const id = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    const project: Project = {
      id,
      name,
      createdAt: new Date().toISOString(),
    };
    await localStorageAdapter.save(`${PROJECT_STORAGE_PREFIX}${id}`, project);
    set((state) => ({ projects: { ...state.projects, [id]: project } }));
    return project;
  },
  deleteProject: async (id) => {
    await localStorageAdapter.remove(`${PROJECT_STORAGE_PREFIX}${id}`);
    set((state) => {
      const updated = { ...state.projects };
      delete updated[id];
      return { projects: updated };
    });
  },
  getProject: (id) => get().projects[id],
}));
