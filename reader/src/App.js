import React, { Component } from 'react';
import StoryJsonProvider from './components/StoryJsonProvider';
import StoryManager from './components/StoryManager/StoryManager';
import StoryList from './components/StoryList';
import * as routes from './constants/routes';
import './App.css';

class App extends Component {
  state = {
    page: routes.SEARCH,
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
      case routes.SEARCH:
      default:
        return <StoryList />;
    }
  };

  goToSearch = () => {
    this.setState({ page: routes.SEARCH });
  };

  goToRead = () => {
    this.setState({ page: routes.READ });
  };

  render() {
    const { page } = this.state;
    return (
      <div>
        <nav>
          <button onClick={this.goToSearch}>SEARCH</button>
          <button onClick={this.goToRead}>READ</button>
        </nav>
        <div>{this.renderPage(page)}</div>
      </div>
    );
  }
}

export default App;
