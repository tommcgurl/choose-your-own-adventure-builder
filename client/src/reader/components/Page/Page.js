import React, { useEffect, useRef, useState } from 'react';
import fillPage from '../../helpers/pager/fillPage';
import splitContent from '../../helpers/pager/splitContent';
import styles from './Page.module.css';

const Page = ({ html }) => {
  const [contentArray, setContentArray] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(1);
  const [openingTags, setOpeningTags] = useState('');
  const [contentToRender, setContentToRender] = useState('');
  const pageEl = useRef(null);

  useEffect(() => {
    const content = splitContent(html);
    setContentArray(content);
    const { start, end } = fillPage(
      content,
      pageEl.current,
      'forward',
      startIndex,
      endIndex
    );
    setStartIndex(start);
    setEndIndex(end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html]);

  // useEffect(() => {
  //   setOpeningTags(getOpeningTags(contentArray, startIndex));
  // }, [contentArray, startIndex]);

  // useEffect(() => {
  //   console.log('render');
  //   setContentToRender(
  //     openingTags +
  //       contentArray.slice(startIndex, endIndex + 1).join('') +
  //       getClosingTags(contentArray, endIndex + 1)
  //   );
  //   if (checkOverflow(pageEl.current)) {
  //     setContentToRender(
  //       openingTags +
  //         contentArray.slice(startIndex, endIndex).join('') +
  //         getClosingTags(contentArray, endIndex)
  //     );
  //   } else if (endIndex < contentArray.length) {
  //     setEndIndex(endIndex + 1);
  //   }
  // }, [contentArray, openingTags, startIndex, endIndex]);

  function handlePrevPageClick() {
    const newEndIndex = startIndex - 1;
    setStartIndex(newEndIndex - 1);
    setEndIndex(newEndIndex);
  }

  function handleNextPageClick() {
    const { start, end } = fillPage(
      contentArray,
      pageEl.current,
      'forward',
      startIndex,
      endIndex
    );
    setStartIndex(start);
    setEndIndex(end);
  }

  return (
    <div className={styles.container}>
      <button onClick={handlePrevPageClick}>{'<'}</button>
      <div
        className={styles.content}
        ref={pageEl}
        /* dangerouslySetInnerHTML={{ __html: contentToRender }} */
      />
      <button onClick={handleNextPageClick}>{'>'}</button>
    </div>
  );
};

export default Page;
