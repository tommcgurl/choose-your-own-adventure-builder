import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import { currentAdventureSelector } from '../store/selectors';

// Just adding a simple provider that passes the json down.
// We could use this component to do some validation before passing
// it down
const AdventureProvider = ({ children, adventure }) => {
  if (adventure) {
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

const mapStateToProps = (state, { match }) => {
  return {
    adventure: currentAdventureSelector(state)(match.params.adventureId),
  };
};

export default connect(mapStateToProps)(AdventureProvider);
