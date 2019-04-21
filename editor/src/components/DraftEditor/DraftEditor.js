import React, { Component } from "react";
import styles from "./DraftEditor.modules.css";

class DraftEditor extends Component {
  state = {
    currentText: ""
  };

  handleChange = e => {
    this.setState({ currentText: e.target.value });
  };

  render() {
    const { currentText } = this.state;
    return (
      <div className={styles.textAreaContainer}>
        <input
          type="text"
          className={styles.textAreaContent}
          value={currentText}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DraftEditor;
