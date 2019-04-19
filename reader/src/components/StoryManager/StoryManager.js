import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Intro from '../Intro/Intro';
import StoryParts from '../StoryParts/StoryParts';

import styles from './StoryManager.module.css';

export default class StoryManager extends PureComponent {
  state = {
    introCompleted: false,
  }

  static propTypes = {
    intro: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.shape({
      prompt: PropTypes.string,
      options: PropTypes.shape({
        description: PropTypes.string,
      }),
    }),
    mainStory: PropTypes.object,
    colorPalette: PropTypes.object,
  }

  handleIntroComplete = () => {
    this.setState({
      introCompleted: true,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {!this.state.introCompleted && 
          <Intro
            title={this.props.title}
            intro={this.props.intro}
            onIntroComplete={this.handleIntroComplete}
          />
        }
        {this.state.introCompleted &&
          <StoryParts
            firstPart={this.props.mainStory.firstPart}
            storyParts={this.props.mainStory.storyParts}
          />
        }
      </div>
    )
  }
}