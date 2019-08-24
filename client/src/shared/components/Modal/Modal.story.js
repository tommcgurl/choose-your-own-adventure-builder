import { storiesOf } from '@storybook/react';
import 'normalize.css';
import React from 'react';
import Button from '../Button/Button';
import Modal from './Modal';
import './Modal.story.css';

const AddUserChoicePrompt = () => {
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
                  Your gonna open the second door! You reach your hand out to
                  grab the knob. When your hand meets the metal you feel an
                  instant burning sensation! You pull your hand away as fast as
                  you can. SON OF A BIT…..
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <Button onClick={toggleModal}>Open Modal</Button>
      </div>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <AddUserChoicePrompt />
      </Modal>
    </div>
  );
};

storiesOf('Components|Modal', module)
  .addParameters({ component: Modal })
  .add('Add User Choice Prompt', () => {
    // const ModalWrapper = () => {
    //   const [isOpen, setIsOpen] = React.useState(false);
    //   const toggleModal = () => {
    //     setIsOpen(!isOpen);
    //   };
    //   return (
    //     <div>
    //       <div>
    //         <Button onClick={toggleModal}>Open Modal</Button>
    //       </div>
    //       <Modal isOpen={isOpen} closeModal={toggleModal}>
    //         <AddUserChoicePrompt />
    //       </Modal>
    //     </div>
    //   );
    // };
    return <ModalWrapper />;
  });
