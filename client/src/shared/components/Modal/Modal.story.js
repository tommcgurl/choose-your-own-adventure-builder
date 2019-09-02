import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';
import Button, { VARIANTS } from '../Button/Button';
import Modal from './Modal';

const lorem = loremIpsum({ count: 4, units: 'sentences' });

const ModalContent = () => {
  return (
    <div>
      <p>{lorem}</p>
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
  .add('Modal with lots of content', () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
          Open Modal
        </Button>
        <Modal isOpen={isOpen} closeModal={toggleModal}>
          <p>{loremIpsum({ count: 10, units: 'paragraphs' })}</p>
        </Modal>
      </div>
    );
  });
// .add('Large', ({ children = <ModalContent /> }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div>
//       <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
//         Open Modal
//       </Button>
//       <Modal isOpen={isOpen} closeModal={toggleModal} size={sizes.LARGE}>
//         {children}
//       </Modal>
//     </div>
//   );
// })
// .add('Medium', ({ children = <ModalContent /> }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div>
//       <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
//         Open Modal
//       </Button>
//       <Modal isOpen={isOpen} closeModal={toggleModal} size={sizes.MEDIUM}>
//         {children}
//       </Modal>
//     </div>
//   );
// })
// .add('Small', ({ children = <ModalContent /> }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div>
//       <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
//         Open Modal
//       </Button>
//       <Modal isOpen={isOpen} closeModal={toggleModal} size={sizes.SMALL}>
//         {children}
//       </Modal>
//     </div>
//   );
// })
// .add('with title', ({ children = <ModalContent /> }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div>
//       <Button variant={VARIANTS.ACTION} onClick={toggleModal}>
//         Open Modal
//       </Button>
//       <Modal isOpen={isOpen} closeModal={toggleModal} title="Title">
//         {children}
//       </Modal>
//     </div>
//   );
// });
