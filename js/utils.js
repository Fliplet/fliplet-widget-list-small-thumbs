/**
 * Native JavaScript utilities to replace lodash methods
 * Used in Fliplet list-thumb-s widget
 */

window.FlipletSmallThumbUtils = {
  /**
   * Check if a value is empty
   * Replacement for _.isEmpty
   * @param {*} value
   * @returns {boolean}
   */
  isEmpty(value) {
    if (value == null) return true; // null or undefined
    if (typeof value === 'string') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
  },

  /**
   * Debounce function execution
   * Replacement for _.debounce
   * @param {Function} fn - The function to debounce
   * @param {number} delay - Delay in ms
   * @returns {Function}
   */
  debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

    /**
   * Remove elements from array that match predicate
   * Replacement for _.remove()
   * @param {Array} array - The array to modify
   * @param {Function} predicate - The function to test each element
   * @returns {Array} The array of removed elements
   * @description Removes elements from an array that match the predicate function and returns the removed elements
   * @example
   * const arr = [1, 2, 3, 4];
   * FlipletSmallThumbUtils.remove(arr, x => x % 2 === 0); // [2, 4]
   * // arr is now [1, 3]
   */
  remove: function(array, predicate) {
    const removed = [];
    for (let i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i], i, array)) {
        removed.unshift(array.splice(i, 1)[0]);
      }
    }
    return removed;
  },

    /**
   * Iterate over collection
   * Replacement for _.forEach()
   * @param {Array|Object} collection - The collection to iterate over
   * @param {Function} iteratee - The function to call for each element
   * @returns {void}
   * @description Iterates over elements of a collection and calls the iteratee for each element
   * @example
   * FlipletSmallThumbUtils.forEach([1, 2, 3], x => console.log(x)); // logs 1, 2, 3
   * FlipletSmallThumbUtils.forEach({a: 1, b: 2}, (value, key) => console.log(key, value)); // logs 'a 1', 'b 2'
   */
  forEach: function(collection, iteratee) {
    if (Array.isArray(collection)) {
      collection.forEach(iteratee);
    } else if (collection && typeof collection === 'object') {
      Object.keys(collection).forEach(key => iteratee(collection[key], key));
    }
  },

    /**
   * Find first element matching predicate
   * Replacement for _.find()
   * @param {Array} array - The array to search
   * @param {Function|Object|*} predicate - The function, object, or value to test each element
   * @returns {*} The first matching element or undefined
   * @description Finds the first element in an array that matches the predicate
   * @example
   * FlipletSmallThumbUtils.find([1, 2, 3], x => x > 1); // 2
   * FlipletSmallThumbUtils.find([{a: 1}, {a: 2}], {a: 2}); // {a: 2}
   * FlipletSmallThumbUtils.find([1, 2, 3], 2); // 2
   */
  find: function(array, predicate) {
    if (typeof predicate === 'function') {
      return array.find(predicate);
    }
    if (typeof predicate === 'object') {
      return array.find(item => {
        for (let key in predicate) {
          if (predicate.hasOwnProperty(key) && item[key] !== predicate[key]) {
            return false;
          }
        }
        return true;
      });
    }
    return array.find(item => item === predicate);
  },

    /**
   * Safely get a nested property from an object
   * Replacement for _.get()
   * @param {Object} obj - The object to query
   * @param {string|Array} path - The path to the property (dot notation string or array of keys)
   * @param {*} [defaultValue] - The value returned if the path is not found
   * @returns {*} The resolved value or defaultValue
   * @description Safely retrieves a nested property value from an object using dot notation or array path
   * @example
   * FlipletSmallThumbUtils.get({a: {b: 2}}, 'a.b'); // 2
   * FlipletSmallThumbUtils.get({a: {b: 2}}, ['a', 'b']); // 2
   * FlipletSmallThumbUtils.get({a: {b: 2}}, 'a.c', 'default'); // 'default'
   */
  get: function(obj, path, defaultValue) {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }
    
    const keys = Array.isArray(path) ? path : path.split('.');
    let result = obj;
    
    for (let i = 0; i < keys.length; i++) {
      if (result == null || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[keys[i]];
    }
    
    return result === undefined ? defaultValue : result;
  },

  /**
   * Check if value is undefined
   * Replacement for _.isUndefined()
   * @param {*} value - The value to check
   * @returns {boolean} True if the value is undefined, false otherwise
   * @description Checks if a value is undefined
   * @example
   * FlipletSmallThumbUtils.isUndefined(undefined); // true
   * FlipletSmallThumbUtils.isUndefined(null); // false
   */
  isUndefined: function(value) {
    return value === undefined;
  },

  /**
   * Sort array by property or function
   * Replacement for _.sortBy()
   * @param {Array} array - The array to sort
   * @param {Function|string} iteratee - The iteratee function or property path
   * @returns {Array} A new sorted array
   * @description Creates a new array sorted by the result of the iteratee
   * @example
   * FlipletSmallThumbUtils.sortBy([{a: 3}, {a: 1}, {a: 2}], 'a'); // [{a: 1}, {a: 2}, {a: 3}]
   * FlipletSmallThumbUtils.sortBy([3, 1, 2], x => x); // [1, 2, 3]
   */
  sortBy: function(array, iteratee) {
    const getKey = typeof iteratee === 'function' ? iteratee : (item) => this.get(item, iteratee);
    return [...array].sort((a, b) => {
      const valueA = getKey(a);
      const valueB = getKey(b);
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  },
};
