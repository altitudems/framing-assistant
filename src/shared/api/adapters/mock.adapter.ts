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

// Mock data for development/demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Sample House Project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    archived: false,
    walls: [
      {
        id: 'wall-1',
        projectId: '1',
        name: 'North Wall',
        length: 20,
        height: 9,
        studSpacing: '16',
        topPlate: 'double',
        bottomPlate: 'standard',
        loadBearing: true,
        bottomPlateTreatment: 'none',
        leftCorner: 'california',
        rightCorner: 'california',
      },
    ],
  },
  {
    id: '2',
    name: 'Garage Addition',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    archived: false,
    walls: [],
  },
];

const mockPricingConfig: PricingConfig = {
  studUnitCost: 3.5,
  plateUnitCost: 3.5,
  pressureTreatedPlateCost: 4.25,
};

// Simulate network delay
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockApiClient implements ApiClient {
  private projects: Project[] = [...mockProjects];
  private pricingConfig: PricingConfig = { ...mockPricingConfig };

  async getProjects(): Promise<ApiListResponse<Project>> {
    await delay();
    return {
      data: this.projects.filter((p) => !p.archived),
      success: true,
      total: this.projects.length,
    };
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    await delay();
    const project = this.projects.find((p) => p.id === id);
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
  }

  async createProject(request: CreateProjectRequest): Promise<ApiResponse<Project>> {
    await delay();
    const project: Project = {
      id: crypto.randomUUID(),
      name: request.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      walls: [],
    };
    this.projects.push(project);
    return {
      data: project,
      success: true,
    };
  }

  async updateProject(id: string, request: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    await delay();
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return {
        data: null as unknown as Project,
        success: false,
        error: 'Project not found',
      };
    }

    this.projects[index] = {
      ...this.projects[index],
      ...request,
      updatedAt: new Date().toISOString(),
    };

    return {
      data: this.projects[index],
      success: true,
    };
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    await delay();
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return {
        data: undefined as void,
        success: false,
        error: 'Project not found',
      };
    }

    this.projects.splice(index, 1);
    return {
      data: undefined as void,
      success: true,
    };
  }

  async duplicateProject(id: string): Promise<ApiResponse<Project>> {
    await delay();
    const original = this.projects.find((p) => p.id === id);
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
        projectId: crypto.randomUUID(),
      })),
    };

    this.projects.push(duplicated);
    return {
      data: duplicated,
      success: true,
    };
  }

  async getWalls(projectId: string): Promise<ApiListResponse<Wall>> {
    await delay();
    const project = this.projects.find((p) => p.id === projectId);
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
  }

  async getWall(projectId: string, wallId: string): Promise<ApiResponse<Wall>> {
    await delay();
    const project = this.projects.find((p) => p.id === projectId);
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
  }

  async createWall(projectId: string, request: CreateWallRequest): Promise<ApiResponse<Wall>> {
    await delay();
    const project = this.projects.find((p) => p.id === projectId);
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

    project.walls.push(wall);
    project.updatedAt = new Date().toISOString();

    return {
      data: wall,
      success: true,
    };
  }

  async updateWall(
    projectId: string,
    wallId: string,
    request: UpdateWallRequest,
  ): Promise<ApiResponse<Wall>> {
    await delay();
    const project = this.projects.find((p) => p.id === projectId);
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

    project.walls[wallIndex] = {
      ...project.walls[wallIndex],
      ...request,
    };
    project.updatedAt = new Date().toISOString();

    return {
      data: project.walls[wallIndex],
      success: true,
    };
  }

  async deleteWall(projectId: string, wallId: string): Promise<ApiResponse<void>> {
    await delay();
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) {
      return {
        data: undefined as void,
        success: false,
        error: 'Project not found',
      };
    }

    const wallIndex = project.walls.findIndex((w) => w.id === wallId);
    if (wallIndex === -1) {
      return {
        data: undefined as void,
        success: false,
        error: 'Wall not found',
      };
    }

    project.walls.splice(wallIndex, 1);
    project.updatedAt = new Date().toISOString();

    return {
      data: undefined as void,
      success: true,
    };
  }

  async getPricingConfig(): Promise<ApiResponse<PricingConfig>> {
    await delay(100);
    return {
      data: this.pricingConfig,
      success: true,
    };
  }

  async updatePricingConfig(config: Partial<PricingConfig>): Promise<ApiResponse<PricingConfig>> {
    await delay();
    this.pricingConfig = { ...this.pricingConfig, ...config };
    return {
      data: this.pricingConfig,
      success: true,
    };
  }
}
