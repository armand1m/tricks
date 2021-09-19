export function pop<T>(array: readonly T[]) {
  return array.filter((_, index) => {
    return index < array.length - 1;
  });
}
