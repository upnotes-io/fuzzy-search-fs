import { fuzzySearchFS } from '../src';
const mock = require('mock-fs');

describe('index', () => {
  describe('searchDirectory', () => {
    beforeEach(function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      mock({
        'path/to/fake/dir': {
          'some-file.txt': 'file content here',
          'empty-dir': {},
        },
        'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        'some/other/path': {},
      });
    });
    it('should return a single file', async function () {
      const results = await fuzzySearchFS('path/', 'file');
      expect(results).toStrictEqual(['path/to/fake/dir/some-file.txt']);
    });
    it('should return empty if does not match', async function () {
      const results = await fuzzySearchFS('path/', 'randomText');
      expect(results).toStrictEqual([]);
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    afterEach(mock.restore);
  });
});
