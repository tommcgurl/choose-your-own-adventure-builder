import checkOverflow from './checkOverflow';
import fillNextPage from './fillNextPage';
import fillPreviousPage from './fillPreviousPage';
import splitContent from './splitContent';

jest.mock('./checkOverflow');
jest.mock('./fillNextPage');

const content = splitContent(`
<p>Something. <strong>Something in bold. </strong><em>Something Italicized. I wonder if there's some bullshit goin</em></p>
<h1>Header 1!</h1>
<h2>Header 2!</h2>
<h3>Header 3!</h3>
<h4>Header 4!</h4>
<blockquote>Block quote!</blockquote>
<p>Ok done.<sup>superscript</sup><sub>subscript </sub><code>monospace</code></p>
<ul>
  <li>un</li>
  <li>ordered</li>
  <li>list</li>
</ul>
<ol>
  <li>ordered</li>
  <li>list</li>
  <ol>
    <li>over one</li>
  </ol>
</ol>
<p style="text-align:right;">right aligned</p>
`);

it('', () => {
  // Arrange
  const page = { innerHTML: '' };

  // Act
  fillPreviousPage(content, page, 0);

  // Assert
  expect(fillNextPage).toHaveBeenCalled();
});

it('', () => {
  // Arrange
  checkOverflow.mockReturnValueOnce(false).mockReturnValueOnce(true);
  const page = { innerHTML: '' };

  // Act
  const res = fillPreviousPage(content, page, content.length - 1);

  // Assert
  expect(res.pageEnd).toBe(content.length - 2);
  expect(res.pageStart).toBe(content.length - 2);
});

it('', () => {
  // Arrange
  checkOverflow
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);
  const page = { innerHTML: '' };

  // Act
  const res = fillPreviousPage(content, page, content.length - 1);

  // Assert
  expect(res.pageEnd).toBe(content.length - 2);
  expect(res.pageStart).toBe(content.length - 9);
});
