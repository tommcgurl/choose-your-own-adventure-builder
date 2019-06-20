import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Intro from '../Intro/Intro';
import InventorySelection from '../InventorySelection/InventorySelection';
import StoryParts from '../StoryParts/StoryParts';

export default class AdventureManager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      introCompleted: false,
      inventorySelectionCompleted: !Object.keys(props.items).length,
    };
  }

  static propTypes = {
    intro: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.shape({
      prompt: PropTypes.string,
      options: PropTypes.shape({
        description: PropTypes.string,
      }),
      limit: PropTypes.number,
    }),
    mainStory: PropTypes.object,
  };

  handleIntroComplete = () => {
    this.setState({
      introCompleted: true,
    });
  };

  handleInventorySelectionComplete = selectedItems => {
    this.setState({
      inventorySelectionCompleted: true,
    });
  };

  render() {
    const { items } = this.props;
    const { inventorySelectionCompleted, introCompleted } = this.state;
    return (
      <>
        {!introCompleted && (
          <Intro
            title={this.props.title}
            intro={this.props.intro}
            onIntroComplete={this.handleIntroComplete}
          />
        )}
        {introCompleted &&
          !inventorySelectionCompleted &&
          Object.keys(items).length && (
            <InventorySelection
              prompt={items.prompt}
              options={items.options}
              limit={items.limit}
              onInventorySelectionComplete={
                this.handleInventorySelectionComplete
              }
            />
          )}
        {this.state.introCompleted && inventorySelectionCompleted && (
          <StoryParts
            firstPart={this.props.mainStory.firstPart}
            storyParts={this.props.mainStory.storyParts}
          />
        )}
      </>
    );
  }
}
