import { connect } from 'react-redux';
import StoryList from '../../StoryList/StoryList';
import { getVisibleStories } from './selectors';
import {
  // addToReadList,
  fetchStoriesAction,
} from '../../../actions/storyActions';

const mapStateToProps = state => {
  console.log(state);
  return {
    stories: getVisibleStories(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onClickRead: id => {
    //   dispatch(addToReadList(id));
    // },
    fetchStories: () => {
      dispatch(fetchStoriesAction());
    },
  };
};

const VisibleStoryList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoryList);

export default VisibleStoryList;
