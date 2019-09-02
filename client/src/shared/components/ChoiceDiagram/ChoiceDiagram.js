import React from 'react';
import PropTypes from 'prop-types';
import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel
} from '@projectstorm/react-diagrams';

import {
  CanvasWidget
} from '@projectstorm/react-canvas-core';

import styles from './ChoiceDiagram.module.css'
import { isPipelineTopicExpression } from '@babel/types';

// create an instance of the engine with all the defaults.

const ChoiceDiagram = ({ storyPartName, promptText, choices}) => {
  const engine = createEngine();

  // node 1
  const storyPart = new DefaultNodeModel({
    name: storyPartName,
    color: 'rgb(0,192,255)',
  });
  storyPart.setPosition(100, 100);
  let storyPartPort = storyPart.addOutPort(promptText);
  const model = new DiagramModel();
  choices.forEach((choice, index) => {
    const choice1 = new DefaultNodeModel({
      name: choice.storyPartName,
      color: 'rgb(0,192,255)',
    });
    choice1.setPosition(350, (100 * index));
    let choice1Port = choice1.addInPort('Selected');

    // link them and add a label to the link
    const link = storyPartPort.link(choice1Port);
    link.addLabel(choice.text);
    model.addAll(storyPart, choice1, link);
  });

  // node 2
 
  // Now we have setup a simple diagram.
  // All thats left to do, is create a
  // DiagramModel to contain everything,
  // add all the elements to it,
  // and then add it to the engine.

  // model.addAll(storyPart, choiceNode1, link);
  engine.setModel(model);

  return (
    <div className={styles.container}>
      <CanvasWidget
        className={styles.canvasWidget}
        engine={engine}
      />
    </div>
  );
}

ChoiceDiagram.propTypes = {
  storyPartName: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    storyPartName: PropTypes.string,
  })),
  promptText: PropTypes.string
}

export default ChoiceDiagram
