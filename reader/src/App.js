import React, { Component } from 'react';
import StoryJsonProvider from './components/StoryJsonProvider';
import StoryManager from './components/StoryManager/StoryManager';
import './App.css';

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
  render() {
    return <StoryJsonProvider>{this.renderStory}</StoryJsonProvider>;
  }
}

export default App;
