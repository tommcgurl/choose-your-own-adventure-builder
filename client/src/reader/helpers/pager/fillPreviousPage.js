import checkOverflow from './checkOverflow';
import { getClosingTags, getOpeningTags } from './getOuterTags';
import fillNextPage from './fillNextPage';

export default function fillPreviousPage(splitContent, page, start) {
  let pageStart = start;
  let oldContent = '';
  let newContent = splitContent[start] + getClosingTags(splitContent, start);
  page.innerHTML = '';

  // fill the page until it overflows
  while (!checkOverflow(page)) {
    if (pageStart < 0) {
      return fillNextPage(splitContent, page, 0);
    }

    oldContent = newContent;
    pageStart--;
    newContent = splitContent[pageStart] + newContent;
    page.innerHTML = getOpeningTags(splitContent, pageStart) + newContent;
  }
  pageStart++;
  page.innerHTML = getOpeningTags(splitContent, pageStart) + oldContent;
  return { pageStart, pageEnd: start };
}
