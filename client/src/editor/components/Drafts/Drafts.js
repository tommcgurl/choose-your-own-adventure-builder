import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { draftsSelector } from '../../store/selectors';

const Drafts = ({ drafts }) => {
  return (
    <ul>
      {drafts.map(draft => {
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
  return { drafts: draftsSelector(state) };
};

export default connect(mapStateToProps)(Drafts);
