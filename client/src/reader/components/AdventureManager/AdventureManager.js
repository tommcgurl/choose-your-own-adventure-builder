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
    id: PropTypes.string.isRequired,
    intro: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    const { id, title, intro, items, mainStory } = this.props;
    const { inventorySelectionCompleted, introCompleted } = this.state;
    return (
      <>
        {!introCompleted && (
          <Intro
            id={id}
            title={title}
            intro={intro}
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
            firstPart={mainStory.firstPart}
            storyParts={mainStory.storyParts}
          />
        )}
      </>
    );
  }
}
