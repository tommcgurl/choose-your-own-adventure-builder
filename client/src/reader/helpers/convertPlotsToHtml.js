import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function convertPlotsToHtml(adventure) {
  const blurbContentState = convertFromRaw(adventure.blurb);

  const htmlStoryParts = {};

  Object.keys(adventure.storyParts).forEach(key => {
    htmlStoryParts[key] = {
      ...adventure.storyParts[key],
      plot: draftToHtml(adventure.storyParts[key].plot),
    };
  });

  return {
    ...adventure,
    blurb: blurbContentState.getPlainText(),
    storyParts: htmlStoryParts,
  };
}
