import type { ApiClient } from '../client.interface';
import type {
  Project,
  Wall,
  PricingConfig,
  CreateProjectRequest,
  UpdateProjectRequest,
  CreateWallRequest,
  UpdateWallRequest,
  ApiResponse,
  ApiListResponse,
} from '../types';

const PROJECT_STORAGE_PREFIX = 'framing-project-';
const PRICING_STORAGE_KEY = 'framing-pricing';

export class OfflineApiClient implements ApiClient {
  private async saveToStorage(key: string, data: unknown): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      throw new Error('Failed to save data');
    }
  }

  private async loadFromStorage<T>(key: string): Promise<T | null> {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return null;
    }
  }

  private async removeFromStorage(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }

  private async listStorageKeys(): Promise<string[]> {
    try {
      return Object.keys(localStorage).filter((key) => key.startsWith(PROJECT_STORAGE_PREFIX));
    } catch (error) {
      console.error('Failed to list localStorage keys:', error);
      return [];
    }
  }

  async getProjects(): Promise<ApiListResponse<Project>> {
    try {
      const keys = await this.listStorageKeys();
      const projects: Project[] = [];

      for (const key of keys) {
        const project = await this.loadFromStorage<Project>(key);
        if (project && !project.archived) {
          projects.push(project);
        }
      }

      return {
        data: projects,
        success: true,
        total: projects.length,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load projects',
      };
    }
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${id}`);
      if (!project) {
        return {
          data: null as unknown as Project,
          success: false,
          error: 'Project not found',
        };
      }

      return {
        data: project,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Project,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load project',
      };
    }
  }

  async createProject(request: CreateProjectRequest): Promise<ApiResponse<Project>> {
    try {
      const project: Project = {
        id: crypto.randomUUID(),
        name: request.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
        walls: [],
      };

      await this.saveToStorage(`${PROJECT_STORAGE_PREFIX}${project.id}`, project);

      return {
        data: project,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Project,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create project',
      };
    }
  }

  async updateProject(id: string, request: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${id}`);
      if (!project) {
        return {
          data: null as unknown as Project,
          success: false,
          error: 'Project not found',
        };
      }

      const updatedProject: Project = {
        ...project,
        ...request,
        updatedAt: new Date().toISOString(),
      };

      await this.saveToStorage(`${PROJECT_STORAGE_PREFIX}${id}`, updatedProject);

      return {
        data: updatedProject,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Project,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update project',
      };
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    try {
      await this.removeFromStorage(`${PROJECT_STORAGE_PREFIX}${id}`);
      return {
        data: undefined as void,
        success: true,
      };
    } catch (error) {
      return {
        data: undefined as void,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete project',
      };
    }
  }

  async duplicateProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const original = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${id}`);
      if (!original) {
        return {
          data: null as unknown as Project,
          success: false,
          error: 'Project not found',
        };
      }

      const duplicated: Project = {
        ...original,
        id: crypto.randomUUID(),
        name: `${original.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        archived: false,
        walls: original.walls.map((wall) => ({
          ...wall,
          id: crypto.randomUUID(),
          projectId: crypto.randomUUID(), // This will be updated to the new project ID below
        })),
      };

      // Update all walls to reference the new project ID
      duplicated.walls = duplicated.walls.map((wall) => ({
        ...wall,
        projectId: duplicated.id,
      }));

      await this.saveToStorage(`${PROJECT_STORAGE_PREFIX}${duplicated.id}`, duplicated);

      return {
        data: duplicated,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Project,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to duplicate project',
      };
    }
  }

  async getWalls(projectId: string): Promise<ApiListResponse<Wall>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${projectId}`);
      if (!project) {
        return {
          data: [],
          success: false,
          error: 'Project not found',
        };
      }

      return {
        data: project.walls,
        success: true,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load walls',
      };
    }
  }

  async getWall(projectId: string, wallId: string): Promise<ApiResponse<Wall>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${projectId}`);
      if (!project) {
        return {
          data: null as unknown as Wall,
          success: false,
          error: 'Project not found',
        };
      }

      const wall = project.walls.find((w) => w.id === wallId);
      if (!wall) {
        return {
          data: null as unknown as Wall,
          success: false,
          error: 'Wall not found',
        };
      }

      return {
        data: wall,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Wall,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load wall',
      };
    }
  }

  async createWall(projectId: string, request: CreateWallRequest): Promise<ApiResponse<Wall>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${projectId}`);
      if (!project) {
        return {
          data: null as unknown as Wall,
          success: false,
          error: 'Project not found',
        };
      }

      const wall: Wall = {
        id: crypto.randomUUID(),
        projectId,
        ...request,
      };

      const updatedProject: Project = {
        ...project,
        walls: [...project.walls, wall],
        updatedAt: new Date().toISOString(),
      };

      await this.saveToStorage(`${PROJECT_STORAGE_PREFIX}${projectId}`, updatedProject);

      return {
        data: wall,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Wall,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create wall',
      };
    }
  }

  async updateWall(
    projectId: string,
    wallId: string,
    request: UpdateWallRequest,
  ): Promise<ApiResponse<Wall>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${projectId}`);
      if (!project) {
        return {
          data: null as unknown as Wall,
          success: false,
          error: 'Project not found',
        };
      }

      const wallIndex = project.walls.findIndex((w) => w.id === wallId);
      if (wallIndex === -1) {
        return {
          data: null as unknown as Wall,
          success: false,
          error: 'Wall not found',
        };
      }

      const updatedWall: Wall = {
        ...project.walls[wallIndex],
        ...request,
      };

      const updatedProject: Project = {
        ...project,
        walls: project.walls.map((w, index) => (index === wallIndex ? updatedWall : w)),
        updatedAt: new Date().toISOString(),
      };

      await this.saveToStorage(`${PROJECT_STORAGE_PREFIX}${projectId}`, updatedProject);

      return {
        data: updatedWall,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as Wall,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update wall',
      };
    }
  }

  async deleteWall(projectId: string, wallId: string): Promise<ApiResponse<void>> {
    try {
      const project = await this.loadFromStorage<Project>(`${PROJECT_STORAGE_PREFIX}${projectId}`);
      if (!project) {
        return {
          data: undefined as void,
          success: false,
          error: 'Project not found',
        };
      }

      const updatedProject: Project = {
        ...project,
        walls: project.walls.filter((w) => w.id !== wallId),
        updatedAt: new Date().toISOString(),
      };

      await this.saveToStorage(`${PROJECT_STORAGE_PREFIX}${projectId}`, updatedProject);

      return {
        data: undefined as void,
        success: true,
      };
    } catch (error) {
      return {
        data: undefined as void,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete wall',
      };
    }
  }

  async getPricingConfig(): Promise<ApiResponse<PricingConfig>> {
    try {
      const config = await this.loadFromStorage<PricingConfig>(PRICING_STORAGE_KEY);
      const defaultConfig: PricingConfig = {
        studUnitCost: 3.5,
        plateUnitCost: 3.5,
        pressureTreatedPlateCost: 4.25,
      };

      return {
        data: config || defaultConfig,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as PricingConfig,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load pricing config',
      };
    }
  }

  async updatePricingConfig(config: Partial<PricingConfig>): Promise<ApiResponse<PricingConfig>> {
    try {
      const currentConfig = await this.loadFromStorage<PricingConfig>(PRICING_STORAGE_KEY);
      const defaultConfig: PricingConfig = {
        studUnitCost: 3.5,
        plateUnitCost: 3.5,
        pressureTreatedPlateCost: 4.25,
      };

      const updatedConfig: PricingConfig = {
        ...defaultConfig,
        ...currentConfig,
        ...config,
      };

      await this.saveToStorage(PRICING_STORAGE_KEY, updatedConfig);

      return {
        data: updatedConfig,
        success: true,
      };
    } catch (error) {
      return {
        data: null as unknown as PricingConfig,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update pricing config',
      };
    }
  }
}
