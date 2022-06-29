import { promises as fsPromises } from 'fs';
import path from 'path';

type FuzzySearchFSProps = {
  caseSensitive?: boolean;
};
export const indexPath = (path: string, indexStoragePath: string): void => {
  return;
};
export const fuzzySearchFS = async (
  rootPath: string,
  searchText: string,
  options?: FuzzySearchFSProps
): Promise<string[]> => {
  if (!options) {
    options = {};
  }
  const results: string[] | PromiseLike<string[]> = [];
  const stats = await fsPromises.stat(rootPath);
  if (stats.isFile()) {
    const fileContent = await fsPromises.readFile(rootPath, 'utf8');
    if (options.caseSensitive) {
      searchText = searchText.toLowerCase();
    }
    if (fileContent.includes(searchText)) {
      results.push(rootPath);
    }
  } else {
    // @ts-ignore
    if (rootPath.split(path.sep).pop().startsWith('.')) {
      return results;
    }
    console.log(rootPath, searchText, options);
    const paths = await fsPromises.readdir(rootPath);
    console.log('Paths:', paths);
    for (let i = 0; i < paths.length; i++) {
      const returnedResults = await fuzzySearchFS(
        path.join(rootPath, paths[i]),
        searchText,
        options
      );
      returnedResults.forEach(r => results.push(r));
    }
  }
  return results;
};
