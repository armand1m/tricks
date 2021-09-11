export function flat<T>(array: T[][]) {
  const empty: T[] = [];
  return empty.concat.apply([], array);
}
