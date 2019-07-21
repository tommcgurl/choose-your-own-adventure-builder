import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useDebounce } from '../../../shared/hooks';
import { fillContent } from '../../helpers/pageTurner';
import { updateCurrentProgressPosition } from '../../store/actions/libraryActions';
import { currentBreadcrumbSelector } from '../../store/selectors';
import styles from './ReaderView.module.css';

const ReaderView = ({
  id,
  currentProgressState,
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
  const [showingPrompt, setShowingPrompt] = useState(false);
  const contentElementRef = useRef(null);

  const content = mainStory.storyParts[mainStory.start.nextBranch].plot;
  // currentProgressState.storyPartKey === 'intro'
  //   ? intro
  //   : mainStory.storyParts[currentProgressState.storyPartKey].plot;

  const memoizedFillPage = useCallback(() => {
    const { previousWord, nextWord, pageStart } = fillContent(
      content,
      contentElementRef.current,
      currentProgressState.position,
      true
    );
    setLastWordPositionOnPreviousPage(previousWord);
    setFirstWordPositionOnNextPage(nextWord);
    setLastPosition(pageStart);
  }, [content, currentProgressState]);
  const debouncedFillPage = useDebounce(memoizedFillPage, 200, true);

  useEffect(() => {
    if (lastPosition !== currentProgressState.position && !showingPrompt) {
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
    if (lastWordPositionOnPreviousPage && !showingPrompt) {
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
    } else if (showingPrompt) {
      setShowingPrompt(false);
    } else {
      // TODO
      console.log('handle going back to the last storyPart');
    }
  }

  function handleTurnForwardClick() {
    if (firstWordPositionOnNextPage) {
      setCurrentProgressPosition(id, firstWordPositionOnNextPage);
    } else {
      setShowingPrompt(true);
    }
  }

  return (
    <div className={styles.readerContainer}>
      <div className={styles.readerTopContainer}>
        {/* <Nav /> */}
        {/* <Options /> */}
      </div>
      <div className={styles.readerContentContainer}>
        {showingPrompt ? (
          'prompt'
        ) : (
          <div className={styles.content} ref={contentElementRef} />
        )}
        <div className={styles.overlay}>
          <button
            className={styles.turnPageButton}
            onClick={handleTurnBackClick}
          />
          <button
            className={styles.turnPageButton}
            onClick={handleTurnForwardClick}
            disabled={showingPrompt}
          />
        </div>
      </div>
      <div className={styles.readerBottomContainer} />
    </div>
  );
};

const mapStateToProps = (state, { id }) => {
  return {
    currentProgressState: currentBreadcrumbSelector(state)(id),
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
