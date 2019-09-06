/**
 *
 * @param {object} theme An object defining the namespacing and values of custom CSS properties
 * @returns An array of { propertyName, value } where the propertyName is the name of the
 * CSS variable and the value is that property's value.
 */
function getCustomCSSProperties(theme) {
  const varsAndVals = [];
  Object.keys(theme).forEach(key => {
    const propertyName = `--${kebabCase(key)}`;
    const value = theme[key];
    if (typeof value === 'object') {
      goDeeper(value, propertyName);
    } else {
      varsAndVals.push({ propertyName, value });
    }

    function goDeeper(namespace, start) {
      Object.keys(namespace).forEach(key => {
        const deeperPropertyName = `${start}-${kebabCase(key)}`;
        const deeperValue = namespace[key];
        if (typeof deeperValue === 'object') {
          goDeeper(deeperValue, deeperPropertyName);
        } else {
          varsAndVals.push({
            propertyName: deeperPropertyName,
            value: deeperValue,
          });
        }
      });
    }
  });

  return varsAndVals;
}

function kebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export default getCustomCSSProperties;
