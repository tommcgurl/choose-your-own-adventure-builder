import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';

// Just adding a simple provider that passes the json down.
// We could use this component to do some validation before passing
// it down
const AdventureProvider = ({ children, adventure }) => {
  console.log(adventure);
  if (
    adventure.intro &&
    adventure.title &&
    adventure.items &&
    adventure.mainStory
  ) {
    const htmlIntro = draftToHtml(adventure.intro);

    const htmlStoryParts = {};

    Object.keys(adventure.mainStory.storyParts).forEach(key => {
      htmlStoryParts[key] = {
        ...adventure.mainStory.storyParts[key],
        plot: draftToHtml(adventure.mainStory.storyParts[key].plot),
      };
    });

    return children({
      ...adventure,
      intro: htmlIntro,
      mainStory: {
        ...adventure.mainStory,
        storyParts: { ...htmlStoryParts },
      },
    });
  }
  return null;
};

const mapStateToProps = state => {
  return {
    adventure: state.adventure,
  };
};

export default connect(mapStateToProps)(AdventureProvider);
