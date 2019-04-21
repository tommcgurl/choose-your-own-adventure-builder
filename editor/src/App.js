import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.css';
import { navigate } from './actions/pageActions';

import DraftEditor from './components/DraftEditor/DraftEditor';
import * as routes from './constants/routes';

class App extends Component {
  goToDraft = () => {
    this.props.dispatch(navigate(routes.DRAFT));
  };

  renderPage = () => {
    switch (this.props.page) {
      case routes.DRAFT:
      default:
        return <DraftEditor />;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <nav>
          <button onClick={this.goToDraft}>DRAFT</button>
        </nav>
        <div className={styles.content}>{this.renderPage()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { page: state.page };
};

export default connect(mapStateToProps)(App);
