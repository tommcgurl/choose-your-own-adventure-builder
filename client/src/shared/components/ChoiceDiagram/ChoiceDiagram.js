import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
  DefaultNodeModel,
  DiagramModel,
} from '@projectstorm/react-diagrams';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './ChoiceDiagram.module.css';

// create an instance of the engine with all the defaults.

const ChoiceDiagram = ({ storyPartName, promptText, choices, readOnly }) => {
  const engine = createEngine();

  // node 1
  const storyPart = new DefaultNodeModel({
    name: storyPartName,
    color: 'rgb(0,192,255)',
  });
  storyPart.setPosition(100, 100);
  if (readOnly) {
    storyPart.setLocked(true);
  }
  let storyPartPort = storyPart.addOutPort(promptText);
  const model = new DiagramModel();
  choices.forEach((choice, index) => {
    const choice1 = new DefaultNodeModel({
      name: choice.nextBranchName,
      color: 'rgb(0,192,255)',
    });
    choice1.setPosition(350, 100 * index);
    let choice1Port = choice1.addInPort('');

    // link them and add a label to the link
    const link = storyPartPort.link(choice1Port);
    link.addLabel(choice.text);
    model.addAll(storyPart, choice1, link);
  });
  if (readOnly) {
    model.setLocked(true);
  }

  // node 2

  // Now we have setup a simple diagram.
  // All thats left to do, is create a
  // DiagramModel to contain everything,
  // add all the elements to it,
  // and then add it to the engine.

  // model.addAll(storyPart, choiceNode1, link);
  engine.setModel(model);

  return (
    <div
      className={styles.container}
      style={{
        height: `${100 * choices.length}px`
      }}>
      <CanvasWidget className={styles.canvasWidget} engine={engine} />
    </div>
  );
};

ChoiceDiagram.propTypes = {
  storyPartName: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      nextBranch: PropTypes.string,
      nextBranchName: PropTypes.string,
    })
  ),
  promptText: PropTypes.string,
  readOnly: PropTypes.bool,
};

ChoiceDiagram.defaultProps = {
  readOnly: false,
};

export default ChoiceDiagram;
