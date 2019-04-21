import React, { Component } from "react";
import styles from "./App.module.css";
import DraftEditor from "./components/DraftEditor/DraftEditor";

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <DraftEditor />
      </div>
    );
  }
}

export default App;
