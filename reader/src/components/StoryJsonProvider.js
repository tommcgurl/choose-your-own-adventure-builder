import StoryJson from '../example-story.json';

// Just adding a simple provider that passes the json down.
// this can be moved to redux once we have added it.
// We could use this component to do some validation before passing
// it down
const StoryJsonProvider = ({ children }) => {
  return children({ ...StoryJson });
};

export default StoryJsonProvider;
