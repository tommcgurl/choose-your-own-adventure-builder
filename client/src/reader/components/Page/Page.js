import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '../../../shared/hooks/useDebounce';
import { fillPage, splitContent } from '../../helpers/pager';
import styles from './Page.module.css';

const Page = ({ html }) => {
  const [contentArray, setContentArray] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [previousWordIndex, setPreviousWordIndex] = useState(0);
  const [nextWordIndex, setNextWordIndex] = useState(0);
  const debouncedTurnPage = useDebounce(turnPage, 200, true);
  const pageEl = useRef(null);

  useEffect(() => {
    const content = splitContent(html);
    setContentArray(content);
    turnPage(startIndex, true, content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  useEffect(() => {
    function handleResize() {
      debouncedTurnPage(startIndex, true, contentArray);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function turnPage(index, forward = true, content) {
    content = content || contentArray;
    const { previousWord, pageStart, pageEnd, nextWord } = fillPage(
      content,
      pageEl.current,
      index,
      forward
    );
    setStartIndex(pageStart);
    setEndIndex(pageEnd);
    setPreviousWordIndex(previousWord);
    setNextWordIndex(nextWord);
  }

  function handlePrevPageClick() {
    turnPage(startIndex - 1, false);
  }

  function handleNextPageClick() {
    turnPage(endIndex + 1);
  }

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrevPageClick}
        disabled={!Boolean(previousWordIndex)}
      >
        {'<'}
      </button>
      <div className={styles.content} ref={pageEl} />
      <button onClick={handleNextPageClick} disabled={!Boolean(nextWordIndex)}>
        {'>'}
      </button>
    </div>
  );
};

export default Page;
