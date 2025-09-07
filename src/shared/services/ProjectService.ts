import type { ApiClient } from '../api';
import type { Project, CreateProjectRequest, UpdateProjectRequest } from '../api/types';

export class ProjectService {
  private api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async getProjects(): Promise<Project[]> {
    const response = await this.api.getProjects();
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch projects');
    }
    return response.data;
  }

  async getProject(id: string): Promise<Project> {
    const response = await this.api.getProject(id);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch project');
    }
    return response.data;
  }

  async createProject(request: CreateProjectRequest): Promise<Project> {
    // Business logic validation
    if (!request.name?.trim()) {
      throw new Error('Project name is required');
    }

    if (request.name.length > 100) {
      throw new Error('Project name must be less than 100 characters');
    }

    const response = await this.api.createProject(request);
    if (!response.success) {
      throw new Error(response.error || 'Failed to create project');
    }
    return response.data;
  }

  async updateProject(id: string, request: UpdateProjectRequest): Promise<Project> {
    // Business logic validation
    if (request.name !== undefined) {
      if (!request.name?.trim()) {
        throw new Error('Project name is required');
      }
      if (request.name.length > 100) {
        throw new Error('Project name must be less than 100 characters');
      }
    }

    const response = await this.api.updateProject(id, request);
    if (!response.success) {
      throw new Error(response.error || 'Failed to update project');
    }
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    const response = await this.api.deleteProject(id);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete project');
    }
  }

  async duplicateProject(id: string): Promise<Project> {
    const response = await this.api.duplicateProject(id);
    if (!response.success) {
      throw new Error(response.error || 'Failed to duplicate project');
    }
    return response.data;
  }

  async archiveProject(id: string): Promise<Project> {
    return this.updateProject(id, { archived: true });
  }

  async unarchiveProject(id: string): Promise<Project> {
    return this.updateProject(id, { archived: false });
  }

  // Business logic methods
  async getProjectStats(project: Project) {
    return {
      wallCount: project.walls.length,
      totalLinearFeet: project.walls.reduce((sum, wall) => sum + wall.length, 0),
      averageWallHeight:
        project.walls.length > 0
          ? project.walls.reduce((sum, wall) => sum + wall.height, 0) / project.walls.length
          : 0,
      loadBearingWalls: project.walls.filter((wall) => wall.loadBearing).length,
    };
  }

  async validateProject(project: Project): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!project.name?.trim()) {
      errors.push('Project name is required');
    }

    if (project.name && project.name.length > 100) {
      errors.push('Project name must be less than 100 characters');
    }

    // Validate walls
    for (const wall of project.walls) {
      if (!wall.name?.trim()) {
        errors.push(`Wall name is required for wall ${wall.id}`);
      }
      if (wall.length <= 0) {
        errors.push(`Wall length must be positive for wall ${wall.name}`);
      }
      if (wall.height <= 0) {
        errors.push(`Wall height must be positive for wall ${wall.name}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
