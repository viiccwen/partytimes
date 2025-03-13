export const ToggleBlockSelection = (prev: Set<string>, block_key: string) => {
  const newSet = new Set(prev);
  newSet.has(block_key) ? newSet.delete(block_key) : newSet.add(block_key);
  return newSet;
};

export const ToggleBlockSchedule = (
  prev: Set<string>,
  col: number,
  row: number,
) => {
  const block_key = `${col}-${row}`;
  const newSet = new Set<string>();

  Array.from(prev).forEach((key) => {
    const [prevCol] = key.split("-").map(Number);
    if (prevCol === col) newSet.add(key);
  });

  newSet.has(block_key) ? newSet.delete(block_key) : newSet.add(block_key);
  return newSet;
};
