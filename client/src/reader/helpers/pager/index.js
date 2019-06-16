let pageStart = 0;
let pageEnd = 0;

function splitContent(html) {
  html = html.replace(/(\r\n\t|\n|\r\t)/gm, '');
  const words = [];
  while (html.length > 0) {
    if (html.charAt(0) === '<') {
      words.push(html.substring(0, html.indexOf('>') + 1));
    }
  }
}

function checkOverflow(el) {
  const currentOverflow = el.style.overflow;

  if (!currentOverflow || currentOverflow === 'visible') {
    el.style.overflow = 'hidden';
  }

  const isOverflowing =
    el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

  el.style.overflow = currentOverflow;

  return isOverflowing;
}
