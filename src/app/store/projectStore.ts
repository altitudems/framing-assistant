import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  createdAt: string;
}

interface ProjectState {
  projects: Record<string, Project>;
  loadProjects: () => void;
  createProject: (name: string) => Project;
  getProject: (id: string) => Project | undefined;
}

const STORAGE_PREFIX = 'framing-project-';

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: {},
  loadProjects: () => {
    const projects: Record<string, Project> = {};
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(STORAGE_PREFIX)) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const project = JSON.parse(raw) as Project;
            projects[project.id] = project;
          }
        } catch {
          /* ignore invalid entries */
        }
      }
    }
    set({ projects });
  },
  createProject: (name) => {
    const id = (globalThis.crypto?.randomUUID ?? (() => Math.random().toString(36).slice(2)))();
    const project: Project = { id, name, createdAt: new Date().toISOString() };
    localStorage.setItem(`${STORAGE_PREFIX}${id}`, JSON.stringify(project));
    set((state) => ({ projects: { ...state.projects, [id]: project } }));
    return project;
  },
  getProject: (id) => get().projects[id],
}));
