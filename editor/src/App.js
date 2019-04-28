import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.css';
import { navigate } from './actions/pageActions';

import * as routes from './constants/routes';
import Home from './components/Home';
import NewAdventure from './components/NewAdventure';
import Drafts from './components/Drafts';
import Draft from './components/Draft';
import Editor from './components/Editor';

class App extends Component {
  goTo = route => {
    this.props.dispatch(navigate(route));
  };

  render() {
    return (
      <div className={styles.container}>
        <nav>
          <button onClick={() => this.goTo(routes.HOME)}>Home</button>
          <button onClick={() => this.goTo(routes.DRAFTS)}>Drafts</button>
          <button onClick={() => this.goTo(routes.NEW_ADVENTURE)}>
            Create a New Adventure
          </button>
        </nav>
        <div className={styles.content}>{this.renderPage()}</div>
      </div>
    );
  }

  renderPage = () => {
    switch (this.props.page) {
      case routes.NEW_ADVENTURE:
        return <NewAdventure />;
      case routes.DRAFT:
        return <Draft />;
      case routes.DRAFTS:
        return <Drafts />;
      case routes.EDIT:
        return <Editor />;
      case routes.HOME:
      default:
        return <Home />;
    }
  };
}

const mapStateToProps = state => {
  return { page: state.page };
};

export default connect(mapStateToProps)(App);
