import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function convertPlotsToHtml(adventure) {
  const rawIntro = convertFromRaw(adventure.intro);

  const htmlStoryParts = {};

  Object.keys(adventure.mainStory.storyParts).forEach(key => {
    htmlStoryParts[key] = {
      ...adventure.mainStory.storyParts[key],
      plot: draftToHtml(adventure.mainStory.storyParts[key].plot),
    };
  });

  return {
    ...adventure,
    intro: rawIntro.getPlainText(),
    mainStory: {
      ...adventure.mainStory,
      storyParts: htmlStoryParts,
    },
  };
}
