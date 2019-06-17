import { getClosingTags, getOpeningTags } from './getOuterTags';

export default function getContent(splitContent, startIndex, endIndex) {
  let content = getOpeningTags(splitContent, startIndex);
  content += splitContent.slice(startIndex, endIndex + 1).join('');
  content += getClosingTags(splitContent, endIndex);
  return content;
}
