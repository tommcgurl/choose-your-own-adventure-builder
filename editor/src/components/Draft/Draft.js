import React from 'react';
import { connect } from 'react-redux';
import getCurrentDraft from '../../selectors/getCurrentDraft';
import { selectToEditStoryPart } from '../../actions/draftActions';

const Draft = ({ draft, edit }) => {
  return (
    <div>
      <div>Title: {draft.title}</div>
      <a href="#intro" onClick={() => edit('intro', draft.intro)}>
        Intro
      </a>
      <div>
        Parts:
        <ul>
          {Object.keys(draft.mainStory.storyParts).map(key => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={() => edit(key, draft.mainStory.storyParts[key].plot)}
              >
                {key}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    draft: getCurrentDraft(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    edit: (key, contents) => {
      dispatch(selectToEditStoryPart(key, contents));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draft);
