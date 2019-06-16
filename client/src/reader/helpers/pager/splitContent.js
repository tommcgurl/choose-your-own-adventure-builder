/**
 * Finds index of first occurence of a character in chars
 * @param {string} str
 * @param {(string|string[])} chars
 */
function indexOfFirstOccurrence(str, chars) {
  for (var i = 0; i < str.length; i++) {
    for (var j = 0; j < chars.length; j++) {
      if (str[i] === chars[j]) {
        return i;
      }
    }
  }
  return str.length;
}

export default function splitContent(html) {
  html = html.replace(/(\r\n\t|\n|\r\t)/gm, '');
  const wordsAndTags = [];
  let cycle = 0;
  while (html.length || cycle < 4) {
    if (html[0] === '<') {
      const endOfTag = html.indexOf('>');
      const tag = html.substring(0, endOfTag + 1);
      console.log(tag);
      wordsAndTags.push(tag);
      html = html.substring(endOfTag + 1);
    }
    if (html.length) {
      const wordOrTagPositionAfterNext = html.search(/ \S/);
      console.log(wordOrTagPositionAfterNext);
      const word = html.substring(
        0,
        wordOrTagPositionAfterNext < 0
          ? html.length
          : wordOrTagPositionAfterNext
      );
      console.log(word, word.length);
      wordsAndTags.push(word);
      html = html.substring(wordOrTagPositionAfterNext + 1);
    }
    cycle++;
  }
  return wordsAndTags;
}

// export default function splitInput(input) {
//   // split the input into an array of tags containing arrays of words
//   input = input.replace(/(\r\n\t|\n|\r\t)/gm, '');
//   var words = [];
//   while (input.length > 0) {
//     if (input.charAt(0) == '<') {
//       words.push(input.substr(0, input.indexOf('>') + 1));
//       input = input.substr(input.indexOf('>') + 1).trim();
//       //		var next = indexOfMultiple( input, " <" )
//       //		words[ words.length - 1 ] += input.substr( 0, next ); // attach tags to their closest word
//       //		input = input.substr( next ).trim();
//     }
//     var next = indexOfMultiple(input, ' <');
//     words.push(input.substr(0, next));
//     input = input.substr(next).trim();
//   }
//   return words;
// }

// function indexOfMultiple(str, compare) {
//   // finds index of first occurence of a character in compare
//   for (var i = 0; i < str.length; i++) {
//     var c = str.charAt(i);
//     for (var j = 0; j < compare.length; j++) {
//       if (c == compare[j]) {
//         return i;
//       }
//     }
//   }
//   return str.length;
// }
