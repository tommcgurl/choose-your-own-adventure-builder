import React, { Component } from 'react';
import './App.css';
import VisibleStoryList from './components/containers/VisibleStoryList/VisibleStoryList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <VisibleStoryList />
      </div>
    );
  }
}

export default App;
