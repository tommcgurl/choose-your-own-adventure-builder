import React, { Component } from 'react';
import Reader from './reader';
import Editor from './editor';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    currentApp: 'Reader',
  }

  goToReader = () => {
    this.setState({
      currentApp: 'Reader',
    });
  }

  goToEditor = () => {
    this.setState({
      currentApp: 'Editor',
    });
  }

  render() {
    return (
      <div className='App'>
        <a onClick={this.goToReader}> Go To Reader </a>
        <a onClick={this.goToEditor}> Go To Editor </a>
        {this.state.currentApp === 'Reader' && <Reader />}
        {this.state.currentApp === 'Editor' && <Editor />}
      </div>
    );
  }
}

export default App;
