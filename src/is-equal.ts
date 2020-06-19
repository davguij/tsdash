import { GenericObject } from './interfaces/generics';
import { isDate } from './is-date';

/**
 * Compares two objects and returns whether their values are equivalent
 *
 * @typeParam T Type of objects to compare. Both of them have to be of the same type. Type has to extend the standard, generic JavaScript object (with strings as keys).
 * @param first The first object to compare
 * @param second The second object to compare
 */
export function isEqual<T extends GenericObject>(first: T, second: T): boolean {
  for (const key in first) {
    if (second.hasOwnProperty(key) === false) {
      return false;
    }
    const e1 = first[key];
    const e2 = second[key];
    if (typeof e1 !== typeof e2) {
      return false;
    } else if (typeof e1 === 'object') {
      // Dates are also "objects", so we need to check first if elements are date
      // and compare their values if they are
      if (isDate(e1) && isDate(e2) && e1.getTime() !== e2.getTime()) {
        return false;
      } else if (isEqual(e1, e2) === false) {
        return false;
      }
    } else if (e1 !== e2) {
      return false;
    }
  }

  for (const key in second) {
    if (first.hasOwnProperty(key) === false) {
      return false;
    }
  }
  return true;
}
