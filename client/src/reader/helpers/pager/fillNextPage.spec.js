import checkOverflow from './checkOverflow';
import fillNextPage from './fillNextPage';
import splitContent from './splitContent';

jest.mock('./checkOverflow');

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

test('', () => {
  checkOverflow
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);
  const page = { innerHTML: '' };
  console.log(fillNextPage(content, page, 0));
});
