import checkOverflow from './checkOverflow';
import fillPage from './fillPage';

jest.mock('./checkOverflow');

test('', () => {
  checkOverflow.mockReturnValueOnce(false).mockReturnValueOnce(true);
  fillPage(['<p>', '</p>'], {}, 'forward', 0, 0);
  expect(checkOverflow).toHaveBeenCalledTimes(2);
});
