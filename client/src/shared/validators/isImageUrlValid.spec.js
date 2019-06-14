import isImageUrlValid from './isImageUrlValid';

it('checks if the URL ends with an appropriate image filetype', () => {
  const result = isImageUrlValid('https://i.imgur.com/Wofs2nU.txt');
  expect(result).toBe(false);
});
