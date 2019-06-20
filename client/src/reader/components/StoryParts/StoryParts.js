import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import Page from '../Page';
import styles from './StoryParts.module.css';

class Choice extends PureComponent {
  render() {
    const { text, nextBranch, onClick } = this.props;
    return <button onClick={onClick.bind(null, nextBranch)}>{text}</button>;
  }
}

export default class StoryParts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      previousStoryPartID: null,
      currentStoryPartID: props.firstPart,
    };
  }

  static propTypes = {
    firstPart: PropTypes.string.isRequired,
  };

  handleClickChoice = nextStoryPartID => {
    const { currentStoryPartID } = this.state;
    this.setState({
      previousStoryPartID: currentStoryPartID,
      currentStoryPartID: nextStoryPartID,
    });
  };

  handleClickGoBack = () => {
    const { previousStoryPartID } = this.state;
    if (!previousStoryPartID) {
      return;
    }
    this.setState({
      currentStoryPartID: previousStoryPartID,
    });
  };

  renderPromptIfNeeded(prompt, choiceClickHandler) {
    if (!prompt) {
      return;
    }
    const { text, choices } = prompt;
    return (
      <div className={styles.promptContainer}>
        <p className={styles.promptText}>{text}</p>
        <div className={styles.choicesContainer}>
          {choices.map(choice => (
            <Choice
              {...choice}
              key={choice.text}
              onClick={choiceClickHandler}
            />
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { storyParts } = this.props;
    const { currentStoryPartID } = this.state;
    const currentStoryPart = storyParts[currentStoryPartID];
    return (
      <div className={styles.container}>
        {!!currentStoryPart && (
          <Fragment>
            <Page html={currentStoryPart.plot} />
            {this.renderPromptIfNeeded(
              currentStoryPart.prompt,
              this.handleClickChoice
            )}
          </Fragment>
        )}
        {!currentStoryPart && (
          <Fragment>
            <p>The End.</p>
            <button onClick={this.handleClickGoBack}>Go back.</button>
          </Fragment>
        )}
      </div>
    );
  }
}
