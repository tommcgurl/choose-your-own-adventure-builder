import { getOpeningTags, getClosingTags } from './getOuterTags';
import splitContent from './splitContent';

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

describe('getOpeningTags', () => {
  it('', () => {
    const result = getOpeningTags(content, 0);
    expect(result).toBe('');
  });

  it('', () => {
    const result = getOpeningTags(content, 1);
    expect(result).toBe('<p>');
  });

  it('', () => {
    const result = getOpeningTags(content, 4);
    expect(result).toBe('<p><strong>');
  });

  it('', () => {
    const result = getOpeningTags(content, 12);
    expect(result).toBe('<p><em>');
  });

  it('', () => {
    const result = getOpeningTags(content, 32);
    expect(result).toBe('<h1>');
  });

  it('', () => {
    const result = getOpeningTags(content, 95);
    expect(result).toBe('<ol><ol><li>');
  });
});

describe('getClostingTags', () => {
  it('', () => {
    const result = getClosingTags(content, 1);
    expect(result).toBe('</p>');
  });

  it('', () => {
    const result = getClosingTags(content, 4);
    expect(result).toBe('</strong></p>');
  });

  it('', () => {
    const result = getClosingTags(content, 12);
    expect(result).toBe('</em></p>');
  });

  it('', () => {
    const result = getClosingTags(content, 32);
    expect(result).toBe('</h1>');
  });

  it('', () => {
    const result = getClosingTags(content, 95);
    expect(result).toBe('</li></ol></ol>');
  });
});
