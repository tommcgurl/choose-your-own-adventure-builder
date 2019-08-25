import { storiesOf } from '@storybook/react';
import 'normalize.css';
import React from 'react';
import Button, { TYPES } from '../Button/Button';
import Modal from './Modal';
import './Modal.story.css';

const AddUserChoicePrompt = ({ toggleModal }) => {
  return (
    <div className="content">
      <div>
        <h1>Prompt</h1>
        <input type="text" />
        <p className="input-text">
          This should be a prompt for the user to take action, and select from a
          list of choices. An example prompt could be{' '}
          <em>
            The monster is approaching, do you want to climb the ladder, or try
            to hide?
          </em>
        </p>
      </div>
      <div>
        <h1>Choices</h1>
        <div className="choices-container">
          <div className="choices-content">
            <input placeholder="Choice text..." type="text" />
            <p className="input-text">
              Text explaining the choice. An example choice could be{' '}
              <em>Try to hide!</em>
            </p>
            <div>
              <label>{'Next Branch ID '}</label>
              <select>
                <option>open_door_2</option>
              </select>
            </div>
            <div>
              <p>
                <strong>Branch Preview</strong>
              </p>
              <div className="branch-preview-text-container">
                <p>
                  You're gonna open the second door! You reach your hand out to
                  grab the knob. When your hand meets the metal you feel an
                  instant burning sensation! You pull your hand away as fast as
                  you can. SON OF A BIT…..
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-prompt-save-button">
        <Button type={TYPES.ACTION} onClick={toggleModal}>Save</Button>
      </div>
    </div>
  );
};

const GenreDescriptionPreview = ({ genre }) => {
  return (
    <div className="genre-description-container">
      <h1>{genre.title}</h1>
      <p>{genre.description}</p>
    </div>
  )
}

const UserChoiceModalWrapper = ({ clickAwayEnabled }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <Button type={TYPES.ACTION} onClick={toggleModal}>Open Modal</Button>
      </div>
      <Modal
        isOpen={isOpen}
        clickAwayEnabled={clickAwayEnabled}
        closeModal={toggleModal}>
        <AddUserChoicePrompt toggleModal={toggleModal} />
      </Modal>
    </div>
  );
};

const GenreDescriptionModalWrapper = ({ genre, clickAwayEnabled }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <Button type={TYPES.ACTION} onClick={toggleModal}>Open Modal</Button>
      </div>
      <Modal
        clickAwayEnabled={clickAwayEnabled}
        isOpen={isOpen}
        closeModal={toggleModal} >
        <GenreDescriptionPreview genre={genre} />
      </Modal>
    </div>
  );
}

const ClickAwayModalWrapper = ({ clickAwayEnabled }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <Button type={TYPES.ACTION} onClick={toggleModal}>Open Modal</Button>
      </div>
      <Modal
        clickAwayEnabled={clickAwayEnabled}
        isOpen={isOpen}
        closeModal={toggleModal} >
        <div className="click-away-container">
          <h1>Title</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </Modal>
    </div>
  );
}

const horror = {
  title: "Horror",
  description: "The Horror genre is replete with tales of the macabre. Oftentimes supernatural in nature, the purpose of these adventures is to invoke terror in the reader. Whether you are being chased by an insane killer, haunted by a vengeful poltergeist, or possessed by a demon, adventures in the Horror genre ratchet up tension with each choice you make and use your fear against you. Common elements include: blood/gore/body horror; ghosts, poltergeists, or demons; zombies, werewolves, vampires, and other supernatural beings."
}

const action_adventure = {
  title: "Action/Adventure",
  description: "Action/Adventure stories typically involve the larger than life exploits of an individual or team of specialists. Plots may have fantastical elements but are always grounded in reality. Common themes include: covert military operations; treasure hunting; daring escapes/breakouts; gun fighting and/or explosions; plane/train/automobile chases."
}

storiesOf('Components|Modal/Click Away To Close')
  .addParameters({ component: Modal })
  .add('Enabled', () => <ClickAwayModalWrapper clickAwayEnabled={true} />)
  .add('Disabled', () => <ClickAwayModalWrapper clickAwayEnabled={false} />)

storiesOf('Components|Modal/Editor Interface', module)
  .addParameters({ component: Modal })
  .add('Add User Choice Prompt', () => {
    return <UserChoiceModalWrapper />;
  })

storiesOf('Components|Modal/Genre Description')
  .addParameters({ component: Modal })
  .add('Horror', ({ genre = horror }) => {
    // }
    return <GenreDescriptionModalWrapper genre={genre} />
  })
  .add('Action/Adventure', ({ genre = action_adventure }) => {
    // }
    return <GenreDescriptionModalWrapper genre={genre} />
  })
  .add('Action/Adventure', ({ genre = action_adventure }) => {
    return <GenreDescriptionModalWrapper genre={genre} />
  })

