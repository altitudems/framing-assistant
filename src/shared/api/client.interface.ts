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
} from './types';

export interface ApiClient {
  // Projects
  getProjects(): Promise<ApiListResponse<Project>>;
  getProject(id: string): Promise<ApiResponse<Project>>;
  createProject(request: CreateProjectRequest): Promise<ApiResponse<Project>>;
  updateProject(id: string, request: UpdateProjectRequest): Promise<ApiResponse<Project>>;
  deleteProject(id: string): Promise<ApiResponse<void>>;
  duplicateProject(id: string): Promise<ApiResponse<Project>>;

  // Walls
  getWalls(projectId: string): Promise<ApiListResponse<Wall>>;
  getWall(projectId: string, wallId: string): Promise<ApiResponse<Wall>>;
  createWall(projectId: string, request: CreateWallRequest): Promise<ApiResponse<Wall>>;
  updateWall(
    projectId: string,
    wallId: string,
    request: UpdateWallRequest,
  ): Promise<ApiResponse<Wall>>;
  deleteWall(projectId: string, wallId: string): Promise<ApiResponse<void>>;

  // Settings
  getPricingConfig(): Promise<ApiResponse<PricingConfig>>;
  updatePricingConfig(config: Partial<PricingConfig>): Promise<ApiResponse<PricingConfig>>;
}
