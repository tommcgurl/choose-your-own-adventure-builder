import { connect } from 'react-redux';
import { getStory } from '../selectors';

// Just adding a simple provider that passes the json down.
// We could use this component to do some validation before passing
// it down
const StoryJsonProvider = ({ children, story }) => {
  if (
    story.intro &&
    story.title &&
    story.items &&
    story.mainStory &&
    story.colorPalette
  ) {
    return children({ ...story });
  }
  return null;
};

const mapStateToProps = state => {
  return {
    story: getStory(state),
  };
};

export default connect(mapStateToProps)(StoryJsonProvider);
