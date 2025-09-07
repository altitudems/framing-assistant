export function feetToFeetInches(valueFt: number): string {
  const totalIn = Math.round(valueFt * 12);
  const ft = Math.floor(totalIn / 12);
  const inches = totalIn % 12;
  return `${ft}′-${inches}″`;
}
