import classNames from 'classnames';
import _ from 'lodash';

/**
 *
 * @param baseClass {string, string[]=}
 * @param modifiers {Object}
 * @returns {string}
 */
function mergeModifiers(baseClass, modifiers) {
  const modifierSeparator = '--';

  const baseClasses = (_.isArray(baseClass) ? baseClass : [baseClass]).slice(0, 2);

  if (!modifiers || (!_.isObject(modifiers) && !_.isString(modifiers))) return baseClasses[0];

  if (_.isString(modifiers)) {
    console.warn('Warning: single string for "modifiers" argument');
  }

  let result =
    baseClasses.length === 2 && Boolean(baseClasses[1])
      ? `${baseClasses[0]} ${baseClasses[1]}__${baseClasses[0]}`
      : baseClasses[0];

  classNames(modifiers)
    .split(' ')
    .forEach(modifier => {
      if (!modifier) return;
      result += ` ${baseClasses[0]}${modifierSeparator}${modifier}`;
    });

  return result;
}

const CssUtils = {
  mergeModifiers,
};

export default CssUtils;
