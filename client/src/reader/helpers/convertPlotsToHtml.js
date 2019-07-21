import draftToHtml from 'draftjs-to-html';

export default function convertPlotsToHtml(adventure) {
  const htmlIntro = draftToHtml(adventure.intro);

  const htmlStoryParts = {};

  Object.keys(adventure.mainStory.storyParts).forEach(key => {
    htmlStoryParts[key] = {
      ...adventure.mainStory.storyParts[key],
      plot: draftToHtml(adventure.mainStory.storyParts[key].plot),
    };
  });

  return {
    ...adventure,
    intro: htmlIntro,
    mainStory: {
      ...adventure.mainStory,
      storyParts: htmlStoryParts,
    },
  };
}
