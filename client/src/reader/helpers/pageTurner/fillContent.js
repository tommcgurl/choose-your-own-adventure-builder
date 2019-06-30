import checkOverflow from './checkOverflow';
import { getClosingTags, getOpeningTags } from './getOuterTags';

export default function fillContent(splitContent, page, start, forward = true) {
  const firstWordPosition = findFirstWordPosition(splitContent, start, forward);
  if (forward) {
    if (firstWordPosition === null) {
      console.log('am I here?');
      // ???
      return;
    }
  } else {
    if (firstWordPosition <= 0) {
      return fillContent(splitContent, page, 0);
    }
  }
  let pageEnd = firstWordPosition;

  const leadingTags = forward
    ? getOpeningTags(splitContent, firstWordPosition)
    : getClosingTags(splitContent, firstWordPosition);
  let newInnerContentToTest = splitContent[firstWordPosition];

  if (forward) {
    page.innerHTML =
      leadingTags +
      newInnerContentToTest +
      getClosingTags(splitContent, pageEnd);
  } else {
    page.innerHTML =
      getOpeningTags(splitContent, firstWordPosition) +
      newInnerContentToTest +
      leadingTags;
  }

  if (checkOverflow(page)) {
    // ???
    page.innerHTML = '';
    console.log('or here?');
    return;
  }

  // Fill the page until it overflows
  let innerContentThatFits = '';
  let pageEndIndexOfContentThatFits;
  do {
    if (forward) {
      if (pageEnd >= splitContent.length - 1) {
        return {
          previousWord: findFirstWordPosition(
            splitContent,
            firstWordPosition - 1,
            false
          ),
          pageStart: firstWordPosition,
          pageEnd,
          nextWord: findFirstWordPosition(
            splitContent,
            pageEndIndexOfContentThatFits + 1,
            true
          ),
        };
      }
    } else {
      if (pageEnd <= 0) {
        return fillContent(splitContent, page, 0);
      }
    }

    innerContentThatFits = newInnerContentToTest;
    pageEndIndexOfContentThatFits = pageEnd;

    do {
      if (forward) {
        newInnerContentToTest += splitContent[++pageEnd];
      } else {
        newInnerContentToTest = splitContent[--pageEnd] + newInnerContentToTest;
      }
    } while (
      /<.*>/.test(splitContent[pageEnd]) &&
      ((forward && pageEnd < splitContent.length - 1) ||
        (!forward && pageEnd > 0))
    );

    if (forward) {
      page.innerHTML =
        leadingTags +
        newInnerContentToTest +
        getClosingTags(splitContent, pageEnd);
    } else {
      page.innerHTML =
        getOpeningTags(splitContent, pageEnd) +
        newInnerContentToTest +
        leadingTags;
    }
  } while (!checkOverflow(page));

  if (forward) {
    page.innerHTML =
      leadingTags +
      innerContentThatFits +
      getClosingTags(splitContent, pageEndIndexOfContentThatFits);
    return {
      previousWord: findFirstWordPosition(
        splitContent,
        firstWordPosition - 1,
        false
      ),
      pageStart: firstWordPosition,
      pageEnd: pageEndIndexOfContentThatFits,
      nextWord: findFirstWordPosition(
        splitContent,
        pageEndIndexOfContentThatFits + 1,
        true
      ),
    };
  } else {
    page.innerHTML =
      getOpeningTags(splitContent, pageEndIndexOfContentThatFits) +
      innerContentThatFits +
      leadingTags;
    return {
      previousWord: findFirstWordPosition(
        splitContent,
        pageEndIndexOfContentThatFits - 1,
        false
      ),
      pageStart: pageEndIndexOfContentThatFits,
      pageEnd: firstWordPosition,
      nextWord: findFirstWordPosition(
        splitContent,
        firstWordPosition + 1,
        true
      ),
    };
  }
}

function findFirstWordPosition(splitContent, start, lookingForward) {
  if (lookingForward) {
    while (/<.*>/.test(splitContent[start])) {
      start++;
      if (start >= splitContent.length) {
        return null;
      }
    }
    return start;
  } else {
    if (start <= 0) {
      return 0;
    }
    while (/<.*>/.test(splitContent[start])) {
      start--;
      if (start <= 0) {
        return 0;
      }
    }
    return start;
  }
}
