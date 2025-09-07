import type { ApiClient } from '../api';
import type { PricingConfig } from '../api/types';

export class PricingService {
  private api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async getPricingConfig(): Promise<PricingConfig> {
    const response = await this.api.getPricingConfig();
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch pricing config');
    }
    return response.data;
  }

  async updatePricingConfig(config: Partial<PricingConfig>): Promise<PricingConfig> {
    // Business logic validation
    const validation = this.validatePricingConfig(config);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const response = await this.api.updatePricingConfig(config);
    if (!response.success) {
      throw new Error(response.error || 'Failed to update pricing config');
    }
    return response.data;
  }

  // Business logic methods
  private validatePricingConfig(config: Partial<PricingConfig>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (config.studUnitCost !== undefined) {
      if (config.studUnitCost < 0) {
        errors.push('Stud unit cost cannot be negative');
      }
      if (config.studUnitCost > 100) {
        errors.push('Stud unit cost seems unreasonably high');
      }
    }

    if (config.plateUnitCost !== undefined) {
      if (config.plateUnitCost < 0) {
        errors.push('Plate unit cost cannot be negative');
      }
      if (config.plateUnitCost > 100) {
        errors.push('Plate unit cost seems unreasonably high');
      }
    }

    if (config.pressureTreatedPlateCost !== undefined) {
      if (config.pressureTreatedPlateCost < 0) {
        errors.push('Pressure treated plate cost cannot be negative');
      }
      if (config.pressureTreatedPlateCost > 100) {
        errors.push('Pressure treated plate cost seems unreasonably high');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async calculateWallCost(): Promise<number> {
    // This would integrate with your existing cost calculation logic
    // For now, returning a placeholder calculation
    const studCost = 0; // Calculate based on wall dimensions and pricing
    const plateCost = 0; // Calculate based on wall dimensions and pricing

    return studCost + plateCost;
  }

  async getDefaultPricingConfig(): Promise<PricingConfig> {
    return {
      studUnitCost: 3.5,
      plateUnitCost: 3.5,
      pressureTreatedPlateCost: 4.25,
    };
  }

  async getRegionalPricingPresets(): Promise<Record<string, PricingConfig>> {
    return {
      'US-Northeast': {
        studUnitCost: 4.2,
        plateUnitCost: 4.2,
        pressureTreatedPlateCost: 5.1,
      },
      'US-Southwest': {
        studUnitCost: 3.1,
        plateUnitCost: 3.1,
        pressureTreatedPlateCost: 3.8,
      },
      'US-West': {
        studUnitCost: 3.8,
        plateUnitCost: 3.8,
        pressureTreatedPlateCost: 4.6,
      },
      'US-Midwest': {
        studUnitCost: 3.3,
        plateUnitCost: 3.3,
        pressureTreatedPlateCost: 4.0,
      },
    };
  }
}
