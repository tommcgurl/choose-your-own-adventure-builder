import React, { useEffect, useRef, useState } from 'react';
import fillNextPage from '../../helpers/pager/fillNextPage';
import fillPreviousPage from '../../helpers/pager/fillPreviousPage';
import splitContent from '../../helpers/pager/splitContent';
import styles from './Page.module.css';

const Page = ({ html }) => {
  const [contentArray, setContentArray] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const pageEl = useRef(null);

  useEffect(() => {
    const content = splitContent(html);
    setContentArray(content);
    const { pageEnd } = fillNextPage(content, pageEl.current, startIndex);
    setEndIndex(pageEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  function handlePrevPageClick() {
    const { pageStart, pageEnd } = fillPreviousPage(
      contentArray,
      pageEl.current,
      startIndex - 1
    );
    setStartIndex(pageStart);
    setEndIndex(pageEnd);
  }

  function handleNextPageClick() {
    const { pageStart, pageEnd } = fillNextPage(
      contentArray,
      pageEl.current,
      endIndex + 1
    );
    setStartIndex(pageStart);
    setEndIndex(pageEnd);
  }

  return (
    <div className={styles.container}>
      <button onClick={handlePrevPageClick}>{'<'}</button>
      <div className={styles.content} ref={pageEl} />
      <button onClick={handleNextPageClick}>{'>'}</button>
    </div>
  );
};

export default Page;
