import progressSelector from './progressSelector';

export default function(state) {
  return id => {
    const progress = progressSelector(state)(id);
    return Array.isArray(progress) && progress[progress.length - 1];
  };
}
