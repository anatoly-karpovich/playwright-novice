export function generateNumberInRange(min: number, max: number) {
  if (max < min) throw new Error("Max must be greater than min");
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
