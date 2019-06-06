import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const Drafts = ({ drafts }) => {
  return (
    <ul>
      {Object.keys(drafts).map(draftId => {
        const draft = drafts[draftId];
        return (
          <li key={draft.id}>
            <Link to={routes.DRAFT.replace(':draftId', draft.id)}>
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

export default connect(mapStateToProps)(Drafts);
