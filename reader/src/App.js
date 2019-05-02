import React, { Component } from 'react';
import { connect } from 'react-redux';

import { navigate } from './actions/pageActions';

import AdventureProvider from './components/AdventureProvider';
import AdventureManager from './components/AdventureManager/AdventureManager';
import AdventureBrowser from './components/AdventureBrowser';
import * as routes from './constants/routes';
import styles from './App.module.css';
import Library from './components/Library';

class App extends Component {
  renderStory({ title, intro, items, mainStory, colorPalette }) {
    return (
      <AdventureManager
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
        return <AdventureProvider>{this.renderStory}</AdventureProvider>;
      case routes.LIBRARY:
        return <Library />;
      case routes.BROWSE:
      default:
        return <AdventureBrowser />;
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
