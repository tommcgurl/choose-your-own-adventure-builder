const openingTag = /^<[^/].*>$/;
const closingTag = /^<\/.*>$/;

export function getOpeningTags(splitContent, startPosition) {
  let closingTagCount = 0;
  let openingTags = '';
  for (let i = startPosition - 1; i >= 0; i--) {
    const item = splitContent[i];
    if (closingTag.test(item)) {
      closingTagCount++;
    } else if (openingTag.test(item)) {
      if (closingTagCount === 0) {
        openingTags = item + openingTags;
      } else {
        closingTagCount--;
      }
    }
  }

  return openingTags;
}

export function getClosingTags(splitContent, endPosition) {
  let openingTagCount = 0;
  let closingTags = '';
  for (let i = endPosition + 1; i < splitContent.length; i++) {
    const item = splitContent[i];
    if (openingTag.test(item)) {
      openingTagCount++;
    } else if (closingTag.test(item)) {
      if (openingTagCount === 0) {
        closingTags += item;
      } else {
        openingTagCount--;
      }
    }
  }

  return closingTags;
}
