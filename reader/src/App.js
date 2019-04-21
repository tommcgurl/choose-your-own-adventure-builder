import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from './actions/pageActions';

import StoryJsonProvider from './components/StoryJsonProvider';
import StoryManager from './components/StoryManager/StoryManager';
import StoryList from './components/StoryList';
import * as routes from './constants/routes';
import styles from './App.module.css';
import Library from './components/Library/Library';

class App extends Component {
  renderStory({ title, intro, items, mainStory, colorPalette }) {
    return (
      <StoryManager
        intro={intro}
        title={title}
        items={items}
        mainStory={mainStory}
        colorPalette={colorPalette}
      />
    );
  }

  renderPage = () => {
    switch (this.props.page) {
      case routes.READ:
        return <StoryJsonProvider>{this.renderStory}</StoryJsonProvider>;
      case routes.LIBRARY:
        return <Library />;
      case routes.BROWSE:
      default:
        return <StoryList />;
    }
  };

  goToLibrary = () => {
    this.props.dispatch(navigate(routes.LIBRARY));
  };

  goToBrowse = () => {
    this.props.dispatch(navigate(routes.BROWSE));
  };

  goToRead = () => {
    this.props.dispatch(navigate(routes.READ));
  };

  render() {
    return (
      <div className={styles.container}>
        <nav>
          <button onClick={this.goToLibrary}>LIBRARY</button>
          <button onClick={this.goToBrowse}>BROWSE</button>
          <button onClick={this.goToRead}>READ</button>
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
