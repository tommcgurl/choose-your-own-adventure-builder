import React from 'react';
import { connect } from 'react-redux';
import { selectDraft } from '../../actions/draftActions';

const Drafts = ({ drafts, goToDraft }) => {
  return (
    <ul>
      {drafts.map(draft => (
        <li key={draft.id}>
          <a href={`#${draft.id}`} onClick={() => goToDraft(draft.id)}>
            {draft.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => {
  return { drafts: state.drafts };
};

const mapDispatchToProps = dispatch => {
  return {
    goToDraft: id => {
      dispatch(selectDraft(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drafts);
