import checkOverflow from './checkOverflow';
import { getClosingTags, getOpeningTags } from './getOuterTags';

export default function fillPage(splitContent, page, direction, start, end) {
  let pageStart = start;
  let pageEnd = end;
  var oldContent = '';
  var newContent = '';
  page.innerHTML = getOpeningTags(splitContent, start);

  // fill the page until it overflows
  while (!checkOverflow(page)) {
    if (pageEnd >= splitContent.length && direction === 'forward') {
      return;
    }
    oldContent = newContent;
    newContent = '';
    for (let i = pageStart; i < pageEnd; i++) {
      newContent += splitContent[i];
    }
    page.innerHTML = newContent + getClosingTags(splitContent, pageEnd);

    if (direction === 'forward') {
      pageEnd++;
    }
    if (direction === 'back') {
      pageStart--;
      if (pageStart <= 0) {
        pageStart = 0;
        direction = 'forward';
      }
    }
  }
  page.innerHTML = oldContent;
  if (oldContent.charAt(0) !== '<') {
    // put beginning tags if missing
    let i = pageStart;
    while (
      splitContent[i].charAt(i) !== '<' ||
      splitContent[i].substr(0, 2) === '</'
    ) {
      i--;
    }
    page.innerHTML = splitContent[i] + oldContent;
  }
  pageEnd -= 2;
  return { pageStart, pageEnd };
}
