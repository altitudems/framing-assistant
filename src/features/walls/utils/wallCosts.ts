/**
 * Calculates the total cost of studs
 */
export function calculateStudCost(studsNeeded: number, studUnitCost: number): number {
  return studsNeeded * studUnitCost;
}

/**
 * Calculates the total cost of plates
 */
export function calculatePlateCost(
  platesNeeded: number,
  plateUnitCost: number,
  isFloatingWall: boolean,
  isPressureTreated: boolean,
  pressureTreatedPlateCost: number,
): number {
  if (isFloatingWall && isPressureTreated) {
    const pressureTreatedPlates = Math.ceil(platesNeeded / 2); // Half are pressure-treated
    const regularPlates = platesNeeded - pressureTreatedPlates;
    return pressureTreatedPlates * pressureTreatedPlateCost + regularPlates * plateUnitCost;
  }
  return platesNeeded * plateUnitCost;
}

/**
 * Calculates the total cost of lumber
 */
export function calculateTotalCost(studCost: number, plateCost: number): number {
  return studCost + plateCost;
}
