import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';
import Button, { VARIANTS } from '../Button/Button';
import Modal from './Modal';
import popModal from './popModal';
import { MODAL_SIZES } from './constants';

const lorem = loremIpsum({ count: 4, units: 'sentences' });

const bigLorem = loremIpsum({ count: 20, units: 'paragraphs' });

storiesOf('Components|Modal', module)
  .addParameters({ component: Modal })
  .add('Click Away To Close Enabled', ({ content = lorem }) => {
    function openModal() {
      popModal(content);
    }

    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  })
  .add('Click Away To Close Disabled', ({ content = lorem }) => {
    function openModal() {
      popModal(content, {
        clickAwayEnabled: false,
      });
    }

    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  })
  .add('Modal with lots of content', ({ content = bigLorem }) => {
    function openModal() {
      popModal(content);
    }
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  })
  .add('Large', ({ content = lorem }) => {
    function openModal() {
      popModal(content, {
        size: MODAL_SIZES.LARGE,
      });
    }
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  })
  .add('Medium', ({ content = lorem }) => {
    function openModal() {
      popModal(content, {
        size: MODAL_SIZES.MEDIUM,
      });
    }
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  })
  .add('Small', ({ content = lorem }) => {
    function openModal() {
      popModal(content, {
        size: MODAL_SIZES.SMALL,
      });
    }
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  })
  .add('with title', ({ content = lorem }) => {
    function openModal() {
      popModal(content, {
        title: 'Title',
      });
    }
    return (
      <div>
        <Button variant={VARIANTS.ACTION} onClick={openModal}>
          Open Modal
        </Button>
        <Modal />
      </div>
    );
  });
