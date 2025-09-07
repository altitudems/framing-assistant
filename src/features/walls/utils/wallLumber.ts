/**
 * Calculates the number of studs needed based on wall height and stud length
 */
export function calculateStudsNeeded(
  totalStuds: number,
  wallHeight: number,
  studLength: number,
): number {
  const studsPerPiece = studLength >= wallHeight ? Math.floor(studLength / wallHeight) : 1;
  return studLength >= wallHeight
    ? Math.ceil(totalStuds / studsPerPiece)
    : Math.ceil((totalStuds * wallHeight) / studLength);
}

/**
 * Calculates the number of plates needed based on wall length and plate length
 */
export function calculatePlatesNeeded(
  totalPlates: number,
  wallLength: number,
  plateLength: number,
): number {
  const platesPerPiece = plateLength >= wallLength ? Math.floor(plateLength / wallLength) : 1;
  return plateLength >= wallLength
    ? Math.ceil(totalPlates / platesPerPiece)
    : Math.ceil((totalPlates * wallLength) / plateLength);
}

/**
 * Calculates total linear feet of lumber needed
 */
export function calculateTotalLinearFeet(studLinearFeet: number, plateLinearFeet: number): number {
  return studLinearFeet + plateLinearFeet;
}

/**
 * Calculates linear feet for studs
 */
export function calculateStudLinearFeet(studsNeeded: number, studLength: number): number {
  return studsNeeded * studLength;
}

/**
 * Calculates linear feet for plates
 */
export function calculatePlateLinearFeet(platesNeeded: number, plateLength: number): number {
  return platesNeeded * plateLength;
}
