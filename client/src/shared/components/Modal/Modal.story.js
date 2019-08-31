import { storiesOf } from '@storybook/react';
import 'normalize.css';
import React from 'react';
import Button, { VARIANTS } from '../Button/Button';
import Modal, { sizes } from './Modal';

const ModalContent = () => {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );
};

storiesOf('Components|Modal', module)
  .addParameters({ component: Modal })
  .add('Click Away To Close Enabled', ({ children = <ModalContent /> }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal clickAwayEnabled={true} isOpen={isOpen} closeModal={toggleModal}>
          {children}
        </Modal>
      </div>
    );
  })
  .add('Click Away To Close Disabled', ({ children = <ModalContent /> }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal
          clickAwayEnabled={false}
          isOpen={isOpen}
          closeModal={toggleModal}
        >
          {children}
        </Modal>
      </div>
    );
  })
  .add('Large', ({ children = <ModalContent /> }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} closeModal={toggleModal} size={sizes.LARGE}>
          {children}
        </Modal>
      </div>
    );
  })
  .add('Medium', ({ children = <ModalContent /> }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} closeModal={toggleModal} size={sizes.MEDIUM}>
          {children}
        </Modal>
      </div>
    );
  })
  .add('Small', ({ children = <ModalContent /> }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} closeModal={toggleModal} size={sizes.SMALL}>
          {children}
        </Modal>
      </div>
    );
  })
  .add('with title', ({ children = <ModalContent /> }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} closeModal={toggleModal} title="Title">
          {children}
        </Modal>
      </div>
    );
  });
