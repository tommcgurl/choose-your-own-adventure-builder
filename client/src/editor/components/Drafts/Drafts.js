import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDrafts, selectDraft } from '../../actions/draftActions';
import * as routes from '../../constants/routes';

const Drafts = ({ drafts, goToDraft, loadDrafts }) => {
  useEffect(() => {
    loadDrafts();
  }, []);

  return (
    <ul>
      {Object.keys(drafts).map(draftId => {
        const draft = drafts[draftId];
        return (
          <li key={draft.id}>
            <Link
              to={routes.ROOT + routes.DRAFT}
              onClick={() => goToDraft(draft.id)}
            >
              {draft.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = state => {
  return { drafts: state.editor.drafts };
};

const mapDispatchToProps = dispatch => {
  return {
    goToDraft: id => {
      dispatch(selectDraft(id));
    },
    loadDrafts: () => {
      dispatch(fetchDrafts());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drafts);
