import { isEmptyOrSpecialCharacters } from '../../shared/validators';

export default function(name, storyParts) {
  return (
    !isEmptyOrSpecialCharacters(name) &&
    !Object.values(storyParts).some(part => part.name === name.trim())
  );
}
