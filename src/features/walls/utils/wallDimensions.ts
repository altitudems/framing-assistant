import type { CreateWallRequest } from '../../../shared/api';

/**
 * Calculates the number of regular studs needed based on wall length and stud spacing
 */
export function calculateRegularStuds(lengthInches: number, spacing: number): number {
  return spacing > 0 ? Math.floor(lengthInches / spacing) + 1 : 0;
}

/**
 * Calculates the number of corner studs needed based on corner types
 */
export function calculateCornerStuds(
  leftCorner?: CreateWallRequest['leftCorner'],
  rightCorner?: CreateWallRequest['rightCorner'],
): {
  leftCornerStuds: number;
  rightCornerStuds: number;
  totalCornerStuds: number;
} {
  const leftCornerStuds =
    leftCorner === 'double'
      ? 2
      : leftCorner === 'three-stud'
        ? 3
        : leftCorner === 'california'
          ? 2
          : 0;

  const rightCornerStuds =
    rightCorner === 'double'
      ? 2
      : rightCorner === 'three-stud'
        ? 3
        : rightCorner === 'california'
          ? 2
          : 0;

  return {
    leftCornerStuds,
    rightCornerStuds,
    totalCornerStuds: leftCornerStuds + rightCornerStuds,
  };
}

/**
 * Calculates the total number of plates needed based on plate types
 */
export function calculatePlateCount(
  topPlate: CreateWallRequest['topPlate'],
  bottomPlate: CreateWallRequest['bottomPlate'],
): number {
  const topPlateCount = topPlate === 'double' ? 2 : 1;
  const bottomPlateCount = bottomPlate === 'floating' ? 2 : 1;
  return topPlateCount + bottomPlateCount;
}

/**
 * Converts feet to inches
 */
export function feetToInches(feet: number): number {
  return feet * 12;
}
