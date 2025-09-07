import type { ApiClient } from '../api';
import type { Wall, CreateWallRequest, UpdateWallRequest } from '../api/types';

export class WallService {
  private api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async getWalls(projectId: string): Promise<Wall[]> {
    const response = await this.api.getWalls(projectId);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch walls');
    }
    return response.data;
  }

  async getWall(projectId: string, wallId: string): Promise<Wall> {
    const response = await this.api.getWall(projectId, wallId);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch wall');
    }
    return response.data;
  }

  async createWall(projectId: string, request: CreateWallRequest): Promise<Wall> {
    // Business logic validation
    const validation = this.validateWallRequest(request);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const response = await this.api.createWall(projectId, request);
    if (!response.success) {
      throw new Error(response.error || 'Failed to create wall');
    }
    return response.data;
  }

  async updateWall(projectId: string, wallId: string, request: UpdateWallRequest): Promise<Wall> {
    // Business logic validation
    const validation = this.validateWallRequest(request);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const response = await this.api.updateWall(projectId, wallId, request);
    if (!response.success) {
      throw new Error(response.error || 'Failed to update wall');
    }
    return response.data;
  }

  async deleteWall(projectId: string, wallId: string): Promise<void> {
    const response = await this.api.deleteWall(projectId, wallId);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete wall');
    }
  }

  // Business logic methods
  private validateWallRequest(request: CreateWallRequest | UpdateWallRequest): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (request.name !== undefined) {
      if (!request.name?.trim()) {
        errors.push('Wall name is required');
      }
      if (request.name && request.name.length > 50) {
        errors.push('Wall name must be less than 50 characters');
      }
    }

    if (request.length !== undefined) {
      if (request.length <= 0) {
        errors.push('Wall length must be positive');
      }
      if (request.length > 100) {
        errors.push('Wall length must be less than 100 feet');
      }
    }

    if (request.height !== undefined) {
      if (request.height <= 0) {
        errors.push('Wall height must be positive');
      }
      if (request.height > 20) {
        errors.push('Wall height must be less than 20 feet');
      }
    }

    if (request.floorGap !== undefined && request.floorGap < 0) {
      errors.push('Floor gap cannot be negative');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async calculateWallMaterials() {
    // This would integrate with your existing calculation engines
    // For now, returning a placeholder structure
    return {
      studs: {
        regular: 0,
        corner: 0,
        total: 0,
      },
      plates: {
        top: 0,
        bottom: 0,
        total: 0,
      },
      lumber: {
        studsNeeded: 0,
        platesNeeded: 0,
        totalLinearFeet: 0,
      },
      costs: {
        studCost: 0,
        plateCost: 0,
        totalCost: 0,
      },
    };
  }

  async validateWall(wall: Wall): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!wall.name?.trim()) {
      errors.push('Wall name is required');
    }

    if (wall.length <= 0) {
      errors.push('Wall length must be positive');
    }

    if (wall.height <= 0) {
      errors.push('Wall height must be positive');
    }

    if (wall.floorGap !== undefined && wall.floorGap < 0) {
      errors.push('Floor gap cannot be negative');
    }

    // Business rules
    if (wall.loadBearing && wall.studSpacing === '24') {
      errors.push('Load bearing walls cannot use 24" stud spacing');
    }

    if (wall.bottomPlate === 'floating' && wall.floorGap === undefined) {
      errors.push('Floor gap is required for floating bottom plates');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async getWallPresets() {
    return {
      loadBearing: {
        name: 'Load Bearing Wall',
        studSpacing: '16' as const,
        topPlate: 'double' as const,
        bottomPlate: 'standard' as const,
        loadBearing: true,
        bottomPlateTreatment: 'none' as const,
        leftCorner: 'california' as const,
        rightCorner: 'california' as const,
      },
      nonLoadBearing: {
        name: 'Non-Load Bearing Wall',
        studSpacing: '16' as const,
        topPlate: 'single' as const,
        bottomPlate: 'standard' as const,
        loadBearing: false,
        bottomPlateTreatment: 'none' as const,
        leftCorner: 'california' as const,
        rightCorner: undefined,
      },
      basementFloating: {
        name: 'Basement Floating Wall',
        studSpacing: '16' as const,
        topPlate: 'single' as const,
        bottomPlate: 'floating' as const,
        loadBearing: false,
        bottomPlateTreatment: 'pressure-treated' as const,
        floorGap: 2,
        leftCorner: 'california' as const,
        rightCorner: 'california' as const,
      },
    };
  }
}
