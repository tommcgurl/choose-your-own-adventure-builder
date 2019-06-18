import checkOverflow from './checkOverflow';
import { getClosingTags, getOpeningTags } from './getOuterTags';
import fillNextPage from './fillNextPage';

export default function fillPreviousPage(splitContent, page, start) {
  const firstWordPosition = findFirstWordPosition(splitContent, start);
  if (firstWordPosition <= 0) {
    return fillNextPage(splitContent, page, 0);
  }
  let pageStart = firstWordPosition;

  const closingTags = getClosingTags(splitContent, firstWordPosition);
  let newInnerContentToTest = splitContent[firstWordPosition];
  page.innerHTML =
    getOpeningTags(splitContent, firstWordPosition) +
    newInnerContentToTest +
    closingTags;

  if (checkOverflow(page)) {
    // ???
    page.innerHTML = '';
    return;
  }

  // fill the page until it overflows
  let innerContentThatFits = '';
  let startIndexOfContentThatFits;
  do {
    if (pageStart <= 0) {
      return fillNextPage(splitContent, page, 0);
    }

    innerContentThatFits = newInnerContentToTest;
    startIndexOfContentThatFits = pageStart;

    do {
      newInnerContentToTest = splitContent[--pageStart] + newInnerContentToTest;
    } while (/<.*>/.test(splitContent[pageStart]) && pageStart > 0);

    page.innerHTML =
      getOpeningTags(splitContent, pageStart) +
      newInnerContentToTest +
      closingTags;
  } while (!checkOverflow(page));

  page.innerHTML =
    getOpeningTags(splitContent, startIndexOfContentThatFits) +
    innerContentThatFits +
    closingTags;

  return { pageStart: startIndexOfContentThatFits, pageEnd: firstWordPosition };
}

function findFirstWordPosition(content, start) {
  if (start <= 0) {
    return 0;
  }
  while (/<.*>/.test(content[start])) {
    start--;
    if (start <= 0) {
      return 0;
    }
  }
  return start;
}
