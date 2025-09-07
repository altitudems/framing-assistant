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

export class LiveApiClient implements ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: null as T,
          success: false,
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  private async requestList<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiListResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          data: [],
          success: false,
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        data: Array.isArray(data) ? data : data.items || [],
        success: true,
        total: data.total,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  async getProjects(): Promise<ApiListResponse<Project>> {
    return this.requestList<Project>('/projects');
  }

  async getProject(id: string): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}`);
  }

  async createProject(request: CreateProjectRequest): Promise<ApiResponse<Project>> {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateProject(id: string, request: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async deleteProject(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  async duplicateProject(id: string): Promise<ApiResponse<Project>> {
    return this.request<Project>(`/projects/${id}/duplicate`, {
      method: 'POST',
    });
  }

  async getWalls(projectId: string): Promise<ApiListResponse<Wall>> {
    return this.requestList<Wall>(`/projects/${projectId}/walls`);
  }

  async getWall(projectId: string, wallId: string): Promise<ApiResponse<Wall>> {
    return this.request<Wall>(`/projects/${projectId}/walls/${wallId}`);
  }

  async createWall(projectId: string, request: CreateWallRequest): Promise<ApiResponse<Wall>> {
    return this.request<Wall>(`/projects/${projectId}/walls`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async updateWall(
    projectId: string,
    wallId: string,
    request: UpdateWallRequest,
  ): Promise<ApiResponse<Wall>> {
    return this.request<Wall>(`/projects/${projectId}/walls/${wallId}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  }

  async deleteWall(projectId: string, wallId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/projects/${projectId}/walls/${wallId}`, {
      method: 'DELETE',
    });
  }

  async getPricingConfig(): Promise<ApiResponse<PricingConfig>> {
    return this.request<PricingConfig>('/settings/pricing');
  }

  async updatePricingConfig(config: Partial<PricingConfig>): Promise<ApiResponse<PricingConfig>> {
    return this.request<PricingConfig>('/settings/pricing', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }
}
