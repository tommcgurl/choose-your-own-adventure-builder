import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './ReaderView.module.css';
import { connect } from 'react-redux';
import { progressSelector } from '../../store/selectors';
import { fillContent } from '../../helpers/pageTurner';
import { updateCurrentProgressPosition } from '../../store/actions/libraryActions';
import { useDebounce } from '../../../shared/hooks';
import Nav from '../Nav';
import Options from '../Options';

const ReaderView = ({
  id,
  intro,
  progress,
  mainStory,
  setCurrentProgressPosition,
}) => {
  const [lastPosition, setLastPosition] = useState(null);
  const [
    lastWordPositionOnPreviousPage,
    setLastWordPositionOnPreviousPage,
  ] = useState(0);
  const [
    firstWordPositionOnNextPage,
    setFirstWordPositionOnNextPage,
  ] = useState(null);
  const contentElementRef = useRef(null);

  const currentStoryPartKey = progress[progress.length - 1].storyPartKey;
  const content =
    currentStoryPartKey === 'intro'
      ? intro
      : mainStory.storyPart[currentStoryPartKey].plot;
  const currentPosition = progress[progress.length - 1].position;

  const memoizedFillPage = useCallback(() => {
    const { previousWord, nextWord, pageStart } = fillContent(
      content,
      contentElementRef.current,
      currentPosition,
      true
    );
    setLastWordPositionOnPreviousPage(previousWord);
    setFirstWordPositionOnNextPage(nextWord);
    setLastPosition(pageStart);
  }, [content, currentPosition]);
  const debouncedFillPage = useDebounce(memoizedFillPage, 200, true);

  useEffect(() => {
    if (lastPosition !== currentPosition) {
      memoizedFillPage();
    }

    function handleResize() {
      debouncedFillPage();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function handleTurnBackClick() {
    if (lastWordPositionOnPreviousPage) {
      const { previousWord, nextWord, pageStart } = fillContent(
        content,
        contentElementRef.current,
        lastWordPositionOnPreviousPage,
        false
      );
      setLastWordPositionOnPreviousPage(previousWord);
      setFirstWordPositionOnNextPage(nextWord);
      setLastPosition(pageStart);
      setCurrentProgressPosition(id, pageStart);
    } else {
      // TODO
      console.log('handle going back to the last storyPartPrompt');
    }
  }

  function handleTurnForwardClick() {
    if (firstWordPositionOnNextPage) {
      setCurrentProgressPosition(id, firstWordPositionOnNextPage);
    } else {
      // TODO
      console.log('show prompt or whatever');
    }
  }

  return (
    <div className={styles.readerContainer}>
      <div className={styles.readerTopContainer}>
        <Nav />
        <Options />
      </div>
      <div className={styles.readerContentContainer}>
        <button
          className={styles.turnPageButton}
          onClick={handleTurnBackClick}
        />
        <div className={styles.content} ref={contentElementRef} />
        <button
          className={styles.turnPageButton}
          onClick={handleTurnForwardClick}
        />
        {/* <div className={styles.overlay}>
          <button
            className={styles.turnPageButton}
            onClick={handleTurnBackClick}
            disabled={!Boolean(lastWordPositionOnPreviousPage)}
          />
          <button
            className={styles.turnPageButton}
            onClick={handleTurnForwardClick}
            disabled={!Boolean(firstWordPositionOnNextPage)}
          />
        </div> */}
      </div>
      <div className={styles.readerBottomContainer} />
    </div>
  );
};

const mapStateToProps = (state, { id }) => {
  return {
    progress: progressSelector(state)(id),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProgressPosition: (id, newPosition) => {
      dispatch(updateCurrentProgressPosition(id, newPosition));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReaderView);
