export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  archived?: boolean;
  walls: Wall[];
}

export interface Wall {
  id: string;
  projectId: string;
  name: string;
  length: number;
  height: number;
  studSpacing: '12' | '16' | '24';
  topPlate: 'single' | 'double';
  bottomPlate: 'standard' | 'floating';
  loadBearing: boolean;
  bottomPlateTreatment: 'none' | 'pressure-treated';
  leftCorner?: 'california' | 'double' | 'three-stud';
  rightCorner?: 'california' | 'double' | 'three-stud';
  floorGap?: number;
}

export interface PricingConfig {
  studUnitCost: number;
  plateUnitCost: number;
  pressureTreatedPlateCost: number;
}

export interface CreateProjectRequest {
  name: string;
}

export interface UpdateProjectRequest {
  name?: string;
  archived?: boolean;
}

export interface CreateWallRequest {
  name: string;
  length: number;
  height: number;
  studSpacing: '12' | '16' | '24';
  topPlate: 'single' | 'double';
  bottomPlate: 'standard' | 'floating';
  loadBearing: boolean;
  bottomPlateTreatment: 'none' | 'pressure-treated';
  leftCorner?: 'california' | 'double' | 'three-stud';
  rightCorner?: 'california' | 'double' | 'three-stud';
  floorGap?: number;
}

export type UpdateWallRequest = Partial<CreateWallRequest>;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  success: boolean;
  error?: string;
  total?: number;
}
