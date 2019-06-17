import checkOverflow from './checkOverflow';
import { getClosingTags, getOpeningTags } from './getOuterTags';

export default function fillNextPage(splitContent, page, start) {
  let pageEnd = start;
  let oldContent = '';
  let newContent = getOpeningTags(splitContent, start) + splitContent[start];
  page.innerHTML = '';

  // fill the page until it overflows
  while (!checkOverflow(page)) {
    if (pageEnd === splitContent.length) {
      page.innerHTML = oldContent;
      return { pageStart: start, pageEnd: splitContent.length };
    }

    oldContent = newContent;
    pageEnd++;
    newContent += splitContent[pageEnd];
    page.innerHTML = newContent + getClosingTags(splitContent, pageEnd);
  }

  pageEnd--;
  page.innerHTML = oldContent + getClosingTags(splitContent, pageEnd);
  return { pageStart: start, pageEnd };
}
