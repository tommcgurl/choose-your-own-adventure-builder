import { connect } from 'react-redux';

// Just adding a simple provider that passes the json down.
// We could use this component to do some validation before passing
// it down
const StoryJsonProvider = ({ children, adventure }) => {
  if (
    adventure.intro &&
    adventure.title &&
    adventure.items &&
    adventure.mainStory &&
    adventure.colorPalette
  ) {
    return children({ ...adventure });
  }
  return null;
};

const mapStateToProps = state => {
  return {
    adventure: state.adventure,
  };
};

export default connect(mapStateToProps)(StoryJsonProvider);
