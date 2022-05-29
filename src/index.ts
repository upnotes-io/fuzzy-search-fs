type FuzzySearchFSProps = {
  caseSensitive?: boolean;
};
export const fuzzySearchFS = (
  path: string,
  searchText: string,
  options?: FuzzySearchFSProps
): string[] => {
  console.log(path, searchText, options);
  return [];
};
