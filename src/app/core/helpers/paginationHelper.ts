export const getPaginationData = <T>(page: number, perPage: number, arrayData: T[]): T[] => {
  const start = (page - 1) * perPage;

  if (start >= arrayData.length || page < 1) {
    return arrayData;
  }

  const end = start + perPage;
  return arrayData.slice(start, end);
};
