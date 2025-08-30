import { create } from 'zustand';
import {
  PROJECT_STORAGE_PREFIX,
  localStorageAdapter,
} from '../../shared/utils/persistence/localStorage.adapter';
import type { Wall, WallInput } from '../../features/walls/types/Wall.types';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  walls: Wall[];
}

interface ProjectState {
  projects: Record<string, Project>;
  loadProjects: () => Promise<void>;
  createProject: (name: string) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (id: string) => Project | undefined;
  addWall: (projectId: string, wall: WallInput) => Promise<Wall>;
  removeWall: (projectId: string, wallId: string) => Promise<void>;
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
          projects[project.id] = { ...project, walls: project.walls ?? [] };
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
      walls: [],
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
  addWall: async (projectId, wallData) => {
    const project = get().projects[projectId];
    if (!project) {
      throw new Error('Project not found');
    }
    const id = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
    const wall: Wall = { id, projectId, ...wallData };
    const updatedProject: Project = {
      ...project,
      walls: [...project.walls, wall],
    };
    await localStorageAdapter.save(`${PROJECT_STORAGE_PREFIX}${projectId}`, updatedProject);
    set((state) => ({
      projects: { ...state.projects, [projectId]: updatedProject },
    }));
    return wall;
  },
  removeWall: async (projectId, wallId) => {
    const project = get().projects[projectId];
    if (!project) {
      return;
    }
    const updatedProject: Project = {
      ...project,
      walls: project.walls.filter((w) => w.id !== wallId),
    };
    await localStorageAdapter.save(`${PROJECT_STORAGE_PREFIX}${projectId}`, updatedProject);
    set((state) => ({
      projects: { ...state.projects, [projectId]: updatedProject },
    }));
  },
}));
