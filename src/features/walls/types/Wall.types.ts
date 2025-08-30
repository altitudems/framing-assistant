export interface Wall {
  id: string;
  projectId: string;
  name: string;
  length: number;
  height: number;
  studSpacing: '16' | '24';
  topPlate: 'single' | 'double';
  bottomPlate: 'standard' | 'floating' | 'pressure-treated';
  floorGap?: number;
}
