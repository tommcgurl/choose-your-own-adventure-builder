import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import styles from './App.module.css';
import AdventureBrowser from './components/AdventureBrowser';
import AdventureManager from './components/AdventureManager/AdventureManager';
import AdventureProvider from './components/AdventureProvider';
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

  render() {
    return (
      <Router>
        <div className={styles.container}>
          <nav>
            <Link to="library">LIBRARY</Link>
            <Link to="/">BROWSE</Link>
            <Link to="read">READ</Link>
          </nav>
          <Route path="/" component={AdventureBrowser} />
          <Route path="/library" component={Library} />
          <Route
            path="/read"
            component={props => (
              <AdventureProvider {...props}>
                {this.renderStory}
              </AdventureProvider>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
