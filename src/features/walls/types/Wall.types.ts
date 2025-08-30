export interface WallSpecs {
  name: string;
  length: number;
  height: number;
  studSpacing: '16' | '24';
  topPlate: 'single' | 'double';
  bottomPlate: 'standard' | 'floating' | 'pressure-treated';
  floorGap?: number;
  loadBearing?: boolean;
  bottomPlateTreatment?: 'none' | 'pressure-treated';
  leftCorner?: 'double' | 'three-stud' | 'california';
  rightCorner?: 'double' | 'three-stud' | 'california';
}

export interface Wall extends WallSpecs {
  id: string;
  projectId: string;
}

export type WallInput = WallSpecs;
