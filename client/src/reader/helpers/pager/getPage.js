import checkOverflow from './checkOverflow';

var pageStart = 0;
var pageEnd = 0;

export default function getPage(splitContent, ref, direction) {
  var oldContent = '';
  var newContent = '';
  ref.innerHTML = '';
  let testCount = 0;

  // fill the page until it overflows
  while (testCount < 5 /* && !checkOverflow(ref)*/) {
    testCount++;
    if (pageEnd >= splitContent.length && direction === 'forward') {
      // console.log('early return');
      return;
    }
    oldContent = newContent;
    newContent = '';
    for (let i = pageStart; i < pageEnd; i++) {
      newContent += splitContent[i];
    }
    ref.innerHTML = newContent;
    // console.log(newContent);
    if (direction === 'forward') {
      pageEnd++;
    }
    if (direction === 'back') {
      pageStart--;
      if (pageStart <= 0) {
        pageStart = 0;
        direction = 'forward';
      }
    }
  }
  ref.innerHTML = oldContent;
  if (oldContent[0] !== '<') {
    // put beginning tags if missing
    var i = pageStart;
    while (
      splitContent[i][i] !== '<' ||
      splitContent[i].substr(0, 2) === '</'
    ) {
      i--;
    }
    ref.innerHTML = splitContent[i] + oldContent;
  }
  pageEnd -= 2;
}
