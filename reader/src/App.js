import React, { Component } from 'react';
import StoryJsonProvider from './components/StoryJsonProvider';
import StoryManager from './components/StoryManager/StoryManager';
import StoryList from './components/StoryList';
import * as routes from './constants/routes';
import * as styles from './App.module.css';

class App extends Component {
  state = {
    page: routes.BROWSE,
  };

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

  renderPage = page => {
    switch (page) {
      case routes.READ:
        return <StoryJsonProvider>{this.renderStory}</StoryJsonProvider>;
      case routes.BROWSE:
      default:
        return <StoryList />;
    }
  };

  goToBrowse = () => {
    this.setState({ page: routes.BROWSE });
  };

  goToRead = () => {
    this.setState({ page: routes.READ });
  };

  render() {
    const { page } = this.state;
    return (
      <div className={styles.container}>
        <nav>
          <button onClick={this.goToBrowse}>BROWSE</button>
          <button onClick={this.goToRead}>READ</button>
        </nav>
        <div className={styles.content}>{this.renderPage(page)}</div>
      </div>
    );
  }
}

export default App;
