import React from 'react';
import { connect } from 'react-redux';
import { selectDraft } from '../../actions/draftActions';

const Drafts = ({ drafts, dispatch }) => {
  function goToDraft(id) {
    dispatch(selectDraft(id));
  }

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

export default connect(mapStateToProps)(Drafts);
