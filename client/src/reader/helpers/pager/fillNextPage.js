import checkOverflow from './checkOverflow';
import { getClosingTags, getOpeningTags } from './getOuterTags';

export default function fillNextPage(splitContent, page, start) {
  const firstWordPosition = findFirstWordPosition(splitContent, start);
  if (firstWordPosition === null) {
    // ???
    return;
  }
  let pageEnd = firstWordPosition;

  const openingTags = getOpeningTags(splitContent, firstWordPosition);
  let newInnerContentToTest = splitContent[pageEnd];
  page.innerHTML =
    openingTags + newInnerContentToTest + getClosingTags(splitContent, pageEnd);

  if (checkOverflow(page)) {
    // ???
    page.innerHTML = '';
    return;
  }

  // Fill the page until it overflows
  let innerContentThatFits = '';
  do {
    if (pageEnd === splitContent.length - 1) {
      return { pageStart: firstWordPosition, pageEnd };
    }

    innerContentThatFits = newInnerContentToTest;

    do {
      newInnerContentToTest += splitContent[++pageEnd];
    } while (
      /<.*>/.test(splitContent[pageEnd] && pageEnd < splitContent.length)
    );

    page.innerHTML =
      openingTags +
      newInnerContentToTest +
      getClosingTags(splitContent, pageEnd);
  } while (!checkOverflow(page));

  page.innerHTML =
    openingTags +
    innerContentThatFits +
    getClosingTags(splitContent, --pageEnd);

  return { pageStart: firstWordPosition, pageEnd };
}

function findFirstWordPosition(splitContent, start) {
  while (/<.*>/.test(splitContent[start])) {
    start++;
    if (start >= splitContent.length) {
      return null;
    }
  }
  return start;
}
