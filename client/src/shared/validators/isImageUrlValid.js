import isURL from 'validator/lib/isURL';

export default function isImageUrlValid(string) {
  if (!isURL(string, { require_protocol: true })) {
    return false;
  }
  return /\.(gif|jpg|jpeg|tiff|png)$/i.test(string);
}
