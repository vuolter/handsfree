(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Handsfree = factory());
}(this, (function () { 'use strict';

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol = _root.Symbol;

  var _Symbol = Symbol;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var Map = _getNative(_root, 'Map');

  var _Map = Map;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq_1(object[key], value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignMergeValue = assignMergeValue;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var _createBaseFor = createBaseFor;

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
  });

  /** Built-in value references. */
  var Uint8Array = _root.Uint8Array;

  var _Uint8Array = Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  var _baseCreate = baseCreate;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike_1(value) && isArrayLike_1(value);
  }

  var isArrayLikeObject_1 = isArrayLikeObject;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
      objectProto$7 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString$2.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString$2.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports =  exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  var _safeGet = safeGet;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$7.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return _copyObject(value, keysIn_1(value));
  }

  var toPlainObject_1 = toPlainObject;

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = _safeGet(object, key),
        srcValue = _safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      _assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray_1(srcValue),
          isBuff = !isArr && isBuffer_1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray_1(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject_1(objValue)) {
          newValue = _copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = _cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = _cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
        newValue = objValue;
        if (isArguments_1(objValue)) {
          newValue = toPlainObject_1(objValue);
        }
        else if (!isObject_1(objValue) || isFunction_1(objValue)) {
          newValue = _initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    _assignMergeValue(object, key, newValue);
  }

  var _baseMergeDeep = baseMergeDeep;

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    _baseFor(source, function(srcValue, key) {
      stack || (stack = new _Stack);
      if (isObject_1(srcValue)) {
        _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        _assignMergeValue(object, key, newValue);
      }
    }, keysIn_1);
  }

  var _baseMerge = baseMerge;

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var _apply = apply;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return _apply(func, this, otherArgs);
    };
  }

  var _overRest = overRest;

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  var constant_1 = constant;

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
    return _defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant_1(string),
      'writable': true
    });
  };

  var _baseSetToString = baseSetToString;

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  var _shortOut = shortOut;

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = _shortOut(_baseSetToString);

  var _setToString = setToString;

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return _setToString(_overRest(func, start, identity_1), func + '');
  }

  var _baseRest = baseRest;

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject_1(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike_1(object) && _isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq_1(object[index], value);
    }
    return false;
  }

  var _isIterateeCall = isIterateeCall;

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return _baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  var _createAssigner = createAssigner;

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = _createAssigner(function(object, source, srcIndex) {
    _baseMerge(object, source, srcIndex);
  });

  var merge_1 = merge;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  var _baseSlice = baseSlice;

  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return (!start && end >= length) ? array : _baseSlice(array, start, end);
  }

  var _castSlice = castSlice;

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  var _baseFindIndex = baseFindIndex;

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  var _baseIsNaN = baseIsNaN;

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  var _strictIndexOf = strictIndexOf;

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? _strictIndexOf(array, value, fromIndex)
      : _baseFindIndex(array, _baseIsNaN, fromIndex);
  }

  var _baseIndexOf = baseIndexOf;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  var _charsEndIndex = charsEndIndex;

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  var _charsStartIndex = charsStartIndex;

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  var _asciiToArray = asciiToArray;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsVarRange = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsZWJ = '\\u200d';

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  var _hasUnicode = hasUnicode;

  /** Used to compose unicode character classes. */
  var rsAstralRange$1 = '\\ud800-\\udfff',
      rsComboMarksRange$1 = '\\u0300-\\u036f',
      reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsVarRange$1 = '\\ufe0e\\ufe0f';

  /** Used to compose unicode capture groups. */
  var rsAstral = '[' + rsAstralRange$1 + ']',
      rsCombo = '[' + rsComboRange$1 + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange$1 + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsZWJ$1 = '\\u200d';

  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange$1 + ']?',
      rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  var _unicodeToArray = unicodeToArray;

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return _hasUnicode(string)
      ? _unicodeToArray(string)
      : _asciiToArray(string);
  }

  var _stringToArray = stringToArray;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    string = toString_1(string);
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrim, '');
    }
    if (!string || !(chars = _baseToString(chars))) {
      return string;
    }
    var strSymbols = _stringToArray(string),
        chrSymbols = _stringToArray(chars),
        start = _charsStartIndex(strSymbols, chrSymbols),
        end = _charsEndIndex(strSymbols, chrSymbols) + 1;

    return _castSlice(strSymbols, start, end).join('');
  }

  var trim_1 = trim;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return _root.Date.now();
  };

  var now_1 = now;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim$1 = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim$1, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max,
      nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax$1(toNumber_1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now_1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now_1());
    }

    function debounced() {
      var time = now_1(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  var debounce_1 = debounce;

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    if (isObject_1(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce_1(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }

  var throttle_1 = throttle;

  // Number of scripts still being loaded
  let numScriptsLoading = 0;

  class BaseModel {
    constructor(config, handsfree) {
      this.config = config;
      this.handsfree = handsfree;

      // Inference only happens when this is true
      this.enabled = true;

      // Turns true when dependencies are loaded
      this.dependenciesReady = false;
      // This is true when we can run inference
      this.isReady = false;

      this.loadDependencies(config.deps);

      // Apply throttle
      this._getData = this.getData;
      this.throttle(this._getData, this.config.throttle);
    }

    /**
     * Detects if device is mobile
     */
    isMobile() {
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isAndroid || isiOS;
    }

    /**
     * Enable this model
     */
    enable() {
      this.enabled = true;
      let modelIdx = this.handsfree.activeModels.indexOf(this.name);
      if (modelIdx !== -1) this.handsfree.activeModels.splice(modelIdx, 1);
    }

    /**
     * Disable this model
     */
    disable() {
      this.enabled = false;
      this.handsfree.activeModels.push(this.name);
    }

    /**
     * Triggers an event on the document
     *
     * @param {String} eventName The event name, appended as `handsfree-${eventName}`
     */
    emit(eventName, detail = null) {
      const event = new CustomEvent(`handsfree-${eventName}`, detail);
      document.dispatchEvent(event);
    }

    /**
     * Calls a callback on `document` when an event is triggered
     *
     * @param {String} eventName The `handsfree-${eventName}` to listen to
     * @param {Function} callback The callback to call
     */
    on(eventName, callback) {
      document.addEventListener(`handsfree-${eventName}`, callback);
    }

    /**
     * Called when depenencies are loaded
     */
    onDepsLoaded() {}

    /**
     * Loads a set of scripts and runs a callback when they're all ready
     *
     * @param {String|Array} scripts A list of scripts to load
     * @param {Function} cb The callback to run
     */
    loadDependencies(scripts) {
      if (typeof scripts === 'string') scripts = [scripts];

      let scriptsLoaded = 0;
      numScriptsLoading += scripts.length;

      scripts.forEach((script) => {
        const $script = document.createElement('script');
        $script.async = true;

        // Increment the counter and call callback
        $script.onload = () => {
          numScriptsLoading -= 1;

          // Call callback after this set of scripts is loaded
          if (++scriptsLoaded === scripts.length) {
            this.dependenciesReady = true;
            this.onDepsLoaded();
          }
        };

        $script.src = script;
        document.getElementsByTagName('head')[0].appendChild($script);
      });
    }

    /**
     * Runs inference and sets up other data
     */
    getData() {}

    /**
     * Throttles the model, running it every few milliseconds
     *
     * @param {Number} time The amount of milliseconds to throttle this model by
     * @param {Object} opts {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
     */
    throttle(time, opts) {
      this.getData = throttle_1(this._getData, time, opts);
    }
  }

  class Calibrator {
    constructor(config, handsfree) {
      this.config = config;
      this.handsfree = handsfree;

      // The main wrapping element
      this.$wrap = null;
      // The calibration target
      this.$target = null;

      this.prepareWrap();

      this.setupPlugin();
    }

    /**
     * Creates the main calibration overlay
     */
    prepareWrap() {
      // Wrap
      this.$wrap = document.createElement('DIV');
      this.$wrap.classList.add('handsfree-calibrator-wrap');

      // Instructions
      let $p = document.createElement('p');
      $p.innerHTML = this.config.calibrator.instructions;
      this.$wrap.appendChild($p);

      // Marker
      let $marker = document.createElement('DIV');
      $marker.classList.add('handsfree-calibrator-marker');
      this.$target = $marker;
      this.$wrap.appendChild($marker);

      document.body.appendChild(this.$wrap);
    }

    /**
     * Starts the calibration
     */
    start() {
      this.$wrap.classList.add('handsfree-visible');
      this.handsfree.plugin.webojiCalibration.framesCalibrated = 0;
      this.handsfree.plugin.webojiCalibration.enable();
      document.body.classList.add('handsfree-calibrating');

      // Disable calibration on calibration
      this.handsfree.on('handsfreeCalibrationEnded', () => {
        this.handsfree.plugin.webojiCalibration.disable();
        document.body.classList.remove('handsfree-calibrating');
        this.$wrap.classList.remove('handsfree-visible');
      });
    }

    /**
     * Creates a plugin used during calibration
     */
    setupPlugin() {
      const plugin = this;

      /**
       * Calibration plugin
       */
      this.handsfree.use('webojiCalibration', {
        enabled: false,
        framesCalibrated: 0,
        numFramesToCalibrate: 60,

        onFrame({ weboji }) {
          const bounds = plugin.$target.getBoundingClientRect();
          const center = {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2
          };
          const dist = Math.sqrt(
            Math.pow(weboji.pointer.x - center.x, 2) +
              Math.pow(weboji.pointer.y - center.y, 2)
          );

          this.step(weboji, dist, center);
          this.maybeEndCalibration(dist);
        },

        /**
         * Step the pointer towards the center
         */
        step(weboji, dist, center) {
          const stepSize = dist < 60 ? 0.1 : 0.5;

          // Move toward center
          if (weboji.pointer.x < center.x) {
            handsfree.plugin.facePointer.config.offset.yaw += stepSize;
          } else {
            handsfree.plugin.facePointer.config.offset.yaw -= stepSize;
          }
          if (weboji.pointer.y < center.y) {
            handsfree.plugin.facePointer.config.offset.pitch += stepSize;
          } else {
            handsfree.plugin.facePointer.config.offset.pitch -= stepSize;
          }
        },

        /**
         * Ends calibration when the pointer is near the center
         */
        maybeEndCalibration(dist) {
          if (dist < 20) {
            this.framesCalibrated++;
          } else {
            this.framesCalibrated = 0;
          }

          if (this.framesCalibrated > this.numFramesToCalibrate) {
            this.handsfree.emit('handsfreeCalibrationEnded');
          }
        }
      });
    }
  }

  var lodash = createCommonjsModule(function (module, exports) {
  (function() {

    /** Used as a safe reference for `undefined` in pre-ES5 environments. */
    var undefined$1;

    /** Used as the semantic version number. */
    var VERSION = '4.17.20';

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /** Error message constants. */
    var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
        FUNC_ERROR_TEXT = 'Expected a function';

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used as the maximum memoize cache size. */
    var MAX_MEMOIZE_SIZE = 500;

    /** Used as the internal argument placeholder. */
    var PLACEHOLDER = '__lodash_placeholder__';

    /** Used to compose bitmasks for cloning. */
    var CLONE_DEEP_FLAG = 1,
        CLONE_FLAT_FLAG = 2,
        CLONE_SYMBOLS_FLAG = 4;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;

    /** Used to compose bitmasks for function metadata. */
    var WRAP_BIND_FLAG = 1,
        WRAP_BIND_KEY_FLAG = 2,
        WRAP_CURRY_BOUND_FLAG = 4,
        WRAP_CURRY_FLAG = 8,
        WRAP_CURRY_RIGHT_FLAG = 16,
        WRAP_PARTIAL_FLAG = 32,
        WRAP_PARTIAL_RIGHT_FLAG = 64,
        WRAP_ARY_FLAG = 128,
        WRAP_REARG_FLAG = 256,
        WRAP_FLIP_FLAG = 512;

    /** Used as default options for `_.truncate`. */
    var DEFAULT_TRUNC_LENGTH = 30,
        DEFAULT_TRUNC_OMISSION = '...';

    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /** Used to indicate the type of lazy iteratees. */
    var LAZY_FILTER_FLAG = 1,
        LAZY_MAP_FLAG = 2,
        LAZY_WHILE_FLAG = 3;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991,
        MAX_INTEGER = 1.7976931348623157e+308,
        NAN = 0 / 0;

    /** Used as references for the maximum length and index of an array. */
    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

    /** Used to associate wrap methods with their bit flags. */
    var wrapFlags = [
      ['ary', WRAP_ARY_FLAG],
      ['bind', WRAP_BIND_FLAG],
      ['bindKey', WRAP_BIND_KEY_FLAG],
      ['curry', WRAP_CURRY_FLAG],
      ['curryRight', WRAP_CURRY_RIGHT_FLAG],
      ['flip', WRAP_FLIP_FLAG],
      ['partial', WRAP_PARTIAL_FLAG],
      ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
      ['rearg', WRAP_REARG_FLAG]
    ];

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        asyncTag = '[object AsyncFunction]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        domExcTag = '[object DOMException]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        nullTag = '[object Null]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        proxyTag = '[object Proxy]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        undefinedTag = '[object Undefined]',
        weakMapTag = '[object WeakMap]',
        weakSetTag = '[object WeakSet]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to match empty string literals in compiled template source. */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

    /** Used to match HTML entities and HTML characters. */
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
        reUnescapedHtml = /[&<>"']/g,
        reHasEscapedHtml = RegExp(reEscapedHtml.source),
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

    /** Used to match template delimiters. */
    var reEscape = /<%-([\s\S]+?)%>/g,
        reEvaluate = /<%([\s\S]+?)%>/g,
        reInterpolate = /<%=([\s\S]+?)%>/g;

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
        reHasRegExpChar = RegExp(reRegExpChar.source);

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g,
        reTrimStart = /^\s+/,
        reTrimEnd = /\s+$/;

    /** Used to match wrap detail comments. */
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
        reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
        reSplitDetails = /,? & /;

    /** Used to match words composed of alphanumeric characters. */
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Used to match
     * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
     */
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /** Used to match Latin Unicode letters (excluding mathematical operators). */
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

    /** Used to ensure capturing order of template delimiters. */
    var reNoMatch = /($^)/;

    /** Used to match unescaped characters in compiled string literals. */
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff',
        rsComboMarksRange = '\\u0300-\\u036f',
        reComboHalfMarksRange = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange = '\\u20d0-\\u20ff',
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsDingbatRange = '\\u2700-\\u27bf',
        rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
        rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        rsPunctuationRange = '\\u2000-\\u206f',
        rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        rsVarRange = '\\ufe0e\\ufe0f',
        rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

    /** Used to compose unicode capture groups. */
    var rsApos = "['\u2019]",
        rsAstral = '[' + rsAstralRange + ']',
        rsBreak = '[' + rsBreakRange + ']',
        rsCombo = '[' + rsComboRange + ']',
        rsDigits = '\\d+',
        rsDingbat = '[' + rsDingbatRange + ']',
        rsLower = '[' + rsLowerRange + ']',
        rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
        rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsUpper = '[' + rsUpperRange + ']',
        rsZWJ = '\\u200d';

    /** Used to compose unicode regexes. */
    var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
        rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
        rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
        rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
        reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange + ']?',
        rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
        rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
        rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

    /** Used to match apostrophes. */
    var reApos = RegExp(rsApos, 'g');

    /**
     * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
     * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
     */
    var reComboMark = RegExp(rsCombo, 'g');

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /** Used to match complex or compound words. */
    var reUnicodeWord = RegExp([
      rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
      rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
      rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
      rsUpper + '+' + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join('|'), 'g');

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

    /** Used to detect strings that need a more robust regexp to match words. */
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

    /** Used to assign default `context` object properties. */
    var contextProps = [
      'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
      'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
      'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
      'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
      '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
    ];

    /** Used to make template sourceURLs easier to identify. */
    var templateCounter = -1;

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;

    /** Used to map Latin Unicode letters to basic Latin letters. */
    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
      '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
      '\xc7': 'C',  '\xe7': 'c',
      '\xd0': 'D',  '\xf0': 'd',
      '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
      '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
      '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
      '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
      '\xd1': 'N',  '\xf1': 'n',
      '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
      '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
      '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
      '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
      '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
      '\xc6': 'Ae', '\xe6': 'ae',
      '\xde': 'Th', '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
      '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
      '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
      '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
      '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
      '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
      '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
      '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
      '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
      '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
      '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
      '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
      '\u0134': 'J',  '\u0135': 'j',
      '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
      '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
      '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
      '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
      '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
      '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
      '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
      '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
      '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
      '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
      '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
      '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
      '\u0163': 't',  '\u0165': 't', '\u0167': 't',
      '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
      '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
      '\u0174': 'W',  '\u0175': 'w',
      '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
      '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
      '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
      '\u0132': 'IJ', '\u0133': 'ij',
      '\u0152': 'Oe', '\u0153': 'oe',
      '\u0149': "'n", '\u017f': 's'
    };

    /** Used to map characters to HTML entities. */
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    /** Used to map HTML entities to characters. */
    var htmlUnescapes = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    };

    /** Used to escape characters for inclusion in compiled string literals. */
    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };

    /** Built-in method references without a dependency on `root`. */
    var freeParseFloat = parseFloat,
        freeParseInt = parseInt;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    /* Node.js helper references. */
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
        nodeIsDate = nodeUtil && nodeUtil.isDate,
        nodeIsMap = nodeUtil && nodeUtil.isMap,
        nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
        nodeIsSet = nodeUtil && nodeUtil.isSet,
        nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    /*--------------------------------------------------------------------------*/

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /**
     * A specialized version of `baseAggregator` for arrays.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.forEachRight` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;

      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.every` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
    function arrayEvery(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.includes` for arrays without support for
     * specifying an index to search from.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }

    /**
     * This function is like `arrayIncludes` except that it accepts a comparator.
     *
     * @private
     * @param {Array} [array] The array to inspect.
     * @param {*} target The value to search for.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {boolean} Returns `true` if `target` is found, else `false`.
     */
    function arrayIncludesWith(array, value, comparator) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array == null ? 0 : array.length;

      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.reduceRight` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the last element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * Gets the size of an ASCII `string`.
     *
     * @private
     * @param {string} string The string inspect.
     * @returns {number} Returns the string size.
     */
    var asciiSize = baseProperty('length');

    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }

    /**
     * Splits an ASCII `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }

    /**
     * The base implementation of methods like `_.findKey` and `_.findLastKey`,
     * without support for iteratee shorthands, which iterates over `collection`
     * using `eachFunc`.
     *
     * @private
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
    function baseFindKey(collection, predicate, eachFunc) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = key;
          return false;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.findIndex` and `_.findLastIndex` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} predicate The function invoked per iteration.
     * @param {number} fromIndex The index to search from.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);

      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      return value === value
        ? strictIndexOf(array, value, fromIndex)
        : baseFindIndex(array, baseIsNaN, fromIndex);
    }

    /**
     * This function is like `baseIndexOf` except that it accepts a comparator.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @param {Function} comparator The comparator invoked per element.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.isNaN` without support for number objects.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    function baseIsNaN(value) {
      return value !== value;
    }

    /**
     * The base implementation of `_.mean` and `_.meanBy` without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the mean.
     */
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? (baseSum(array, iteratee) / length) : NAN;
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined$1 : object[key];
      };
    }

    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined$1 : object[key];
      };
    }

    /**
     * The base implementation of `_.reduce` and `_.reduceRight`, without support
     * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initAccum Specify using the first or last element of
     *  `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initAccum
          ? (initAccum = false, value)
          : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define the
     * sort order of `array` and replaces criteria objects with their corresponding
     * values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
    function baseSortBy(array, comparer) {
      var length = array.length;

      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }

    /**
     * The base implementation of `_.sum` and `_.sumBy` without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function baseSum(array, iteratee) {
      var result,
          index = -1,
          length = array.length;

      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined$1) {
          result = result === undefined$1 ? current : (result + current);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
     * of key-value pairs for `object` corresponding to the property names of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the key-value pairs.
     */
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }

    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    /**
     * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the first unmatched string symbol.
     */
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1,
          length = strSymbols.length;

      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    /**
     * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
     * that is not found in the character symbols.
     *
     * @private
     * @param {Array} strSymbols The string symbols to inspect.
     * @param {Array} chrSymbols The character symbols to find.
     * @returns {number} Returns the index of the last unmatched string symbol.
     */
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;

      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
      return index;
    }

    /**
     * Gets the number of `placeholder` occurrences in `array`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} placeholder The placeholder to search for.
     * @returns {number} Returns the placeholder count.
     */
    function countHolders(array, placeholder) {
      var length = array.length,
          result = 0;

      while (length--) {
        if (array[length] === placeholder) {
          ++result;
        }
      }
      return result;
    }

    /**
     * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
     * letters to basic Latin letters.
     *
     * @private
     * @param {string} letter The matched letter to deburr.
     * @returns {string} Returns the deburred letter.
     */
    var deburrLetter = basePropertyOf(deburredLetters);

    /**
     * Used by `_.escape` to convert characters to HTML entities.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    var escapeHtmlChar = basePropertyOf(htmlEscapes);

    /**
     * Used by `_.template` to escape characters for inclusion in compiled string literals.
     *
     * @private
     * @param {string} chr The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeStringChar(chr) {
      return '\\' + stringEscapes[chr];
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined$1 : object[key];
    }

    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    /**
     * Checks if `string` contains a word composed of Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a word is found, else `false`.
     */
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }

    /**
     * Converts `iterator` to an array.
     *
     * @private
     * @param {Object} iterator The iterator to convert.
     * @returns {Array} Returns the converted array.
     */
    function iteratorToArray(iterator) {
      var data,
          result = [];

      while (!(data = iterator.next()).done) {
        result.push(data.value);
      }
      return result;
    }

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /**
     * Replaces all `placeholder` elements in `array` with an internal placeholder
     * and returns an array of their indexes.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {*} placeholder The placeholder to replace.
     * @returns {Array} Returns the new array of placeholder indexes.
     */
    function replaceHolders(array, placeholder) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result[resIndex++] = index;
        }
      }
      return result;
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    /**
     * Converts `set` to its value-value pairs.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the value-value pairs.
     */
    function setToPairs(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = [value, value];
      });
      return result;
    }

    /**
     * A specialized version of `_.indexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1,
          length = array.length;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * A specialized version of `_.lastIndexOf` which performs strict equality
     * comparisons of values, i.e. `===`.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} fromIndex The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }

    /**
     * Gets the number of symbols in `string`.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {number} Returns the string size.
     */
    function stringSize(string) {
      return hasUnicode(string)
        ? unicodeSize(string)
        : asciiSize(string);
    }

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return hasUnicode(string)
        ? unicodeToArray(string)
        : asciiToArray(string);
    }

    /**
     * Used by `_.unescape` to convert HTML entities to characters.
     *
     * @private
     * @param {string} chr The matched character to unescape.
     * @returns {string} Returns the unescaped character.
     */
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

    /**
     * Gets the size of a Unicode `string`.
     *
     * @private
     * @param {string} string The string inspect.
     * @returns {number} Returns the string size.
     */
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }

    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }

    /**
     * Splits a Unicode `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Create a new pristine `lodash` function using the `context` object.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Util
     * @param {Object} [context=root] The context object.
     * @returns {Function} Returns a new `lodash` function.
     * @example
     *
     * _.mixin({ 'foo': _.constant('foo') });
     *
     * var lodash = _.runInContext();
     * lodash.mixin({ 'bar': lodash.constant('bar') });
     *
     * _.isFunction(_.foo);
     * // => true
     * _.isFunction(_.bar);
     * // => false
     *
     * lodash.isFunction(lodash.foo);
     * // => false
     * lodash.isFunction(lodash.bar);
     * // => true
     *
     * // Create a suped-up `defer` in Node.js.
     * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
     */
    var runInContext = (function runInContext(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

      /** Built-in constructor references. */
      var Array = context.Array,
          Date = context.Date,
          Error = context.Error,
          Function = context.Function,
          Math = context.Math,
          Object = context.Object,
          RegExp = context.RegExp,
          String = context.String,
          TypeError = context.TypeError;

      /** Used for built-in method references. */
      var arrayProto = Array.prototype,
          funcProto = Function.prototype,
          objectProto = Object.prototype;

      /** Used to detect overreaching core-js shims. */
      var coreJsData = context['__core-js_shared__'];

      /** Used to resolve the decompiled source of functions. */
      var funcToString = funcProto.toString;

      /** Used to check objects for own properties. */
      var hasOwnProperty = objectProto.hasOwnProperty;

      /** Used to generate unique IDs. */
      var idCounter = 0;

      /** Used to detect methods masquerading as native. */
      var maskSrcKey = (function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
        return uid ? ('Symbol(src)_1.' + uid) : '';
      }());

      /**
       * Used to resolve the
       * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
       * of values.
       */
      var nativeObjectToString = objectProto.toString;

      /** Used to infer the `Object` constructor. */
      var objectCtorString = funcToString.call(Object);

      /** Used to restore the original `_` reference in `_.noConflict`. */
      var oldDash = root._;

      /** Used to detect if a method is native. */
      var reIsNative = RegExp('^' +
        funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
      );

      /** Built-in value references. */
      var Buffer = moduleExports ? context.Buffer : undefined$1,
          Symbol = context.Symbol,
          Uint8Array = context.Uint8Array,
          allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1,
          getPrototype = overArg(Object.getPrototypeOf, Object),
          objectCreate = Object.create,
          propertyIsEnumerable = objectProto.propertyIsEnumerable,
          splice = arrayProto.splice,
          spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1,
          symIterator = Symbol ? Symbol.iterator : undefined$1,
          symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;

      var defineProperty = (function() {
        try {
          var func = getNative(Object, 'defineProperty');
          func({}, '', {});
          return func;
        } catch (e) {}
      }());

      /** Mocked built-ins. */
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
          ctxNow = Date && Date.now !== root.Date.now && Date.now,
          ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

      /* Built-in method references for those with the same name as other `lodash` methods. */
      var nativeCeil = Math.ceil,
          nativeFloor = Math.floor,
          nativeGetSymbols = Object.getOwnPropertySymbols,
          nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1,
          nativeIsFinite = context.isFinite,
          nativeJoin = arrayProto.join,
          nativeKeys = overArg(Object.keys, Object),
          nativeMax = Math.max,
          nativeMin = Math.min,
          nativeNow = Date.now,
          nativeParseInt = context.parseInt,
          nativeRandom = Math.random,
          nativeReverse = arrayProto.reverse;

      /* Built-in method references that are verified to be native. */
      var DataView = getNative(context, 'DataView'),
          Map = getNative(context, 'Map'),
          Promise = getNative(context, 'Promise'),
          Set = getNative(context, 'Set'),
          WeakMap = getNative(context, 'WeakMap'),
          nativeCreate = getNative(Object, 'create');

      /** Used to store function metadata. */
      var metaMap = WeakMap && new WeakMap;

      /** Used to lookup unminified function names. */
      var realNames = {};

      /** Used to detect maps, sets, and weakmaps. */
      var dataViewCtorString = toSource(DataView),
          mapCtorString = toSource(Map),
          promiseCtorString = toSource(Promise),
          setCtorString = toSource(Set),
          weakMapCtorString = toSource(WeakMap);

      /** Used to convert symbols to primitives and strings. */
      var symbolProto = Symbol ? Symbol.prototype : undefined$1,
          symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1,
          symbolToString = symbolProto ? symbolProto.toString : undefined$1;

      /*------------------------------------------------------------------------*/

      /**
       * Creates a `lodash` object which wraps `value` to enable implicit method
       * chain sequences. Methods that operate on and return arrays, collections,
       * and functions can be chained together. Methods that retrieve a single value
       * or may return a primitive value will automatically end the chain sequence
       * and return the unwrapped value. Otherwise, the value must be unwrapped
       * with `_#value`.
       *
       * Explicit chain sequences, which must be unwrapped with `_#value`, may be
       * enabled using `_.chain`.
       *
       * The execution of chained methods is lazy, that is, it's deferred until
       * `_#value` is implicitly or explicitly called.
       *
       * Lazy evaluation allows several methods to support shortcut fusion.
       * Shortcut fusion is an optimization to merge iteratee calls; this avoids
       * the creation of intermediate arrays and can greatly reduce the number of
       * iteratee executions. Sections of a chain sequence qualify for shortcut
       * fusion if the section is applied to an array and iteratees accept only
       * one argument. The heuristic for whether a section qualifies for shortcut
       * fusion is subject to change.
       *
       * Chaining is supported in custom builds as long as the `_#value` method is
       * directly or indirectly included in the build.
       *
       * In addition to lodash methods, wrappers have `Array` and `String` methods.
       *
       * The wrapper `Array` methods are:
       * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
       *
       * The wrapper `String` methods are:
       * `replace` and `split`
       *
       * The wrapper methods that support shortcut fusion are:
       * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
       * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
       * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
       *
       * The chainable wrapper methods are:
       * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
       * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
       * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
       * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
       * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
       * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
       * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
       * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
       * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
       * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
       * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
       * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
       * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
       * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
       * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
       * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
       * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
       * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
       * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
       * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
       * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
       * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
       * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
       * `zipObject`, `zipObjectDeep`, and `zipWith`
       *
       * The wrapper methods that are **not** chainable by default are:
       * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
       * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
       * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
       * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
       * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
       * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
       * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
       * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
       * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
       * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
       * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
       * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
       * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
       * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
       * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
       * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
       * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
       * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
       * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
       * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
       * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
       * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
       * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
       * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
       * `upperFirst`, `value`, and `words`
       *
       * @name _
       * @constructor
       * @category Seq
       * @param {*} value The value to wrap in a `lodash` instance.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var wrapped = _([1, 2, 3]);
       *
       * // Returns an unwrapped value.
       * wrapped.reduce(_.add);
       * // => 6
       *
       * // Returns a wrapped value.
       * var squares = wrapped.map(square);
       *
       * _.isArray(squares);
       * // => false
       *
       * _.isArray(squares.value());
       * // => true
       */
      function lodash(value) {
        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty.call(value, '__wrapped__')) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }

      /**
       * The base implementation of `_.create` without support for assigning
       * properties to the created object.
       *
       * @private
       * @param {Object} proto The object to inherit from.
       * @returns {Object} Returns the new object.
       */
      var baseCreate = (function() {
        function object() {}
        return function(proto) {
          if (!isObject(proto)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto);
          }
          object.prototype = proto;
          var result = new object;
          object.prototype = undefined$1;
          return result;
        };
      }());

      /**
       * The function whose prototype chain sequence wrappers inherit from.
       *
       * @private
       */
      function baseLodash() {
        // No operation performed.
      }

      /**
       * The base constructor for creating `lodash` wrapper objects.
       *
       * @private
       * @param {*} value The value to wrap.
       * @param {boolean} [chainAll] Enable explicit method chain sequences.
       */
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$1;
      }

      /**
       * By default, the template delimiters used by lodash are like those in
       * embedded Ruby (ERB) as well as ES2015 template strings. Change the
       * following template settings to use alternative delimiters.
       *
       * @static
       * @memberOf _
       * @type {Object}
       */
      lodash.templateSettings = {

        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        'escape': reEscape,

        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        'evaluate': reEvaluate,

        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        'interpolate': reInterpolate,

        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        'variable': '',

        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        'imports': {

          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          '_': lodash
        }
      };

      // Ensure wrappers are instances of `baseLodash`.
      lodash.prototype = baseLodash.prototype;
      lodash.prototype.constructor = lodash;

      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;

      /*------------------------------------------------------------------------*/

      /**
       * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
       *
       * @private
       * @constructor
       * @param {*} value The value to wrap.
       */
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }

      /**
       * Creates a clone of the lazy wrapper object.
       *
       * @private
       * @name clone
       * @memberOf LazyWrapper
       * @returns {Object} Returns the cloned `LazyWrapper` object.
       */
      function lazyClone() {
        var result = new LazyWrapper(this.__wrapped__);
        result.__actions__ = copyArray(this.__actions__);
        result.__dir__ = this.__dir__;
        result.__filtered__ = this.__filtered__;
        result.__iteratees__ = copyArray(this.__iteratees__);
        result.__takeCount__ = this.__takeCount__;
        result.__views__ = copyArray(this.__views__);
        return result;
      }

      /**
       * Reverses the direction of lazy iteration.
       *
       * @private
       * @name reverse
       * @memberOf LazyWrapper
       * @returns {Object} Returns the new reversed `LazyWrapper` object.
       */
      function lazyReverse() {
        if (this.__filtered__) {
          var result = new LazyWrapper(this);
          result.__dir__ = -1;
          result.__filtered__ = true;
        } else {
          result = this.clone();
          result.__dir__ *= -1;
        }
        return result;
      }

      /**
       * Extracts the unwrapped value from its lazy wrapper.
       *
       * @private
       * @name value
       * @memberOf LazyWrapper
       * @returns {*} Returns the unwrapped value.
       */
      function lazyValue() {
        var array = this.__wrapped__.value(),
            dir = this.__dir__,
            isArr = isArray(array),
            isRight = dir < 0,
            arrLength = isArr ? array.length : 0,
            view = getView(0, arrLength, this.__views__),
            start = view.start,
            end = view.end,
            length = end - start,
            index = isRight ? end : (start - 1),
            iteratees = this.__iteratees__,
            iterLength = iteratees.length,
            resIndex = 0,
            takeCount = nativeMin(length, this.__takeCount__);

        if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result = [];

        outer:
        while (length-- && resIndex < takeCount) {
          index += dir;

          var iterIndex = -1,
              value = array[index];

          while (++iterIndex < iterLength) {
            var data = iteratees[iterIndex],
                iteratee = data.iteratee,
                type = data.type,
                computed = iteratee(value);

            if (type == LAZY_MAP_FLAG) {
              value = computed;
            } else if (!computed) {
              if (type == LAZY_FILTER_FLAG) {
                continue outer;
              } else {
                break outer;
              }
            }
          }
          result[resIndex++] = value;
        }
        return result;
      }

      // Ensure `LazyWrapper` is an instance of `baseLodash`.
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;

      /*------------------------------------------------------------------------*/

      /**
       * Creates a hash object.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */
      function Hash(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }

      /**
       * Removes all key-value entries from the hash.
       *
       * @private
       * @name clear
       * @memberOf Hash
       */
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }

      /**
       * Removes `key` and its value from the hash.
       *
       * @private
       * @name delete
       * @memberOf Hash
       * @param {Object} hash The hash to modify.
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }

      /**
       * Gets the hash value for `key`.
       *
       * @private
       * @name get
       * @memberOf Hash
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? undefined$1 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
      }

      /**
       * Checks if a hash value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf Hash
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? (data[key] !== undefined$1) : hasOwnProperty.call(data, key);
      }

      /**
       * Sets the hash `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf Hash
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the hash instance.
       */
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = (nativeCreate && value === undefined$1) ? HASH_UNDEFINED : value;
        return this;
      }

      // Add methods to `Hash`.
      Hash.prototype.clear = hashClear;
      Hash.prototype['delete'] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;

      /*------------------------------------------------------------------------*/

      /**
       * Creates an list cache object.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */
      function ListCache(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }

      /**
       * Removes all key-value entries from the list cache.
       *
       * @private
       * @name clear
       * @memberOf ListCache
       */
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }

      /**
       * Removes `key` and its value from the list cache.
       *
       * @private
       * @name delete
       * @memberOf ListCache
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */
      function listCacheDelete(key) {
        var data = this.__data__,
            index = assocIndexOf(data, key);

        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }

      /**
       * Gets the list cache value for `key`.
       *
       * @private
       * @name get
       * @memberOf ListCache
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */
      function listCacheGet(key) {
        var data = this.__data__,
            index = assocIndexOf(data, key);

        return index < 0 ? undefined$1 : data[index][1];
      }

      /**
       * Checks if a list cache value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf ListCache
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }

      /**
       * Sets the list cache `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf ListCache
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the list cache instance.
       */
      function listCacheSet(key, value) {
        var data = this.__data__,
            index = assocIndexOf(data, key);

        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }

      // Add methods to `ListCache`.
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype['delete'] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;

      /*------------------------------------------------------------------------*/

      /**
       * Creates a map cache object to store key-value pairs.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */
      function MapCache(entries) {
        var index = -1,
            length = entries == null ? 0 : entries.length;

        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }

      /**
       * Removes all key-value entries from the map.
       *
       * @private
       * @name clear
       * @memberOf MapCache
       */
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          'hash': new Hash,
          'map': new (Map || ListCache),
          'string': new Hash
        };
      }

      /**
       * Removes `key` and its value from the map.
       *
       * @private
       * @name delete
       * @memberOf MapCache
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */
      function mapCacheDelete(key) {
        var result = getMapData(this, key)['delete'](key);
        this.size -= result ? 1 : 0;
        return result;
      }

      /**
       * Gets the map value for `key`.
       *
       * @private
       * @name get
       * @memberOf MapCache
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }

      /**
       * Checks if a map value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf MapCache
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }

      /**
       * Sets the map `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf MapCache
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the map cache instance.
       */
      function mapCacheSet(key, value) {
        var data = getMapData(this, key),
            size = data.size;

        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }

      // Add methods to `MapCache`.
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype['delete'] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;

      /*------------------------------------------------------------------------*/

      /**
       *
       * Creates an array cache object to store unique values.
       *
       * @private
       * @constructor
       * @param {Array} [values] The values to cache.
       */
      function SetCache(values) {
        var index = -1,
            length = values == null ? 0 : values.length;

        this.__data__ = new MapCache;
        while (++index < length) {
          this.add(values[index]);
        }
      }

      /**
       * Adds `value` to the array cache.
       *
       * @private
       * @name add
       * @memberOf SetCache
       * @alias push
       * @param {*} value The value to cache.
       * @returns {Object} Returns the cache instance.
       */
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }

      /**
       * Checks if `value` is in the array cache.
       *
       * @private
       * @name has
       * @memberOf SetCache
       * @param {*} value The value to search for.
       * @returns {number} Returns `true` if `value` is found, else `false`.
       */
      function setCacheHas(value) {
        return this.__data__.has(value);
      }

      // Add methods to `SetCache`.
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;

      /*------------------------------------------------------------------------*/

      /**
       * Creates a stack cache object to store key-value pairs.
       *
       * @private
       * @constructor
       * @param {Array} [entries] The key-value pairs to cache.
       */
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }

      /**
       * Removes all key-value entries from the stack.
       *
       * @private
       * @name clear
       * @memberOf Stack
       */
      function stackClear() {
        this.__data__ = new ListCache;
        this.size = 0;
      }

      /**
       * Removes `key` and its value from the stack.
       *
       * @private
       * @name delete
       * @memberOf Stack
       * @param {string} key The key of the value to remove.
       * @returns {boolean} Returns `true` if the entry was removed, else `false`.
       */
      function stackDelete(key) {
        var data = this.__data__,
            result = data['delete'](key);

        this.size = data.size;
        return result;
      }

      /**
       * Gets the stack value for `key`.
       *
       * @private
       * @name get
       * @memberOf Stack
       * @param {string} key The key of the value to get.
       * @returns {*} Returns the entry value.
       */
      function stackGet(key) {
        return this.__data__.get(key);
      }

      /**
       * Checks if a stack value for `key` exists.
       *
       * @private
       * @name has
       * @memberOf Stack
       * @param {string} key The key of the entry to check.
       * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
       */
      function stackHas(key) {
        return this.__data__.has(key);
      }

      /**
       * Sets the stack `key` to `value`.
       *
       * @private
       * @name set
       * @memberOf Stack
       * @param {string} key The key of the value to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns the stack cache instance.
       */
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }

      // Add methods to `Stack`.
      Stack.prototype.clear = stackClear;
      Stack.prototype['delete'] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;

      /*------------------------------------------------------------------------*/

      /**
       * Creates an array of the enumerable property names of the array-like `value`.
       *
       * @private
       * @param {*} value The value to query.
       * @param {boolean} inherited Specify returning inherited property names.
       * @returns {Array} Returns the array of property names.
       */
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value),
            isArg = !isArr && isArguments(value),
            isBuff = !isArr && !isArg && isBuffer(value),
            isType = !isArr && !isArg && !isBuff && isTypedArray(value),
            skipIndexes = isArr || isArg || isBuff || isType,
            result = skipIndexes ? baseTimes(value.length, String) : [],
            length = result.length;

        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) &&
              !(skipIndexes && (
                 // Safari 9 has enumerable `arguments.length` in strict mode.
                 key == 'length' ||
                 // Node.js 0.10 has enumerable non-index properties on buffers.
                 (isBuff && (key == 'offset' || key == 'parent')) ||
                 // PhantomJS 2 has enumerable non-index properties on typed arrays.
                 (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
                 // Skip index properties.
                 isIndex(key, length)
              ))) {
            result.push(key);
          }
        }
        return result;
      }

      /**
       * A specialized version of `_.sample` for arrays.
       *
       * @private
       * @param {Array} array The array to sample.
       * @returns {*} Returns the random element.
       */
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined$1;
      }

      /**
       * A specialized version of `_.sampleSize` for arrays.
       *
       * @private
       * @param {Array} array The array to sample.
       * @param {number} n The number of elements to sample.
       * @returns {Array} Returns the random elements.
       */
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }

      /**
       * A specialized version of `_.shuffle` for arrays.
       *
       * @private
       * @param {Array} array The array to shuffle.
       * @returns {Array} Returns the new shuffled array.
       */
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }

      /**
       * This function is like `assignValue` except that it doesn't assign
       * `undefined` values.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {string} key The key of the property to assign.
       * @param {*} value The value to assign.
       */
      function assignMergeValue(object, key, value) {
        if ((value !== undefined$1 && !eq(object[key], value)) ||
            (value === undefined$1 && !(key in object))) {
          baseAssignValue(object, key, value);
        }
      }

      /**
       * Assigns `value` to `key` of `object` if the existing value is not equivalent
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {string} key The key of the property to assign.
       * @param {*} value The value to assign.
       */
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
            (value === undefined$1 && !(key in object))) {
          baseAssignValue(object, key, value);
        }
      }

      /**
       * Gets the index at which the `key` is found in `array` of key-value pairs.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {*} key The key to search for.
       * @returns {number} Returns the index of the matched value, else `-1`.
       */
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }

      /**
       * Aggregates elements of `collection` on `accumulator` with keys transformed
       * by `iteratee` and values set by `setter`.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} setter The function to set `accumulator` values.
       * @param {Function} iteratee The iteratee to transform keys.
       * @param {Object} accumulator The initial aggregated object.
       * @returns {Function} Returns `accumulator`.
       */
      function baseAggregator(collection, setter, iteratee, accumulator) {
        baseEach(collection, function(value, key, collection) {
          setter(accumulator, value, iteratee(value), collection);
        });
        return accumulator;
      }

      /**
       * The base implementation of `_.assign` without support for multiple sources
       * or `customizer` functions.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @returns {Object} Returns `object`.
       */
      function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
      }

      /**
       * The base implementation of `_.assignIn` without support for multiple sources
       * or `customizer` functions.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @returns {Object} Returns `object`.
       */
      function baseAssignIn(object, source) {
        return object && copyObject(source, keysIn(source), object);
      }

      /**
       * The base implementation of `assignValue` and `assignMergeValue` without
       * value checks.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {string} key The key of the property to assign.
       * @param {*} value The value to assign.
       */
      function baseAssignValue(object, key, value) {
        if (key == '__proto__' && defineProperty) {
          defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
          });
        } else {
          object[key] = value;
        }
      }

      /**
       * The base implementation of `_.at` without support for individual paths.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {string[]} paths The property paths to pick.
       * @returns {Array} Returns the picked elements.
       */
      function baseAt(object, paths) {
        var index = -1,
            length = paths.length,
            result = Array(length),
            skip = object == null;

        while (++index < length) {
          result[index] = skip ? undefined$1 : get(object, paths[index]);
        }
        return result;
      }

      /**
       * The base implementation of `_.clamp` which doesn't coerce arguments.
       *
       * @private
       * @param {number} number The number to clamp.
       * @param {number} [lower] The lower bound.
       * @param {number} upper The upper bound.
       * @returns {number} Returns the clamped number.
       */
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined$1) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined$1) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }

      /**
       * The base implementation of `_.clone` and `_.cloneDeep` which tracks
       * traversed objects.
       *
       * @private
       * @param {*} value The value to clone.
       * @param {boolean} bitmask The bitmask flags.
       *  1 - Deep clone
       *  2 - Flatten inherited properties
       *  4 - Clone symbols
       * @param {Function} [customizer] The function to customize cloning.
       * @param {string} [key] The key of `value`.
       * @param {Object} [object] The parent object of `value`.
       * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
       * @returns {*} Returns the cloned value.
       */
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result,
            isDeep = bitmask & CLONE_DEEP_FLAG,
            isFlat = bitmask & CLONE_FLAT_FLAG,
            isFull = bitmask & CLONE_SYMBOLS_FLAG;

        if (customizer) {
          result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== undefined$1) {
          return result;
        }
        if (!isObject(value)) {
          return value;
        }
        var isArr = isArray(value);
        if (isArr) {
          result = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result);
          }
        } else {
          var tag = getTag(value),
              isFunc = tag == funcTag || tag == genTag;

          if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat
                ? copySymbolsIn(value, baseAssignIn(result, value))
                : copySymbols(value, baseAssign(result, value));
            }
          } else {
            if (!cloneableTags[tag]) {
              return object ? value : {};
            }
            result = initCloneByTag(value, tag, isDeep);
          }
        }
        // Check for circular references and return its corresponding clone.
        stack || (stack = new Stack);
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result);

        if (isSet(value)) {
          value.forEach(function(subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap(value)) {
          value.forEach(function(subValue, key) {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
          });
        }

        var keysFunc = isFull
          ? (isFlat ? getAllKeysIn : getAllKeys)
          : (isFlat ? keysIn : keys);

        var props = isArr ? undefined$1 : keysFunc(value);
        arrayEach(props || value, function(subValue, key) {
          if (props) {
            key = subValue;
            subValue = value[key];
          }
          // Recursively populate clone (susceptible to call stack limits).
          assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
        return result;
      }

      /**
       * The base implementation of `_.conforms` which doesn't clone `source`.
       *
       * @private
       * @param {Object} source The object of property predicates to conform to.
       * @returns {Function} Returns the new spec function.
       */
      function baseConforms(source) {
        var props = keys(source);
        return function(object) {
          return baseConformsTo(object, source, props);
        };
      }

      /**
       * The base implementation of `_.conformsTo` which accepts `props` to check.
       *
       * @private
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property predicates to conform to.
       * @returns {boolean} Returns `true` if `object` conforms, else `false`.
       */
      function baseConformsTo(object, source, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (length--) {
          var key = props[length],
              predicate = source[key],
              value = object[key];

          if ((value === undefined$1 && !(key in object)) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }

      /**
       * The base implementation of `_.delay` and `_.defer` which accepts `args`
       * to provide to `func`.
       *
       * @private
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay invocation.
       * @param {Array} args The arguments to provide to `func`.
       * @returns {number|Object} Returns the timer id or timeout object.
       */
      function baseDelay(func, wait, args) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return setTimeout(function() { func.apply(undefined$1, args); }, wait);
      }

      /**
       * The base implementation of methods like `_.difference` without support
       * for excluding multiple arrays or iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Array} values The values to exclude.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       */
      function baseDifference(array, values, iteratee, comparator) {
        var index = -1,
            includes = arrayIncludes,
            isCommon = true,
            length = array.length,
            result = [],
            valuesLength = values.length;

        if (!length) {
          return result;
        }
        if (iteratee) {
          values = arrayMap(values, baseUnary(iteratee));
        }
        if (comparator) {
          includes = arrayIncludesWith;
          isCommon = false;
        }
        else if (values.length >= LARGE_ARRAY_SIZE) {
          includes = cacheHas;
          isCommon = false;
          values = new SetCache(values);
        }
        outer:
        while (++index < length) {
          var value = array[index],
              computed = iteratee == null ? value : iteratee(value);

          value = (comparator || value !== 0) ? value : 0;
          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }
            result.push(value);
          }
          else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.forEach` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       */
      var baseEach = createBaseEach(baseForOwn);

      /**
       * The base implementation of `_.forEachRight` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       */
      var baseEachRight = createBaseEach(baseForOwnRight, true);

      /**
       * The base implementation of `_.every` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} predicate The function invoked per iteration.
       * @returns {boolean} Returns `true` if all elements pass the predicate check,
       *  else `false`
       */
      function baseEvery(collection, predicate) {
        var result = true;
        baseEach(collection, function(value, index, collection) {
          result = !!predicate(value, index, collection);
          return result;
        });
        return result;
      }

      /**
       * The base implementation of methods like `_.max` and `_.min` which accepts a
       * `comparator` to determine the extremum value.
       *
       * @private
       * @param {Array} array The array to iterate over.
       * @param {Function} iteratee The iteratee invoked per iteration.
       * @param {Function} comparator The comparator used to compare values.
       * @returns {*} Returns the extremum value.
       */
      function baseExtremum(array, iteratee, comparator) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          var value = array[index],
              current = iteratee(value);

          if (current != null && (computed === undefined$1
                ? (current === current && !isSymbol(current))
                : comparator(current, computed)
              )) {
            var computed = current,
                result = value;
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.fill` without an iteratee call guard.
       *
       * @private
       * @param {Array} array The array to fill.
       * @param {*} value The value to fill `array` with.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns `array`.
       */
      function baseFill(array, value, start, end) {
        var length = array.length;

        start = toInteger(start);
        if (start < 0) {
          start = -start > length ? 0 : (length + start);
        }
        end = (end === undefined$1 || end > length) ? length : toInteger(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }

      /**
       * The base implementation of `_.filter` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} predicate The function invoked per iteration.
       * @returns {Array} Returns the new filtered array.
       */
      function baseFilter(collection, predicate) {
        var result = [];
        baseEach(collection, function(value, index, collection) {
          if (predicate(value, index, collection)) {
            result.push(value);
          }
        });
        return result;
      }

      /**
       * The base implementation of `_.flatten` with support for restricting flattening.
       *
       * @private
       * @param {Array} array The array to flatten.
       * @param {number} depth The maximum recursion depth.
       * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
       * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
       * @param {Array} [result=[]] The initial result value.
       * @returns {Array} Returns the new flattened array.
       */
      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index = -1,
            length = array.length;

        predicate || (predicate = isFlattenable);
        result || (result = []);

        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              // Recursively flatten arrays (susceptible to call stack limits).
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }
        return result;
      }

      /**
       * The base implementation of `baseForOwn` which iterates over `object`
       * properties returned by `keysFunc` and invokes `iteratee` for each property.
       * Iteratee functions may exit iteration early by explicitly returning `false`.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @param {Function} keysFunc The function to get the keys of `object`.
       * @returns {Object} Returns `object`.
       */
      var baseFor = createBaseFor();

      /**
       * This function is like `baseFor` except that it iterates over properties
       * in the opposite order.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @param {Function} keysFunc The function to get the keys of `object`.
       * @returns {Object} Returns `object`.
       */
      var baseForRight = createBaseFor(true);

      /**
       * The base implementation of `_.forOwn` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Object} Returns `object`.
       */
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys);
      }

      /**
       * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Object} Returns `object`.
       */
      function baseForOwnRight(object, iteratee) {
        return object && baseForRight(object, iteratee, keys);
      }

      /**
       * The base implementation of `_.functions` which creates an array of
       * `object` function property names filtered from `props`.
       *
       * @private
       * @param {Object} object The object to inspect.
       * @param {Array} props The property names to filter.
       * @returns {Array} Returns the function names.
       */
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction(object[key]);
        });
      }

      /**
       * The base implementation of `_.get` without support for default values.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the property to get.
       * @returns {*} Returns the resolved value.
       */
      function baseGet(object, path) {
        path = castPath(path, object);

        var index = 0,
            length = path.length;

        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return (index && index == length) ? object : undefined$1;
      }

      /**
       * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
       * `keysFunc` and `symbolsFunc` to get the enumerable property names and
       * symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Function} keysFunc The function to get the keys of `object`.
       * @param {Function} symbolsFunc The function to get the symbols of `object`.
       * @returns {Array} Returns the array of property names and symbols.
       */
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }

      /**
       * The base implementation of `getTag` without fallbacks for buggy environments.
       *
       * @private
       * @param {*} value The value to query.
       * @returns {string} Returns the `toStringTag`.
       */
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined$1 ? undefinedTag : nullTag;
        }
        return (symToStringTag && symToStringTag in Object(value))
          ? getRawTag(value)
          : objectToString(value);
      }

      /**
       * The base implementation of `_.gt` which doesn't coerce arguments.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is greater than `other`,
       *  else `false`.
       */
      function baseGt(value, other) {
        return value > other;
      }

      /**
       * The base implementation of `_.has` without support for deep paths.
       *
       * @private
       * @param {Object} [object] The object to query.
       * @param {Array|string} key The key to check.
       * @returns {boolean} Returns `true` if `key` exists, else `false`.
       */
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }

      /**
       * The base implementation of `_.hasIn` without support for deep paths.
       *
       * @private
       * @param {Object} [object] The object to query.
       * @param {Array|string} key The key to check.
       * @returns {boolean} Returns `true` if `key` exists, else `false`.
       */
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }

      /**
       * The base implementation of `_.inRange` which doesn't coerce arguments.
       *
       * @private
       * @param {number} number The number to check.
       * @param {number} start The start of the range.
       * @param {number} end The end of the range.
       * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
       */
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }

      /**
       * The base implementation of methods like `_.intersection`, without support
       * for iteratee shorthands, that accepts an array of arrays to inspect.
       *
       * @private
       * @param {Array} arrays The arrays to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of shared values.
       */
      function baseIntersection(arrays, iteratee, comparator) {
        var includes = comparator ? arrayIncludesWith : arrayIncludes,
            length = arrays[0].length,
            othLength = arrays.length,
            othIndex = othLength,
            caches = Array(othLength),
            maxLength = Infinity,
            result = [];

        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
            ? new SetCache(othIndex && array)
            : undefined$1;
        }
        array = arrays[0];

        var index = -1,
            seen = caches[0];

        outer:
        while (++index < length && result.length < maxLength) {
          var value = array[index],
              computed = iteratee ? iteratee(value) : value;

          value = (comparator || value !== 0) ? value : 0;
          if (!(seen
                ? cacheHas(seen, computed)
                : includes(result, computed, comparator)
              )) {
            othIndex = othLength;
            while (--othIndex) {
              var cache = caches[othIndex];
              if (!(cache
                    ? cacheHas(cache, computed)
                    : includes(arrays[othIndex], computed, comparator))
                  ) {
                continue outer;
              }
            }
            if (seen) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.invert` and `_.invertBy` which inverts
       * `object` with values transformed by `iteratee` and set by `setter`.
       *
       * @private
       * @param {Object} object The object to iterate over.
       * @param {Function} setter The function to set `accumulator` values.
       * @param {Function} iteratee The iteratee to transform values.
       * @param {Object} accumulator The initial inverted object.
       * @returns {Function} Returns `accumulator`.
       */
      function baseInverter(object, setter, iteratee, accumulator) {
        baseForOwn(object, function(value, key, object) {
          setter(accumulator, iteratee(value), key, object);
        });
        return accumulator;
      }

      /**
       * The base implementation of `_.invoke` without support for individual
       * method arguments.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the method to invoke.
       * @param {Array} args The arguments to invoke the method with.
       * @returns {*} Returns the result of the invoked method.
       */
      function baseInvoke(object, path, args) {
        path = castPath(path, object);
        object = parent(object, path);
        var func = object == null ? object : object[toKey(last(path))];
        return func == null ? undefined$1 : apply(func, object, args);
      }

      /**
       * The base implementation of `_.isArguments`.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an `arguments` object,
       */
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }

      /**
       * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
       */
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }

      /**
       * The base implementation of `_.isDate` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
       */
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }

      /**
       * The base implementation of `_.isEqual` which supports partial comparisons
       * and tracks traversed objects.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @param {boolean} bitmask The bitmask flags.
       *  1 - Unordered comparison
       *  2 - Partial comparison
       * @param {Function} [customizer] The function to customize comparisons.
       * @param {Object} [stack] Tracks traversed `value` and `other` objects.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       */
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }

      /**
       * A specialized version of `baseIsEqual` for arrays and objects which performs
       * deep comparisons and tracks traversed objects enabling objects with circular
       * references to be compared.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} [stack] Tracks traversed `object` and `other` objects.
       * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
       */
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object),
            othIsArr = isArray(other),
            objTag = objIsArr ? arrayTag : getTag(object),
            othTag = othIsArr ? arrayTag : getTag(other);

        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;

        var objIsObj = objTag == objectTag,
            othIsObj = othTag == objectTag,
            isSameTag = objTag == othTag;

        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack);
          return (objIsArr || isTypedArray(object))
            ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
            : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
              othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object,
                othUnwrapped = othIsWrapped ? other.value() : other;

            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack);
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }

      /**
       * The base implementation of `_.isMap` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a map, else `false`.
       */
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }

      /**
       * The base implementation of `_.isMatch` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property values to match.
       * @param {Array} matchData The property names, values, and compare flags to match.
       * @param {Function} [customizer] The function to customize comparisons.
       * @returns {boolean} Returns `true` if `object` is a match, else `false`.
       */
      function baseIsMatch(object, source, matchData, customizer) {
        var index = matchData.length,
            length = index,
            noCustomizer = !customizer;

        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index--) {
          var data = matchData[index];
          if ((noCustomizer && data[2])
                ? data[1] !== object[data[0]]
                : !(data[0] in object)
              ) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0],
              objValue = object[key],
              srcValue = data[1];

          if (noCustomizer && data[2]) {
            if (objValue === undefined$1 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack;
            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === undefined$1
                  ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                  : result
                )) {
              return false;
            }
          }
        }
        return true;
      }

      /**
       * The base implementation of `_.isNative` without bad shim checks.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a native function,
       *  else `false`.
       */
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }

      /**
       * The base implementation of `_.isRegExp` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
       */
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }

      /**
       * The base implementation of `_.isSet` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a set, else `false`.
       */
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }

      /**
       * The base implementation of `_.isTypedArray` without Node.js optimizations.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
       */
      function baseIsTypedArray(value) {
        return isObjectLike(value) &&
          isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }

      /**
       * The base implementation of `_.iteratee`.
       *
       * @private
       * @param {*} [value=_.identity] The value to convert to an iteratee.
       * @returns {Function} Returns the iteratee.
       */
      function baseIteratee(value) {
        // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
        // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
        if (typeof value == 'function') {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == 'object') {
          return isArray(value)
            ? baseMatchesProperty(value[0], value[1])
            : baseMatches(value);
        }
        return property(value);
      }

      /**
       * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       */
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != 'constructor') {
            result.push(key);
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       */
      function baseKeysIn(object) {
        if (!isObject(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype(object),
            result = [];

        for (var key in object) {
          if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
            result.push(key);
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.lt` which doesn't coerce arguments.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is less than `other`,
       *  else `false`.
       */
      function baseLt(value, other) {
        return value < other;
      }

      /**
       * The base implementation of `_.map` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} iteratee The function invoked per iteration.
       * @returns {Array} Returns the new mapped array.
       */
      function baseMap(collection, iteratee) {
        var index = -1,
            result = isArrayLike(collection) ? Array(collection.length) : [];

        baseEach(collection, function(value, key, collection) {
          result[++index] = iteratee(value, key, collection);
        });
        return result;
      }

      /**
       * The base implementation of `_.matches` which doesn't clone `source`.
       *
       * @private
       * @param {Object} source The object of property values to match.
       * @returns {Function} Returns the new spec function.
       */
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }

      /**
       * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
       *
       * @private
       * @param {string} path The path of the property to get.
       * @param {*} srcValue The value to match.
       * @returns {Function} Returns the new spec function.
       */
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get(object, path);
          return (objValue === undefined$1 && objValue === srcValue)
            ? hasIn(object, path)
            : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }

      /**
       * The base implementation of `_.merge` without support for multiple sources.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @param {number} srcIndex The index of `source`.
       * @param {Function} [customizer] The function to customize merged values.
       * @param {Object} [stack] Tracks traversed source values and their merged
       *  counterparts.
       */
      function baseMerge(object, source, srcIndex, customizer, stack) {
        if (object === source) {
          return;
        }
        baseFor(source, function(srcValue, key) {
          stack || (stack = new Stack);
          if (isObject(srcValue)) {
            baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
          }
          else {
            var newValue = customizer
              ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
              : undefined$1;

            if (newValue === undefined$1) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }

      /**
       * A specialized version of `baseMerge` for arrays and objects which performs
       * deep merges and tracks traversed objects enabling objects with circular
       * references to be merged.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @param {string} key The key of the value to merge.
       * @param {number} srcIndex The index of `source`.
       * @param {Function} mergeFunc The function to merge values.
       * @param {Function} [customizer] The function to customize assigned values.
       * @param {Object} [stack] Tracks traversed source values and their merged
       *  counterparts.
       */
      function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key),
            srcValue = safeGet(source, key),
            stacked = stack.get(srcValue);

        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer
          ? customizer(objValue, srcValue, (key + ''), object, source, stack)
          : undefined$1;

        var isCommon = newValue === undefined$1;

        if (isCommon) {
          var isArr = isArray(srcValue),
              isBuff = !isArr && isBuffer(srcValue),
              isTyped = !isArr && !isBuff && isTypedArray(srcValue);

          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray(objValue)) {
              newValue = objValue;
            }
            else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            }
            else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            }
            else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            }
            else {
              newValue = [];
            }
          }
          else if (isPlainObject(srcValue) || isArguments(srcValue)) {
            newValue = objValue;
            if (isArguments(objValue)) {
              newValue = toPlainObject(objValue);
            }
            else if (!isObject(objValue) || isFunction(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          }
          else {
            isCommon = false;
          }
        }
        if (isCommon) {
          // Recursively merge objects and arrays (susceptible to call stack limits).
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack['delete'](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }

      /**
       * The base implementation of `_.nth` which doesn't coerce arguments.
       *
       * @private
       * @param {Array} array The array to query.
       * @param {number} n The index of the element to return.
       * @returns {*} Returns the nth element of `array`.
       */
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined$1;
      }

      /**
       * The base implementation of `_.orderBy` without param guards.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
       * @param {string[]} orders The sort orders of `iteratees`.
       * @returns {Array} Returns the new sorted array.
       */
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee) {
            if (isArray(iteratee)) {
              return function(value) {
                return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
              }
            }
            return iteratee;
          });
        } else {
          iteratees = [identity];
        }

        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));

        var result = baseMap(collection, function(value, key, collection) {
          var criteria = arrayMap(iteratees, function(iteratee) {
            return iteratee(value);
          });
          return { 'criteria': criteria, 'index': ++index, 'value': value };
        });

        return baseSortBy(result, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }

      /**
       * The base implementation of `_.pick` without support for individual
       * property identifiers.
       *
       * @private
       * @param {Object} object The source object.
       * @param {string[]} paths The property paths to pick.
       * @returns {Object} Returns the new object.
       */
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path) {
          return hasIn(object, path);
        });
      }

      /**
       * The base implementation of  `_.pickBy` without support for iteratee shorthands.
       *
       * @private
       * @param {Object} object The source object.
       * @param {string[]} paths The property paths to pick.
       * @param {Function} predicate The function invoked per property.
       * @returns {Object} Returns the new object.
       */
      function basePickBy(object, paths, predicate) {
        var index = -1,
            length = paths.length,
            result = {};

        while (++index < length) {
          var path = paths[index],
              value = baseGet(object, path);

          if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
          }
        }
        return result;
      }

      /**
       * A specialized version of `baseProperty` which supports deep paths.
       *
       * @private
       * @param {Array|string} path The path of the property to get.
       * @returns {Function} Returns the new accessor function.
       */
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }

      /**
       * The base implementation of `_.pullAllBy` without support for iteratee
       * shorthands.
       *
       * @private
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns `array`.
       */
      function basePullAll(array, values, iteratee, comparator) {
        var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
            index = -1,
            length = values.length,
            seen = array;

        if (array === values) {
          values = copyArray(values);
        }
        if (iteratee) {
          seen = arrayMap(array, baseUnary(iteratee));
        }
        while (++index < length) {
          var fromIndex = 0,
              value = values[index],
              computed = iteratee ? iteratee(value) : value;

          while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
            if (seen !== array) {
              splice.call(seen, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }

      /**
       * The base implementation of `_.pullAt` without support for individual
       * indexes or capturing the removed elements.
       *
       * @private
       * @param {Array} array The array to modify.
       * @param {number[]} indexes The indexes of elements to remove.
       * @returns {Array} Returns `array`.
       */
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0,
            lastIndex = length - 1;

        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }

      /**
       * The base implementation of `_.random` without support for returning
       * floating-point numbers.
       *
       * @private
       * @param {number} lower The lower bound.
       * @param {number} upper The upper bound.
       * @returns {number} Returns the random number.
       */
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }

      /**
       * The base implementation of `_.range` and `_.rangeRight` which doesn't
       * coerce arguments.
       *
       * @private
       * @param {number} start The start of the range.
       * @param {number} end The end of the range.
       * @param {number} step The value to increment or decrement by.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Array} Returns the range of numbers.
       */
      function baseRange(start, end, step, fromRight) {
        var index = -1,
            length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
            result = Array(length);

        while (length--) {
          result[fromRight ? length : ++index] = start;
          start += step;
        }
        return result;
      }

      /**
       * The base implementation of `_.repeat` which doesn't coerce arguments.
       *
       * @private
       * @param {string} string The string to repeat.
       * @param {number} n The number of times to repeat the string.
       * @returns {string} Returns the repeated string.
       */
      function baseRepeat(string, n) {
        var result = '';
        if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
          return result;
        }
        // Leverage the exponentiation by squaring algorithm for a faster repeat.
        // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
        do {
          if (n % 2) {
            result += string;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string += string;
          }
        } while (n);

        return result;
      }

      /**
       * The base implementation of `_.rest` which doesn't validate or coerce arguments.
       *
       * @private
       * @param {Function} func The function to apply a rest parameter to.
       * @param {number} [start=func.length-1] The start position of the rest parameter.
       * @returns {Function} Returns the new function.
       */
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + '');
      }

      /**
       * The base implementation of `_.sample`.
       *
       * @private
       * @param {Array|Object} collection The collection to sample.
       * @returns {*} Returns the random element.
       */
      function baseSample(collection) {
        return arraySample(values(collection));
      }

      /**
       * The base implementation of `_.sampleSize` without param guards.
       *
       * @private
       * @param {Array|Object} collection The collection to sample.
       * @param {number} n The number of elements to sample.
       * @returns {Array} Returns the random elements.
       */
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }

      /**
       * The base implementation of `_.set`.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {*} value The value to set.
       * @param {Function} [customizer] The function to customize path creation.
       * @returns {Object} Returns `object`.
       */
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);

        var index = -1,
            length = path.length,
            lastIndex = length - 1,
            nested = object;

        while (nested != null && ++index < length) {
          var key = toKey(path[index]),
              newValue = value;

          if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return object;
          }

          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
            if (newValue === undefined$1) {
              newValue = isObject(objValue)
                ? objValue
                : (isIndex(path[index + 1]) ? [] : {});
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }

      /**
       * The base implementation of `setData` without support for hot loop shorting.
       *
       * @private
       * @param {Function} func The function to associate metadata with.
       * @param {*} data The metadata.
       * @returns {Function} Returns `func`.
       */
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };

      /**
       * The base implementation of `setToString` without support for hot loop shorting.
       *
       * @private
       * @param {Function} func The function to modify.
       * @param {Function} string The `toString` result.
       * @returns {Function} Returns `func`.
       */
      var baseSetToString = !defineProperty ? identity : function(func, string) {
        return defineProperty(func, 'toString', {
          'configurable': true,
          'enumerable': false,
          'value': constant(string),
          'writable': true
        });
      };

      /**
       * The base implementation of `_.shuffle`.
       *
       * @private
       * @param {Array|Object} collection The collection to shuffle.
       * @returns {Array} Returns the new shuffled array.
       */
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }

      /**
       * The base implementation of `_.slice` without an iteratee call guard.
       *
       * @private
       * @param {Array} array The array to slice.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns the slice of `array`.
       */
      function baseSlice(array, start, end) {
        var index = -1,
            length = array.length;

        if (start < 0) {
          start = -start > length ? 0 : (length + start);
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : ((end - start) >>> 0);
        start >>>= 0;

        var result = Array(length);
        while (++index < length) {
          result[index] = array[index + start];
        }
        return result;
      }

      /**
       * The base implementation of `_.some` without support for iteratee shorthands.
       *
       * @private
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} predicate The function invoked per iteration.
       * @returns {boolean} Returns `true` if any element passes the predicate check,
       *  else `false`.
       */
      function baseSome(collection, predicate) {
        var result;

        baseEach(collection, function(value, index, collection) {
          result = predicate(value, index, collection);
          return !result;
        });
        return !!result;
      }

      /**
       * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
       * performs a binary search of `array` to determine the index at which `value`
       * should be inserted into `array` in order to maintain its sort order.
       *
       * @private
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {boolean} [retHighest] Specify returning the highest qualified index.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       */
      function baseSortedIndex(array, value, retHighest) {
        var low = 0,
            high = array == null ? low : array.length;

        if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = (low + high) >>> 1,
                computed = array[mid];

            if (computed !== null && !isSymbol(computed) &&
                (retHighest ? (computed <= value) : (computed < value))) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }

      /**
       * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
       * which invokes `iteratee` for `value` and each element of `array` to compute
       * their sort ranking. The iteratee is invoked with one argument; (value).
       *
       * @private
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function} iteratee The iteratee invoked per element.
       * @param {boolean} [retHighest] Specify returning the highest qualified index.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       */
      function baseSortedIndexBy(array, value, iteratee, retHighest) {
        var low = 0,
            high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }

        value = iteratee(value);
        var valIsNaN = value !== value,
            valIsNull = value === null,
            valIsSymbol = isSymbol(value),
            valIsUndefined = value === undefined$1;

        while (low < high) {
          var mid = nativeFloor((low + high) / 2),
              computed = iteratee(array[mid]),
              othIsDefined = computed !== undefined$1,
              othIsNull = computed === null,
              othIsReflexive = computed === computed,
              othIsSymbol = isSymbol(computed);

          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? (computed <= value) : (computed < value);
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }

      /**
       * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
       * support for iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       */
      function baseSortedUniq(array, iteratee) {
        var index = -1,
            length = array.length,
            resIndex = 0,
            result = [];

        while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value) : value;

          if (!index || !eq(computed, seen)) {
            var seen = computed;
            result[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.toNumber` which doesn't ensure correct
       * conversions of binary, hexadecimal, or octal string values.
       *
       * @private
       * @param {*} value The value to process.
       * @returns {number} Returns the number.
       */
      function baseToNumber(value) {
        if (typeof value == 'number') {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        return +value;
      }

      /**
       * The base implementation of `_.toString` which doesn't convert nullish
       * values to empty strings.
       *
       * @private
       * @param {*} value The value to process.
       * @returns {string} Returns the string.
       */
      function baseToString(value) {
        // Exit early for strings to avoid a performance hit in some environments.
        if (typeof value == 'string') {
          return value;
        }
        if (isArray(value)) {
          // Recursively convert values (susceptible to call stack limits).
          return arrayMap(value, baseToString) + '';
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : '';
        }
        var result = (value + '');
        return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
      }

      /**
       * The base implementation of `_.uniqBy` without support for iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       */
      function baseUniq(array, iteratee, comparator) {
        var index = -1,
            includes = arrayIncludes,
            length = array.length,
            isCommon = true,
            result = [],
            seen = result;

        if (comparator) {
          isCommon = false;
          includes = arrayIncludesWith;
        }
        else if (length >= LARGE_ARRAY_SIZE) {
          var set = iteratee ? null : createSet(array);
          if (set) {
            return setToArray(set);
          }
          isCommon = false;
          includes = cacheHas;
          seen = new SetCache;
        }
        else {
          seen = iteratee ? [] : result;
        }
        outer:
        while (++index < length) {
          var value = array[index],
              computed = iteratee ? iteratee(value) : value;

          value = (comparator || value !== 0) ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          }
          else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.unset`.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {Array|string} path The property path to unset.
       * @returns {boolean} Returns `true` if the property is deleted, else `false`.
       */
      function baseUnset(object, path) {
        path = castPath(path, object);
        object = parent(object, path);
        return object == null || delete object[toKey(last(path))];
      }

      /**
       * The base implementation of `_.update`.
       *
       * @private
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to update.
       * @param {Function} updater The function to produce the updated value.
       * @param {Function} [customizer] The function to customize path creation.
       * @returns {Object} Returns `object`.
       */
      function baseUpdate(object, path, updater, customizer) {
        return baseSet(object, path, updater(baseGet(object, path)), customizer);
      }

      /**
       * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
       * without support for iteratee shorthands.
       *
       * @private
       * @param {Array} array The array to query.
       * @param {Function} predicate The function invoked per iteration.
       * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Array} Returns the slice of `array`.
       */
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length) &&
          predicate(array[index], index, array)) {}

        return isDrop
          ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
          : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
      }

      /**
       * The base implementation of `wrapperValue` which returns the result of
       * performing a sequence of actions on the unwrapped `value`, where each
       * successive action is supplied the return value of the previous.
       *
       * @private
       * @param {*} value The unwrapped value.
       * @param {Array} actions Actions to perform to resolve the unwrapped value.
       * @returns {*} Returns the resolved value.
       */
      function baseWrapperValue(value, actions) {
        var result = value;
        if (result instanceof LazyWrapper) {
          result = result.value();
        }
        return arrayReduce(actions, function(result, action) {
          return action.func.apply(action.thisArg, arrayPush([result], action.args));
        }, result);
      }

      /**
       * The base implementation of methods like `_.xor`, without support for
       * iteratee shorthands, that accepts an array of arrays to inspect.
       *
       * @private
       * @param {Array} arrays The arrays to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of values.
       */
      function baseXor(arrays, iteratee, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1,
            result = Array(length);

        while (++index < length) {
          var array = arrays[index],
              othIndex = -1;

          while (++othIndex < length) {
            if (othIndex != index) {
              result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result, 1), iteratee, comparator);
      }

      /**
       * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
       *
       * @private
       * @param {Array} props The property identifiers.
       * @param {Array} values The property values.
       * @param {Function} assignFunc The function to assign values.
       * @returns {Object} Returns the new object.
       */
      function baseZipObject(props, values, assignFunc) {
        var index = -1,
            length = props.length,
            valsLength = values.length,
            result = {};

        while (++index < length) {
          var value = index < valsLength ? values[index] : undefined$1;
          assignFunc(result, props[index], value);
        }
        return result;
      }

      /**
       * Casts `value` to an empty array if it's not an array like object.
       *
       * @private
       * @param {*} value The value to inspect.
       * @returns {Array|Object} Returns the cast array-like object.
       */
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }

      /**
       * Casts `value` to `identity` if it's not a function.
       *
       * @private
       * @param {*} value The value to inspect.
       * @returns {Function} Returns cast function.
       */
      function castFunction(value) {
        return typeof value == 'function' ? value : identity;
      }

      /**
       * Casts `value` to a path array if it's not one.
       *
       * @private
       * @param {*} value The value to inspect.
       * @param {Object} [object] The object to query keys on.
       * @returns {Array} Returns the cast property path array.
       */
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }

      /**
       * A `baseRest` alias which can be replaced with `identity` by module
       * replacement plugins.
       *
       * @private
       * @type {Function}
       * @param {Function} func The function to apply a rest parameter to.
       * @returns {Function} Returns the new function.
       */
      var castRest = baseRest;

      /**
       * Casts `array` to a slice if it's needed.
       *
       * @private
       * @param {Array} array The array to inspect.
       * @param {number} start The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns the cast slice.
       */
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined$1 ? length : end;
        return (!start && end >= length) ? array : baseSlice(array, start, end);
      }

      /**
       * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
       *
       * @private
       * @param {number|Object} id The timer id or timeout object of the timer to clear.
       */
      var clearTimeout = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };

      /**
       * Creates a clone of  `buffer`.
       *
       * @private
       * @param {Buffer} buffer The buffer to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Buffer} Returns the cloned buffer.
       */
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length,
            result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

        buffer.copy(result);
        return result;
      }

      /**
       * Creates a clone of `arrayBuffer`.
       *
       * @private
       * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
       * @returns {ArrayBuffer} Returns the cloned array buffer.
       */
      function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result).set(new Uint8Array(arrayBuffer));
        return result;
      }

      /**
       * Creates a clone of `dataView`.
       *
       * @private
       * @param {Object} dataView The data view to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the cloned data view.
       */
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }

      /**
       * Creates a clone of `regexp`.
       *
       * @private
       * @param {Object} regexp The regexp to clone.
       * @returns {Object} Returns the cloned regexp.
       */
      function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
      }

      /**
       * Creates a clone of the `symbol` object.
       *
       * @private
       * @param {Object} symbol The symbol object to clone.
       * @returns {Object} Returns the cloned symbol object.
       */
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
      }

      /**
       * Creates a clone of `typedArray`.
       *
       * @private
       * @param {Object} typedArray The typed array to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the cloned typed array.
       */
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }

      /**
       * Compares values to sort them in ascending order.
       *
       * @private
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {number} Returns the sort order indicator for `value`.
       */
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$1,
              valIsNull = value === null,
              valIsReflexive = value === value,
              valIsSymbol = isSymbol(value);

          var othIsDefined = other !== undefined$1,
              othIsNull = other === null,
              othIsReflexive = other === other,
              othIsSymbol = isSymbol(other);

          if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
              (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
              (valIsNull && othIsDefined && othIsReflexive) ||
              (!valIsDefined && othIsReflexive) ||
              !valIsReflexive) {
            return 1;
          }
          if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
              (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
              (othIsNull && valIsDefined && valIsReflexive) ||
              (!othIsDefined && valIsReflexive) ||
              !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }

      /**
       * Used by `_.orderBy` to compare multiple properties of a value to another
       * and stable sort them.
       *
       * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
       * specify an order of "desc" for descending or "asc" for ascending sort order
       * of corresponding values.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {boolean[]|string[]} orders The order to sort by for each property.
       * @returns {number} Returns the sort order indicator for `object`.
       */
      function compareMultiple(object, other, orders) {
        var index = -1,
            objCriteria = object.criteria,
            othCriteria = other.criteria,
            length = objCriteria.length,
            ordersLength = orders.length;

        while (++index < length) {
          var result = compareAscending(objCriteria[index], othCriteria[index]);
          if (result) {
            if (index >= ordersLength) {
              return result;
            }
            var order = orders[index];
            return result * (order == 'desc' ? -1 : 1);
          }
        }
        // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
        // that causes it, under certain circumstances, to provide the same value for
        // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
        // for more details.
        //
        // This also ensures a stable sort in V8 and other engines.
        // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
        return object.index - other.index;
      }

      /**
       * Creates an array that is the composition of partially applied arguments,
       * placeholders, and provided arguments into a single array of arguments.
       *
       * @private
       * @param {Array} args The provided arguments.
       * @param {Array} partials The arguments to prepend to those provided.
       * @param {Array} holders The `partials` placeholder indexes.
       * @params {boolean} [isCurried] Specify composing for a curried function.
       * @returns {Array} Returns the new array of composed arguments.
       */
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1,
            argsLength = args.length,
            holdersLength = holders.length,
            leftIndex = -1,
            leftLength = partials.length,
            rangeLength = nativeMax(argsLength - holdersLength, 0),
            result = Array(leftLength + rangeLength),
            isUncurried = !isCurried;

        while (++leftIndex < leftLength) {
          result[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result[leftIndex++] = args[argsIndex++];
        }
        return result;
      }

      /**
       * This function is like `composeArgs` except that the arguments composition
       * is tailored for `_.partialRight`.
       *
       * @private
       * @param {Array} args The provided arguments.
       * @param {Array} partials The arguments to append to those provided.
       * @param {Array} holders The `partials` placeholder indexes.
       * @params {boolean} [isCurried] Specify composing for a curried function.
       * @returns {Array} Returns the new array of composed arguments.
       */
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1,
            argsLength = args.length,
            holdersIndex = -1,
            holdersLength = holders.length,
            rightIndex = -1,
            rightLength = partials.length,
            rangeLength = nativeMax(argsLength - holdersLength, 0),
            result = Array(rangeLength + rightLength),
            isUncurried = !isCurried;

        while (++argsIndex < rangeLength) {
          result[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result;
      }

      /**
       * Copies the values of `source` to `array`.
       *
       * @private
       * @param {Array} source The array to copy values from.
       * @param {Array} [array=[]] The array to copy values to.
       * @returns {Array} Returns `array`.
       */
      function copyArray(source, array) {
        var index = -1,
            length = source.length;

        array || (array = Array(length));
        while (++index < length) {
          array[index] = source[index];
        }
        return array;
      }

      /**
       * Copies properties of `source` to `object`.
       *
       * @private
       * @param {Object} source The object to copy properties from.
       * @param {Array} props The property identifiers to copy.
       * @param {Object} [object={}] The object to copy properties to.
       * @param {Function} [customizer] The function to customize copied values.
       * @returns {Object} Returns `object`.
       */
      function copyObject(source, props, object, customizer) {
        var isNew = !object;
        object || (object = {});

        var index = -1,
            length = props.length;

        while (++index < length) {
          var key = props[index];

          var newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined$1;

          if (newValue === undefined$1) {
            newValue = source[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }

      /**
       * Copies own symbols of `source` to `object`.
       *
       * @private
       * @param {Object} source The object to copy symbols from.
       * @param {Object} [object={}] The object to copy symbols to.
       * @returns {Object} Returns `object`.
       */
      function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
      }

      /**
       * Copies own and inherited symbols of `source` to `object`.
       *
       * @private
       * @param {Object} source The object to copy symbols from.
       * @param {Object} [object={}] The object to copy symbols to.
       * @returns {Object} Returns `object`.
       */
      function copySymbolsIn(source, object) {
        return copyObject(source, getSymbolsIn(source), object);
      }

      /**
       * Creates a function like `_.groupBy`.
       *
       * @private
       * @param {Function} setter The function to set accumulator values.
       * @param {Function} [initializer] The accumulator object initializer.
       * @returns {Function} Returns the new aggregator function.
       */
      function createAggregator(setter, initializer) {
        return function(collection, iteratee) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator,
              accumulator = initializer ? initializer() : {};

          return func(collection, setter, getIteratee(iteratee, 2), accumulator);
        };
      }

      /**
       * Creates a function like `_.assign`.
       *
       * @private
       * @param {Function} assigner The function to assign values.
       * @returns {Function} Returns the new assigner function.
       */
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1,
              length = sources.length,
              customizer = length > 1 ? sources[length - 1] : undefined$1,
              guard = length > 2 ? sources[2] : undefined$1;

          customizer = (assigner.length > 3 && typeof customizer == 'function')
            ? (length--, customizer)
            : undefined$1;

          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined$1 : customizer;
            length = 1;
          }
          object = Object(object);
          while (++index < length) {
            var source = sources[index];
            if (source) {
              assigner(object, source, index, customizer);
            }
          }
          return object;
        });
      }

      /**
       * Creates a `baseEach` or `baseEachRight` function.
       *
       * @private
       * @param {Function} eachFunc The function to iterate over a collection.
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new base function.
       */
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }
          var length = collection.length,
              index = fromRight ? length : -1,
              iterable = Object(collection);

          while ((fromRight ? index-- : ++index < length)) {
            if (iteratee(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }

      /**
       * Creates a base function for methods like `_.forIn` and `_.forOwn`.
       *
       * @private
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new base function.
       */
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index = -1,
              iterable = Object(object),
              props = keysFunc(object),
              length = props.length;

          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }

      /**
       * Creates a function that wraps `func` to invoke it with the optional `this`
       * binding of `thisArg`.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @returns {Function} Returns the new wrapped function.
       */
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG,
            Ctor = createCtor(func);

        function wrapper() {
          var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
          return fn.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }

      /**
       * Creates a function like `_.lowerFirst`.
       *
       * @private
       * @param {string} methodName The name of the `String` case method to use.
       * @returns {Function} Returns the new case function.
       */
      function createCaseFirst(methodName) {
        return function(string) {
          string = toString(string);

          var strSymbols = hasUnicode(string)
            ? stringToArray(string)
            : undefined$1;

          var chr = strSymbols
            ? strSymbols[0]
            : string.charAt(0);

          var trailing = strSymbols
            ? castSlice(strSymbols, 1).join('')
            : string.slice(1);

          return chr[methodName]() + trailing;
        };
      }

      /**
       * Creates a function like `_.camelCase`.
       *
       * @private
       * @param {Function} callback The function to combine each word.
       * @returns {Function} Returns the new compounder function.
       */
      function createCompounder(callback) {
        return function(string) {
          return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
        };
      }

      /**
       * Creates a function that produces an instance of `Ctor` regardless of
       * whether it was invoked as part of a `new` expression or by `call` or `apply`.
       *
       * @private
       * @param {Function} Ctor The constructor to wrap.
       * @returns {Function} Returns the new wrapped function.
       */
      function createCtor(Ctor) {
        return function() {
          // Use a `switch` statement to work with class constructors. See
          // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
          // for more details.
          var args = arguments;
          switch (args.length) {
            case 0: return new Ctor;
            case 1: return new Ctor(args[0]);
            case 2: return new Ctor(args[0], args[1]);
            case 3: return new Ctor(args[0], args[1], args[2]);
            case 4: return new Ctor(args[0], args[1], args[2], args[3]);
            case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype),
              result = Ctor.apply(thisBinding, args);

          // Mimic the constructor's `return` behavior.
          // See https://es5.github.io/#x13.2.2 for more details.
          return isObject(result) ? result : thisBinding;
        };
      }

      /**
       * Creates a function that wraps `func` to enable currying.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {number} arity The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);

        function wrapper() {
          var length = arguments.length,
              args = Array(length),
              index = length,
              placeholder = getHolder(wrapper);

          while (index--) {
            args[index] = arguments[index];
          }
          var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
            ? []
            : replaceHolders(args, placeholder);

          length -= holders.length;
          if (length < arity) {
            return createRecurry(
              func, bitmask, createHybrid, wrapper.placeholder, undefined$1,
              args, holders, undefined$1, undefined$1, arity - length);
          }
          var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
          return apply(fn, this, args);
        }
        return wrapper;
      }

      /**
       * Creates a `_.find` or `_.findLast` function.
       *
       * @private
       * @param {Function} findIndexFunc The function to find the collection index.
       * @returns {Function} Returns the new find function.
       */
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object(collection);
          if (!isArrayLike(collection)) {
            var iteratee = getIteratee(predicate, 3);
            collection = keys(collection);
            predicate = function(key) { return iteratee(iterable[key], key, iterable); };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined$1;
        };
      }

      /**
       * Creates a `_.flow` or `_.flowRight` function.
       *
       * @private
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new flow function.
       */
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length,
              index = length,
              prereq = LodashWrapper.prototype.thru;

          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != 'function') {
              throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];

            var funcName = getFuncName(func),
                data = funcName == 'wrapper' ? getData(func) : undefined$1;

            if (data && isLaziable(data[0]) &&
                  data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                  !data[4].length && data[9] == 1
                ) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = (func.length == 1 && isLaziable(func))
                ? wrapper[funcName]()
                : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments,
                value = args[0];

            if (wrapper && args.length == 1 && isArray(value)) {
              return wrapper.plant(value).value();
            }
            var index = 0,
                result = length ? funcs[index].apply(this, args) : value;

            while (++index < length) {
              result = funcs[index].call(this, result);
            }
            return result;
          };
        });
      }

      /**
       * Creates a function that wraps `func` to invoke it with optional `this`
       * binding of `thisArg`, partial application, and currying.
       *
       * @private
       * @param {Function|string} func The function or method name to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {Array} [partials] The arguments to prepend to those provided to
       *  the new function.
       * @param {Array} [holders] The `partials` placeholder indexes.
       * @param {Array} [partialsRight] The arguments to append to those provided
       *  to the new function.
       * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
       * @param {Array} [argPos] The argument positions of the new function.
       * @param {number} [ary] The arity cap of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG,
            isBind = bitmask & WRAP_BIND_FLAG,
            isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
            isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
            isFlip = bitmask & WRAP_FLIP_FLAG,
            Ctor = isBindKey ? undefined$1 : createCtor(func);

        function wrapper() {
          var length = arguments.length,
              args = Array(length),
              index = length;

          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper),
                holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(
              func, bitmask, createHybrid, wrapper.placeholder, thisArg,
              args, newHolders, argPos, ary, arity - length
            );
          }
          var thisBinding = isBind ? thisArg : this,
              fn = isBindKey ? thisBinding[func] : func;

          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary < length) {
            args.length = ary;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn = Ctor || createCtor(fn);
          }
          return fn.apply(thisBinding, args);
        }
        return wrapper;
      }

      /**
       * Creates a function like `_.invertBy`.
       *
       * @private
       * @param {Function} setter The function to set accumulator values.
       * @param {Function} toIteratee The function to resolve iteratees.
       * @returns {Function} Returns the new inverter function.
       */
      function createInverter(setter, toIteratee) {
        return function(object, iteratee) {
          return baseInverter(object, setter, toIteratee(iteratee), {});
        };
      }

      /**
       * Creates a function that performs a mathematical operation on two values.
       *
       * @private
       * @param {Function} operator The function to perform the operation.
       * @param {number} [defaultValue] The value used for `undefined` arguments.
       * @returns {Function} Returns the new mathematical operation function.
       */
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result;
          if (value === undefined$1 && other === undefined$1) {
            return defaultValue;
          }
          if (value !== undefined$1) {
            result = value;
          }
          if (other !== undefined$1) {
            if (result === undefined$1) {
              return other;
            }
            if (typeof value == 'string' || typeof other == 'string') {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result = operator(value, other);
          }
          return result;
        };
      }

      /**
       * Creates a function like `_.over`.
       *
       * @private
       * @param {Function} arrayFunc The function to iterate over iteratees.
       * @returns {Function} Returns the new over function.
       */
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee) {
              return apply(iteratee, thisArg, args);
            });
          });
        });
      }

      /**
       * Creates the padding for `string` based on `length`. The `chars` string
       * is truncated if the number of characters exceeds `length`.
       *
       * @private
       * @param {number} length The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padding for `string`.
       */
      function createPadding(length, chars) {
        chars = chars === undefined$1 ? ' ' : baseToString(chars);

        var charsLength = chars.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars, length) : chars;
        }
        var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
        return hasUnicode(chars)
          ? castSlice(stringToArray(result), 0, length).join('')
          : result.slice(0, length);
      }

      /**
       * Creates a function that wraps `func` to invoke it with the `this` binding
       * of `thisArg` and `partials` prepended to the arguments it receives.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {*} thisArg The `this` binding of `func`.
       * @param {Array} partials The arguments to prepend to those provided to
       *  the new function.
       * @returns {Function} Returns the new wrapped function.
       */
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG,
            Ctor = createCtor(func);

        function wrapper() {
          var argsIndex = -1,
              argsLength = arguments.length,
              leftIndex = -1,
              leftLength = partials.length,
              args = Array(leftLength + argsLength),
              fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn, isBind ? thisArg : this, args);
        }
        return wrapper;
      }

      /**
       * Creates a `_.range` or `_.rangeRight` function.
       *
       * @private
       * @param {boolean} [fromRight] Specify iterating from right to left.
       * @returns {Function} Returns the new range function.
       */
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
            end = step = undefined$1;
          }
          // Ensure the sign of `-0` is preserved.
          start = toFinite(start);
          if (end === undefined$1) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$1 ? (start < end ? 1 : -1) : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }

      /**
       * Creates a function that performs a relational operation on two values.
       *
       * @private
       * @param {Function} operator The function to perform the operation.
       * @returns {Function} Returns the new relational operation function.
       */
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == 'string' && typeof other == 'string')) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }

      /**
       * Creates a function that wraps `func` to continue currying.
       *
       * @private
       * @param {Function} func The function to wrap.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @param {Function} wrapFunc The function to create the `func` wrapper.
       * @param {*} placeholder The placeholder value.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {Array} [partials] The arguments to prepend to those provided to
       *  the new function.
       * @param {Array} [holders] The `partials` placeholder indexes.
       * @param {Array} [argPos] The argument positions of the new function.
       * @param {number} [ary] The arity cap of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG,
            newHolders = isCurry ? holders : undefined$1,
            newHoldersRight = isCurry ? undefined$1 : holders,
            newPartials = isCurry ? partials : undefined$1,
            newPartialsRight = isCurry ? undefined$1 : partials;

        bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
          newHoldersRight, argPos, ary, arity
        ];

        var result = wrapFunc.apply(undefined$1, newData);
        if (isLaziable(func)) {
          setData(result, newData);
        }
        result.placeholder = placeholder;
        return setWrapToString(result, func, bitmask);
      }

      /**
       * Creates a function like `_.round`.
       *
       * @private
       * @param {string} methodName The name of the `Math` method to use when rounding.
       * @returns {Function} Returns the new round function.
       */
      function createRound(methodName) {
        var func = Math[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
          if (precision && nativeIsFinite(number)) {
            // Shift with exponential notation to avoid floating-point issues.
            // See [MDN](https://mdn.io/round#Examples) for more details.
            var pair = (toString(number) + 'e').split('e'),
                value = func(pair[0] + 'e' + (+pair[1] + precision));

            pair = (toString(value) + 'e').split('e');
            return +(pair[0] + 'e' + (+pair[1] - precision));
          }
          return func(number);
        };
      }

      /**
       * Creates a set object of `values`.
       *
       * @private
       * @param {Array} values The values to add to the set.
       * @returns {Object} Returns the new set.
       */
      var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
        return new Set(values);
      };

      /**
       * Creates a `_.toPairs` or `_.toPairsIn` function.
       *
       * @private
       * @param {Function} keysFunc The function to get the keys of a given object.
       * @returns {Function} Returns the new pairs function.
       */
      function createToPairs(keysFunc) {
        return function(object) {
          var tag = getTag(object);
          if (tag == mapTag) {
            return mapToArray(object);
          }
          if (tag == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }

      /**
       * Creates a function that either curries or invokes `func` with optional
       * `this` binding and partially applied arguments.
       *
       * @private
       * @param {Function|string} func The function or method name to wrap.
       * @param {number} bitmask The bitmask flags.
       *    1 - `_.bind`
       *    2 - `_.bindKey`
       *    4 - `_.curry` or `_.curryRight` of a bound function
       *    8 - `_.curry`
       *   16 - `_.curryRight`
       *   32 - `_.partial`
       *   64 - `_.partialRight`
       *  128 - `_.rearg`
       *  256 - `_.ary`
       *  512 - `_.flip`
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {Array} [partials] The arguments to be partially applied.
       * @param {Array} [holders] The `partials` placeholder indexes.
       * @param {Array} [argPos] The argument positions of the new function.
       * @param {number} [ary] The arity cap of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new wrapped function.
       */
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$1;
        }
        ary = ary === undefined$1 ? ary : nativeMax(toInteger(ary), 0);
        arity = arity === undefined$1 ? arity : toInteger(arity);
        length -= holders ? holders.length : 0;

        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials,
              holdersRight = holders;

          partials = holders = undefined$1;
        }
        var data = isBindKey ? undefined$1 : getData(func);

        var newData = [
          func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
          argPos, ary, arity
        ];

        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$1
          ? (isBindKey ? 0 : func.length)
          : nativeMax(newData[9] - length, 0);

        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result = createPartial(func, bitmask, thisArg, partials);
        } else {
          result = createHybrid.apply(undefined$1, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result, newData), func, bitmask);
      }

      /**
       * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
       * of source objects to the destination object for all destination properties
       * that resolve to `undefined`.
       *
       * @private
       * @param {*} objValue The destination value.
       * @param {*} srcValue The source value.
       * @param {string} key The key of the property to assign.
       * @param {Object} object The parent object of `objValue`.
       * @returns {*} Returns the value to assign.
       */
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined$1 ||
            (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
          return srcValue;
        }
        return objValue;
      }

      /**
       * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
       * objects into destination objects that are passed thru.
       *
       * @private
       * @param {*} objValue The destination value.
       * @param {*} srcValue The source value.
       * @param {string} key The key of the property to merge.
       * @param {Object} object The parent object of `objValue`.
       * @param {Object} source The parent object of `srcValue`.
       * @param {Object} [stack] Tracks traversed source values and their merged
       *  counterparts.
       * @returns {*} Returns the value to assign.
       */
      function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
        if (isObject(objValue) && isObject(srcValue)) {
          // Recursively merge objects and arrays (susceptible to call stack limits).
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
          stack['delete'](srcValue);
        }
        return objValue;
      }

      /**
       * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
       * objects.
       *
       * @private
       * @param {*} value The value to inspect.
       * @param {string} key The key of the property to inspect.
       * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
       */
      function customOmitClone(value) {
        return isPlainObject(value) ? undefined$1 : value;
      }

      /**
       * A specialized version of `baseIsEqualDeep` for arrays with support for
       * partial deep comparisons.
       *
       * @private
       * @param {Array} array The array to compare.
       * @param {Array} other The other array to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} stack Tracks traversed `array` and `other` objects.
       * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
       */
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
            arrLength = array.length,
            othLength = other.length;

        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        // Check that cyclic values are equal.
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1,
            result = true,
            seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined$1;

        stack.set(array, other);
        stack.set(other, array);

        // Ignore non-index properties.
        while (++index < arrLength) {
          var arrValue = array[index],
              othValue = other[index];

          if (customizer) {
            var compared = isPartial
              ? customizer(othValue, arrValue, index, other, array, stack)
              : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined$1) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          // Recursively compare arrays (susceptible to call stack limits).
          if (seen) {
            if (!arraySome(other, function(othValue, othIndex) {
                  if (!cacheHas(seen, othIndex) &&
                      (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
              result = false;
              break;
            }
          } else if (!(
                arrValue === othValue ||
                  equalFunc(arrValue, othValue, bitmask, customizer, stack)
              )) {
            result = false;
            break;
          }
        }
        stack['delete'](array);
        stack['delete'](other);
        return result;
      }

      /**
       * A specialized version of `baseIsEqualDeep` for comparing objects of
       * the same `toStringTag`.
       *
       * **Note:** This function only supports comparing values with tags of
       * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {string} tag The `toStringTag` of the objects to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} stack Tracks traversed `object` and `other` objects.
       * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
       */
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if ((object.byteLength != other.byteLength) ||
                (object.byteOffset != other.byteOffset)) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;

          case arrayBufferTag:
            if ((object.byteLength != other.byteLength) ||
                !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
              return false;
            }
            return true;

          case boolTag:
          case dateTag:
          case numberTag:
            // Coerce booleans to `1` or `0` and dates to milliseconds.
            // Invalid dates are coerced to `NaN`.
            return eq(+object, +other);

          case errorTag:
            return object.name == other.name && object.message == other.message;

          case regexpTag:
          case stringTag:
            // Coerce regexes to strings and treat strings, primitives and objects,
            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
            // for more details.
            return object == (other + '');

          case mapTag:
            var convert = mapToArray;

          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);

            if (object.size != other.size && !isPartial) {
              return false;
            }
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;

            // Recursively compare objects (susceptible to call stack limits).
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack['delete'](object);
            return result;

          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }

      /**
       * A specialized version of `baseIsEqualDeep` for objects with support for
       * partial deep comparisons.
       *
       * @private
       * @param {Object} object The object to compare.
       * @param {Object} other The other object to compare.
       * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
       * @param {Function} customizer The function to customize comparisons.
       * @param {Function} equalFunc The function to determine equivalents of values.
       * @param {Object} stack Tracks traversed `object` and `other` objects.
       * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
       */
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
            objProps = getAllKeys(object),
            objLength = objProps.length,
            othProps = getAllKeys(other),
            othLength = othProps.length;

        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        // Check that cyclic values are equal.
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);

        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key],
              othValue = other[key];

          if (customizer) {
            var compared = isPartial
              ? customizer(othValue, objValue, key, other, object, stack)
              : customizer(objValue, othValue, key, object, other, stack);
          }
          // Recursively compare objects (susceptible to call stack limits).
          if (!(compared === undefined$1
                ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
                : compared
              )) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == 'constructor');
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor,
              othCtor = other.constructor;

          // Non `Object` object instances with different constructors are not equal.
          if (objCtor != othCtor &&
              ('constructor' in object && 'constructor' in other) &&
              !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
                typeof othCtor == 'function' && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack['delete'](object);
        stack['delete'](other);
        return result;
      }

      /**
       * A specialized version of `baseRest` which flattens the rest array.
       *
       * @private
       * @param {Function} func The function to apply a rest parameter to.
       * @returns {Function} Returns the new function.
       */
      function flatRest(func) {
        return setToString(overRest(func, undefined$1, flatten), func + '');
      }

      /**
       * Creates an array of own enumerable property names and symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names and symbols.
       */
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
      }

      /**
       * Creates an array of own and inherited enumerable property names and
       * symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names and symbols.
       */
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }

      /**
       * Gets metadata for `func`.
       *
       * @private
       * @param {Function} func The function to query.
       * @returns {*} Returns the metadata for `func`.
       */
      var getData = !metaMap ? noop : function(func) {
        return metaMap.get(func);
      };

      /**
       * Gets the name of `func`.
       *
       * @private
       * @param {Function} func The function to query.
       * @returns {string} Returns the function name.
       */
      function getFuncName(func) {
        var result = (func.name + ''),
            array = realNames[result],
            length = hasOwnProperty.call(realNames, result) ? array.length : 0;

        while (length--) {
          var data = array[length],
              otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result;
      }

      /**
       * Gets the argument placeholder value for `func`.
       *
       * @private
       * @param {Function} func The function to inspect.
       * @returns {*} Returns the placeholder value.
       */
      function getHolder(func) {
        var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
        return object.placeholder;
      }

      /**
       * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
       * this function returns the custom method, otherwise it returns `baseIteratee`.
       * If arguments are provided, the chosen function is invoked with them and
       * its result is returned.
       *
       * @private
       * @param {*} [value] The value to convert to an iteratee.
       * @param {number} [arity] The arity of the created iteratee.
       * @returns {Function} Returns the chosen function or its result.
       */
      function getIteratee() {
        var result = lodash.iteratee || iteratee;
        result = result === iteratee ? baseIteratee : result;
        return arguments.length ? result(arguments[0], arguments[1]) : result;
      }

      /**
       * Gets the data for `map`.
       *
       * @private
       * @param {Object} map The map to query.
       * @param {string} key The reference key.
       * @returns {*} Returns the map data.
       */
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key)
          ? data[typeof key == 'string' ? 'string' : 'hash']
          : data.map;
      }

      /**
       * Gets the property names, values, and compare flags of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the match data of `object`.
       */
      function getMatchData(object) {
        var result = keys(object),
            length = result.length;

        while (length--) {
          var key = result[length],
              value = object[key];

          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }

      /**
       * Gets the native function at `key` of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {string} key The key of the method to get.
       * @returns {*} Returns the function if it's native, else `undefined`.
       */
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined$1;
      }

      /**
       * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
       *
       * @private
       * @param {*} value The value to query.
       * @returns {string} Returns the raw `toStringTag`.
       */
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag),
            tag = value[symToStringTag];

        try {
          value[symToStringTag] = undefined$1;
          var unmasked = true;
        } catch (e) {}

        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }

      /**
       * Creates an array of the own enumerable symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of symbols.
       */
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };

      /**
       * Creates an array of the own and inherited enumerable symbols of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of symbols.
       */
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result = [];
        while (object) {
          arrayPush(result, getSymbols(object));
          object = getPrototype(object);
        }
        return result;
      };

      /**
       * Gets the `toStringTag` of `value`.
       *
       * @private
       * @param {*} value The value to query.
       * @returns {string} Returns the `toStringTag`.
       */
      var getTag = baseGetTag;

      // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
      if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
          (Map && getTag(new Map) != mapTag) ||
          (Promise && getTag(Promise.resolve()) != promiseTag) ||
          (Set && getTag(new Set) != setTag) ||
          (WeakMap && getTag(new WeakMap) != weakMapTag)) {
        getTag = function(value) {
          var result = baseGetTag(value),
              Ctor = result == objectTag ? value.constructor : undefined$1,
              ctorString = Ctor ? toSource(Ctor) : '';

          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString: return dataViewTag;
              case mapCtorString: return mapTag;
              case promiseCtorString: return promiseTag;
              case setCtorString: return setTag;
              case weakMapCtorString: return weakMapTag;
            }
          }
          return result;
        };
      }

      /**
       * Gets the view, applying any `transforms` to the `start` and `end` positions.
       *
       * @private
       * @param {number} start The start of the view.
       * @param {number} end The end of the view.
       * @param {Array} transforms The transformations to apply to the view.
       * @returns {Object} Returns an object containing the `start` and `end`
       *  positions of the view.
       */
      function getView(start, end, transforms) {
        var index = -1,
            length = transforms.length;

        while (++index < length) {
          var data = transforms[index],
              size = data.size;

          switch (data.type) {
            case 'drop':      start += size; break;
            case 'dropRight': end -= size; break;
            case 'take':      end = nativeMin(end, start + size); break;
            case 'takeRight': start = nativeMax(start, end - size); break;
          }
        }
        return { 'start': start, 'end': end };
      }

      /**
       * Extracts wrapper details from the `source` body comment.
       *
       * @private
       * @param {string} source The source to inspect.
       * @returns {Array} Returns the wrapper details.
       */
      function getWrapDetails(source) {
        var match = source.match(reWrapDetails);
        return match ? match[1].split(reSplitDetails) : [];
      }

      /**
       * Checks if `path` exists on `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array|string} path The path to check.
       * @param {Function} hasFunc The function to check properties.
       * @returns {boolean} Returns `true` if `path` exists, else `false`.
       */
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);

        var index = -1,
            length = path.length,
            result = false;

        while (++index < length) {
          var key = toKey(path[index]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) &&
          (isArray(object) || isArguments(object));
      }

      /**
       * Initializes an array clone.
       *
       * @private
       * @param {Array} array The array to clone.
       * @returns {Array} Returns the initialized clone.
       */
      function initCloneArray(array) {
        var length = array.length,
            result = new array.constructor(length);

        // Add properties assigned by `RegExp#exec`.
        if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
          result.index = array.index;
          result.input = array.input;
        }
        return result;
      }

      /**
       * Initializes an object clone.
       *
       * @private
       * @param {Object} object The object to clone.
       * @returns {Object} Returns the initialized clone.
       */
      function initCloneObject(object) {
        return (typeof object.constructor == 'function' && !isPrototype(object))
          ? baseCreate(getPrototype(object))
          : {};
      }

      /**
       * Initializes an object clone based on its `toStringTag`.
       *
       * **Note:** This function only supports cloning values with tags of
       * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
       *
       * @private
       * @param {Object} object The object to clone.
       * @param {string} tag The `toStringTag` of the object to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the initialized clone.
       */
      function initCloneByTag(object, tag, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
          case arrayBufferTag:
            return cloneArrayBuffer(object);

          case boolTag:
          case dateTag:
            return new Ctor(+object);

          case dataViewTag:
            return cloneDataView(object, isDeep);

          case float32Tag: case float64Tag:
          case int8Tag: case int16Tag: case int32Tag:
          case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
            return cloneTypedArray(object, isDeep);

          case mapTag:
            return new Ctor;

          case numberTag:
          case stringTag:
            return new Ctor(object);

          case regexpTag:
            return cloneRegExp(object);

          case setTag:
            return new Ctor;

          case symbolTag:
            return cloneSymbol(object);
        }
      }

      /**
       * Inserts wrapper `details` in a comment at the top of the `source` body.
       *
       * @private
       * @param {string} source The source to modify.
       * @returns {Array} details The details to insert.
       * @returns {string} Returns the modified source.
       */
      function insertWrapDetails(source, details) {
        var length = details.length;
        if (!length) {
          return source;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
        details = details.join(length > 2 ? ', ' : ' ');
        return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
      }

      /**
       * Checks if `value` is a flattenable `arguments` object or array.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
       */
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) ||
          !!(spreadableSymbol && value && value[spreadableSymbol]);
      }

      /**
       * Checks if `value` is a valid array-like index.
       *
       * @private
       * @param {*} value The value to check.
       * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
       * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
       */
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;

        return !!length &&
          (type == 'number' ||
            (type != 'symbol' && reIsUint.test(value))) &&
              (value > -1 && value % 1 == 0 && value < length);
      }

      /**
       * Checks if the given arguments are from an iteratee call.
       *
       * @private
       * @param {*} value The potential iteratee value argument.
       * @param {*} index The potential iteratee index or key argument.
       * @param {*} object The potential iteratee object argument.
       * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
       *  else `false`.
       */
      function isIterateeCall(value, index, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index;
        if (type == 'number'
              ? (isArrayLike(object) && isIndex(index, object.length))
              : (type == 'string' && index in object)
            ) {
          return eq(object[index], value);
        }
        return false;
      }

      /**
       * Checks if `value` is a property name and not a property path.
       *
       * @private
       * @param {*} value The value to check.
       * @param {Object} [object] The object to query keys on.
       * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
       */
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == 'number' || type == 'symbol' || type == 'boolean' ||
            value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
          (object != null && value in Object(object));
      }

      /**
       * Checks if `value` is suitable for use as unique object key.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
       */
      function isKeyable(value) {
        var type = typeof value;
        return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
          ? (value !== '__proto__')
          : (value === null);
      }

      /**
       * Checks if `func` has a lazy counterpart.
       *
       * @private
       * @param {Function} func The function to check.
       * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
       *  else `false`.
       */
      function isLaziable(func) {
        var funcName = getFuncName(func),
            other = lodash[funcName];

        if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }

      /**
       * Checks if `func` has its source masked.
       *
       * @private
       * @param {Function} func The function to check.
       * @returns {boolean} Returns `true` if `func` is masked, else `false`.
       */
      function isMasked(func) {
        return !!maskSrcKey && (maskSrcKey in func);
      }

      /**
       * Checks if `func` is capable of being masked.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
       */
      var isMaskable = coreJsData ? isFunction : stubFalse;

      /**
       * Checks if `value` is likely a prototype object.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
       */
      function isPrototype(value) {
        var Ctor = value && value.constructor,
            proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

        return value === proto;
      }

      /**
       * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` if suitable for strict
       *  equality comparisons, else `false`.
       */
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }

      /**
       * A specialized version of `matchesProperty` for source values suitable
       * for strict equality comparisons, i.e. `===`.
       *
       * @private
       * @param {string} key The key of the property to get.
       * @param {*} srcValue The value to match.
       * @returns {Function} Returns the new spec function.
       */
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue &&
            (srcValue !== undefined$1 || (key in Object(object)));
        };
      }

      /**
       * A specialized version of `_.memoize` which clears the memoized function's
       * cache when it exceeds `MAX_MEMOIZE_SIZE`.
       *
       * @private
       * @param {Function} func The function to have its output memoized.
       * @returns {Function} Returns the new memoized function.
       */
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });

        var cache = result.cache;
        return result;
      }

      /**
       * Merges the function metadata of `source` into `data`.
       *
       * Merging metadata reduces the number of wrappers used to invoke a function.
       * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
       * may be applied regardless of execution order. Methods like `_.ary` and
       * `_.rearg` modify function arguments, making the order in which they are
       * executed important, preventing the merging of metadata. However, we make
       * an exception for a safe combined case where curried functions have `_.ary`
       * and or `_.rearg` applied.
       *
       * @private
       * @param {Array} data The destination metadata.
       * @param {Array} source The source metadata.
       * @returns {Array} Returns `data`.
       */
      function mergeData(data, source) {
        var bitmask = data[1],
            srcBitmask = source[1],
            newBitmask = bitmask | srcBitmask,
            isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

        var isCombo =
          ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
          ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
          ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

        // Exit early if metadata can't be merged.
        if (!(isCommon || isCombo)) {
          return data;
        }
        // Use source `thisArg` if available.
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source[2];
          // Set when currying a bound function.
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        // Compose partial arguments.
        var value = source[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
        }
        // Compose partial right arguments.
        value = source[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
        }
        // Use source `argPos` if available.
        value = source[7];
        if (value) {
          data[7] = value;
        }
        // Use source `ary` if it's smaller.
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
        }
        // Use source `arity` if one is not provided.
        if (data[9] == null) {
          data[9] = source[9];
        }
        // Use source `func` and merge bitmasks.
        data[0] = source[0];
        data[1] = newBitmask;

        return data;
      }

      /**
       * This function is like
       * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
       * except that it includes inherited enumerable properties.
       *
       * @private
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       */
      function nativeKeysIn(object) {
        var result = [];
        if (object != null) {
          for (var key in Object(object)) {
            result.push(key);
          }
        }
        return result;
      }

      /**
       * Converts `value` to a string using `Object.prototype.toString`.
       *
       * @private
       * @param {*} value The value to convert.
       * @returns {string} Returns the converted string.
       */
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }

      /**
       * A specialized version of `baseRest` which transforms the rest array.
       *
       * @private
       * @param {Function} func The function to apply a rest parameter to.
       * @param {number} [start=func.length-1] The start position of the rest parameter.
       * @param {Function} transform The rest array transform.
       * @returns {Function} Returns the new function.
       */
      function overRest(func, start, transform) {
        start = nativeMax(start === undefined$1 ? (func.length - 1) : start, 0);
        return function() {
          var args = arguments,
              index = -1,
              length = nativeMax(args.length - start, 0),
              array = Array(length);

          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }

      /**
       * Gets the parent value at `path` of `object`.
       *
       * @private
       * @param {Object} object The object to query.
       * @param {Array} path The path to get the parent value of.
       * @returns {*} Returns the parent value.
       */
      function parent(object, path) {
        return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
      }

      /**
       * Reorder `array` according to the specified indexes where the element at
       * the first index is assigned as the first element, the element at
       * the second index is assigned as the second element, and so on.
       *
       * @private
       * @param {Array} array The array to reorder.
       * @param {Array} indexes The arranged array indexes.
       * @returns {Array} Returns `array`.
       */
      function reorder(array, indexes) {
        var arrLength = array.length,
            length = nativeMin(indexes.length, arrLength),
            oldArray = copyArray(array);

        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
        }
        return array;
      }

      /**
       * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
       *
       * @private
       * @param {Object} object The object to query.
       * @param {string} key The key of the property to get.
       * @returns {*} Returns the property value.
       */
      function safeGet(object, key) {
        if (key === 'constructor' && typeof object[key] === 'function') {
          return;
        }

        if (key == '__proto__') {
          return;
        }

        return object[key];
      }

      /**
       * Sets metadata for `func`.
       *
       * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
       * period of time, it will trip its breaker and transition to an identity
       * function to avoid garbage collection pauses in V8. See
       * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
       * for more details.
       *
       * @private
       * @param {Function} func The function to associate metadata with.
       * @param {*} data The metadata.
       * @returns {Function} Returns `func`.
       */
      var setData = shortOut(baseSetData);

      /**
       * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
       *
       * @private
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay invocation.
       * @returns {number|Object} Returns the timer id or timeout object.
       */
      var setTimeout = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };

      /**
       * Sets the `toString` method of `func` to return `string`.
       *
       * @private
       * @param {Function} func The function to modify.
       * @param {Function} string The `toString` result.
       * @returns {Function} Returns `func`.
       */
      var setToString = shortOut(baseSetToString);

      /**
       * Sets the `toString` method of `wrapper` to mimic the source of `reference`
       * with wrapper details in a comment at the top of the source body.
       *
       * @private
       * @param {Function} wrapper The function to modify.
       * @param {Function} reference The reference function.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @returns {Function} Returns `wrapper`.
       */
      function setWrapToString(wrapper, reference, bitmask) {
        var source = (reference + '');
        return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
      }

      /**
       * Creates a function that'll short out and invoke `identity` instead
       * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
       * milliseconds.
       *
       * @private
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new shortable function.
       */
      function shortOut(func) {
        var count = 0,
            lastCalled = 0;

        return function() {
          var stamp = nativeNow(),
              remaining = HOT_SPAN - (stamp - lastCalled);

          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$1, arguments);
        };
      }

      /**
       * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
       *
       * @private
       * @param {Array} array The array to shuffle.
       * @param {number} [size=array.length] The size of `array`.
       * @returns {Array} Returns `array`.
       */
      function shuffleSelf(array, size) {
        var index = -1,
            length = array.length,
            lastIndex = length - 1;

        size = size === undefined$1 ? length : size;
        while (++index < size) {
          var rand = baseRandom(index, lastIndex),
              value = array[rand];

          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size;
        return array;
      }

      /**
       * Converts `string` to a property path array.
       *
       * @private
       * @param {string} string The string to convert.
       * @returns {Array} Returns the property path array.
       */
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46 /* . */) {
          result.push('');
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
        });
        return result;
      });

      /**
       * Converts `value` to a string key if it's not a string or symbol.
       *
       * @private
       * @param {*} value The value to inspect.
       * @returns {string|symbol} Returns the key.
       */
      function toKey(value) {
        if (typeof value == 'string' || isSymbol(value)) {
          return value;
        }
        var result = (value + '');
        return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
      }

      /**
       * Converts `func` to its source code.
       *
       * @private
       * @param {Function} func The function to convert.
       * @returns {string} Returns the source code.
       */
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {}
          try {
            return (func + '');
          } catch (e) {}
        }
        return '';
      }

      /**
       * Updates wrapper `details` based on `bitmask` flags.
       *
       * @private
       * @returns {Array} details The details to modify.
       * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
       * @returns {Array} Returns `details`.
       */
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = '_.' + pair[0];
          if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }

      /**
       * Creates a clone of `wrapper`.
       *
       * @private
       * @param {Object} wrapper The wrapper to clone.
       * @returns {Object} Returns the cloned wrapper.
       */
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result.__actions__ = copyArray(wrapper.__actions__);
        result.__index__  = wrapper.__index__;
        result.__values__ = wrapper.__values__;
        return result;
      }

      /*------------------------------------------------------------------------*/

      /**
       * Creates an array of elements split into groups the length of `size`.
       * If `array` can't be split evenly, the final chunk will be the remaining
       * elements.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to process.
       * @param {number} [size=1] The length of each chunk
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the new array of chunks.
       * @example
       *
       * _.chunk(['a', 'b', 'c', 'd'], 2);
       * // => [['a', 'b'], ['c', 'd']]
       *
       * _.chunk(['a', 'b', 'c', 'd'], 3);
       * // => [['a', 'b', 'c'], ['d']]
       */
      function chunk(array, size, guard) {
        if ((guard ? isIterateeCall(array, size, guard) : size === undefined$1)) {
          size = 1;
        } else {
          size = nativeMax(toInteger(size), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size < 1) {
          return [];
        }
        var index = 0,
            resIndex = 0,
            result = Array(nativeCeil(length / size));

        while (index < length) {
          result[resIndex++] = baseSlice(array, index, (index += size));
        }
        return result;
      }

      /**
       * Creates an array with all falsey values removed. The values `false`, `null`,
       * `0`, `""`, `undefined`, and `NaN` are falsey.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to compact.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * _.compact([0, 1, false, 2, '', 3]);
       * // => [1, 2, 3]
       */
      function compact(array) {
        var index = -1,
            length = array == null ? 0 : array.length,
            resIndex = 0,
            result = [];

        while (++index < length) {
          var value = array[index];
          if (value) {
            result[resIndex++] = value;
          }
        }
        return result;
      }

      /**
       * Creates a new array concatenating `array` with any additional arrays
       * and/or values.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to concatenate.
       * @param {...*} [values] The values to concatenate.
       * @returns {Array} Returns the new concatenated array.
       * @example
       *
       * var array = [1];
       * var other = _.concat(array, 2, [3], [[4]]);
       *
       * console.log(other);
       * // => [1, 2, 3, [4]]
       *
       * console.log(array);
       * // => [1]
       */
      function concat() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array(length - 1),
            array = arguments[0],
            index = length;

        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }

      /**
       * Creates an array of `array` values not included in the other given arrays
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons. The order and references of result values are
       * determined by the first array.
       *
       * **Note:** Unlike `_.pullAll`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...Array} [values] The values to exclude.
       * @returns {Array} Returns the new array of filtered values.
       * @see _.without, _.xor
       * @example
       *
       * _.difference([2, 1], [2, 3]);
       * // => [1]
       */
      var difference = baseRest(function(array, values) {
        return isArrayLikeObject(array)
          ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
          : [];
      });

      /**
       * This method is like `_.difference` except that it accepts `iteratee` which
       * is invoked for each element of `array` and `values` to generate the criterion
       * by which they're compared. The order and references of result values are
       * determined by the first array. The iteratee is invoked with one argument:
       * (value).
       *
       * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...Array} [values] The values to exclude.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
       * // => [1.2]
       *
       * // The `_.property` iteratee shorthand.
       * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
       * // => [{ 'x': 2 }]
       */
      var differenceBy = baseRest(function(array, values) {
        var iteratee = last(values);
        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined$1;
        }
        return isArrayLikeObject(array)
          ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
          : [];
      });

      /**
       * This method is like `_.difference` except that it accepts `comparator`
       * which is invoked to compare elements of `array` to `values`. The order and
       * references of result values are determined by the first array. The comparator
       * is invoked with two arguments: (arrVal, othVal).
       *
       * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...Array} [values] The values to exclude.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       *
       * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
       * // => [{ 'x': 2, 'y': 1 }]
       */
      var differenceWith = baseRest(function(array, values) {
        var comparator = last(values);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$1;
        }
        return isArrayLikeObject(array)
          ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined$1, comparator)
          : [];
      });

      /**
       * Creates a slice of `array` with `n` elements dropped from the beginning.
       *
       * @static
       * @memberOf _
       * @since 0.5.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to drop.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.drop([1, 2, 3]);
       * // => [2, 3]
       *
       * _.drop([1, 2, 3], 2);
       * // => [3]
       *
       * _.drop([1, 2, 3], 5);
       * // => []
       *
       * _.drop([1, 2, 3], 0);
       * // => [1, 2, 3]
       */
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = (guard || n === undefined$1) ? 1 : toInteger(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }

      /**
       * Creates a slice of `array` with `n` elements dropped from the end.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to drop.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.dropRight([1, 2, 3]);
       * // => [1, 2]
       *
       * _.dropRight([1, 2, 3], 2);
       * // => [1]
       *
       * _.dropRight([1, 2, 3], 5);
       * // => []
       *
       * _.dropRight([1, 2, 3], 0);
       * // => [1, 2, 3]
       */
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = (guard || n === undefined$1) ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }

      /**
       * Creates a slice of `array` excluding elements dropped from the end.
       * Elements are dropped until `predicate` returns falsey. The predicate is
       * invoked with three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': true },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': false }
       * ];
       *
       * _.dropRightWhile(users, function(o) { return !o.active; });
       * // => objects for ['barney']
       *
       * // The `_.matches` iteratee shorthand.
       * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
       * // => objects for ['barney', 'fred']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.dropRightWhile(users, ['active', false]);
       * // => objects for ['barney']
       *
       * // The `_.property` iteratee shorthand.
       * _.dropRightWhile(users, 'active');
       * // => objects for ['barney', 'fred', 'pebbles']
       */
      function dropRightWhile(array, predicate) {
        return (array && array.length)
          ? baseWhile(array, getIteratee(predicate, 3), true, true)
          : [];
      }

      /**
       * Creates a slice of `array` excluding elements dropped from the beginning.
       * Elements are dropped until `predicate` returns falsey. The predicate is
       * invoked with three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': false },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': true }
       * ];
       *
       * _.dropWhile(users, function(o) { return !o.active; });
       * // => objects for ['pebbles']
       *
       * // The `_.matches` iteratee shorthand.
       * _.dropWhile(users, { 'user': 'barney', 'active': false });
       * // => objects for ['fred', 'pebbles']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.dropWhile(users, ['active', false]);
       * // => objects for ['pebbles']
       *
       * // The `_.property` iteratee shorthand.
       * _.dropWhile(users, 'active');
       * // => objects for ['barney', 'fred', 'pebbles']
       */
      function dropWhile(array, predicate) {
        return (array && array.length)
          ? baseWhile(array, getIteratee(predicate, 3), true)
          : [];
      }

      /**
       * Fills elements of `array` with `value` from `start` up to, but not
       * including, `end`.
       *
       * **Note:** This method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 3.2.0
       * @category Array
       * @param {Array} array The array to fill.
       * @param {*} value The value to fill `array` with.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [1, 2, 3];
       *
       * _.fill(array, 'a');
       * console.log(array);
       * // => ['a', 'a', 'a']
       *
       * _.fill(Array(3), 2);
       * // => [2, 2, 2]
       *
       * _.fill([4, 6, 8, 10], '*', 1, 3);
       * // => [4, '*', '*', 10]
       */
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }

      /**
       * This method is like `_.find` except that it returns the index of the first
       * element `predicate` returns truthy for instead of the element itself.
       *
       * @static
       * @memberOf _
       * @since 1.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {number} Returns the index of the found element, else `-1`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': false },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': true }
       * ];
       *
       * _.findIndex(users, function(o) { return o.user == 'barney'; });
       * // => 0
       *
       * // The `_.matches` iteratee shorthand.
       * _.findIndex(users, { 'user': 'fred', 'active': false });
       * // => 1
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findIndex(users, ['active', false]);
       * // => 0
       *
       * // The `_.property` iteratee shorthand.
       * _.findIndex(users, 'active');
       * // => 2
       */
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }

      /**
       * This method is like `_.findIndex` except that it iterates over elements
       * of `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=array.length-1] The index to search from.
       * @returns {number} Returns the index of the found element, else `-1`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': true },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': false }
       * ];
       *
       * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
       * // => 2
       *
       * // The `_.matches` iteratee shorthand.
       * _.findLastIndex(users, { 'user': 'barney', 'active': true });
       * // => 0
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findLastIndex(users, ['active', false]);
       * // => 2
       *
       * // The `_.property` iteratee shorthand.
       * _.findLastIndex(users, 'active');
       * // => 0
       */
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = fromIndex < 0
            ? nativeMax(length + index, 0)
            : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }

      /**
       * Flattens `array` a single level deep.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to flatten.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * _.flatten([1, [2, [3, [4]], 5]]);
       * // => [1, 2, [3, [4]], 5]
       */
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }

      /**
       * Recursively flattens `array`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to flatten.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * _.flattenDeep([1, [2, [3, [4]], 5]]);
       * // => [1, 2, 3, 4, 5]
       */
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }

      /**
       * Recursively flatten `array` up to `depth` times.
       *
       * @static
       * @memberOf _
       * @since 4.4.0
       * @category Array
       * @param {Array} array The array to flatten.
       * @param {number} [depth=1] The maximum recursion depth.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * var array = [1, [2, [3, [4]], 5]];
       *
       * _.flattenDepth(array, 1);
       * // => [1, 2, [3, [4]], 5]
       *
       * _.flattenDepth(array, 2);
       * // => [1, 2, 3, [4], 5]
       */
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(array, depth);
      }

      /**
       * The inverse of `_.toPairs`; this method returns an object composed
       * from key-value `pairs`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} pairs The key-value pairs.
       * @returns {Object} Returns the new object.
       * @example
       *
       * _.fromPairs([['a', 1], ['b', 2]]);
       * // => { 'a': 1, 'b': 2 }
       */
      function fromPairs(pairs) {
        var index = -1,
            length = pairs == null ? 0 : pairs.length,
            result = {};

        while (++index < length) {
          var pair = pairs[index];
          result[pair[0]] = pair[1];
        }
        return result;
      }

      /**
       * Gets the first element of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @alias first
       * @category Array
       * @param {Array} array The array to query.
       * @returns {*} Returns the first element of `array`.
       * @example
       *
       * _.head([1, 2, 3]);
       * // => 1
       *
       * _.head([]);
       * // => undefined
       */
      function head(array) {
        return (array && array.length) ? array[0] : undefined$1;
      }

      /**
       * Gets the index at which the first occurrence of `value` is found in `array`
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons. If `fromIndex` is negative, it's used as the
       * offset from the end of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.indexOf([1, 2, 1, 2], 2);
       * // => 1
       *
       * // Search from the `fromIndex`.
       * _.indexOf([1, 2, 1, 2], 2, 2);
       * // => 3
       */
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }

      /**
       * Gets all but the last element of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to query.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.initial([1, 2, 3]);
       * // => [1, 2]
       */
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }

      /**
       * Creates an array of unique values that are included in all given arrays
       * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons. The order and references of result values are
       * determined by the first array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @returns {Array} Returns the new array of intersecting values.
       * @example
       *
       * _.intersection([2, 1], [2, 3]);
       * // => [2]
       */
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return (mapped.length && mapped[0] === arrays[0])
          ? baseIntersection(mapped)
          : [];
      });

      /**
       * This method is like `_.intersection` except that it accepts `iteratee`
       * which is invoked for each element of each `arrays` to generate the criterion
       * by which they're compared. The order and references of result values are
       * determined by the first array. The iteratee is invoked with one argument:
       * (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of intersecting values.
       * @example
       *
       * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
       * // => [2.1]
       *
       * // The `_.property` iteratee shorthand.
       * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }]
       */
      var intersectionBy = baseRest(function(arrays) {
        var iteratee = last(arrays),
            mapped = arrayMap(arrays, castArrayLikeObject);

        if (iteratee === last(mapped)) {
          iteratee = undefined$1;
        } else {
          mapped.pop();
        }
        return (mapped.length && mapped[0] === arrays[0])
          ? baseIntersection(mapped, getIteratee(iteratee, 2))
          : [];
      });

      /**
       * This method is like `_.intersection` except that it accepts `comparator`
       * which is invoked to compare elements of `arrays`. The order and references
       * of result values are determined by the first array. The comparator is
       * invoked with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of intersecting values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.intersectionWith(objects, others, _.isEqual);
       * // => [{ 'x': 1, 'y': 2 }]
       */
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays),
            mapped = arrayMap(arrays, castArrayLikeObject);

        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        if (comparator) {
          mapped.pop();
        }
        return (mapped.length && mapped[0] === arrays[0])
          ? baseIntersection(mapped, undefined$1, comparator)
          : [];
      });

      /**
       * Converts all elements in `array` into a string separated by `separator`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to convert.
       * @param {string} [separator=','] The element separator.
       * @returns {string} Returns the joined string.
       * @example
       *
       * _.join(['a', 'b', 'c'], '~');
       * // => 'a~b~c'
       */
      function join(array, separator) {
        return array == null ? '' : nativeJoin.call(array, separator);
      }

      /**
       * Gets the last element of `array`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to query.
       * @returns {*} Returns the last element of `array`.
       * @example
       *
       * _.last([1, 2, 3]);
       * // => 3
       */
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined$1;
      }

      /**
       * This method is like `_.indexOf` except that it iterates over elements of
       * `array` from right to left.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=array.length-1] The index to search from.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.lastIndexOf([1, 2, 1, 2], 2);
       * // => 3
       *
       * // Search from the `fromIndex`.
       * _.lastIndexOf([1, 2, 1, 2], 2, 2);
       * // => 1
       */
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined$1) {
          index = toInteger(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value
          ? strictLastIndexOf(array, value, index)
          : baseFindIndex(array, baseIsNaN, index, true);
      }

      /**
       * Gets the element at index `n` of `array`. If `n` is negative, the nth
       * element from the end is returned.
       *
       * @static
       * @memberOf _
       * @since 4.11.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=0] The index of the element to return.
       * @returns {*} Returns the nth element of `array`.
       * @example
       *
       * var array = ['a', 'b', 'c', 'd'];
       *
       * _.nth(array, 1);
       * // => 'b'
       *
       * _.nth(array, -2);
       * // => 'c';
       */
      function nth(array, n) {
        return (array && array.length) ? baseNth(array, toInteger(n)) : undefined$1;
      }

      /**
       * Removes all given values from `array` using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
       * to remove elements from an array by predicate.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {...*} [values] The values to remove.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
       *
       * _.pull(array, 'a', 'c');
       * console.log(array);
       * // => ['b', 'b']
       */
      var pull = baseRest(pullAll);

      /**
       * This method is like `_.pull` except that it accepts an array of values to remove.
       *
       * **Note:** Unlike `_.difference`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
       *
       * _.pullAll(array, ['a', 'c']);
       * console.log(array);
       * // => ['b', 'b']
       */
      function pullAll(array, values) {
        return (array && array.length && values && values.length)
          ? basePullAll(array, values)
          : array;
      }

      /**
       * This method is like `_.pullAll` except that it accepts `iteratee` which is
       * invoked for each element of `array` and `values` to generate the criterion
       * by which they're compared. The iteratee is invoked with one argument: (value).
       *
       * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
       *
       * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
       * console.log(array);
       * // => [{ 'x': 2 }]
       */
      function pullAllBy(array, values, iteratee) {
        return (array && array.length && values && values.length)
          ? basePullAll(array, values, getIteratee(iteratee, 2))
          : array;
      }

      /**
       * This method is like `_.pullAll` except that it accepts `comparator` which
       * is invoked to compare elements of `array` to `values`. The comparator is
       * invoked with two arguments: (arrVal, othVal).
       *
       * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 4.6.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Array} values The values to remove.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
       *
       * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
       * console.log(array);
       * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
       */
      function pullAllWith(array, values, comparator) {
        return (array && array.length && values && values.length)
          ? basePullAll(array, values, undefined$1, comparator)
          : array;
      }

      /**
       * Removes elements from `array` corresponding to `indexes` and returns an
       * array of removed elements.
       *
       * **Note:** Unlike `_.at`, this method mutates `array`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {...(number|number[])} [indexes] The indexes of elements to remove.
       * @returns {Array} Returns the new array of removed elements.
       * @example
       *
       * var array = ['a', 'b', 'c', 'd'];
       * var pulled = _.pullAt(array, [1, 3]);
       *
       * console.log(array);
       * // => ['a', 'c']
       *
       * console.log(pulled);
       * // => ['b', 'd']
       */
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length,
            result = baseAt(array, indexes);

        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));

        return result;
      });

      /**
       * Removes all elements from `array` that `predicate` returns truthy for
       * and returns an array of the removed elements. The predicate is invoked
       * with three arguments: (value, index, array).
       *
       * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
       * to pull elements from an array by value.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new array of removed elements.
       * @example
       *
       * var array = [1, 2, 3, 4];
       * var evens = _.remove(array, function(n) {
       *   return n % 2 == 0;
       * });
       *
       * console.log(array);
       * // => [1, 3]
       *
       * console.log(evens);
       * // => [2, 4]
       */
      function remove(array, predicate) {
        var result = [];
        if (!(array && array.length)) {
          return result;
        }
        var index = -1,
            indexes = [],
            length = array.length;

        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result;
      }

      /**
       * Reverses `array` so that the first element becomes the last, the second
       * element becomes the second to last, and so on.
       *
       * **Note:** This method mutates `array` and is based on
       * [`Array#reverse`](https://mdn.io/Array/reverse).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to modify.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [1, 2, 3];
       *
       * _.reverse(array);
       * // => [3, 2, 1]
       *
       * console.log(array);
       * // => [3, 2, 1]
       */
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }

      /**
       * Creates a slice of `array` from `start` up to, but not including, `end`.
       *
       * **Note:** This method is used instead of
       * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
       * returned.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to slice.
       * @param {number} [start=0] The start position.
       * @param {number} [end=array.length] The end position.
       * @returns {Array} Returns the slice of `array`.
       */
      function slice(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        }
        else {
          start = start == null ? 0 : toInteger(start);
          end = end === undefined$1 ? length : toInteger(end);
        }
        return baseSlice(array, start, end);
      }

      /**
       * Uses a binary search to determine the lowest index at which `value`
       * should be inserted into `array` in order to maintain its sort order.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * _.sortedIndex([30, 50], 40);
       * // => 1
       */
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }

      /**
       * This method is like `_.sortedIndex` except that it accepts `iteratee`
       * which is invoked for `value` and each element of `array` to compute their
       * sort ranking. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * var objects = [{ 'x': 4 }, { 'x': 5 }];
       *
       * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
       * // => 0
       *
       * // The `_.property` iteratee shorthand.
       * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
       * // => 0
       */
      function sortedIndexBy(array, value, iteratee) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
      }

      /**
       * This method is like `_.indexOf` except that it performs a binary
       * search on a sorted `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
       * // => 1
       */
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }

      /**
       * This method is like `_.sortedIndex` except that it returns the highest
       * index at which `value` should be inserted into `array` in order to
       * maintain its sort order.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
       * // => 4
       */
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }

      /**
       * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
       * which is invoked for `value` and each element of `array` to compute their
       * sort ranking. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The sorted array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * var objects = [{ 'x': 4 }, { 'x': 5 }];
       *
       * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
       * // => 1
       *
       * // The `_.property` iteratee shorthand.
       * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
       * // => 1
       */
      function sortedLastIndexBy(array, value, iteratee) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
      }

      /**
       * This method is like `_.lastIndexOf` except that it performs a binary
       * search on a sorted `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {*} value The value to search for.
       * @returns {number} Returns the index of the matched value, else `-1`.
       * @example
       *
       * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
       * // => 3
       */
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }

      /**
       * This method is like `_.uniq` except that it's designed and optimized
       * for sorted arrays.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.sortedUniq([1, 1, 2]);
       * // => [1, 2]
       */
      function sortedUniq(array) {
        return (array && array.length)
          ? baseSortedUniq(array)
          : [];
      }

      /**
       * This method is like `_.uniqBy` except that it's designed and optimized
       * for sorted arrays.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee] The iteratee invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
       * // => [1.1, 2.3]
       */
      function sortedUniqBy(array, iteratee) {
        return (array && array.length)
          ? baseSortedUniq(array, getIteratee(iteratee, 2))
          : [];
      }

      /**
       * Gets all but the first element of `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.tail([1, 2, 3]);
       * // => [2, 3]
       */
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }

      /**
       * Creates a slice of `array` with `n` elements taken from the beginning.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to take.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.take([1, 2, 3]);
       * // => [1]
       *
       * _.take([1, 2, 3], 2);
       * // => [1, 2]
       *
       * _.take([1, 2, 3], 5);
       * // => [1, 2, 3]
       *
       * _.take([1, 2, 3], 0);
       * // => []
       */
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = (guard || n === undefined$1) ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }

      /**
       * Creates a slice of `array` with `n` elements taken from the end.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {number} [n=1] The number of elements to take.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * _.takeRight([1, 2, 3]);
       * // => [3]
       *
       * _.takeRight([1, 2, 3], 2);
       * // => [2, 3]
       *
       * _.takeRight([1, 2, 3], 5);
       * // => [1, 2, 3]
       *
       * _.takeRight([1, 2, 3], 0);
       * // => []
       */
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = (guard || n === undefined$1) ? 1 : toInteger(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }

      /**
       * Creates a slice of `array` with elements taken from the end. Elements are
       * taken until `predicate` returns falsey. The predicate is invoked with
       * three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': true },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': false }
       * ];
       *
       * _.takeRightWhile(users, function(o) { return !o.active; });
       * // => objects for ['fred', 'pebbles']
       *
       * // The `_.matches` iteratee shorthand.
       * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
       * // => objects for ['pebbles']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.takeRightWhile(users, ['active', false]);
       * // => objects for ['fred', 'pebbles']
       *
       * // The `_.property` iteratee shorthand.
       * _.takeRightWhile(users, 'active');
       * // => []
       */
      function takeRightWhile(array, predicate) {
        return (array && array.length)
          ? baseWhile(array, getIteratee(predicate, 3), false, true)
          : [];
      }

      /**
       * Creates a slice of `array` with elements taken from the beginning. Elements
       * are taken until `predicate` returns falsey. The predicate is invoked with
       * three arguments: (value, index, array).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Array
       * @param {Array} array The array to query.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the slice of `array`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'active': false },
       *   { 'user': 'fred',    'active': false },
       *   { 'user': 'pebbles', 'active': true }
       * ];
       *
       * _.takeWhile(users, function(o) { return !o.active; });
       * // => objects for ['barney', 'fred']
       *
       * // The `_.matches` iteratee shorthand.
       * _.takeWhile(users, { 'user': 'barney', 'active': false });
       * // => objects for ['barney']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.takeWhile(users, ['active', false]);
       * // => objects for ['barney', 'fred']
       *
       * // The `_.property` iteratee shorthand.
       * _.takeWhile(users, 'active');
       * // => []
       */
      function takeWhile(array, predicate) {
        return (array && array.length)
          ? baseWhile(array, getIteratee(predicate, 3))
          : [];
      }

      /**
       * Creates an array of unique values, in order, from all given arrays using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @returns {Array} Returns the new array of combined values.
       * @example
       *
       * _.union([2], [1, 2]);
       * // => [2, 1]
       */
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });

      /**
       * This method is like `_.union` except that it accepts `iteratee` which is
       * invoked for each element of each `arrays` to generate the criterion by
       * which uniqueness is computed. Result values are chosen from the first
       * array in which the value occurs. The iteratee is invoked with one argument:
       * (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of combined values.
       * @example
       *
       * _.unionBy([2.1], [1.2, 2.3], Math.floor);
       * // => [2.1, 1.2]
       *
       * // The `_.property` iteratee shorthand.
       * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }, { 'x': 2 }]
       */
      var unionBy = baseRest(function(arrays) {
        var iteratee = last(arrays);
        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined$1;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
      });

      /**
       * This method is like `_.union` except that it accepts `comparator` which
       * is invoked to compare elements of `arrays`. Result values are chosen from
       * the first array in which the value occurs. The comparator is invoked
       * with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of combined values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.unionWith(objects, others, _.isEqual);
       * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
       */
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
      });

      /**
       * Creates a duplicate-free version of an array, using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons, in which only the first occurrence of each element
       * is kept. The order of result values is determined by the order they occur
       * in the array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.uniq([2, 1, 2]);
       * // => [2, 1]
       */
      function uniq(array) {
        return (array && array.length) ? baseUniq(array) : [];
      }

      /**
       * This method is like `_.uniq` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the criterion by which
       * uniqueness is computed. The order of result values is determined by the
       * order they occur in the array. The iteratee is invoked with one argument:
       * (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
       * // => [2.1, 1.2]
       *
       * // The `_.property` iteratee shorthand.
       * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }, { 'x': 2 }]
       */
      function uniqBy(array, iteratee) {
        return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
      }

      /**
       * This method is like `_.uniq` except that it accepts `comparator` which
       * is invoked to compare elements of `array`. The order of result values is
       * determined by the order they occur in the array.The comparator is invoked
       * with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new duplicate free array.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.uniqWith(objects, _.isEqual);
       * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
       */
      function uniqWith(array, comparator) {
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        return (array && array.length) ? baseUniq(array, undefined$1, comparator) : [];
      }

      /**
       * This method is like `_.zip` except that it accepts an array of grouped
       * elements and creates an array regrouping the elements to their pre-zip
       * configuration.
       *
       * @static
       * @memberOf _
       * @since 1.2.0
       * @category Array
       * @param {Array} array The array of grouped elements to process.
       * @returns {Array} Returns the new array of regrouped elements.
       * @example
       *
       * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
       * // => [['a', 1, true], ['b', 2, false]]
       *
       * _.unzip(zipped);
       * // => [['a', 'b'], [1, 2], [true, false]]
       */
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }

      /**
       * This method is like `_.unzip` except that it accepts `iteratee` to specify
       * how regrouped values should be combined. The iteratee is invoked with the
       * elements of each group: (...group).
       *
       * @static
       * @memberOf _
       * @since 3.8.0
       * @category Array
       * @param {Array} array The array of grouped elements to process.
       * @param {Function} [iteratee=_.identity] The function to combine
       *  regrouped values.
       * @returns {Array} Returns the new array of regrouped elements.
       * @example
       *
       * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
       * // => [[1, 10, 100], [2, 20, 200]]
       *
       * _.unzipWith(zipped, _.add);
       * // => [3, 30, 300]
       */
      function unzipWith(array, iteratee) {
        if (!(array && array.length)) {
          return [];
        }
        var result = unzip(array);
        if (iteratee == null) {
          return result;
        }
        return arrayMap(result, function(group) {
          return apply(iteratee, undefined$1, group);
        });
      }

      /**
       * Creates an array excluding all given values using
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * for equality comparisons.
       *
       * **Note:** Unlike `_.pull`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {Array} array The array to inspect.
       * @param {...*} [values] The values to exclude.
       * @returns {Array} Returns the new array of filtered values.
       * @see _.difference, _.xor
       * @example
       *
       * _.without([2, 1, 2, 3], 1, 2);
       * // => [3]
       */
      var without = baseRest(function(array, values) {
        return isArrayLikeObject(array)
          ? baseDifference(array, values)
          : [];
      });

      /**
       * Creates an array of unique values that is the
       * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
       * of the given arrays. The order of result values is determined by the order
       * they occur in the arrays.
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @returns {Array} Returns the new array of filtered values.
       * @see _.difference, _.without
       * @example
       *
       * _.xor([2, 1], [2, 3]);
       * // => [1, 3]
       */
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });

      /**
       * This method is like `_.xor` except that it accepts `iteratee` which is
       * invoked for each element of each `arrays` to generate the criterion by
       * which by which they're compared. The order of result values is determined
       * by the order they occur in the arrays. The iteratee is invoked with one
       * argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
       * // => [1.2, 3.4]
       *
       * // The `_.property` iteratee shorthand.
       * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 2 }]
       */
      var xorBy = baseRest(function(arrays) {
        var iteratee = last(arrays);
        if (isArrayLikeObject(iteratee)) {
          iteratee = undefined$1;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
      });

      /**
       * This method is like `_.xor` except that it accepts `comparator` which is
       * invoked to compare elements of `arrays`. The order of result values is
       * determined by the order they occur in the arrays. The comparator is invoked
       * with two arguments: (arrVal, othVal).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Array
       * @param {...Array} [arrays] The arrays to inspect.
       * @param {Function} [comparator] The comparator invoked per element.
       * @returns {Array} Returns the new array of filtered values.
       * @example
       *
       * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
       * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
       *
       * _.xorWith(objects, others, _.isEqual);
       * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
       */
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == 'function' ? comparator : undefined$1;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
      });

      /**
       * Creates an array of grouped elements, the first of which contains the
       * first elements of the given arrays, the second of which contains the
       * second elements of the given arrays, and so on.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Array
       * @param {...Array} [arrays] The arrays to process.
       * @returns {Array} Returns the new array of grouped elements.
       * @example
       *
       * _.zip(['a', 'b'], [1, 2], [true, false]);
       * // => [['a', 1, true], ['b', 2, false]]
       */
      var zip = baseRest(unzip);

      /**
       * This method is like `_.fromPairs` except that it accepts two arrays,
       * one of property identifiers and one of corresponding values.
       *
       * @static
       * @memberOf _
       * @since 0.4.0
       * @category Array
       * @param {Array} [props=[]] The property identifiers.
       * @param {Array} [values=[]] The property values.
       * @returns {Object} Returns the new object.
       * @example
       *
       * _.zipObject(['a', 'b'], [1, 2]);
       * // => { 'a': 1, 'b': 2 }
       */
      function zipObject(props, values) {
        return baseZipObject(props || [], values || [], assignValue);
      }

      /**
       * This method is like `_.zipObject` except that it supports property paths.
       *
       * @static
       * @memberOf _
       * @since 4.1.0
       * @category Array
       * @param {Array} [props=[]] The property identifiers.
       * @param {Array} [values=[]] The property values.
       * @returns {Object} Returns the new object.
       * @example
       *
       * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
       * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
       */
      function zipObjectDeep(props, values) {
        return baseZipObject(props || [], values || [], baseSet);
      }

      /**
       * This method is like `_.zip` except that it accepts `iteratee` to specify
       * how grouped values should be combined. The iteratee is invoked with the
       * elements of each group: (...group).
       *
       * @static
       * @memberOf _
       * @since 3.8.0
       * @category Array
       * @param {...Array} [arrays] The arrays to process.
       * @param {Function} [iteratee=_.identity] The function to combine
       *  grouped values.
       * @returns {Array} Returns the new array of grouped elements.
       * @example
       *
       * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
       *   return a + b + c;
       * });
       * // => [111, 222]
       */
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length,
            iteratee = length > 1 ? arrays[length - 1] : undefined$1;

        iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined$1;
        return unzipWith(arrays, iteratee);
      });

      /*------------------------------------------------------------------------*/

      /**
       * Creates a `lodash` wrapper instance that wraps `value` with explicit method
       * chain sequences enabled. The result of such sequences must be unwrapped
       * with `_#value`.
       *
       * @static
       * @memberOf _
       * @since 1.3.0
       * @category Seq
       * @param {*} value The value to wrap.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'age': 36 },
       *   { 'user': 'fred',    'age': 40 },
       *   { 'user': 'pebbles', 'age': 1 }
       * ];
       *
       * var youngest = _
       *   .chain(users)
       *   .sortBy('age')
       *   .map(function(o) {
       *     return o.user + ' is ' + o.age;
       *   })
       *   .head()
       *   .value();
       * // => 'pebbles is 1'
       */
      function chain(value) {
        var result = lodash(value);
        result.__chain__ = true;
        return result;
      }

      /**
       * This method invokes `interceptor` and returns `value`. The interceptor
       * is invoked with one argument; (value). The purpose of this method is to
       * "tap into" a method chain sequence in order to modify intermediate results.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Seq
       * @param {*} value The value to provide to `interceptor`.
       * @param {Function} interceptor The function to invoke.
       * @returns {*} Returns `value`.
       * @example
       *
       * _([1, 2, 3])
       *  .tap(function(array) {
       *    // Mutate input array.
       *    array.pop();
       *  })
       *  .reverse()
       *  .value();
       * // => [2, 1]
       */
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }

      /**
       * This method is like `_.tap` except that it returns the result of `interceptor`.
       * The purpose of this method is to "pass thru" values replacing intermediate
       * results in a method chain sequence.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Seq
       * @param {*} value The value to provide to `interceptor`.
       * @param {Function} interceptor The function to invoke.
       * @returns {*} Returns the result of `interceptor`.
       * @example
       *
       * _('  abc  ')
       *  .chain()
       *  .trim()
       *  .thru(function(value) {
       *    return [value];
       *  })
       *  .value();
       * // => ['abc']
       */
      function thru(value, interceptor) {
        return interceptor(value);
      }

      /**
       * This method is the wrapper version of `_.at`.
       *
       * @name at
       * @memberOf _
       * @since 1.0.0
       * @category Seq
       * @param {...(string|string[])} [paths] The property paths to pick.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
       *
       * _(object).at(['a[0].b.c', 'a[1]']).value();
       * // => [3, 4]
       */
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length,
            start = length ? paths[0] : 0,
            value = this.__wrapped__,
            interceptor = function(object) { return baseAt(object, paths); };

        if (length > 1 || this.__actions__.length ||
            !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          'func': thru,
          'args': [interceptor],
          'thisArg': undefined$1
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined$1);
          }
          return array;
        });
      });

      /**
       * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
       *
       * @name chain
       * @memberOf _
       * @since 0.1.0
       * @category Seq
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36 },
       *   { 'user': 'fred',   'age': 40 }
       * ];
       *
       * // A sequence without explicit chaining.
       * _(users).head();
       * // => { 'user': 'barney', 'age': 36 }
       *
       * // A sequence with explicit chaining.
       * _(users)
       *   .chain()
       *   .head()
       *   .pick('user')
       *   .value();
       * // => { 'user': 'barney' }
       */
      function wrapperChain() {
        return chain(this);
      }

      /**
       * Executes the chain sequence and returns the wrapped result.
       *
       * @name commit
       * @memberOf _
       * @since 3.2.0
       * @category Seq
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var array = [1, 2];
       * var wrapped = _(array).push(3);
       *
       * console.log(array);
       * // => [1, 2]
       *
       * wrapped = wrapped.commit();
       * console.log(array);
       * // => [1, 2, 3]
       *
       * wrapped.last();
       * // => 3
       *
       * console.log(array);
       * // => [1, 2, 3]
       */
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }

      /**
       * Gets the next value on a wrapped object following the
       * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
       *
       * @name next
       * @memberOf _
       * @since 4.0.0
       * @category Seq
       * @returns {Object} Returns the next iterator value.
       * @example
       *
       * var wrapped = _([1, 2]);
       *
       * wrapped.next();
       * // => { 'done': false, 'value': 1 }
       *
       * wrapped.next();
       * // => { 'done': false, 'value': 2 }
       *
       * wrapped.next();
       * // => { 'done': true, 'value': undefined }
       */
      function wrapperNext() {
        if (this.__values__ === undefined$1) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length,
            value = done ? undefined$1 : this.__values__[this.__index__++];

        return { 'done': done, 'value': value };
      }

      /**
       * Enables the wrapper to be iterable.
       *
       * @name Symbol.iterator
       * @memberOf _
       * @since 4.0.0
       * @category Seq
       * @returns {Object} Returns the wrapper object.
       * @example
       *
       * var wrapped = _([1, 2]);
       *
       * wrapped[Symbol.iterator]() === wrapped;
       * // => true
       *
       * Array.from(wrapped);
       * // => [1, 2]
       */
      function wrapperToIterator() {
        return this;
      }

      /**
       * Creates a clone of the chain sequence planting `value` as the wrapped value.
       *
       * @name plant
       * @memberOf _
       * @since 3.2.0
       * @category Seq
       * @param {*} value The value to plant.
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var wrapped = _([1, 2]).map(square);
       * var other = wrapped.plant([3, 4]);
       *
       * other.value();
       * // => [9, 16]
       *
       * wrapped.value();
       * // => [1, 4]
       */
      function wrapperPlant(value) {
        var result,
            parent = this;

        while (parent instanceof baseLodash) {
          var clone = wrapperClone(parent);
          clone.__index__ = 0;
          clone.__values__ = undefined$1;
          if (result) {
            previous.__wrapped__ = clone;
          } else {
            result = clone;
          }
          var previous = clone;
          parent = parent.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result;
      }

      /**
       * This method is the wrapper version of `_.reverse`.
       *
       * **Note:** This method mutates the wrapped array.
       *
       * @name reverse
       * @memberOf _
       * @since 0.1.0
       * @category Seq
       * @returns {Object} Returns the new `lodash` wrapper instance.
       * @example
       *
       * var array = [1, 2, 3];
       *
       * _(array).reverse().value()
       * // => [3, 2, 1]
       *
       * console.log(array);
       * // => [3, 2, 1]
       */
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            'func': thru,
            'args': [reverse],
            'thisArg': undefined$1
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }

      /**
       * Executes the chain sequence to resolve the unwrapped value.
       *
       * @name value
       * @memberOf _
       * @since 0.1.0
       * @alias toJSON, valueOf
       * @category Seq
       * @returns {*} Returns the resolved unwrapped value.
       * @example
       *
       * _([1, 2, 3]).value();
       * // => [1, 2, 3]
       */
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }

      /*------------------------------------------------------------------------*/

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` thru `iteratee`. The corresponding value of
       * each key is the number of times the key was returned by `iteratee`. The
       * iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 0.5.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * _.countBy([6.1, 4.2, 6.3], Math.floor);
       * // => { '4': 1, '6': 2 }
       *
       * // The `_.property` iteratee shorthand.
       * _.countBy(['one', 'two', 'three'], 'length');
       * // => { '3': 2, '5': 1 }
       */
      var countBy = createAggregator(function(result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          ++result[key];
        } else {
          baseAssignValue(result, key, 1);
        }
      });

      /**
       * Checks if `predicate` returns truthy for **all** elements of `collection`.
       * Iteration is stopped once `predicate` returns falsey. The predicate is
       * invoked with three arguments: (value, index|key, collection).
       *
       * **Note:** This method returns `true` for
       * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
       * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
       * elements of empty collections.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {boolean} Returns `true` if all elements pass the predicate check,
       *  else `false`.
       * @example
       *
       * _.every([true, 1, null, 'yes'], Boolean);
       * // => false
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': false },
       *   { 'user': 'fred',   'age': 40, 'active': false }
       * ];
       *
       * // The `_.matches` iteratee shorthand.
       * _.every(users, { 'user': 'barney', 'active': false });
       * // => false
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.every(users, ['active', false]);
       * // => true
       *
       * // The `_.property` iteratee shorthand.
       * _.every(users, 'active');
       * // => false
       */
      function every(collection, predicate, guard) {
        var func = isArray(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }

      /**
       * Iterates over elements of `collection`, returning an array of all elements
       * `predicate` returns truthy for. The predicate is invoked with three
       * arguments: (value, index|key, collection).
       *
       * **Note:** Unlike `_.remove`, this method returns a new array.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new filtered array.
       * @see _.reject
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': true },
       *   { 'user': 'fred',   'age': 40, 'active': false }
       * ];
       *
       * _.filter(users, function(o) { return !o.active; });
       * // => objects for ['fred']
       *
       * // The `_.matches` iteratee shorthand.
       * _.filter(users, { 'age': 36, 'active': true });
       * // => objects for ['barney']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.filter(users, ['active', false]);
       * // => objects for ['fred']
       *
       * // The `_.property` iteratee shorthand.
       * _.filter(users, 'active');
       * // => objects for ['barney']
       *
       * // Combining several predicates using `_.overEvery` or `_.overSome`.
       * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
       * // => objects for ['fred', 'barney']
       */
      function filter(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }

      /**
       * Iterates over elements of `collection`, returning the first element
       * `predicate` returns truthy for. The predicate is invoked with three
       * arguments: (value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {*} Returns the matched element, else `undefined`.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'age': 36, 'active': true },
       *   { 'user': 'fred',    'age': 40, 'active': false },
       *   { 'user': 'pebbles', 'age': 1,  'active': true }
       * ];
       *
       * _.find(users, function(o) { return o.age < 40; });
       * // => object for 'barney'
       *
       * // The `_.matches` iteratee shorthand.
       * _.find(users, { 'age': 1, 'active': true });
       * // => object for 'pebbles'
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.find(users, ['active', false]);
       * // => object for 'fred'
       *
       * // The `_.property` iteratee shorthand.
       * _.find(users, 'active');
       * // => object for 'barney'
       */
      var find = createFind(findIndex);

      /**
       * This method is like `_.find` except that it iterates over elements of
       * `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param {number} [fromIndex=collection.length-1] The index to search from.
       * @returns {*} Returns the matched element, else `undefined`.
       * @example
       *
       * _.findLast([1, 2, 3, 4], function(n) {
       *   return n % 2 == 1;
       * });
       * // => 3
       */
      var findLast = createFind(findLastIndex);

      /**
       * Creates a flattened array of values by running each element in `collection`
       * thru `iteratee` and flattening the mapped results. The iteratee is invoked
       * with three arguments: (value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * function duplicate(n) {
       *   return [n, n];
       * }
       *
       * _.flatMap([1, 2], duplicate);
       * // => [1, 1, 2, 2]
       */
      function flatMap(collection, iteratee) {
        return baseFlatten(map(collection, iteratee), 1);
      }

      /**
       * This method is like `_.flatMap` except that it recursively flattens the
       * mapped results.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * function duplicate(n) {
       *   return [[[n, n]]];
       * }
       *
       * _.flatMapDeep([1, 2], duplicate);
       * // => [1, 1, 2, 2]
       */
      function flatMapDeep(collection, iteratee) {
        return baseFlatten(map(collection, iteratee), INFINITY);
      }

      /**
       * This method is like `_.flatMap` except that it recursively flattens the
       * mapped results up to `depth` times.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {number} [depth=1] The maximum recursion depth.
       * @returns {Array} Returns the new flattened array.
       * @example
       *
       * function duplicate(n) {
       *   return [[[n, n]]];
       * }
       *
       * _.flatMapDepth([1, 2], duplicate, 2);
       * // => [[1, 1], [2, 2]]
       */
      function flatMapDepth(collection, iteratee, depth) {
        depth = depth === undefined$1 ? 1 : toInteger(depth);
        return baseFlatten(map(collection, iteratee), depth);
      }

      /**
       * Iterates over elements of `collection` and invokes `iteratee` for each element.
       * The iteratee is invoked with three arguments: (value, index|key, collection).
       * Iteratee functions may exit iteration early by explicitly returning `false`.
       *
       * **Note:** As with other "Collections" methods, objects with a "length"
       * property are iterated like arrays. To avoid this behavior use `_.forIn`
       * or `_.forOwn` for object iteration.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @alias each
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       * @see _.forEachRight
       * @example
       *
       * _.forEach([1, 2], function(value) {
       *   console.log(value);
       * });
       * // => Logs `1` then `2`.
       *
       * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'a' then 'b' (iteration order is not guaranteed).
       */
      function forEach(collection, iteratee) {
        var func = isArray(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee, 3));
      }

      /**
       * This method is like `_.forEach` except that it iterates over elements of
       * `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @alias eachRight
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array|Object} Returns `collection`.
       * @see _.forEach
       * @example
       *
       * _.forEachRight([1, 2], function(value) {
       *   console.log(value);
       * });
       * // => Logs `2` then `1`.
       */
      function forEachRight(collection, iteratee) {
        var func = isArray(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee, 3));
      }

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` thru `iteratee`. The order of grouped values
       * is determined by the order they occur in `collection`. The corresponding
       * value of each key is an array of elements responsible for generating the
       * key. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * _.groupBy([6.1, 4.2, 6.3], Math.floor);
       * // => { '4': [4.2], '6': [6.1, 6.3] }
       *
       * // The `_.property` iteratee shorthand.
       * _.groupBy(['one', 'two', 'three'], 'length');
       * // => { '3': ['one', 'two'], '5': ['three'] }
       */
      var groupBy = createAggregator(function(result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          result[key].push(value);
        } else {
          baseAssignValue(result, key, [value]);
        }
      });

      /**
       * Checks if `value` is in `collection`. If `collection` is a string, it's
       * checked for a substring of `value`, otherwise
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * is used for equality comparisons. If `fromIndex` is negative, it's used as
       * the offset from the end of `collection`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object|string} collection The collection to inspect.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=0] The index to search from.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
       * @returns {boolean} Returns `true` if `value` is found, else `false`.
       * @example
       *
       * _.includes([1, 2, 3], 1);
       * // => true
       *
       * _.includes([1, 2, 3], 1, 2);
       * // => false
       *
       * _.includes({ 'a': 1, 'b': 2 }, 1);
       * // => true
       *
       * _.includes('abcd', 'bc');
       * // => true
       */
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection)
          ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
          : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
      }

      /**
       * Invokes the method at `path` of each element in `collection`, returning
       * an array of the results of each invoked method. Any additional arguments
       * are provided to each invoked method. If `path` is a function, it's invoked
       * for, and `this` bound to, each element in `collection`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Array|Function|string} path The path of the method to invoke or
       *  the function invoked per iteration.
       * @param {...*} [args] The arguments to invoke each method with.
       * @returns {Array} Returns the array of results.
       * @example
       *
       * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
       * // => [[1, 5, 7], [1, 2, 3]]
       *
       * _.invokeMap([123, 456], String.prototype.split, '');
       * // => [['1', '2', '3'], ['4', '5', '6']]
       */
      var invokeMap = baseRest(function(collection, path, args) {
        var index = -1,
            isFunc = typeof path == 'function',
            result = isArrayLike(collection) ? Array(collection.length) : [];

        baseEach(collection, function(value) {
          result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
        });
        return result;
      });

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` thru `iteratee`. The corresponding value of
       * each key is the last element responsible for generating the key. The
       * iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * var array = [
       *   { 'dir': 'left', 'code': 97 },
       *   { 'dir': 'right', 'code': 100 }
       * ];
       *
       * _.keyBy(array, function(o) {
       *   return String.fromCharCode(o.code);
       * });
       * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
       *
       * _.keyBy(array, 'dir');
       * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
       */
      var keyBy = createAggregator(function(result, value, key) {
        baseAssignValue(result, key, value);
      });

      /**
       * Creates an array of values by running each element in `collection` thru
       * `iteratee`. The iteratee is invoked with three arguments:
       * (value, index|key, collection).
       *
       * Many lodash methods are guarded to work as iteratees for methods like
       * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
       *
       * The guarded methods are:
       * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
       * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
       * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
       * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new mapped array.
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * _.map([4, 8], square);
       * // => [16, 64]
       *
       * _.map({ 'a': 4, 'b': 8 }, square);
       * // => [16, 64] (iteration order is not guaranteed)
       *
       * var users = [
       *   { 'user': 'barney' },
       *   { 'user': 'fred' }
       * ];
       *
       * // The `_.property` iteratee shorthand.
       * _.map(users, 'user');
       * // => ['barney', 'fred']
       */
      function map(collection, iteratee) {
        var func = isArray(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee, 3));
      }

      /**
       * This method is like `_.sortBy` except that it allows specifying the sort
       * orders of the iteratees to sort by. If `orders` is unspecified, all values
       * are sorted in ascending order. Otherwise, specify an order of "desc" for
       * descending or "asc" for ascending sort order of corresponding values.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
       *  The iteratees to sort by.
       * @param {string[]} [orders] The sort orders of `iteratees`.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
       * @returns {Array} Returns the new sorted array.
       * @example
       *
       * var users = [
       *   { 'user': 'fred',   'age': 48 },
       *   { 'user': 'barney', 'age': 34 },
       *   { 'user': 'fred',   'age': 40 },
       *   { 'user': 'barney', 'age': 36 }
       * ];
       *
       * // Sort by `user` in ascending order and by `age` in descending order.
       * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
       * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
       */
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$1 : orders;
        if (!isArray(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }

      /**
       * Creates an array of elements split into two groups, the first of which
       * contains elements `predicate` returns truthy for, the second of which
       * contains elements `predicate` returns falsey for. The predicate is
       * invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the array of grouped elements.
       * @example
       *
       * var users = [
       *   { 'user': 'barney',  'age': 36, 'active': false },
       *   { 'user': 'fred',    'age': 40, 'active': true },
       *   { 'user': 'pebbles', 'age': 1,  'active': false }
       * ];
       *
       * _.partition(users, function(o) { return o.active; });
       * // => objects for [['fred'], ['barney', 'pebbles']]
       *
       * // The `_.matches` iteratee shorthand.
       * _.partition(users, { 'age': 1, 'active': false });
       * // => objects for [['pebbles'], ['barney', 'fred']]
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.partition(users, ['active', false]);
       * // => objects for [['barney', 'pebbles'], ['fred']]
       *
       * // The `_.property` iteratee shorthand.
       * _.partition(users, 'active');
       * // => objects for [['fred'], ['barney', 'pebbles']]
       */
      var partition = createAggregator(function(result, value, key) {
        result[key ? 0 : 1].push(value);
      }, function() { return [[], []]; });

      /**
       * Reduces `collection` to a value which is the accumulated result of running
       * each element in `collection` thru `iteratee`, where each successive
       * invocation is supplied the return value of the previous. If `accumulator`
       * is not given, the first element of `collection` is used as the initial
       * value. The iteratee is invoked with four arguments:
       * (accumulator, value, index|key, collection).
       *
       * Many lodash methods are guarded to work as iteratees for methods like
       * `_.reduce`, `_.reduceRight`, and `_.transform`.
       *
       * The guarded methods are:
       * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
       * and `sortBy`
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {*} [accumulator] The initial value.
       * @returns {*} Returns the accumulated value.
       * @see _.reduceRight
       * @example
       *
       * _.reduce([1, 2], function(sum, n) {
       *   return sum + n;
       * }, 0);
       * // => 3
       *
       * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
       *   (result[value] || (result[value] = [])).push(key);
       *   return result;
       * }, {});
       * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
       */
      function reduce(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduce : baseReduce,
            initAccum = arguments.length < 3;

        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
      }

      /**
       * This method is like `_.reduce` except that it iterates over elements of
       * `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {*} [accumulator] The initial value.
       * @returns {*} Returns the accumulated value.
       * @see _.reduce
       * @example
       *
       * var array = [[0, 1], [2, 3], [4, 5]];
       *
       * _.reduceRight(array, function(flattened, other) {
       *   return flattened.concat(other);
       * }, []);
       * // => [4, 5, 2, 3, 0, 1]
       */
      function reduceRight(collection, iteratee, accumulator) {
        var func = isArray(collection) ? arrayReduceRight : baseReduce,
            initAccum = arguments.length < 3;

        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
      }

      /**
       * The opposite of `_.filter`; this method returns the elements of `collection`
       * that `predicate` does **not** return truthy for.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the new filtered array.
       * @see _.filter
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': false },
       *   { 'user': 'fred',   'age': 40, 'active': true }
       * ];
       *
       * _.reject(users, function(o) { return !o.active; });
       * // => objects for ['fred']
       *
       * // The `_.matches` iteratee shorthand.
       * _.reject(users, { 'age': 40, 'active': true });
       * // => objects for ['barney']
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.reject(users, ['active', false]);
       * // => objects for ['fred']
       *
       * // The `_.property` iteratee shorthand.
       * _.reject(users, 'active');
       * // => objects for ['barney']
       */
      function reject(collection, predicate) {
        var func = isArray(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }

      /**
       * Gets a random element from `collection`.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to sample.
       * @returns {*} Returns the random element.
       * @example
       *
       * _.sample([1, 2, 3, 4]);
       * // => 2
       */
      function sample(collection) {
        var func = isArray(collection) ? arraySample : baseSample;
        return func(collection);
      }

      /**
       * Gets `n` random elements at unique keys from `collection` up to the
       * size of `collection`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Collection
       * @param {Array|Object} collection The collection to sample.
       * @param {number} [n=1] The number of elements to sample.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the random elements.
       * @example
       *
       * _.sampleSize([1, 2, 3], 2);
       * // => [3, 1]
       *
       * _.sampleSize([1, 2, 3], 4);
       * // => [2, 3, 1]
       */
      function sampleSize(collection, n, guard) {
        if ((guard ? isIterateeCall(collection, n, guard) : n === undefined$1)) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        var func = isArray(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }

      /**
       * Creates an array of shuffled values, using a version of the
       * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to shuffle.
       * @returns {Array} Returns the new shuffled array.
       * @example
       *
       * _.shuffle([1, 2, 3, 4]);
       * // => [4, 1, 3, 2]
       */
      function shuffle(collection) {
        var func = isArray(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }

      /**
       * Gets the size of `collection` by returning its length for array-like
       * values or the number of own enumerable string keyed properties for objects.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object|string} collection The collection to inspect.
       * @returns {number} Returns the collection size.
       * @example
       *
       * _.size([1, 2, 3]);
       * // => 3
       *
       * _.size({ 'a': 1, 'b': 2 });
       * // => 2
       *
       * _.size('pebbles');
       * // => 7
       */
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString(collection) ? stringSize(collection) : collection.length;
        }
        var tag = getTag(collection);
        if (tag == mapTag || tag == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }

      /**
       * Checks if `predicate` returns truthy for **any** element of `collection`.
       * Iteration is stopped once `predicate` returns truthy. The predicate is
       * invoked with three arguments: (value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {boolean} Returns `true` if any element passes the predicate check,
       *  else `false`.
       * @example
       *
       * _.some([null, 0, 'yes', false], Boolean);
       * // => true
       *
       * var users = [
       *   { 'user': 'barney', 'active': true },
       *   { 'user': 'fred',   'active': false }
       * ];
       *
       * // The `_.matches` iteratee shorthand.
       * _.some(users, { 'user': 'barney', 'active': false });
       * // => false
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.some(users, ['active', false]);
       * // => true
       *
       * // The `_.property` iteratee shorthand.
       * _.some(users, 'active');
       * // => true
       */
      function some(collection, predicate, guard) {
        var func = isArray(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$1;
        }
        return func(collection, getIteratee(predicate, 3));
      }

      /**
       * Creates an array of elements, sorted in ascending order by the results of
       * running each element in a collection thru each iteratee. This method
       * performs a stable sort, that is, it preserves the original sort order of
       * equal elements. The iteratees are invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Collection
       * @param {Array|Object} collection The collection to iterate over.
       * @param {...(Function|Function[])} [iteratees=[_.identity]]
       *  The iteratees to sort by.
       * @returns {Array} Returns the new sorted array.
       * @example
       *
       * var users = [
       *   { 'user': 'fred',   'age': 48 },
       *   { 'user': 'barney', 'age': 36 },
       *   { 'user': 'fred',   'age': 30 },
       *   { 'user': 'barney', 'age': 34 }
       * ];
       *
       * _.sortBy(users, [function(o) { return o.user; }]);
       * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
       *
       * _.sortBy(users, ['user', 'age']);
       * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
       */
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });

      /*------------------------------------------------------------------------*/

      /**
       * Gets the timestamp of the number of milliseconds that have elapsed since
       * the Unix epoch (1 January 1970 00:00:00 UTC).
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Date
       * @returns {number} Returns the timestamp.
       * @example
       *
       * _.defer(function(stamp) {
       *   console.log(_.now() - stamp);
       * }, _.now());
       * // => Logs the number of milliseconds it took for the deferred invocation.
       */
      var now = ctxNow || function() {
        return root.Date.now();
      };

      /*------------------------------------------------------------------------*/

      /**
       * The opposite of `_.before`; this method creates a function that invokes
       * `func` once it's called `n` or more times.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {number} n The number of calls before `func` is invoked.
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * var saves = ['profile', 'settings'];
       *
       * var done = _.after(saves.length, function() {
       *   console.log('done saving!');
       * });
       *
       * _.forEach(saves, function(type) {
       *   asyncSave({ 'type': type, 'complete': done });
       * });
       * // => Logs 'done saving!' after the two async saves have completed.
       */
      function after(n, func) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }

      /**
       * Creates a function that invokes `func`, with up to `n` arguments,
       * ignoring any additional arguments.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} func The function to cap arguments for.
       * @param {number} [n=func.length] The arity cap.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the new capped function.
       * @example
       *
       * _.map(['6', '8', '10'], _.ary(parseInt, 1));
       * // => [6, 8, 10]
       */
      function ary(func, n, guard) {
        n = guard ? undefined$1 : n;
        n = (func && n == null) ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
      }

      /**
       * Creates a function that invokes `func`, with the `this` binding and arguments
       * of the created function, while it's called less than `n` times. Subsequent
       * calls to the created function return the result of the last `func` invocation.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {number} n The number of calls at which `func` is no longer invoked.
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * jQuery(element).on('click', _.before(5, addContactToList));
       * // => Allows adding up to 4 contacts to the list.
       */
      function before(n, func) {
        var result;
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        n = toInteger(n);
        return function() {
          if (--n > 0) {
            result = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined$1;
          }
          return result;
        };
      }

      /**
       * Creates a function that invokes `func` with the `this` binding of `thisArg`
       * and `partials` prepended to the arguments it receives.
       *
       * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
       * may be used as a placeholder for partially applied arguments.
       *
       * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
       * property of bound functions.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to bind.
       * @param {*} thisArg The `this` binding of `func`.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new bound function.
       * @example
       *
       * function greet(greeting, punctuation) {
       *   return greeting + ' ' + this.user + punctuation;
       * }
       *
       * var object = { 'user': 'fred' };
       *
       * var bound = _.bind(greet, object, 'hi');
       * bound('!');
       * // => 'hi fred!'
       *
       * // Bound with placeholders.
       * var bound = _.bind(greet, object, _, '!');
       * bound('hi');
       * // => 'hi fred!'
       */
      var bind = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });

      /**
       * Creates a function that invokes the method at `object[key]` with `partials`
       * prepended to the arguments it receives.
       *
       * This method differs from `_.bind` by allowing bound functions to reference
       * methods that may be redefined or don't yet exist. See
       * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
       * for more details.
       *
       * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for partially applied arguments.
       *
       * @static
       * @memberOf _
       * @since 0.10.0
       * @category Function
       * @param {Object} object The object to invoke the method on.
       * @param {string} key The key of the method.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new bound function.
       * @example
       *
       * var object = {
       *   'user': 'fred',
       *   'greet': function(greeting, punctuation) {
       *     return greeting + ' ' + this.user + punctuation;
       *   }
       * };
       *
       * var bound = _.bindKey(object, 'greet', 'hi');
       * bound('!');
       * // => 'hi fred!'
       *
       * object.greet = function(greeting, punctuation) {
       *   return greeting + 'ya ' + this.user + punctuation;
       * };
       *
       * bound('!');
       * // => 'hiya fred!'
       *
       * // Bound with placeholders.
       * var bound = _.bindKey(object, 'greet', _, '!');
       * bound('hi');
       * // => 'hiya fred!'
       */
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });

      /**
       * Creates a function that accepts arguments of `func` and either invokes
       * `func` returning its result, if at least `arity` number of arguments have
       * been provided, or returns a function that accepts the remaining `func`
       * arguments, and so on. The arity of `func` may be specified if `func.length`
       * is not sufficient.
       *
       * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
       * may be used as a placeholder for provided arguments.
       *
       * **Note:** This method doesn't set the "length" property of curried functions.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Function
       * @param {Function} func The function to curry.
       * @param {number} [arity=func.length] The arity of `func`.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the new curried function.
       * @example
       *
       * var abc = function(a, b, c) {
       *   return [a, b, c];
       * };
       *
       * var curried = _.curry(abc);
       *
       * curried(1)(2)(3);
       * // => [1, 2, 3]
       *
       * curried(1, 2)(3);
       * // => [1, 2, 3]
       *
       * curried(1, 2, 3);
       * // => [1, 2, 3]
       *
       * // Curried with placeholders.
       * curried(1)(_, 3)(2);
       * // => [1, 2, 3]
       */
      function curry(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result.placeholder = curry.placeholder;
        return result;
      }

      /**
       * This method is like `_.curry` except that arguments are applied to `func`
       * in the manner of `_.partialRight` instead of `_.partial`.
       *
       * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for provided arguments.
       *
       * **Note:** This method doesn't set the "length" property of curried functions.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} func The function to curry.
       * @param {number} [arity=func.length] The arity of `func`.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the new curried function.
       * @example
       *
       * var abc = function(a, b, c) {
       *   return [a, b, c];
       * };
       *
       * var curried = _.curryRight(abc);
       *
       * curried(3)(2)(1);
       * // => [1, 2, 3]
       *
       * curried(2, 3)(1);
       * // => [1, 2, 3]
       *
       * curried(1, 2, 3);
       * // => [1, 2, 3]
       *
       * // Curried with placeholders.
       * curried(3)(1, _)(2);
       * // => [1, 2, 3]
       */
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$1 : arity;
        var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
        result.placeholder = curryRight.placeholder;
        return result;
      }

      /**
       * Creates a debounced function that delays invoking `func` until after `wait`
       * milliseconds have elapsed since the last time the debounced function was
       * invoked. The debounced function comes with a `cancel` method to cancel
       * delayed `func` invocations and a `flush` method to immediately invoke them.
       * Provide `options` to indicate whether `func` should be invoked on the
       * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
       * with the last arguments provided to the debounced function. Subsequent
       * calls to the debounced function return the result of the last `func`
       * invocation.
       *
       * **Note:** If `leading` and `trailing` options are `true`, `func` is
       * invoked on the trailing edge of the timeout only if the debounced function
       * is invoked more than once during the `wait` timeout.
       *
       * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
       * until to the next tick, similar to `setTimeout` with a timeout of `0`.
       *
       * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
       * for details over the differences between `_.debounce` and `_.throttle`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to debounce.
       * @param {number} [wait=0] The number of milliseconds to delay.
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.leading=false]
       *  Specify invoking on the leading edge of the timeout.
       * @param {number} [options.maxWait]
       *  The maximum time `func` is allowed to be delayed before it's invoked.
       * @param {boolean} [options.trailing=true]
       *  Specify invoking on the trailing edge of the timeout.
       * @returns {Function} Returns the new debounced function.
       * @example
       *
       * // Avoid costly calculations while the window size is in flux.
       * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
       *
       * // Invoke `sendMail` when clicked, debouncing subsequent calls.
       * jQuery(element).on('click', _.debounce(sendMail, 300, {
       *   'leading': true,
       *   'trailing': false
       * }));
       *
       * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
       * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
       * var source = new EventSource('/stream');
       * jQuery(source).on('message', debounced);
       *
       * // Cancel the trailing debounced invocation.
       * jQuery(window).on('popstate', debounced.cancel);
       */
      function debounce(func, wait, options) {
        var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = 'maxWait' in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
          var args = lastArgs,
              thisArg = lastThis;

          lastArgs = lastThis = undefined$1;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }

        function leadingEdge(time) {
          // Reset any `maxWait` timer.
          lastInvokeTime = time;
          // Start the timer for the trailing edge.
          timerId = setTimeout(timerExpired, wait);
          // Invoke the leading edge.
          return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime,
              timeWaiting = wait - timeSinceLastCall;

          return maxing
            ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
            : timeWaiting;
        }

        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime,
              timeSinceLastInvoke = time - lastInvokeTime;

          // Either this is the first call, activity has stopped and we're at the
          // trailing edge, the system time has gone backwards and we're treating
          // it as the trailing edge, or we've hit the `maxWait` limit.
          return (lastCallTime === undefined$1 || (timeSinceLastCall >= wait) ||
            (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
        }

        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          // Restart the timer.
          timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
          timerId = undefined$1;

          // Only invoke if we have `lastArgs` which means `func` has been
          // debounced at least once.
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$1;
          return result;
        }

        function cancel() {
          if (timerId !== undefined$1) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$1;
        }

        function flush() {
          return timerId === undefined$1 ? result : trailingEdge(now());
        }

        function debounced() {
          var time = now(),
              isInvoking = shouldInvoke(time);

          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;

          if (isInvoking) {
            if (timerId === undefined$1) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              // Handle invocations in a tight loop.
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$1) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }

      /**
       * Defers invoking the `func` until the current call stack has cleared. Any
       * additional arguments are provided to `func` when it's invoked.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to defer.
       * @param {...*} [args] The arguments to invoke `func` with.
       * @returns {number} Returns the timer id.
       * @example
       *
       * _.defer(function(text) {
       *   console.log(text);
       * }, 'deferred');
       * // => Logs 'deferred' after one millisecond.
       */
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });

      /**
       * Invokes `func` after `wait` milliseconds. Any additional arguments are
       * provided to `func` when it's invoked.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay invocation.
       * @param {...*} [args] The arguments to invoke `func` with.
       * @returns {number} Returns the timer id.
       * @example
       *
       * _.delay(function(text) {
       *   console.log(text);
       * }, 1000, 'later');
       * // => Logs 'later' after one second.
       */
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });

      /**
       * Creates a function that invokes `func` with arguments reversed.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Function
       * @param {Function} func The function to flip arguments for.
       * @returns {Function} Returns the new flipped function.
       * @example
       *
       * var flipped = _.flip(function() {
       *   return _.toArray(arguments);
       * });
       *
       * flipped('a', 'b', 'c', 'd');
       * // => ['d', 'c', 'b', 'a']
       */
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }

      /**
       * Creates a function that memoizes the result of `func`. If `resolver` is
       * provided, it determines the cache key for storing the result based on the
       * arguments provided to the memoized function. By default, the first argument
       * provided to the memoized function is used as the map cache key. The `func`
       * is invoked with the `this` binding of the memoized function.
       *
       * **Note:** The cache is exposed as the `cache` property on the memoized
       * function. Its creation may be customized by replacing the `_.memoize.Cache`
       * constructor with one whose instances implement the
       * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
       * method interface of `clear`, `delete`, `get`, `has`, and `set`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to have its output memoized.
       * @param {Function} [resolver] The function to resolve the cache key.
       * @returns {Function} Returns the new memoized function.
       * @example
       *
       * var object = { 'a': 1, 'b': 2 };
       * var other = { 'c': 3, 'd': 4 };
       *
       * var values = _.memoize(_.values);
       * values(object);
       * // => [1, 2]
       *
       * values(other);
       * // => [3, 4]
       *
       * object.a = 2;
       * values(object);
       * // => [1, 2]
       *
       * // Modify the result cache.
       * values.cache.set(object, ['a', 'b']);
       * values(object);
       * // => ['a', 'b']
       *
       * // Replace `_.memoize.Cache`.
       * _.memoize.Cache = WeakMap;
       */
      function memoize(func, resolver) {
        if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments,
              key = resolver ? resolver.apply(this, args) : args[0],
              cache = memoized.cache;

          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache);
        return memoized;
      }

      // Expose `MapCache`.
      memoize.Cache = MapCache;

      /**
       * Creates a function that negates the result of the predicate `func`. The
       * `func` predicate is invoked with the `this` binding and arguments of the
       * created function.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} predicate The predicate to negate.
       * @returns {Function} Returns the new negated function.
       * @example
       *
       * function isEven(n) {
       *   return n % 2 == 0;
       * }
       *
       * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
       * // => [1, 3, 5]
       */
      function negate(predicate) {
        if (typeof predicate != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0: return !predicate.call(this);
            case 1: return !predicate.call(this, args[0]);
            case 2: return !predicate.call(this, args[0], args[1]);
            case 3: return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }

      /**
       * Creates a function that is restricted to invoking `func` once. Repeat calls
       * to the function return the value of the first invocation. The `func` is
       * invoked with the `this` binding and arguments of the created function.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * var initialize = _.once(createApplication);
       * initialize();
       * initialize();
       * // => `createApplication` is invoked once
       */
      function once(func) {
        return before(2, func);
      }

      /**
       * Creates a function that invokes `func` with its arguments transformed.
       *
       * @static
       * @since 4.0.0
       * @memberOf _
       * @category Function
       * @param {Function} func The function to wrap.
       * @param {...(Function|Function[])} [transforms=[_.identity]]
       *  The argument transforms.
       * @returns {Function} Returns the new function.
       * @example
       *
       * function doubled(n) {
       *   return n * 2;
       * }
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var func = _.overArgs(function(x, y) {
       *   return [x, y];
       * }, [square, doubled]);
       *
       * func(9, 3);
       * // => [81, 6]
       *
       * func(10, 5);
       * // => [100, 10]
       */
      var overArgs = castRest(function(func, transforms) {
        transforms = (transforms.length == 1 && isArray(transforms[0]))
          ? arrayMap(transforms[0], baseUnary(getIteratee()))
          : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1,
              length = nativeMin(args.length, funcsLength);

          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });

      /**
       * Creates a function that invokes `func` with `partials` prepended to the
       * arguments it receives. This method is like `_.bind` except it does **not**
       * alter the `this` binding.
       *
       * The `_.partial.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for partially applied arguments.
       *
       * **Note:** This method doesn't set the "length" property of partially
       * applied functions.
       *
       * @static
       * @memberOf _
       * @since 0.2.0
       * @category Function
       * @param {Function} func The function to partially apply arguments to.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new partially applied function.
       * @example
       *
       * function greet(greeting, name) {
       *   return greeting + ' ' + name;
       * }
       *
       * var sayHelloTo = _.partial(greet, 'hello');
       * sayHelloTo('fred');
       * // => 'hello fred'
       *
       * // Partially applied with placeholders.
       * var greetFred = _.partial(greet, _, 'fred');
       * greetFred('hi');
       * // => 'hi fred'
       */
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
      });

      /**
       * This method is like `_.partial` except that partially applied arguments
       * are appended to the arguments it receives.
       *
       * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
       * builds, may be used as a placeholder for partially applied arguments.
       *
       * **Note:** This method doesn't set the "length" property of partially
       * applied functions.
       *
       * @static
       * @memberOf _
       * @since 1.0.0
       * @category Function
       * @param {Function} func The function to partially apply arguments to.
       * @param {...*} [partials] The arguments to be partially applied.
       * @returns {Function} Returns the new partially applied function.
       * @example
       *
       * function greet(greeting, name) {
       *   return greeting + ' ' + name;
       * }
       *
       * var greetFred = _.partialRight(greet, 'fred');
       * greetFred('hi');
       * // => 'hi fred'
       *
       * // Partially applied with placeholders.
       * var sayHelloTo = _.partialRight(greet, 'hello', _);
       * sayHelloTo('fred');
       * // => 'hello fred'
       */
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
      });

      /**
       * Creates a function that invokes `func` with arguments arranged according
       * to the specified `indexes` where the argument value at the first index is
       * provided as the first argument, the argument value at the second index is
       * provided as the second argument, and so on.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Function
       * @param {Function} func The function to rearrange arguments for.
       * @param {...(number|number[])} indexes The arranged argument indexes.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var rearged = _.rearg(function(a, b, c) {
       *   return [a, b, c];
       * }, [2, 0, 1]);
       *
       * rearged('b', 'c', 'a')
       * // => ['a', 'b', 'c']
       */
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
      });

      /**
       * Creates a function that invokes `func` with the `this` binding of the
       * created function and arguments from `start` and beyond provided as
       * an array.
       *
       * **Note:** This method is based on the
       * [rest parameter](https://mdn.io/rest_parameters).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Function
       * @param {Function} func The function to apply a rest parameter to.
       * @param {number} [start=func.length-1] The start position of the rest parameter.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var say = _.rest(function(what, names) {
       *   return what + ' ' + _.initial(names).join(', ') +
       *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
       * });
       *
       * say('hello', 'fred', 'barney', 'pebbles');
       * // => 'hello fred, barney, & pebbles'
       */
      function rest(func, start) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = start === undefined$1 ? start : toInteger(start);
        return baseRest(func, start);
      }

      /**
       * Creates a function that invokes `func` with the `this` binding of the
       * create function and an array of arguments much like
       * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
       *
       * **Note:** This method is based on the
       * [spread operator](https://mdn.io/spread_operator).
       *
       * @static
       * @memberOf _
       * @since 3.2.0
       * @category Function
       * @param {Function} func The function to spread arguments over.
       * @param {number} [start=0] The start position of the spread.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var say = _.spread(function(who, what) {
       *   return who + ' says ' + what;
       * });
       *
       * say(['fred', 'hello']);
       * // => 'fred says hello'
       *
       * var numbers = Promise.all([
       *   Promise.resolve(40),
       *   Promise.resolve(36)
       * ]);
       *
       * numbers.then(_.spread(function(x, y) {
       *   return x + y;
       * }));
       * // => a Promise of 76
       */
      function spread(func, start) {
        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger(start), 0);
        return baseRest(function(args) {
          var array = args[start],
              otherArgs = castSlice(args, 0, start);

          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }

      /**
       * Creates a throttled function that only invokes `func` at most once per
       * every `wait` milliseconds. The throttled function comes with a `cancel`
       * method to cancel delayed `func` invocations and a `flush` method to
       * immediately invoke them. Provide `options` to indicate whether `func`
       * should be invoked on the leading and/or trailing edge of the `wait`
       * timeout. The `func` is invoked with the last arguments provided to the
       * throttled function. Subsequent calls to the throttled function return the
       * result of the last `func` invocation.
       *
       * **Note:** If `leading` and `trailing` options are `true`, `func` is
       * invoked on the trailing edge of the timeout only if the throttled function
       * is invoked more than once during the `wait` timeout.
       *
       * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
       * until to the next tick, similar to `setTimeout` with a timeout of `0`.
       *
       * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
       * for details over the differences between `_.throttle` and `_.debounce`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {Function} func The function to throttle.
       * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.leading=true]
       *  Specify invoking on the leading edge of the timeout.
       * @param {boolean} [options.trailing=true]
       *  Specify invoking on the trailing edge of the timeout.
       * @returns {Function} Returns the new throttled function.
       * @example
       *
       * // Avoid excessively updating the position while scrolling.
       * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
       *
       * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
       * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
       * jQuery(element).on('click', throttled);
       *
       * // Cancel the trailing throttled invocation.
       * jQuery(window).on('popstate', throttled.cancel);
       */
      function throttle(func, wait, options) {
        var leading = true,
            trailing = true;

        if (typeof func != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = 'leading' in options ? !!options.leading : leading;
          trailing = 'trailing' in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          'leading': leading,
          'maxWait': wait,
          'trailing': trailing
        });
      }

      /**
       * Creates a function that accepts up to one argument, ignoring any
       * additional arguments.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Function
       * @param {Function} func The function to cap arguments for.
       * @returns {Function} Returns the new capped function.
       * @example
       *
       * _.map(['6', '8', '10'], _.unary(parseInt));
       * // => [6, 8, 10]
       */
      function unary(func) {
        return ary(func, 1);
      }

      /**
       * Creates a function that provides `value` to `wrapper` as its first
       * argument. Any additional arguments provided to the function are appended
       * to those provided to the `wrapper`. The wrapper is invoked with the `this`
       * binding of the created function.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Function
       * @param {*} value The value to wrap.
       * @param {Function} [wrapper=identity] The wrapper function.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var p = _.wrap(_.escape, function(func, text) {
       *   return '<p>' + func(text) + '</p>';
       * });
       *
       * p('fred, barney, & pebbles');
       * // => '<p>fred, barney, &amp; pebbles</p>'
       */
      function wrap(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }

      /*------------------------------------------------------------------------*/

      /**
       * Casts `value` as an array if it's not one.
       *
       * @static
       * @memberOf _
       * @since 4.4.0
       * @category Lang
       * @param {*} value The value to inspect.
       * @returns {Array} Returns the cast array.
       * @example
       *
       * _.castArray(1);
       * // => [1]
       *
       * _.castArray({ 'a': 1 });
       * // => [{ 'a': 1 }]
       *
       * _.castArray('abc');
       * // => ['abc']
       *
       * _.castArray(null);
       * // => [null]
       *
       * _.castArray(undefined);
       * // => [undefined]
       *
       * _.castArray();
       * // => []
       *
       * var array = [1, 2, 3];
       * console.log(_.castArray(array) === array);
       * // => true
       */
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray(value) ? value : [value];
      }

      /**
       * Creates a shallow clone of `value`.
       *
       * **Note:** This method is loosely based on the
       * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
       * and supports cloning arrays, array buffers, booleans, date objects, maps,
       * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
       * arrays. The own enumerable properties of `arguments` objects are cloned
       * as plain objects. An empty object is returned for uncloneable values such
       * as error objects, functions, DOM nodes, and WeakMaps.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to clone.
       * @returns {*} Returns the cloned value.
       * @see _.cloneDeep
       * @example
       *
       * var objects = [{ 'a': 1 }, { 'b': 2 }];
       *
       * var shallow = _.clone(objects);
       * console.log(shallow[0] === objects[0]);
       * // => true
       */
      function clone(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }

      /**
       * This method is like `_.clone` except that it accepts `customizer` which
       * is invoked to produce the cloned value. If `customizer` returns `undefined`,
       * cloning is handled by the method instead. The `customizer` is invoked with
       * up to four arguments; (value [, index|key, object, stack]).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to clone.
       * @param {Function} [customizer] The function to customize cloning.
       * @returns {*} Returns the cloned value.
       * @see _.cloneDeepWith
       * @example
       *
       * function customizer(value) {
       *   if (_.isElement(value)) {
       *     return value.cloneNode(false);
       *   }
       * }
       *
       * var el = _.cloneWith(document.body, customizer);
       *
       * console.log(el === document.body);
       * // => false
       * console.log(el.nodeName);
       * // => 'BODY'
       * console.log(el.childNodes.length);
       * // => 0
       */
      function cloneWith(value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }

      /**
       * This method is like `_.clone` except that it recursively clones `value`.
       *
       * @static
       * @memberOf _
       * @since 1.0.0
       * @category Lang
       * @param {*} value The value to recursively clone.
       * @returns {*} Returns the deep cloned value.
       * @see _.clone
       * @example
       *
       * var objects = [{ 'a': 1 }, { 'b': 2 }];
       *
       * var deep = _.cloneDeep(objects);
       * console.log(deep[0] === objects[0]);
       * // => false
       */
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }

      /**
       * This method is like `_.cloneWith` except that it recursively clones `value`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to recursively clone.
       * @param {Function} [customizer] The function to customize cloning.
       * @returns {*} Returns the deep cloned value.
       * @see _.cloneWith
       * @example
       *
       * function customizer(value) {
       *   if (_.isElement(value)) {
       *     return value.cloneNode(true);
       *   }
       * }
       *
       * var el = _.cloneDeepWith(document.body, customizer);
       *
       * console.log(el === document.body);
       * // => false
       * console.log(el.nodeName);
       * // => 'BODY'
       * console.log(el.childNodes.length);
       * // => 20
       */
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }

      /**
       * Checks if `object` conforms to `source` by invoking the predicate
       * properties of `source` with the corresponding property values of `object`.
       *
       * **Note:** This method is equivalent to `_.conforms` when `source` is
       * partially applied.
       *
       * @static
       * @memberOf _
       * @since 4.14.0
       * @category Lang
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property predicates to conform to.
       * @returns {boolean} Returns `true` if `object` conforms, else `false`.
       * @example
       *
       * var object = { 'a': 1, 'b': 2 };
       *
       * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
       * // => true
       *
       * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
       * // => false
       */
      function conformsTo(object, source) {
        return source == null || baseConformsTo(object, source, keys(source));
      }

      /**
       * Performs a
       * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
       * comparison between two values to determine if they are equivalent.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * var object = { 'a': 1 };
       * var other = { 'a': 1 };
       *
       * _.eq(object, object);
       * // => true
       *
       * _.eq(object, other);
       * // => false
       *
       * _.eq('a', 'a');
       * // => true
       *
       * _.eq('a', Object('a'));
       * // => false
       *
       * _.eq(NaN, NaN);
       * // => true
       */
      function eq(value, other) {
        return value === other || (value !== value && other !== other);
      }

      /**
       * Checks if `value` is greater than `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is greater than `other`,
       *  else `false`.
       * @see _.lt
       * @example
       *
       * _.gt(3, 1);
       * // => true
       *
       * _.gt(3, 3);
       * // => false
       *
       * _.gt(1, 3);
       * // => false
       */
      var gt = createRelationalOperation(baseGt);

      /**
       * Checks if `value` is greater than or equal to `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is greater than or equal to
       *  `other`, else `false`.
       * @see _.lte
       * @example
       *
       * _.gte(3, 1);
       * // => true
       *
       * _.gte(3, 3);
       * // => true
       *
       * _.gte(1, 3);
       * // => false
       */
      var gte = createRelationalOperation(function(value, other) {
        return value >= other;
      });

      /**
       * Checks if `value` is likely an `arguments` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an `arguments` object,
       *  else `false`.
       * @example
       *
       * _.isArguments(function() { return arguments; }());
       * // => true
       *
       * _.isArguments([1, 2, 3]);
       * // => false
       */
      var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
          !propertyIsEnumerable.call(value, 'callee');
      };

      /**
       * Checks if `value` is classified as an `Array` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array, else `false`.
       * @example
       *
       * _.isArray([1, 2, 3]);
       * // => true
       *
       * _.isArray(document.body.children);
       * // => false
       *
       * _.isArray('abc');
       * // => false
       *
       * _.isArray(_.noop);
       * // => false
       */
      var isArray = Array.isArray;

      /**
       * Checks if `value` is classified as an `ArrayBuffer` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
       * @example
       *
       * _.isArrayBuffer(new ArrayBuffer(2));
       * // => true
       *
       * _.isArrayBuffer(new Array(2));
       * // => false
       */
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

      /**
       * Checks if `value` is array-like. A value is considered array-like if it's
       * not a function and has a `value.length` that's an integer greater than or
       * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
       * @example
       *
       * _.isArrayLike([1, 2, 3]);
       * // => true
       *
       * _.isArrayLike(document.body.children);
       * // => true
       *
       * _.isArrayLike('abc');
       * // => true
       *
       * _.isArrayLike(_.noop);
       * // => false
       */
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }

      /**
       * This method is like `_.isArrayLike` except that it also checks if `value`
       * is an object.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an array-like object,
       *  else `false`.
       * @example
       *
       * _.isArrayLikeObject([1, 2, 3]);
       * // => true
       *
       * _.isArrayLikeObject(document.body.children);
       * // => true
       *
       * _.isArrayLikeObject('abc');
       * // => false
       *
       * _.isArrayLikeObject(_.noop);
       * // => false
       */
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }

      /**
       * Checks if `value` is classified as a boolean primitive or object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
       * @example
       *
       * _.isBoolean(false);
       * // => true
       *
       * _.isBoolean(null);
       * // => false
       */
      function isBoolean(value) {
        return value === true || value === false ||
          (isObjectLike(value) && baseGetTag(value) == boolTag);
      }

      /**
       * Checks if `value` is a buffer.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
       * @example
       *
       * _.isBuffer(new Buffer(2));
       * // => true
       *
       * _.isBuffer(new Uint8Array(2));
       * // => false
       */
      var isBuffer = nativeIsBuffer || stubFalse;

      /**
       * Checks if `value` is classified as a `Date` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
       * @example
       *
       * _.isDate(new Date);
       * // => true
       *
       * _.isDate('Mon April 23 2012');
       * // => false
       */
      var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

      /**
       * Checks if `value` is likely a DOM element.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
       * @example
       *
       * _.isElement(document.body);
       * // => true
       *
       * _.isElement('<body>');
       * // => false
       */
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
      }

      /**
       * Checks if `value` is an empty object, collection, map, or set.
       *
       * Objects are considered empty if they have no own enumerable string keyed
       * properties.
       *
       * Array-like values such as `arguments` objects, arrays, buffers, strings, or
       * jQuery-like collections are considered empty if they have a `length` of `0`.
       * Similarly, maps and sets are considered empty if they have a `size` of `0`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is empty, else `false`.
       * @example
       *
       * _.isEmpty(null);
       * // => true
       *
       * _.isEmpty(true);
       * // => true
       *
       * _.isEmpty(1);
       * // => true
       *
       * _.isEmpty([1, 2, 3]);
       * // => false
       *
       * _.isEmpty({ 'a': 1 });
       * // => false
       */
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) &&
            (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
              isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }

      /**
       * Performs a deep comparison between two values to determine if they are
       * equivalent.
       *
       * **Note:** This method supports comparing arrays, array buffers, booleans,
       * date objects, error objects, maps, numbers, `Object` objects, regexes,
       * sets, strings, symbols, and typed arrays. `Object` objects are compared
       * by their own, not inherited, enumerable properties. Functions and DOM
       * nodes are compared by strict equality, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * var object = { 'a': 1 };
       * var other = { 'a': 1 };
       *
       * _.isEqual(object, other);
       * // => true
       *
       * object === other;
       * // => false
       */
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }

      /**
       * This method is like `_.isEqual` except that it accepts `customizer` which
       * is invoked to compare values. If `customizer` returns `undefined`, comparisons
       * are handled by the method instead. The `customizer` is invoked with up to
       * six arguments: (objValue, othValue [, index|key, object, other, stack]).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @param {Function} [customizer] The function to customize comparisons.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * function isGreeting(value) {
       *   return /^h(?:i|ello)$/.test(value);
       * }
       *
       * function customizer(objValue, othValue) {
       *   if (isGreeting(objValue) && isGreeting(othValue)) {
       *     return true;
       *   }
       * }
       *
       * var array = ['hello', 'goodbye'];
       * var other = ['hi', 'goodbye'];
       *
       * _.isEqualWith(array, other, customizer);
       * // => true
       */
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        var result = customizer ? customizer(value, other) : undefined$1;
        return result === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result;
      }

      /**
       * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
       * `SyntaxError`, `TypeError`, or `URIError` object.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
       * @example
       *
       * _.isError(new Error);
       * // => true
       *
       * _.isError(Error);
       * // => false
       */
      function isError(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == errorTag || tag == domExcTag ||
          (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
      }

      /**
       * Checks if `value` is a finite primitive number.
       *
       * **Note:** This method is based on
       * [`Number.isFinite`](https://mdn.io/Number/isFinite).
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
       * @example
       *
       * _.isFinite(3);
       * // => true
       *
       * _.isFinite(Number.MIN_VALUE);
       * // => true
       *
       * _.isFinite(Infinity);
       * // => false
       *
       * _.isFinite('3');
       * // => false
       */
      function isFinite(value) {
        return typeof value == 'number' && nativeIsFinite(value);
      }

      /**
       * Checks if `value` is classified as a `Function` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a function, else `false`.
       * @example
       *
       * _.isFunction(_);
       * // => true
       *
       * _.isFunction(/abc/);
       * // => false
       */
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        // The use of `Object#toString` avoids issues with the `typeof` operator
        // in Safari 9 which returns 'object' for typed arrays and other constructors.
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }

      /**
       * Checks if `value` is an integer.
       *
       * **Note:** This method is based on
       * [`Number.isInteger`](https://mdn.io/Number/isInteger).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
       * @example
       *
       * _.isInteger(3);
       * // => true
       *
       * _.isInteger(Number.MIN_VALUE);
       * // => false
       *
       * _.isInteger(Infinity);
       * // => false
       *
       * _.isInteger('3');
       * // => false
       */
      function isInteger(value) {
        return typeof value == 'number' && value == toInteger(value);
      }

      /**
       * Checks if `value` is a valid array-like length.
       *
       * **Note:** This method is loosely based on
       * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
       * @example
       *
       * _.isLength(3);
       * // => true
       *
       * _.isLength(Number.MIN_VALUE);
       * // => false
       *
       * _.isLength(Infinity);
       * // => false
       *
       * _.isLength('3');
       * // => false
       */
      function isLength(value) {
        return typeof value == 'number' &&
          value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }

      /**
       * Checks if `value` is the
       * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
       * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is an object, else `false`.
       * @example
       *
       * _.isObject({});
       * // => true
       *
       * _.isObject([1, 2, 3]);
       * // => true
       *
       * _.isObject(_.noop);
       * // => true
       *
       * _.isObject(null);
       * // => false
       */
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == 'object' || type == 'function');
      }

      /**
       * Checks if `value` is object-like. A value is object-like if it's not `null`
       * and has a `typeof` result of "object".
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
       * @example
       *
       * _.isObjectLike({});
       * // => true
       *
       * _.isObjectLike([1, 2, 3]);
       * // => true
       *
       * _.isObjectLike(_.noop);
       * // => false
       *
       * _.isObjectLike(null);
       * // => false
       */
      function isObjectLike(value) {
        return value != null && typeof value == 'object';
      }

      /**
       * Checks if `value` is classified as a `Map` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a map, else `false`.
       * @example
       *
       * _.isMap(new Map);
       * // => true
       *
       * _.isMap(new WeakMap);
       * // => false
       */
      var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

      /**
       * Performs a partial deep comparison between `object` and `source` to
       * determine if `object` contains equivalent property values.
       *
       * **Note:** This method is equivalent to `_.matches` when `source` is
       * partially applied.
       *
       * Partial comparisons will match empty array and empty object `source`
       * values against any array or object value, respectively. See `_.isEqual`
       * for a list of supported value comparisons.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property values to match.
       * @returns {boolean} Returns `true` if `object` is a match, else `false`.
       * @example
       *
       * var object = { 'a': 1, 'b': 2 };
       *
       * _.isMatch(object, { 'b': 2 });
       * // => true
       *
       * _.isMatch(object, { 'b': 1 });
       * // => false
       */
      function isMatch(object, source) {
        return object === source || baseIsMatch(object, source, getMatchData(source));
      }

      /**
       * This method is like `_.isMatch` except that it accepts `customizer` which
       * is invoked to compare values. If `customizer` returns `undefined`, comparisons
       * are handled by the method instead. The `customizer` is invoked with five
       * arguments: (objValue, srcValue, index|key, object, source).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {Object} object The object to inspect.
       * @param {Object} source The object of property values to match.
       * @param {Function} [customizer] The function to customize comparisons.
       * @returns {boolean} Returns `true` if `object` is a match, else `false`.
       * @example
       *
       * function isGreeting(value) {
       *   return /^h(?:i|ello)$/.test(value);
       * }
       *
       * function customizer(objValue, srcValue) {
       *   if (isGreeting(objValue) && isGreeting(srcValue)) {
       *     return true;
       *   }
       * }
       *
       * var object = { 'greeting': 'hello' };
       * var source = { 'greeting': 'hi' };
       *
       * _.isMatchWith(object, source, customizer);
       * // => true
       */
      function isMatchWith(object, source, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return baseIsMatch(object, source, getMatchData(source), customizer);
      }

      /**
       * Checks if `value` is `NaN`.
       *
       * **Note:** This method is based on
       * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
       * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
       * `undefined` and other non-number values.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
       * @example
       *
       * _.isNaN(NaN);
       * // => true
       *
       * _.isNaN(new Number(NaN));
       * // => true
       *
       * isNaN(undefined);
       * // => true
       *
       * _.isNaN(undefined);
       * // => false
       */
      function isNaN(value) {
        // An `NaN` primitive is the only value that is not equal to itself.
        // Perform the `toStringTag` check first to avoid errors with some
        // ActiveX objects in IE.
        return isNumber(value) && value != +value;
      }

      /**
       * Checks if `value` is a pristine native function.
       *
       * **Note:** This method can't reliably detect native functions in the presence
       * of the core-js package because core-js circumvents this kind of detection.
       * Despite multiple requests, the core-js maintainer has made it clear: any
       * attempt to fix the detection will be obstructed. As a result, we're left
       * with little choice but to throw an error. Unfortunately, this also affects
       * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
       * which rely on core-js.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a native function,
       *  else `false`.
       * @example
       *
       * _.isNative(Array.prototype.push);
       * // => true
       *
       * _.isNative(_);
       * // => false
       */
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }

      /**
       * Checks if `value` is `null`.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
       * @example
       *
       * _.isNull(null);
       * // => true
       *
       * _.isNull(void 0);
       * // => false
       */
      function isNull(value) {
        return value === null;
      }

      /**
       * Checks if `value` is `null` or `undefined`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
       * @example
       *
       * _.isNil(null);
       * // => true
       *
       * _.isNil(void 0);
       * // => true
       *
       * _.isNil(NaN);
       * // => false
       */
      function isNil(value) {
        return value == null;
      }

      /**
       * Checks if `value` is classified as a `Number` primitive or object.
       *
       * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
       * classified as numbers, use the `_.isFinite` method.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a number, else `false`.
       * @example
       *
       * _.isNumber(3);
       * // => true
       *
       * _.isNumber(Number.MIN_VALUE);
       * // => true
       *
       * _.isNumber(Infinity);
       * // => true
       *
       * _.isNumber('3');
       * // => false
       */
      function isNumber(value) {
        return typeof value == 'number' ||
          (isObjectLike(value) && baseGetTag(value) == numberTag);
      }

      /**
       * Checks if `value` is a plain object, that is, an object created by the
       * `Object` constructor or one with a `[[Prototype]]` of `null`.
       *
       * @static
       * @memberOf _
       * @since 0.8.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       * }
       *
       * _.isPlainObject(new Foo);
       * // => false
       *
       * _.isPlainObject([1, 2, 3]);
       * // => false
       *
       * _.isPlainObject({ 'x': 0, 'y': 0 });
       * // => true
       *
       * _.isPlainObject(Object.create(null));
       * // => true
       */
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        return typeof Ctor == 'function' && Ctor instanceof Ctor &&
          funcToString.call(Ctor) == objectCtorString;
      }

      /**
       * Checks if `value` is classified as a `RegExp` object.
       *
       * @static
       * @memberOf _
       * @since 0.1.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
       * @example
       *
       * _.isRegExp(/abc/);
       * // => true
       *
       * _.isRegExp('/abc/');
       * // => false
       */
      var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

      /**
       * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
       * double precision number which isn't the result of a rounded unsafe integer.
       *
       * **Note:** This method is based on
       * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
       * @example
       *
       * _.isSafeInteger(3);
       * // => true
       *
       * _.isSafeInteger(Number.MIN_VALUE);
       * // => false
       *
       * _.isSafeInteger(Infinity);
       * // => false
       *
       * _.isSafeInteger('3');
       * // => false
       */
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }

      /**
       * Checks if `value` is classified as a `Set` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a set, else `false`.
       * @example
       *
       * _.isSet(new Set);
       * // => true
       *
       * _.isSet(new WeakSet);
       * // => false
       */
      var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

      /**
       * Checks if `value` is classified as a `String` primitive or object.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a string, else `false`.
       * @example
       *
       * _.isString('abc');
       * // => true
       *
       * _.isString(1);
       * // => false
       */
      function isString(value) {
        return typeof value == 'string' ||
          (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
      }

      /**
       * Checks if `value` is classified as a `Symbol` primitive or object.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
       * @example
       *
       * _.isSymbol(Symbol.iterator);
       * // => true
       *
       * _.isSymbol('abc');
       * // => false
       */
      function isSymbol(value) {
        return typeof value == 'symbol' ||
          (isObjectLike(value) && baseGetTag(value) == symbolTag);
      }

      /**
       * Checks if `value` is classified as a typed array.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
       * @example
       *
       * _.isTypedArray(new Uint8Array);
       * // => true
       *
       * _.isTypedArray([]);
       * // => false
       */
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

      /**
       * Checks if `value` is `undefined`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
       * @example
       *
       * _.isUndefined(void 0);
       * // => true
       *
       * _.isUndefined(null);
       * // => false
       */
      function isUndefined(value) {
        return value === undefined$1;
      }

      /**
       * Checks if `value` is classified as a `WeakMap` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
       * @example
       *
       * _.isWeakMap(new WeakMap);
       * // => true
       *
       * _.isWeakMap(new Map);
       * // => false
       */
      function isWeakMap(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }

      /**
       * Checks if `value` is classified as a `WeakSet` object.
       *
       * @static
       * @memberOf _
       * @since 4.3.0
       * @category Lang
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
       * @example
       *
       * _.isWeakSet(new WeakSet);
       * // => true
       *
       * _.isWeakSet(new Set);
       * // => false
       */
      function isWeakSet(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }

      /**
       * Checks if `value` is less than `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is less than `other`,
       *  else `false`.
       * @see _.gt
       * @example
       *
       * _.lt(1, 3);
       * // => true
       *
       * _.lt(3, 3);
       * // => false
       *
       * _.lt(3, 1);
       * // => false
       */
      var lt = createRelationalOperation(baseLt);

      /**
       * Checks if `value` is less than or equal to `other`.
       *
       * @static
       * @memberOf _
       * @since 3.9.0
       * @category Lang
       * @param {*} value The value to compare.
       * @param {*} other The other value to compare.
       * @returns {boolean} Returns `true` if `value` is less than or equal to
       *  `other`, else `false`.
       * @see _.gte
       * @example
       *
       * _.lte(1, 3);
       * // => true
       *
       * _.lte(3, 3);
       * // => true
       *
       * _.lte(3, 1);
       * // => false
       */
      var lte = createRelationalOperation(function(value, other) {
        return value <= other;
      });

      /**
       * Converts `value` to an array.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {Array} Returns the converted array.
       * @example
       *
       * _.toArray({ 'a': 1, 'b': 2 });
       * // => [1, 2]
       *
       * _.toArray('abc');
       * // => ['a', 'b', 'c']
       *
       * _.toArray(1);
       * // => []
       *
       * _.toArray(null);
       * // => []
       */
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag = getTag(value),
            func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

        return func(value);
      }

      /**
       * Converts `value` to a finite number.
       *
       * @static
       * @memberOf _
       * @since 4.12.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted number.
       * @example
       *
       * _.toFinite(3.2);
       * // => 3.2
       *
       * _.toFinite(Number.MIN_VALUE);
       * // => 5e-324
       *
       * _.toFinite(Infinity);
       * // => 1.7976931348623157e+308
       *
       * _.toFinite('3.2');
       * // => 3.2
       */
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = (value < 0 ? -1 : 1);
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }

      /**
       * Converts `value` to an integer.
       *
       * **Note:** This method is loosely based on
       * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.toInteger(3.2);
       * // => 3
       *
       * _.toInteger(Number.MIN_VALUE);
       * // => 0
       *
       * _.toInteger(Infinity);
       * // => 1.7976931348623157e+308
       *
       * _.toInteger('3.2');
       * // => 3
       */
      function toInteger(value) {
        var result = toFinite(value),
            remainder = result % 1;

        return result === result ? (remainder ? result - remainder : result) : 0;
      }

      /**
       * Converts `value` to an integer suitable for use as the length of an
       * array-like object.
       *
       * **Note:** This method is based on
       * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.toLength(3.2);
       * // => 3
       *
       * _.toLength(Number.MIN_VALUE);
       * // => 0
       *
       * _.toLength(Infinity);
       * // => 4294967295
       *
       * _.toLength('3.2');
       * // => 3
       */
      function toLength(value) {
        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
      }

      /**
       * Converts `value` to a number.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to process.
       * @returns {number} Returns the number.
       * @example
       *
       * _.toNumber(3.2);
       * // => 3.2
       *
       * _.toNumber(Number.MIN_VALUE);
       * // => 5e-324
       *
       * _.toNumber(Infinity);
       * // => Infinity
       *
       * _.toNumber('3.2');
       * // => 3.2
       */
      function toNumber(value) {
        if (typeof value == 'number') {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
          value = isObject(other) ? (other + '') : other;
        }
        if (typeof value != 'string') {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, '');
        var isBinary = reIsBinary.test(value);
        return (isBinary || reIsOctal.test(value))
          ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
          : (reIsBadHex.test(value) ? NAN : +value);
      }

      /**
       * Converts `value` to a plain object flattening inherited enumerable string
       * keyed properties of `value` to own properties of the plain object.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {Object} Returns the converted plain object.
       * @example
       *
       * function Foo() {
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.assign({ 'a': 1 }, new Foo);
       * // => { 'a': 1, 'b': 2 }
       *
       * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
       * // => { 'a': 1, 'b': 2, 'c': 3 }
       */
      function toPlainObject(value) {
        return copyObject(value, keysIn(value));
      }

      /**
       * Converts `value` to a safe integer. A safe integer can be compared and
       * represented correctly.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.toSafeInteger(3.2);
       * // => 3
       *
       * _.toSafeInteger(Number.MIN_VALUE);
       * // => 0
       *
       * _.toSafeInteger(Infinity);
       * // => 9007199254740991
       *
       * _.toSafeInteger('3.2');
       * // => 3
       */
      function toSafeInteger(value) {
        return value
          ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
          : (value === 0 ? value : 0);
      }

      /**
       * Converts `value` to a string. An empty string is returned for `null`
       * and `undefined` values. The sign of `-0` is preserved.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Lang
       * @param {*} value The value to convert.
       * @returns {string} Returns the converted string.
       * @example
       *
       * _.toString(null);
       * // => ''
       *
       * _.toString(-0);
       * // => '-0'
       *
       * _.toString([1, 2, 3]);
       * // => '1,2,3'
       */
      function toString(value) {
        return value == null ? '' : baseToString(value);
      }

      /*------------------------------------------------------------------------*/

      /**
       * Assigns own enumerable string keyed properties of source objects to the
       * destination object. Source objects are applied from left to right.
       * Subsequent sources overwrite property assignments of previous sources.
       *
       * **Note:** This method mutates `object` and is loosely based on
       * [`Object.assign`](https://mdn.io/Object/assign).
       *
       * @static
       * @memberOf _
       * @since 0.10.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.assignIn
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       * }
       *
       * function Bar() {
       *   this.c = 3;
       * }
       *
       * Foo.prototype.b = 2;
       * Bar.prototype.d = 4;
       *
       * _.assign({ 'a': 0 }, new Foo, new Bar);
       * // => { 'a': 1, 'c': 3 }
       */
      var assign = createAssigner(function(object, source) {
        if (isPrototype(source) || isArrayLike(source)) {
          copyObject(source, keys(source), object);
          return;
        }
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            assignValue(object, key, source[key]);
          }
        }
      });

      /**
       * This method is like `_.assign` except that it iterates over own and
       * inherited source properties.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias extend
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.assign
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       * }
       *
       * function Bar() {
       *   this.c = 3;
       * }
       *
       * Foo.prototype.b = 2;
       * Bar.prototype.d = 4;
       *
       * _.assignIn({ 'a': 0 }, new Foo, new Bar);
       * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
       */
      var assignIn = createAssigner(function(object, source) {
        copyObject(source, keysIn(source), object);
      });

      /**
       * This method is like `_.assignIn` except that it accepts `customizer`
       * which is invoked to produce the assigned values. If `customizer` returns
       * `undefined`, assignment is handled by the method instead. The `customizer`
       * is invoked with five arguments: (objValue, srcValue, key, object, source).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias extendWith
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} sources The source objects.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @see _.assignWith
       * @example
       *
       * function customizer(objValue, srcValue) {
       *   return _.isUndefined(objValue) ? srcValue : objValue;
       * }
       *
       * var defaults = _.partialRight(_.assignInWith, customizer);
       *
       * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
       * // => { 'a': 1, 'b': 2 }
       */
      var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keysIn(source), object, customizer);
      });

      /**
       * This method is like `_.assign` except that it accepts `customizer`
       * which is invoked to produce the assigned values. If `customizer` returns
       * `undefined`, assignment is handled by the method instead. The `customizer`
       * is invoked with five arguments: (objValue, srcValue, key, object, source).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} sources The source objects.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @see _.assignInWith
       * @example
       *
       * function customizer(objValue, srcValue) {
       *   return _.isUndefined(objValue) ? srcValue : objValue;
       * }
       *
       * var defaults = _.partialRight(_.assignWith, customizer);
       *
       * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
       * // => { 'a': 1, 'b': 2 }
       */
      var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
        copyObject(source, keys(source), object, customizer);
      });

      /**
       * Creates an array of values corresponding to `paths` of `object`.
       *
       * @static
       * @memberOf _
       * @since 1.0.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {...(string|string[])} [paths] The property paths to pick.
       * @returns {Array} Returns the picked values.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
       *
       * _.at(object, ['a[0].b.c', 'a[1]']);
       * // => [3, 4]
       */
      var at = flatRest(baseAt);

      /**
       * Creates an object that inherits from the `prototype` object. If a
       * `properties` object is given, its own enumerable string keyed properties
       * are assigned to the created object.
       *
       * @static
       * @memberOf _
       * @since 2.3.0
       * @category Object
       * @param {Object} prototype The object to inherit from.
       * @param {Object} [properties] The properties to assign to the object.
       * @returns {Object} Returns the new object.
       * @example
       *
       * function Shape() {
       *   this.x = 0;
       *   this.y = 0;
       * }
       *
       * function Circle() {
       *   Shape.call(this);
       * }
       *
       * Circle.prototype = _.create(Shape.prototype, {
       *   'constructor': Circle
       * });
       *
       * var circle = new Circle;
       * circle instanceof Circle;
       * // => true
       *
       * circle instanceof Shape;
       * // => true
       */
      function create(prototype, properties) {
        var result = baseCreate(prototype);
        return properties == null ? result : baseAssign(result, properties);
      }

      /**
       * Assigns own and inherited enumerable string keyed properties of source
       * objects to the destination object for all destination properties that
       * resolve to `undefined`. Source objects are applied from left to right.
       * Once a property is set, additional values of the same property are ignored.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.defaultsDeep
       * @example
       *
       * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
       * // => { 'a': 1, 'b': 2 }
       */
      var defaults = baseRest(function(object, sources) {
        object = Object(object);

        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined$1;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }

        while (++index < length) {
          var source = sources[index];
          var props = keysIn(source);
          var propsIndex = -1;
          var propsLength = props.length;

          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];

            if (value === undefined$1 ||
                (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
              object[key] = source[key];
            }
          }
        }

        return object;
      });

      /**
       * This method is like `_.defaults` except that it recursively assigns
       * default properties.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @see _.defaults
       * @example
       *
       * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
       * // => { 'a': { 'b': 2, 'c': 3 } }
       */
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$1, customDefaultsMerge);
        return apply(mergeWith, undefined$1, args);
      });

      /**
       * This method is like `_.find` except that it returns the key of the first
       * element `predicate` returns truthy for instead of the element itself.
       *
       * @static
       * @memberOf _
       * @since 1.1.0
       * @category Object
       * @param {Object} object The object to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {string|undefined} Returns the key of the matched element,
       *  else `undefined`.
       * @example
       *
       * var users = {
       *   'barney':  { 'age': 36, 'active': true },
       *   'fred':    { 'age': 40, 'active': false },
       *   'pebbles': { 'age': 1,  'active': true }
       * };
       *
       * _.findKey(users, function(o) { return o.age < 40; });
       * // => 'barney' (iteration order is not guaranteed)
       *
       * // The `_.matches` iteratee shorthand.
       * _.findKey(users, { 'age': 1, 'active': true });
       * // => 'pebbles'
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findKey(users, ['active', false]);
       * // => 'fred'
       *
       * // The `_.property` iteratee shorthand.
       * _.findKey(users, 'active');
       * // => 'barney'
       */
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }

      /**
       * This method is like `_.findKey` except that it iterates over elements of
       * a collection in the opposite order.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Object
       * @param {Object} object The object to inspect.
       * @param {Function} [predicate=_.identity] The function invoked per iteration.
       * @returns {string|undefined} Returns the key of the matched element,
       *  else `undefined`.
       * @example
       *
       * var users = {
       *   'barney':  { 'age': 36, 'active': true },
       *   'fred':    { 'age': 40, 'active': false },
       *   'pebbles': { 'age': 1,  'active': true }
       * };
       *
       * _.findLastKey(users, function(o) { return o.age < 40; });
       * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
       *
       * // The `_.matches` iteratee shorthand.
       * _.findLastKey(users, { 'age': 36, 'active': true });
       * // => 'barney'
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.findLastKey(users, ['active', false]);
       * // => 'fred'
       *
       * // The `_.property` iteratee shorthand.
       * _.findLastKey(users, 'active');
       * // => 'pebbles'
       */
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }

      /**
       * Iterates over own and inherited enumerable string keyed properties of an
       * object and invokes `iteratee` for each property. The iteratee is invoked
       * with three arguments: (value, key, object). Iteratee functions may exit
       * iteration early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @since 0.3.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forInRight
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forIn(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
       */
      function forIn(object, iteratee) {
        return object == null
          ? object
          : baseFor(object, getIteratee(iteratee, 3), keysIn);
      }

      /**
       * This method is like `_.forIn` except that it iterates over properties of
       * `object` in the opposite order.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forIn
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forInRight(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
       */
      function forInRight(object, iteratee) {
        return object == null
          ? object
          : baseForRight(object, getIteratee(iteratee, 3), keysIn);
      }

      /**
       * Iterates over own enumerable string keyed properties of an object and
       * invokes `iteratee` for each property. The iteratee is invoked with three
       * arguments: (value, key, object). Iteratee functions may exit iteration
       * early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @since 0.3.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forOwnRight
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forOwn(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'a' then 'b' (iteration order is not guaranteed).
       */
      function forOwn(object, iteratee) {
        return object && baseForOwn(object, getIteratee(iteratee, 3));
      }

      /**
       * This method is like `_.forOwn` except that it iterates over properties of
       * `object` in the opposite order.
       *
       * @static
       * @memberOf _
       * @since 2.0.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns `object`.
       * @see _.forOwn
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.forOwnRight(new Foo, function(value, key) {
       *   console.log(key);
       * });
       * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
       */
      function forOwnRight(object, iteratee) {
        return object && baseForOwnRight(object, getIteratee(iteratee, 3));
      }

      /**
       * Creates an array of function property names from own enumerable properties
       * of `object`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns the function names.
       * @see _.functionsIn
       * @example
       *
       * function Foo() {
       *   this.a = _.constant('a');
       *   this.b = _.constant('b');
       * }
       *
       * Foo.prototype.c = _.constant('c');
       *
       * _.functions(new Foo);
       * // => ['a', 'b']
       */
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys(object));
      }

      /**
       * Creates an array of function property names from own and inherited
       * enumerable properties of `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns the function names.
       * @see _.functions
       * @example
       *
       * function Foo() {
       *   this.a = _.constant('a');
       *   this.b = _.constant('b');
       * }
       *
       * Foo.prototype.c = _.constant('c');
       *
       * _.functionsIn(new Foo);
       * // => ['a', 'b', 'c']
       */
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }

      /**
       * Gets the value at `path` of `object`. If the resolved value is
       * `undefined`, the `defaultValue` is returned in its place.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the property to get.
       * @param {*} [defaultValue] The value returned for `undefined` resolved values.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }] };
       *
       * _.get(object, 'a[0].b.c');
       * // => 3
       *
       * _.get(object, ['a', '0', 'b', 'c']);
       * // => 3
       *
       * _.get(object, 'a.b.c', 'default');
       * // => 'default'
       */
      function get(object, path, defaultValue) {
        var result = object == null ? undefined$1 : baseGet(object, path);
        return result === undefined$1 ? defaultValue : result;
      }

      /**
       * Checks if `path` is a direct property of `object`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path to check.
       * @returns {boolean} Returns `true` if `path` exists, else `false`.
       * @example
       *
       * var object = { 'a': { 'b': 2 } };
       * var other = _.create({ 'a': _.create({ 'b': 2 }) });
       *
       * _.has(object, 'a');
       * // => true
       *
       * _.has(object, 'a.b');
       * // => true
       *
       * _.has(object, ['a', 'b']);
       * // => true
       *
       * _.has(other, 'a');
       * // => false
       */
      function has(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }

      /**
       * Checks if `path` is a direct or inherited property of `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path to check.
       * @returns {boolean} Returns `true` if `path` exists, else `false`.
       * @example
       *
       * var object = _.create({ 'a': _.create({ 'b': 2 }) });
       *
       * _.hasIn(object, 'a');
       * // => true
       *
       * _.hasIn(object, 'a.b');
       * // => true
       *
       * _.hasIn(object, ['a', 'b']);
       * // => true
       *
       * _.hasIn(object, 'b');
       * // => false
       */
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }

      /**
       * Creates an object composed of the inverted keys and values of `object`.
       * If `object` contains duplicate values, subsequent values overwrite
       * property assignments of previous values.
       *
       * @static
       * @memberOf _
       * @since 0.7.0
       * @category Object
       * @param {Object} object The object to invert.
       * @returns {Object} Returns the new inverted object.
       * @example
       *
       * var object = { 'a': 1, 'b': 2, 'c': 1 };
       *
       * _.invert(object);
       * // => { '1': 'c', '2': 'b' }
       */
      var invert = createInverter(function(result, value, key) {
        if (value != null &&
            typeof value.toString != 'function') {
          value = nativeObjectToString.call(value);
        }

        result[value] = key;
      }, constant(identity));

      /**
       * This method is like `_.invert` except that the inverted object is generated
       * from the results of running each element of `object` thru `iteratee`. The
       * corresponding inverted value of each inverted key is an array of keys
       * responsible for generating the inverted value. The iteratee is invoked
       * with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.1.0
       * @category Object
       * @param {Object} object The object to invert.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {Object} Returns the new inverted object.
       * @example
       *
       * var object = { 'a': 1, 'b': 2, 'c': 1 };
       *
       * _.invertBy(object);
       * // => { '1': ['a', 'c'], '2': ['b'] }
       *
       * _.invertBy(object, function(value) {
       *   return 'group' + value;
       * });
       * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
       */
      var invertBy = createInverter(function(result, value, key) {
        if (value != null &&
            typeof value.toString != 'function') {
          value = nativeObjectToString.call(value);
        }

        if (hasOwnProperty.call(result, value)) {
          result[value].push(key);
        } else {
          result[value] = [key];
        }
      }, getIteratee);

      /**
       * Invokes the method at `path` of `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the method to invoke.
       * @param {...*} [args] The arguments to invoke the method with.
       * @returns {*} Returns the result of the invoked method.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
       *
       * _.invoke(object, 'a[0].b.c.slice', 1, 3);
       * // => [2, 3]
       */
      var invoke = baseRest(baseInvoke);

      /**
       * Creates an array of the own enumerable property names of `object`.
       *
       * **Note:** Non-object values are coerced to objects. See the
       * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
       * for more details.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.keys(new Foo);
       * // => ['a', 'b'] (iteration order is not guaranteed)
       *
       * _.keys('hi');
       * // => ['0', '1']
       */
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }

      /**
       * Creates an array of the own and inherited enumerable property names of `object`.
       *
       * **Note:** Non-object values are coerced to objects.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.keysIn(new Foo);
       * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
       */
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }

      /**
       * The opposite of `_.mapValues`; this method creates an object with the
       * same values as `object` and keys generated by running each own enumerable
       * string keyed property of `object` thru `iteratee`. The iteratee is invoked
       * with three arguments: (value, key, object).
       *
       * @static
       * @memberOf _
       * @since 3.8.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns the new mapped object.
       * @see _.mapValues
       * @example
       *
       * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
       *   return key + value;
       * });
       * // => { 'a1': 1, 'b2': 2 }
       */
      function mapKeys(object, iteratee) {
        var result = {};
        iteratee = getIteratee(iteratee, 3);

        baseForOwn(object, function(value, key, object) {
          baseAssignValue(result, iteratee(value, key, object), value);
        });
        return result;
      }

      /**
       * Creates an object with the same keys as `object` and values generated
       * by running each own enumerable string keyed property of `object` thru
       * `iteratee`. The iteratee is invoked with three arguments:
       * (value, key, object).
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Object} Returns the new mapped object.
       * @see _.mapKeys
       * @example
       *
       * var users = {
       *   'fred':    { 'user': 'fred',    'age': 40 },
       *   'pebbles': { 'user': 'pebbles', 'age': 1 }
       * };
       *
       * _.mapValues(users, function(o) { return o.age; });
       * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
       *
       * // The `_.property` iteratee shorthand.
       * _.mapValues(users, 'age');
       * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
       */
      function mapValues(object, iteratee) {
        var result = {};
        iteratee = getIteratee(iteratee, 3);

        baseForOwn(object, function(value, key, object) {
          baseAssignValue(result, key, iteratee(value, key, object));
        });
        return result;
      }

      /**
       * This method is like `_.assign` except that it recursively merges own and
       * inherited enumerable string keyed properties of source objects into the
       * destination object. Source properties that resolve to `undefined` are
       * skipped if a destination value exists. Array and plain object properties
       * are merged recursively. Other objects and value types are overridden by
       * assignment. Source objects are applied from left to right. Subsequent
       * sources overwrite property assignments of previous sources.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 0.5.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} [sources] The source objects.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = {
       *   'a': [{ 'b': 2 }, { 'd': 4 }]
       * };
       *
       * var other = {
       *   'a': [{ 'c': 3 }, { 'e': 5 }]
       * };
       *
       * _.merge(object, other);
       * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
       */
      var merge = createAssigner(function(object, source, srcIndex) {
        baseMerge(object, source, srcIndex);
      });

      /**
       * This method is like `_.merge` except that it accepts `customizer` which
       * is invoked to produce the merged values of the destination and source
       * properties. If `customizer` returns `undefined`, merging is handled by the
       * method instead. The `customizer` is invoked with six arguments:
       * (objValue, srcValue, key, object, source, stack).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The destination object.
       * @param {...Object} sources The source objects.
       * @param {Function} customizer The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @example
       *
       * function customizer(objValue, srcValue) {
       *   if (_.isArray(objValue)) {
       *     return objValue.concat(srcValue);
       *   }
       * }
       *
       * var object = { 'a': [1], 'b': [2] };
       * var other = { 'a': [3], 'b': [4] };
       *
       * _.mergeWith(object, other, customizer);
       * // => { 'a': [1, 3], 'b': [2, 4] }
       */
      var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
        baseMerge(object, source, srcIndex, customizer);
      });

      /**
       * The opposite of `_.pick`; this method creates an object composed of the
       * own and inherited enumerable property paths of `object` that are not omitted.
       *
       * **Note:** This method is considerably slower than `_.pick`.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The source object.
       * @param {...(string|string[])} [paths] The property paths to omit.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.omit(object, ['a', 'c']);
       * // => { 'b': '2' }
       */
      var omit = flatRest(function(object, paths) {
        var result = {};
        if (object == null) {
          return result;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path) {
          path = castPath(path, object);
          isDeep || (isDeep = path.length > 1);
          return path;
        });
        copyObject(object, getAllKeysIn(object), result);
        if (isDeep) {
          result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result, paths[length]);
        }
        return result;
      });

      /**
       * The opposite of `_.pickBy`; this method creates an object composed of
       * the own and inherited enumerable string keyed properties of `object` that
       * `predicate` doesn't return truthy for. The predicate is invoked with two
       * arguments: (value, key).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The source object.
       * @param {Function} [predicate=_.identity] The function invoked per property.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.omitBy(object, _.isNumber);
       * // => { 'b': '2' }
       */
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }

      /**
       * Creates an object composed of the picked `object` properties.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The source object.
       * @param {...(string|string[])} [paths] The property paths to pick.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.pick(object, ['a', 'c']);
       * // => { 'a': 1, 'c': 3 }
       */
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });

      /**
       * Creates an object composed of the `object` properties `predicate` returns
       * truthy for. The predicate is invoked with two arguments: (value, key).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The source object.
       * @param {Function} [predicate=_.identity] The function invoked per property.
       * @returns {Object} Returns the new object.
       * @example
       *
       * var object = { 'a': 1, 'b': '2', 'c': 3 };
       *
       * _.pickBy(object, _.isNumber);
       * // => { 'a': 1, 'c': 3 }
       */
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path) {
          return predicate(value, path[0]);
        });
      }

      /**
       * This method is like `_.get` except that if the resolved value is a
       * function it's invoked with the `this` binding of its parent object and
       * its result is returned.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @param {Array|string} path The path of the property to resolve.
       * @param {*} [defaultValue] The value returned for `undefined` resolved values.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
       *
       * _.result(object, 'a[0].b.c1');
       * // => 3
       *
       * _.result(object, 'a[0].b.c2');
       * // => 4
       *
       * _.result(object, 'a[0].b.c3', 'default');
       * // => 'default'
       *
       * _.result(object, 'a[0].b.c3', _.constant('default'));
       * // => 'default'
       */
      function result(object, path, defaultValue) {
        path = castPath(path, object);

        var index = -1,
            length = path.length;

        // Ensure the loop is entered when path is empty.
        if (!length) {
          length = 1;
          object = undefined$1;
        }
        while (++index < length) {
          var value = object == null ? undefined$1 : object[toKey(path[index])];
          if (value === undefined$1) {
            index = length;
            value = defaultValue;
          }
          object = isFunction(value) ? value.call(object) : value;
        }
        return object;
      }

      /**
       * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
       * it's created. Arrays are created for missing index properties while objects
       * are created for all other missing properties. Use `_.setWith` to customize
       * `path` creation.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {*} value The value to set.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }] };
       *
       * _.set(object, 'a[0].b.c', 4);
       * console.log(object.a[0].b.c);
       * // => 4
       *
       * _.set(object, ['x', '0', 'y', 'z'], 5);
       * console.log(object.x[0].y.z);
       * // => 5
       */
      function set(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }

      /**
       * This method is like `_.set` except that it accepts `customizer` which is
       * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
       * path creation is handled by the method instead. The `customizer` is invoked
       * with three arguments: (nsValue, key, nsObject).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {*} value The value to set.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = {};
       *
       * _.setWith(object, '[0][1]', 'a', Object);
       * // => { '0': { '1': 'a' } }
       */
      function setWith(object, path, value, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return object == null ? object : baseSet(object, path, value, customizer);
      }

      /**
       * Creates an array of own enumerable string keyed-value pairs for `object`
       * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
       * entries are returned.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias entries
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the key-value pairs.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.toPairs(new Foo);
       * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
       */
      var toPairs = createToPairs(keys);

      /**
       * Creates an array of own and inherited enumerable string keyed-value pairs
       * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
       * or set, its entries are returned.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @alias entriesIn
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the key-value pairs.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.toPairsIn(new Foo);
       * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
       */
      var toPairsIn = createToPairs(keysIn);

      /**
       * An alternative to `_.reduce`; this method transforms `object` to a new
       * `accumulator` object which is the result of running each of its own
       * enumerable string keyed properties thru `iteratee`, with each invocation
       * potentially mutating the `accumulator` object. If `accumulator` is not
       * provided, a new object with the same `[[Prototype]]` will be used. The
       * iteratee is invoked with four arguments: (accumulator, value, key, object).
       * Iteratee functions may exit iteration early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @since 1.3.0
       * @category Object
       * @param {Object} object The object to iterate over.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @param {*} [accumulator] The custom accumulator value.
       * @returns {*} Returns the accumulated value.
       * @example
       *
       * _.transform([2, 3, 4], function(result, n) {
       *   result.push(n *= n);
       *   return n % 2 == 0;
       * }, []);
       * // => [4, 9]
       *
       * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
       *   (result[value] || (result[value] = [])).push(key);
       * }, {});
       * // => { '1': ['a', 'c'], '2': ['b'] }
       */
      function transform(object, iteratee, accumulator) {
        var isArr = isArray(object),
            isArrLike = isArr || isBuffer(object) || isTypedArray(object);

        iteratee = getIteratee(iteratee, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor : [];
          }
          else if (isObject(object)) {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          }
          else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
          return iteratee(accumulator, value, index, object);
        });
        return accumulator;
      }

      /**
       * Removes the property at `path` of `object`.
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to unset.
       * @returns {boolean} Returns `true` if the property is deleted, else `false`.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 7 } }] };
       * _.unset(object, 'a[0].b.c');
       * // => true
       *
       * console.log(object);
       * // => { 'a': [{ 'b': {} }] };
       *
       * _.unset(object, ['a', '0', 'b', 'c']);
       * // => true
       *
       * console.log(object);
       * // => { 'a': [{ 'b': {} }] };
       */
      function unset(object, path) {
        return object == null ? true : baseUnset(object, path);
      }

      /**
       * This method is like `_.set` except that accepts `updater` to produce the
       * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
       * is invoked with one argument: (value).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.6.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {Function} updater The function to produce the updated value.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = { 'a': [{ 'b': { 'c': 3 } }] };
       *
       * _.update(object, 'a[0].b.c', function(n) { return n * n; });
       * console.log(object.a[0].b.c);
       * // => 9
       *
       * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
       * console.log(object.x[0].y.z);
       * // => 0
       */
      function update(object, path, updater) {
        return object == null ? object : baseUpdate(object, path, castFunction(updater));
      }

      /**
       * This method is like `_.update` except that it accepts `customizer` which is
       * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
       * path creation is handled by the method instead. The `customizer` is invoked
       * with three arguments: (nsValue, key, nsObject).
       *
       * **Note:** This method mutates `object`.
       *
       * @static
       * @memberOf _
       * @since 4.6.0
       * @category Object
       * @param {Object} object The object to modify.
       * @param {Array|string} path The path of the property to set.
       * @param {Function} updater The function to produce the updated value.
       * @param {Function} [customizer] The function to customize assigned values.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var object = {};
       *
       * _.updateWith(object, '[0][1]', _.constant('a'), Object);
       * // => { '0': { '1': 'a' } }
       */
      function updateWith(object, path, updater, customizer) {
        customizer = typeof customizer == 'function' ? customizer : undefined$1;
        return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
      }

      /**
       * Creates an array of the own enumerable string keyed property values of `object`.
       *
       * **Note:** Non-object values are coerced to objects.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property values.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.values(new Foo);
       * // => [1, 2] (iteration order is not guaranteed)
       *
       * _.values('hi');
       * // => ['h', 'i']
       */
      function values(object) {
        return object == null ? [] : baseValues(object, keys(object));
      }

      /**
       * Creates an array of the own and inherited enumerable string keyed property
       * values of `object`.
       *
       * **Note:** Non-object values are coerced to objects.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property values.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.valuesIn(new Foo);
       * // => [1, 2, 3] (iteration order is not guaranteed)
       */
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }

      /*------------------------------------------------------------------------*/

      /**
       * Clamps `number` within the inclusive `lower` and `upper` bounds.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Number
       * @param {number} number The number to clamp.
       * @param {number} [lower] The lower bound.
       * @param {number} upper The upper bound.
       * @returns {number} Returns the clamped number.
       * @example
       *
       * _.clamp(-10, -5, 5);
       * // => -5
       *
       * _.clamp(10, -5, 5);
       * // => 5
       */
      function clamp(number, lower, upper) {
        if (upper === undefined$1) {
          upper = lower;
          lower = undefined$1;
        }
        if (upper !== undefined$1) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$1) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }

      /**
       * Checks if `n` is between `start` and up to, but not including, `end`. If
       * `end` is not specified, it's set to `start` with `start` then set to `0`.
       * If `start` is greater than `end` the params are swapped to support
       * negative ranges.
       *
       * @static
       * @memberOf _
       * @since 3.3.0
       * @category Number
       * @param {number} number The number to check.
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
       * @see _.range, _.rangeRight
       * @example
       *
       * _.inRange(3, 2, 4);
       * // => true
       *
       * _.inRange(4, 8);
       * // => true
       *
       * _.inRange(4, 2);
       * // => false
       *
       * _.inRange(2, 2);
       * // => false
       *
       * _.inRange(1.2, 2);
       * // => true
       *
       * _.inRange(5.2, 4);
       * // => false
       *
       * _.inRange(-3, -2, -6);
       * // => true
       */
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined$1) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }

      /**
       * Produces a random number between the inclusive `lower` and `upper` bounds.
       * If only one argument is provided a number between `0` and the given number
       * is returned. If `floating` is `true`, or either `lower` or `upper` are
       * floats, a floating-point number is returned instead of an integer.
       *
       * **Note:** JavaScript follows the IEEE-754 standard for resolving
       * floating-point values which can produce unexpected results.
       *
       * @static
       * @memberOf _
       * @since 0.7.0
       * @category Number
       * @param {number} [lower=0] The lower bound.
       * @param {number} [upper=1] The upper bound.
       * @param {boolean} [floating] Specify returning a floating-point number.
       * @returns {number} Returns the random number.
       * @example
       *
       * _.random(0, 5);
       * // => an integer between 0 and 5
       *
       * _.random(5);
       * // => also an integer between 0 and 5
       *
       * _.random(5, true);
       * // => a floating-point number between 0 and 5
       *
       * _.random(1.2, 5.2);
       * // => a floating-point number between 1.2 and 5.2
       */
      function random(lower, upper, floating) {
        if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$1;
        }
        if (floating === undefined$1) {
          if (typeof upper == 'boolean') {
            floating = upper;
            upper = undefined$1;
          }
          else if (typeof lower == 'boolean') {
            floating = lower;
            lower = undefined$1;
          }
        }
        if (lower === undefined$1 && upper === undefined$1) {
          lower = 0;
          upper = 1;
        }
        else {
          lower = toFinite(lower);
          if (upper === undefined$1) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
        }
        return baseRandom(lower, upper);
      }

      /*------------------------------------------------------------------------*/

      /**
       * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the camel cased string.
       * @example
       *
       * _.camelCase('Foo Bar');
       * // => 'fooBar'
       *
       * _.camelCase('--foo-bar--');
       * // => 'fooBar'
       *
       * _.camelCase('__FOO_BAR__');
       * // => 'fooBar'
       */
      var camelCase = createCompounder(function(result, word, index) {
        word = word.toLowerCase();
        return result + (index ? capitalize(word) : word);
      });

      /**
       * Converts the first character of `string` to upper case and the remaining
       * to lower case.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to capitalize.
       * @returns {string} Returns the capitalized string.
       * @example
       *
       * _.capitalize('FRED');
       * // => 'Fred'
       */
      function capitalize(string) {
        return upperFirst(toString(string).toLowerCase());
      }

      /**
       * Deburrs `string` by converting
       * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
       * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
       * letters to basic Latin letters and removing
       * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to deburr.
       * @returns {string} Returns the deburred string.
       * @example
       *
       * _.deburr('déjà vu');
       * // => 'deja vu'
       */
      function deburr(string) {
        string = toString(string);
        return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
      }

      /**
       * Checks if `string` ends with the given target string.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to inspect.
       * @param {string} [target] The string to search for.
       * @param {number} [position=string.length] The position to search up to.
       * @returns {boolean} Returns `true` if `string` ends with `target`,
       *  else `false`.
       * @example
       *
       * _.endsWith('abc', 'c');
       * // => true
       *
       * _.endsWith('abc', 'b');
       * // => false
       *
       * _.endsWith('abc', 'b', 2);
       * // => true
       */
      function endsWith(string, target, position) {
        string = toString(string);
        target = baseToString(target);

        var length = string.length;
        position = position === undefined$1
          ? length
          : baseClamp(toInteger(position), 0, length);

        var end = position;
        position -= target.length;
        return position >= 0 && string.slice(position, end) == target;
      }

      /**
       * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
       * corresponding HTML entities.
       *
       * **Note:** No other characters are escaped. To escape additional
       * characters use a third-party library like [_he_](https://mths.be/he).
       *
       * Though the ">" character is escaped for symmetry, characters like
       * ">" and "/" don't need escaping in HTML and have no special meaning
       * unless they're part of a tag or unquoted attribute value. See
       * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
       * (under "semi-related fun fact") for more details.
       *
       * When working with HTML you should always
       * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
       * XSS vectors.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category String
       * @param {string} [string=''] The string to escape.
       * @returns {string} Returns the escaped string.
       * @example
       *
       * _.escape('fred, barney, & pebbles');
       * // => 'fred, barney, &amp; pebbles'
       */
      function escape(string) {
        string = toString(string);
        return (string && reHasUnescapedHtml.test(string))
          ? string.replace(reUnescapedHtml, escapeHtmlChar)
          : string;
      }

      /**
       * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
       * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to escape.
       * @returns {string} Returns the escaped string.
       * @example
       *
       * _.escapeRegExp('[lodash](https://lodash.com/)');
       * // => '\[lodash\]\(https://lodash\.com/\)'
       */
      function escapeRegExp(string) {
        string = toString(string);
        return (string && reHasRegExpChar.test(string))
          ? string.replace(reRegExpChar, '\\$&')
          : string;
      }

      /**
       * Converts `string` to
       * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the kebab cased string.
       * @example
       *
       * _.kebabCase('Foo Bar');
       * // => 'foo-bar'
       *
       * _.kebabCase('fooBar');
       * // => 'foo-bar'
       *
       * _.kebabCase('__FOO_BAR__');
       * // => 'foo-bar'
       */
      var kebabCase = createCompounder(function(result, word, index) {
        return result + (index ? '-' : '') + word.toLowerCase();
      });

      /**
       * Converts `string`, as space separated words, to lower case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the lower cased string.
       * @example
       *
       * _.lowerCase('--Foo-Bar--');
       * // => 'foo bar'
       *
       * _.lowerCase('fooBar');
       * // => 'foo bar'
       *
       * _.lowerCase('__FOO_BAR__');
       * // => 'foo bar'
       */
      var lowerCase = createCompounder(function(result, word, index) {
        return result + (index ? ' ' : '') + word.toLowerCase();
      });

      /**
       * Converts the first character of `string` to lower case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the converted string.
       * @example
       *
       * _.lowerFirst('Fred');
       * // => 'fred'
       *
       * _.lowerFirst('FRED');
       * // => 'fRED'
       */
      var lowerFirst = createCaseFirst('toLowerCase');

      /**
       * Pads `string` on the left and right sides if it's shorter than `length`.
       * Padding characters are truncated if they can't be evenly divided by `length`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to pad.
       * @param {number} [length=0] The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padded string.
       * @example
       *
       * _.pad('abc', 8);
       * // => '  abc   '
       *
       * _.pad('abc', 8, '_-');
       * // => '_-abc_-_'
       *
       * _.pad('abc', 3);
       * // => 'abc'
       */
      function pad(string, length, chars) {
        string = toString(string);
        length = toInteger(length);

        var strLength = length ? stringSize(string) : 0;
        if (!length || strLength >= length) {
          return string;
        }
        var mid = (length - strLength) / 2;
        return (
          createPadding(nativeFloor(mid), chars) +
          string +
          createPadding(nativeCeil(mid), chars)
        );
      }

      /**
       * Pads `string` on the right side if it's shorter than `length`. Padding
       * characters are truncated if they exceed `length`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to pad.
       * @param {number} [length=0] The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padded string.
       * @example
       *
       * _.padEnd('abc', 6);
       * // => 'abc   '
       *
       * _.padEnd('abc', 6, '_-');
       * // => 'abc_-_'
       *
       * _.padEnd('abc', 3);
       * // => 'abc'
       */
      function padEnd(string, length, chars) {
        string = toString(string);
        length = toInteger(length);

        var strLength = length ? stringSize(string) : 0;
        return (length && strLength < length)
          ? (string + createPadding(length - strLength, chars))
          : string;
      }

      /**
       * Pads `string` on the left side if it's shorter than `length`. Padding
       * characters are truncated if they exceed `length`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to pad.
       * @param {number} [length=0] The padding length.
       * @param {string} [chars=' '] The string used as padding.
       * @returns {string} Returns the padded string.
       * @example
       *
       * _.padStart('abc', 6);
       * // => '   abc'
       *
       * _.padStart('abc', 6, '_-');
       * // => '_-_abc'
       *
       * _.padStart('abc', 3);
       * // => 'abc'
       */
      function padStart(string, length, chars) {
        string = toString(string);
        length = toInteger(length);

        var strLength = length ? stringSize(string) : 0;
        return (length && strLength < length)
          ? (createPadding(length - strLength, chars) + string)
          : string;
      }

      /**
       * Converts `string` to an integer of the specified radix. If `radix` is
       * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
       * hexadecimal, in which case a `radix` of `16` is used.
       *
       * **Note:** This method aligns with the
       * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
       *
       * @static
       * @memberOf _
       * @since 1.1.0
       * @category String
       * @param {string} string The string to convert.
       * @param {number} [radix=10] The radix to interpret `value` by.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {number} Returns the converted integer.
       * @example
       *
       * _.parseInt('08');
       * // => 8
       *
       * _.map(['6', '08', '10'], _.parseInt);
       * // => [6, 8, 10]
       */
      function parseInt(string, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
      }

      /**
       * Repeats the given string `n` times.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to repeat.
       * @param {number} [n=1] The number of times to repeat the string.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the repeated string.
       * @example
       *
       * _.repeat('*', 3);
       * // => '***'
       *
       * _.repeat('abc', 2);
       * // => 'abcabc'
       *
       * _.repeat('abc', 0);
       * // => ''
       */
      function repeat(string, n, guard) {
        if ((guard ? isIterateeCall(string, n, guard) : n === undefined$1)) {
          n = 1;
        } else {
          n = toInteger(n);
        }
        return baseRepeat(toString(string), n);
      }

      /**
       * Replaces matches for `pattern` in `string` with `replacement`.
       *
       * **Note:** This method is based on
       * [`String#replace`](https://mdn.io/String/replace).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to modify.
       * @param {RegExp|string} pattern The pattern to replace.
       * @param {Function|string} replacement The match replacement.
       * @returns {string} Returns the modified string.
       * @example
       *
       * _.replace('Hi Fred', 'Fred', 'Barney');
       * // => 'Hi Barney'
       */
      function replace() {
        var args = arguments,
            string = toString(args[0]);

        return args.length < 3 ? string : string.replace(args[1], args[2]);
      }

      /**
       * Converts `string` to
       * [snake case](https://en.wikipedia.org/wiki/Snake_case).
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the snake cased string.
       * @example
       *
       * _.snakeCase('Foo Bar');
       * // => 'foo_bar'
       *
       * _.snakeCase('fooBar');
       * // => 'foo_bar'
       *
       * _.snakeCase('--FOO-BAR--');
       * // => 'foo_bar'
       */
      var snakeCase = createCompounder(function(result, word, index) {
        return result + (index ? '_' : '') + word.toLowerCase();
      });

      /**
       * Splits `string` by `separator`.
       *
       * **Note:** This method is based on
       * [`String#split`](https://mdn.io/String/split).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to split.
       * @param {RegExp|string} separator The separator pattern to split by.
       * @param {number} [limit] The length to truncate results to.
       * @returns {Array} Returns the string segments.
       * @example
       *
       * _.split('a-b-c', '-', 2);
       * // => ['a', 'b']
       */
      function split(string, separator, limit) {
        if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
          separator = limit = undefined$1;
        }
        limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string = toString(string);
        if (string && (
              typeof separator == 'string' ||
              (separator != null && !isRegExp(separator))
            )) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string)) {
            return castSlice(stringToArray(string), 0, limit);
          }
        }
        return string.split(separator, limit);
      }

      /**
       * Converts `string` to
       * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
       *
       * @static
       * @memberOf _
       * @since 3.1.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the start cased string.
       * @example
       *
       * _.startCase('--foo-bar--');
       * // => 'Foo Bar'
       *
       * _.startCase('fooBar');
       * // => 'Foo Bar'
       *
       * _.startCase('__FOO_BAR__');
       * // => 'FOO BAR'
       */
      var startCase = createCompounder(function(result, word, index) {
        return result + (index ? ' ' : '') + upperFirst(word);
      });

      /**
       * Checks if `string` starts with the given target string.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to inspect.
       * @param {string} [target] The string to search for.
       * @param {number} [position=0] The position to search from.
       * @returns {boolean} Returns `true` if `string` starts with `target`,
       *  else `false`.
       * @example
       *
       * _.startsWith('abc', 'a');
       * // => true
       *
       * _.startsWith('abc', 'b');
       * // => false
       *
       * _.startsWith('abc', 'b', 1);
       * // => true
       */
      function startsWith(string, target, position) {
        string = toString(string);
        position = position == null
          ? 0
          : baseClamp(toInteger(position), 0, string.length);

        target = baseToString(target);
        return string.slice(position, position + target.length) == target;
      }

      /**
       * Creates a compiled template function that can interpolate data properties
       * in "interpolate" delimiters, HTML-escape interpolated data properties in
       * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
       * properties may be accessed as free variables in the template. If a setting
       * object is given, it takes precedence over `_.templateSettings` values.
       *
       * **Note:** In the development build `_.template` utilizes
       * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
       * for easier debugging.
       *
       * For more information on precompiling templates see
       * [lodash's custom builds documentation](https://lodash.com/custom-builds).
       *
       * For more information on Chrome extension sandboxes see
       * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category String
       * @param {string} [string=''] The template string.
       * @param {Object} [options={}] The options object.
       * @param {RegExp} [options.escape=_.templateSettings.escape]
       *  The HTML "escape" delimiter.
       * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
       *  The "evaluate" delimiter.
       * @param {Object} [options.imports=_.templateSettings.imports]
       *  An object to import into the template as free variables.
       * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
       *  The "interpolate" delimiter.
       * @param {string} [options.sourceURL='lodash.templateSources[n]']
       *  The sourceURL of the compiled template.
       * @param {string} [options.variable='obj']
       *  The data object variable name.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Function} Returns the compiled template function.
       * @example
       *
       * // Use the "interpolate" delimiter to create a compiled template.
       * var compiled = _.template('hello <%= user %>!');
       * compiled({ 'user': 'fred' });
       * // => 'hello fred!'
       *
       * // Use the HTML "escape" delimiter to escape data property values.
       * var compiled = _.template('<b><%- value %></b>');
       * compiled({ 'value': '<script>' });
       * // => '<b>&lt;script&gt;</b>'
       *
       * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
       * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
       * compiled({ 'users': ['fred', 'barney'] });
       * // => '<li>fred</li><li>barney</li>'
       *
       * // Use the internal `print` function in "evaluate" delimiters.
       * var compiled = _.template('<% print("hello " + user); %>!');
       * compiled({ 'user': 'barney' });
       * // => 'hello barney!'
       *
       * // Use the ES template literal delimiter as an "interpolate" delimiter.
       * // Disable support by replacing the "interpolate" delimiter.
       * var compiled = _.template('hello ${ user }!');
       * compiled({ 'user': 'pebbles' });
       * // => 'hello pebbles!'
       *
       * // Use backslashes to treat delimiters as plain text.
       * var compiled = _.template('<%= "\\<%- value %\\>" %>');
       * compiled({ 'value': 'ignored' });
       * // => '<%- value %>'
       *
       * // Use the `imports` option to import `jQuery` as `jq`.
       * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
       * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
       * compiled({ 'users': ['fred', 'barney'] });
       * // => '<li>fred</li><li>barney</li>'
       *
       * // Use the `sourceURL` option to specify a custom sourceURL for the template.
       * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
       * compiled(data);
       * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
       *
       * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
       * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
       * compiled.source;
       * // => function(data) {
       * //   var __t, __p = '';
       * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
       * //   return __p;
       * // }
       *
       * // Use custom template delimiters.
       * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
       * var compiled = _.template('hello {{ user }}!');
       * compiled({ 'user': 'mustache' });
       * // => 'hello mustache!'
       *
       * // Use the `source` property to inline compiled templates for meaningful
       * // line numbers in error messages and stack traces.
       * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
       *   var JST = {\
       *     "main": ' + _.template(mainText).source + '\
       *   };\
       * ');
       */
      function template(string, options, guard) {
        // Based on John Resig's `tmpl` implementation
        // (http://ejohn.org/blog/javascript-micro-templating/)
        // and Laura Doktorova's doT.js (https://github.com/olado/doT).
        var settings = lodash.templateSettings;

        if (guard && isIterateeCall(string, options, guard)) {
          options = undefined$1;
        }
        string = toString(string);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);

        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
            importsKeys = keys(imports),
            importsValues = baseValues(imports, importsKeys);

        var isEscaping,
            isEvaluating,
            index = 0,
            interpolate = options.interpolate || reNoMatch,
            source = "__p += '";

        // Compile the regexp to match each delimiter.
        var reDelimiters = RegExp(
          (options.escape || reNoMatch).source + '|' +
          interpolate.source + '|' +
          (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
          (options.evaluate || reNoMatch).source + '|$'
        , 'g');

        // Use a sourceURL for easier debugging.
        // The sourceURL gets injected into the source that's eval-ed, so be careful
        // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
        // and escape the comment, thus injecting code that gets evaled.
        var sourceURL = '//# sourceURL=' +
          (hasOwnProperty.call(options, 'sourceURL')
            ? (options.sourceURL + '').replace(/\s/g, ' ')
            : ('lodash.templateSources[' + (++templateCounter) + ']')
          ) + '\n';

        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);

          // Escape characters that can't be included in string literals.
          source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

          // Replace delimiters with snippets.
          if (escapeValue) {
            isEscaping = true;
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;

          // The JS engine embedded in Adobe products needs `match` returned in
          // order to produce the correct `offset` value.
          return match;
        });

        source += "';\n";

        // If `variable` is not specified wrap a with-statement around the generated
        // code to add the data object to the top of the scope chain.
        var variable = hasOwnProperty.call(options, 'variable') && options.variable;
        if (!variable) {
          source = 'with (obj) {\n' + source + '\n}\n';
        }
        // Cleanup code by stripping empty strings.
        source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
          .replace(reEmptyStringMiddle, '$1')
          .replace(reEmptyStringTrailing, '$1;');

        // Frame code as the function body.
        source = 'function(' + (variable || 'obj') + ') {\n' +
          (variable
            ? ''
            : 'obj || (obj = {});\n'
          ) +
          "var __t, __p = ''" +
          (isEscaping
             ? ', __e = _.escape'
             : ''
          ) +
          (isEvaluating
            ? ', __j = Array.prototype.join;\n' +
              "function print() { __p += __j.call(arguments, '') }\n"
            : ';\n'
          ) +
          source +
          'return __p\n}';

        var result = attempt(function() {
          return Function(importsKeys, sourceURL + 'return ' + source)
            .apply(undefined$1, importsValues);
        });

        // Provide the compiled function's source by its `toString` method or
        // the `source` property as a convenience for inlining compiled templates.
        result.source = source;
        if (isError(result)) {
          throw result;
        }
        return result;
      }

      /**
       * Converts `string`, as a whole, to lower case just like
       * [String#toLowerCase](https://mdn.io/toLowerCase).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the lower cased string.
       * @example
       *
       * _.toLower('--Foo-Bar--');
       * // => '--foo-bar--'
       *
       * _.toLower('fooBar');
       * // => 'foobar'
       *
       * _.toLower('__FOO_BAR__');
       * // => '__foo_bar__'
       */
      function toLower(value) {
        return toString(value).toLowerCase();
      }

      /**
       * Converts `string`, as a whole, to upper case just like
       * [String#toUpperCase](https://mdn.io/toUpperCase).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the upper cased string.
       * @example
       *
       * _.toUpper('--foo-bar--');
       * // => '--FOO-BAR--'
       *
       * _.toUpper('fooBar');
       * // => 'FOOBAR'
       *
       * _.toUpper('__foo_bar__');
       * // => '__FOO_BAR__'
       */
      function toUpper(value) {
        return toString(value).toUpperCase();
      }

      /**
       * Removes leading and trailing whitespace or specified characters from `string`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to trim.
       * @param {string} [chars=whitespace] The characters to trim.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the trimmed string.
       * @example
       *
       * _.trim('  abc  ');
       * // => 'abc'
       *
       * _.trim('-_-abc-_-', '_-');
       * // => 'abc'
       *
       * _.map(['  foo  ', '  bar  '], _.trim);
       * // => ['foo', 'bar']
       */
      function trim(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrim, '');
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string),
            chrSymbols = stringToArray(chars),
            start = charsStartIndex(strSymbols, chrSymbols),
            end = charsEndIndex(strSymbols, chrSymbols) + 1;

        return castSlice(strSymbols, start, end).join('');
      }

      /**
       * Removes trailing whitespace or specified characters from `string`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to trim.
       * @param {string} [chars=whitespace] The characters to trim.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the trimmed string.
       * @example
       *
       * _.trimEnd('  abc  ');
       * // => '  abc'
       *
       * _.trimEnd('-_-abc-_-', '_-');
       * // => '-_-abc'
       */
      function trimEnd(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrimEnd, '');
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string),
            end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

        return castSlice(strSymbols, 0, end).join('');
      }

      /**
       * Removes leading whitespace or specified characters from `string`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to trim.
       * @param {string} [chars=whitespace] The characters to trim.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {string} Returns the trimmed string.
       * @example
       *
       * _.trimStart('  abc  ');
       * // => 'abc  '
       *
       * _.trimStart('-_-abc-_-', '_-');
       * // => 'abc-_-'
       */
      function trimStart(string, chars, guard) {
        string = toString(string);
        if (string && (guard || chars === undefined$1)) {
          return string.replace(reTrimStart, '');
        }
        if (!string || !(chars = baseToString(chars))) {
          return string;
        }
        var strSymbols = stringToArray(string),
            start = charsStartIndex(strSymbols, stringToArray(chars));

        return castSlice(strSymbols, start).join('');
      }

      /**
       * Truncates `string` if it's longer than the given maximum string length.
       * The last characters of the truncated string are replaced with the omission
       * string which defaults to "...".
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to truncate.
       * @param {Object} [options={}] The options object.
       * @param {number} [options.length=30] The maximum string length.
       * @param {string} [options.omission='...'] The string to indicate text is omitted.
       * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
       * @returns {string} Returns the truncated string.
       * @example
       *
       * _.truncate('hi-diddly-ho there, neighborino');
       * // => 'hi-diddly-ho there, neighbo...'
       *
       * _.truncate('hi-diddly-ho there, neighborino', {
       *   'length': 24,
       *   'separator': ' '
       * });
       * // => 'hi-diddly-ho there,...'
       *
       * _.truncate('hi-diddly-ho there, neighborino', {
       *   'length': 24,
       *   'separator': /,? +/
       * });
       * // => 'hi-diddly-ho there...'
       *
       * _.truncate('hi-diddly-ho there, neighborino', {
       *   'omission': ' [...]'
       * });
       * // => 'hi-diddly-ho there, neig [...]'
       */
      function truncate(string, options) {
        var length = DEFAULT_TRUNC_LENGTH,
            omission = DEFAULT_TRUNC_OMISSION;

        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? toInteger(options.length) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        }
        string = toString(string);

        var strLength = string.length;
        if (hasUnicode(string)) {
          var strSymbols = stringToArray(string);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result = strSymbols
          ? castSlice(strSymbols, 0, end).join('')
          : string.slice(0, end);

        if (separator === undefined$1) {
          return result + omission;
        }
        if (strSymbols) {
          end += (result.length - end);
        }
        if (isRegExp(separator)) {
          if (string.slice(end).search(separator)) {
            var match,
                substring = result;

            if (!separator.global) {
              separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
            }
            separator.lastIndex = 0;
            while ((match = separator.exec(substring))) {
              var newEnd = match.index;
            }
            result = result.slice(0, newEnd === undefined$1 ? end : newEnd);
          }
        } else if (string.indexOf(baseToString(separator), end) != end) {
          var index = result.lastIndexOf(separator);
          if (index > -1) {
            result = result.slice(0, index);
          }
        }
        return result + omission;
      }

      /**
       * The inverse of `_.escape`; this method converts the HTML entities
       * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
       * their corresponding characters.
       *
       * **Note:** No other HTML entities are unescaped. To unescape additional
       * HTML entities use a third-party library like [_he_](https://mths.be/he).
       *
       * @static
       * @memberOf _
       * @since 0.6.0
       * @category String
       * @param {string} [string=''] The string to unescape.
       * @returns {string} Returns the unescaped string.
       * @example
       *
       * _.unescape('fred, barney, &amp; pebbles');
       * // => 'fred, barney, & pebbles'
       */
      function unescape(string) {
        string = toString(string);
        return (string && reHasEscapedHtml.test(string))
          ? string.replace(reEscapedHtml, unescapeHtmlChar)
          : string;
      }

      /**
       * Converts `string`, as space separated words, to upper case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the upper cased string.
       * @example
       *
       * _.upperCase('--foo-bar');
       * // => 'FOO BAR'
       *
       * _.upperCase('fooBar');
       * // => 'FOO BAR'
       *
       * _.upperCase('__foo_bar__');
       * // => 'FOO BAR'
       */
      var upperCase = createCompounder(function(result, word, index) {
        return result + (index ? ' ' : '') + word.toUpperCase();
      });

      /**
       * Converts the first character of `string` to upper case.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category String
       * @param {string} [string=''] The string to convert.
       * @returns {string} Returns the converted string.
       * @example
       *
       * _.upperFirst('fred');
       * // => 'Fred'
       *
       * _.upperFirst('FRED');
       * // => 'FRED'
       */
      var upperFirst = createCaseFirst('toUpperCase');

      /**
       * Splits `string` into an array of its words.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category String
       * @param {string} [string=''] The string to inspect.
       * @param {RegExp|string} [pattern] The pattern to match words.
       * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
       * @returns {Array} Returns the words of `string`.
       * @example
       *
       * _.words('fred, barney, & pebbles');
       * // => ['fred', 'barney', 'pebbles']
       *
       * _.words('fred, barney, & pebbles', /[^, ]+/g);
       * // => ['fred', 'barney', '&', 'pebbles']
       */
      function words(string, pattern, guard) {
        string = toString(string);
        pattern = guard ? undefined$1 : pattern;

        if (pattern === undefined$1) {
          return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
        }
        return string.match(pattern) || [];
      }

      /*------------------------------------------------------------------------*/

      /**
       * Attempts to invoke `func`, returning either the result or the caught error
       * object. Any additional arguments are provided to `func` when it's invoked.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {Function} func The function to attempt.
       * @param {...*} [args] The arguments to invoke `func` with.
       * @returns {*} Returns the `func` result or error object.
       * @example
       *
       * // Avoid throwing errors for invalid selectors.
       * var elements = _.attempt(function(selector) {
       *   return document.querySelectorAll(selector);
       * }, '>_>');
       *
       * if (_.isError(elements)) {
       *   elements = [];
       * }
       */
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$1, args);
        } catch (e) {
          return isError(e) ? e : new Error(e);
        }
      });

      /**
       * Binds methods of an object to the object itself, overwriting the existing
       * method.
       *
       * **Note:** This method doesn't set the "length" property of bound functions.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {Object} object The object to bind and assign the bound methods to.
       * @param {...(string|string[])} methodNames The object method names to bind.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var view = {
       *   'label': 'docs',
       *   'click': function() {
       *     console.log('clicked ' + this.label);
       *   }
       * };
       *
       * _.bindAll(view, ['click']);
       * jQuery(element).on('click', view.click);
       * // => Logs 'clicked docs' when clicked.
       */
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind(object[key], object));
        });
        return object;
      });

      /**
       * Creates a function that iterates over `pairs` and invokes the corresponding
       * function of the first predicate to return truthy. The predicate-function
       * pairs are invoked with the `this` binding and arguments of the created
       * function.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {Array} pairs The predicate-function pairs.
       * @returns {Function} Returns the new composite function.
       * @example
       *
       * var func = _.cond([
       *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
       *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
       *   [_.stubTrue,                      _.constant('no match')]
       * ]);
       *
       * func({ 'a': 1, 'b': 2 });
       * // => 'matches A'
       *
       * func({ 'a': 0, 'b': 1 });
       * // => 'matches B'
       *
       * func({ 'a': '1', 'b': '2' });
       * // => 'no match'
       */
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length,
            toIteratee = getIteratee();

        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });

        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }

      /**
       * Creates a function that invokes the predicate properties of `source` with
       * the corresponding property values of a given object, returning `true` if
       * all predicates return truthy, else `false`.
       *
       * **Note:** The created function is equivalent to `_.conformsTo` with
       * `source` partially applied.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {Object} source The object of property predicates to conform to.
       * @returns {Function} Returns the new spec function.
       * @example
       *
       * var objects = [
       *   { 'a': 2, 'b': 1 },
       *   { 'a': 1, 'b': 2 }
       * ];
       *
       * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
       * // => [{ 'a': 1, 'b': 2 }]
       */
      function conforms(source) {
        return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
      }

      /**
       * Creates a function that returns `value`.
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Util
       * @param {*} value The value to return from the new function.
       * @returns {Function} Returns the new constant function.
       * @example
       *
       * var objects = _.times(2, _.constant({ 'a': 1 }));
       *
       * console.log(objects);
       * // => [{ 'a': 1 }, { 'a': 1 }]
       *
       * console.log(objects[0] === objects[1]);
       * // => true
       */
      function constant(value) {
        return function() {
          return value;
        };
      }

      /**
       * Checks `value` to determine whether a default value should be returned in
       * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
       * or `undefined`.
       *
       * @static
       * @memberOf _
       * @since 4.14.0
       * @category Util
       * @param {*} value The value to check.
       * @param {*} defaultValue The default value.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * _.defaultTo(1, 10);
       * // => 1
       *
       * _.defaultTo(undefined, 10);
       * // => 10
       */
      function defaultTo(value, defaultValue) {
        return (value == null || value !== value) ? defaultValue : value;
      }

      /**
       * Creates a function that returns the result of invoking the given functions
       * with the `this` binding of the created function, where each successive
       * invocation is supplied the return value of the previous.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {...(Function|Function[])} [funcs] The functions to invoke.
       * @returns {Function} Returns the new composite function.
       * @see _.flowRight
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var addSquare = _.flow([_.add, square]);
       * addSquare(1, 2);
       * // => 9
       */
      var flow = createFlow();

      /**
       * This method is like `_.flow` except that it creates a function that
       * invokes the given functions from right to left.
       *
       * @static
       * @since 3.0.0
       * @memberOf _
       * @category Util
       * @param {...(Function|Function[])} [funcs] The functions to invoke.
       * @returns {Function} Returns the new composite function.
       * @see _.flow
       * @example
       *
       * function square(n) {
       *   return n * n;
       * }
       *
       * var addSquare = _.flowRight([square, _.add]);
       * addSquare(1, 2);
       * // => 9
       */
      var flowRight = createFlow(true);

      /**
       * This method returns the first argument it receives.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {*} value Any value.
       * @returns {*} Returns `value`.
       * @example
       *
       * var object = { 'a': 1 };
       *
       * console.log(_.identity(object) === object);
       * // => true
       */
      function identity(value) {
        return value;
      }

      /**
       * Creates a function that invokes `func` with the arguments of the created
       * function. If `func` is a property name, the created function returns the
       * property value for a given element. If `func` is an array or object, the
       * created function returns `true` for elements that contain the equivalent
       * source properties, otherwise it returns `false`.
       *
       * @static
       * @since 4.0.0
       * @memberOf _
       * @category Util
       * @param {*} [func=_.identity] The value to convert to a callback.
       * @returns {Function} Returns the callback.
       * @example
       *
       * var users = [
       *   { 'user': 'barney', 'age': 36, 'active': true },
       *   { 'user': 'fred',   'age': 40, 'active': false }
       * ];
       *
       * // The `_.matches` iteratee shorthand.
       * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
       * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
       *
       * // The `_.matchesProperty` iteratee shorthand.
       * _.filter(users, _.iteratee(['user', 'fred']));
       * // => [{ 'user': 'fred', 'age': 40 }]
       *
       * // The `_.property` iteratee shorthand.
       * _.map(users, _.iteratee('user'));
       * // => ['barney', 'fred']
       *
       * // Create custom iteratee shorthands.
       * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
       *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
       *     return func.test(string);
       *   };
       * });
       *
       * _.filter(['abc', 'def'], /ef/);
       * // => ['def']
       */
      function iteratee(func) {
        return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
      }

      /**
       * Creates a function that performs a partial deep comparison between a given
       * object and `source`, returning `true` if the given object has equivalent
       * property values, else `false`.
       *
       * **Note:** The created function is equivalent to `_.isMatch` with `source`
       * partially applied.
       *
       * Partial comparisons will match empty array and empty object `source`
       * values against any array or object value, respectively. See `_.isEqual`
       * for a list of supported value comparisons.
       *
       * **Note:** Multiple values can be checked by combining several matchers
       * using `_.overSome`
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {Object} source The object of property values to match.
       * @returns {Function} Returns the new spec function.
       * @example
       *
       * var objects = [
       *   { 'a': 1, 'b': 2, 'c': 3 },
       *   { 'a': 4, 'b': 5, 'c': 6 }
       * ];
       *
       * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
       * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
       *
       * // Checking for several possible values
       * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
       * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
       */
      function matches(source) {
        return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
      }

      /**
       * Creates a function that performs a partial deep comparison between the
       * value at `path` of a given object to `srcValue`, returning `true` if the
       * object value is equivalent, else `false`.
       *
       * **Note:** Partial comparisons will match empty array and empty object
       * `srcValue` values against any array or object value, respectively. See
       * `_.isEqual` for a list of supported value comparisons.
       *
       * **Note:** Multiple values can be checked by combining several matchers
       * using `_.overSome`
       *
       * @static
       * @memberOf _
       * @since 3.2.0
       * @category Util
       * @param {Array|string} path The path of the property to get.
       * @param {*} srcValue The value to match.
       * @returns {Function} Returns the new spec function.
       * @example
       *
       * var objects = [
       *   { 'a': 1, 'b': 2, 'c': 3 },
       *   { 'a': 4, 'b': 5, 'c': 6 }
       * ];
       *
       * _.find(objects, _.matchesProperty('a', 4));
       * // => { 'a': 4, 'b': 5, 'c': 6 }
       *
       * // Checking for several possible values
       * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
       * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
       */
      function matchesProperty(path, srcValue) {
        return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
      }

      /**
       * Creates a function that invokes the method at `path` of a given object.
       * Any additional arguments are provided to the invoked method.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Util
       * @param {Array|string} path The path of the method to invoke.
       * @param {...*} [args] The arguments to invoke the method with.
       * @returns {Function} Returns the new invoker function.
       * @example
       *
       * var objects = [
       *   { 'a': { 'b': _.constant(2) } },
       *   { 'a': { 'b': _.constant(1) } }
       * ];
       *
       * _.map(objects, _.method('a.b'));
       * // => [2, 1]
       *
       * _.map(objects, _.method(['a', 'b']));
       * // => [2, 1]
       */
      var method = baseRest(function(path, args) {
        return function(object) {
          return baseInvoke(object, path, args);
        };
      });

      /**
       * The opposite of `_.method`; this method creates a function that invokes
       * the method at a given path of `object`. Any additional arguments are
       * provided to the invoked method.
       *
       * @static
       * @memberOf _
       * @since 3.7.0
       * @category Util
       * @param {Object} object The object to query.
       * @param {...*} [args] The arguments to invoke the method with.
       * @returns {Function} Returns the new invoker function.
       * @example
       *
       * var array = _.times(3, _.constant),
       *     object = { 'a': array, 'b': array, 'c': array };
       *
       * _.map(['a[2]', 'c[0]'], _.methodOf(object));
       * // => [2, 0]
       *
       * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
       * // => [2, 0]
       */
      var methodOf = baseRest(function(object, args) {
        return function(path) {
          return baseInvoke(object, path, args);
        };
      });

      /**
       * Adds all own enumerable string keyed function properties of a source
       * object to the destination object. If `object` is a function, then methods
       * are added to its prototype as well.
       *
       * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
       * avoid conflicts caused by modifying the original.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {Function|Object} [object=lodash] The destination object.
       * @param {Object} source The object of functions to add.
       * @param {Object} [options={}] The options object.
       * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
       * @returns {Function|Object} Returns `object`.
       * @example
       *
       * function vowels(string) {
       *   return _.filter(string, function(v) {
       *     return /[aeiou]/i.test(v);
       *   });
       * }
       *
       * _.mixin({ 'vowels': vowels });
       * _.vowels('fred');
       * // => ['e']
       *
       * _('fred').vowels().value();
       * // => ['e']
       *
       * _.mixin({ 'vowels': vowels }, { 'chain': false });
       * _('fred').vowels();
       * // => ['e']
       */
      function mixin(object, source, options) {
        var props = keys(source),
            methodNames = baseFunctions(source, props);

        if (options == null &&
            !(isObject(source) && (methodNames.length || !props.length))) {
          options = source;
          source = object;
          object = this;
          methodNames = baseFunctions(source, keys(source));
        }
        var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
            isFunc = isFunction(object);

        arrayEach(methodNames, function(methodName) {
          var func = source[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = copyArray(this.__actions__);

                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                result.__chain__ = chainAll;
                return result;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });

        return object;
      }

      /**
       * Reverts the `_` variable to its previous value and returns a reference to
       * the `lodash` function.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @returns {Function} Returns the `lodash` function.
       * @example
       *
       * var lodash = _.noConflict();
       */
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }

      /**
       * This method returns `undefined`.
       *
       * @static
       * @memberOf _
       * @since 2.3.0
       * @category Util
       * @example
       *
       * _.times(2, _.noop);
       * // => [undefined, undefined]
       */
      function noop() {
        // No operation performed.
      }

      /**
       * Creates a function that gets the argument at index `n`. If `n` is negative,
       * the nth argument from the end is returned.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {number} [n=0] The index of the argument to return.
       * @returns {Function} Returns the new pass-thru function.
       * @example
       *
       * var func = _.nthArg(1);
       * func('a', 'b', 'c', 'd');
       * // => 'b'
       *
       * var func = _.nthArg(-2);
       * func('a', 'b', 'c', 'd');
       * // => 'c'
       */
      function nthArg(n) {
        n = toInteger(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }

      /**
       * Creates a function that invokes `iteratees` with the arguments it receives
       * and returns their results.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {...(Function|Function[])} [iteratees=[_.identity]]
       *  The iteratees to invoke.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var func = _.over([Math.max, Math.min]);
       *
       * func(1, 2, 3, 4);
       * // => [4, 1]
       */
      var over = createOver(arrayMap);

      /**
       * Creates a function that checks if **all** of the `predicates` return
       * truthy when invoked with the arguments it receives.
       *
       * Following shorthands are possible for providing predicates.
       * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
       * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {...(Function|Function[])} [predicates=[_.identity]]
       *  The predicates to check.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var func = _.overEvery([Boolean, isFinite]);
       *
       * func('1');
       * // => true
       *
       * func(null);
       * // => false
       *
       * func(NaN);
       * // => false
       */
      var overEvery = createOver(arrayEvery);

      /**
       * Creates a function that checks if **any** of the `predicates` return
       * truthy when invoked with the arguments it receives.
       *
       * Following shorthands are possible for providing predicates.
       * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
       * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {...(Function|Function[])} [predicates=[_.identity]]
       *  The predicates to check.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var func = _.overSome([Boolean, isFinite]);
       *
       * func('1');
       * // => true
       *
       * func(null);
       * // => true
       *
       * func(NaN);
       * // => false
       *
       * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
       * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
       */
      var overSome = createOver(arraySome);

      /**
       * Creates a function that returns the value at `path` of a given object.
       *
       * @static
       * @memberOf _
       * @since 2.4.0
       * @category Util
       * @param {Array|string} path The path of the property to get.
       * @returns {Function} Returns the new accessor function.
       * @example
       *
       * var objects = [
       *   { 'a': { 'b': 2 } },
       *   { 'a': { 'b': 1 } }
       * ];
       *
       * _.map(objects, _.property('a.b'));
       * // => [2, 1]
       *
       * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
       * // => [1, 2]
       */
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }

      /**
       * The opposite of `_.property`; this method creates a function that returns
       * the value at a given path of `object`.
       *
       * @static
       * @memberOf _
       * @since 3.0.0
       * @category Util
       * @param {Object} object The object to query.
       * @returns {Function} Returns the new accessor function.
       * @example
       *
       * var array = [0, 1, 2],
       *     object = { 'a': array, 'b': array, 'c': array };
       *
       * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
       * // => [2, 0]
       *
       * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
       * // => [2, 0]
       */
      function propertyOf(object) {
        return function(path) {
          return object == null ? undefined$1 : baseGet(object, path);
        };
      }

      /**
       * Creates an array of numbers (positive and/or negative) progressing from
       * `start` up to, but not including, `end`. A step of `-1` is used if a negative
       * `start` is specified without an `end` or `step`. If `end` is not specified,
       * it's set to `start` with `start` then set to `0`.
       *
       * **Note:** JavaScript follows the IEEE-754 standard for resolving
       * floating-point values which can produce unexpected results.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @param {number} [step=1] The value to increment or decrement by.
       * @returns {Array} Returns the range of numbers.
       * @see _.inRange, _.rangeRight
       * @example
       *
       * _.range(4);
       * // => [0, 1, 2, 3]
       *
       * _.range(-4);
       * // => [0, -1, -2, -3]
       *
       * _.range(1, 5);
       * // => [1, 2, 3, 4]
       *
       * _.range(0, 20, 5);
       * // => [0, 5, 10, 15]
       *
       * _.range(0, -4, -1);
       * // => [0, -1, -2, -3]
       *
       * _.range(1, 4, 0);
       * // => [1, 1, 1]
       *
       * _.range(0);
       * // => []
       */
      var range = createRange();

      /**
       * This method is like `_.range` except that it populates values in
       * descending order.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @param {number} [step=1] The value to increment or decrement by.
       * @returns {Array} Returns the range of numbers.
       * @see _.inRange, _.range
       * @example
       *
       * _.rangeRight(4);
       * // => [3, 2, 1, 0]
       *
       * _.rangeRight(-4);
       * // => [-3, -2, -1, 0]
       *
       * _.rangeRight(1, 5);
       * // => [4, 3, 2, 1]
       *
       * _.rangeRight(0, 20, 5);
       * // => [15, 10, 5, 0]
       *
       * _.rangeRight(0, -4, -1);
       * // => [-3, -2, -1, 0]
       *
       * _.rangeRight(1, 4, 0);
       * // => [1, 1, 1]
       *
       * _.rangeRight(0);
       * // => []
       */
      var rangeRight = createRange(true);

      /**
       * This method returns a new empty array.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {Array} Returns the new empty array.
       * @example
       *
       * var arrays = _.times(2, _.stubArray);
       *
       * console.log(arrays);
       * // => [[], []]
       *
       * console.log(arrays[0] === arrays[1]);
       * // => false
       */
      function stubArray() {
        return [];
      }

      /**
       * This method returns `false`.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {boolean} Returns `false`.
       * @example
       *
       * _.times(2, _.stubFalse);
       * // => [false, false]
       */
      function stubFalse() {
        return false;
      }

      /**
       * This method returns a new empty object.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {Object} Returns the new empty object.
       * @example
       *
       * var objects = _.times(2, _.stubObject);
       *
       * console.log(objects);
       * // => [{}, {}]
       *
       * console.log(objects[0] === objects[1]);
       * // => false
       */
      function stubObject() {
        return {};
      }

      /**
       * This method returns an empty string.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {string} Returns the empty string.
       * @example
       *
       * _.times(2, _.stubString);
       * // => ['', '']
       */
      function stubString() {
        return '';
      }

      /**
       * This method returns `true`.
       *
       * @static
       * @memberOf _
       * @since 4.13.0
       * @category Util
       * @returns {boolean} Returns `true`.
       * @example
       *
       * _.times(2, _.stubTrue);
       * // => [true, true]
       */
      function stubTrue() {
        return true;
      }

      /**
       * Invokes the iteratee `n` times, returning an array of the results of
       * each invocation. The iteratee is invoked with one argument; (index).
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {number} n The number of times to invoke `iteratee`.
       * @param {Function} [iteratee=_.identity] The function invoked per iteration.
       * @returns {Array} Returns the array of results.
       * @example
       *
       * _.times(3, String);
       * // => ['0', '1', '2']
       *
       *  _.times(4, _.constant(0));
       * // => [0, 0, 0, 0]
       */
      function times(n, iteratee) {
        n = toInteger(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH,
            length = nativeMin(n, MAX_ARRAY_LENGTH);

        iteratee = getIteratee(iteratee);
        n -= MAX_ARRAY_LENGTH;

        var result = baseTimes(length, iteratee);
        while (++index < n) {
          iteratee(index);
        }
        return result;
      }

      /**
       * Converts `value` to a property path array.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Util
       * @param {*} value The value to convert.
       * @returns {Array} Returns the new property path array.
       * @example
       *
       * _.toPath('a.b.c');
       * // => ['a', 'b', 'c']
       *
       * _.toPath('a[0].b.c');
       * // => ['a', '0', 'b', 'c']
       */
      function toPath(value) {
        if (isArray(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
      }

      /**
       * Generates a unique ID. If `prefix` is given, the ID is appended to it.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Util
       * @param {string} [prefix=''] The value to prefix the ID with.
       * @returns {string} Returns the unique ID.
       * @example
       *
       * _.uniqueId('contact_');
       * // => 'contact_104'
       *
       * _.uniqueId();
       * // => '105'
       */
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString(prefix) + id;
      }

      /*------------------------------------------------------------------------*/

      /**
       * Adds two numbers.
       *
       * @static
       * @memberOf _
       * @since 3.4.0
       * @category Math
       * @param {number} augend The first number in an addition.
       * @param {number} addend The second number in an addition.
       * @returns {number} Returns the total.
       * @example
       *
       * _.add(6, 4);
       * // => 10
       */
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);

      /**
       * Computes `number` rounded up to `precision`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Math
       * @param {number} number The number to round up.
       * @param {number} [precision=0] The precision to round up to.
       * @returns {number} Returns the rounded up number.
       * @example
       *
       * _.ceil(4.006);
       * // => 5
       *
       * _.ceil(6.004, 2);
       * // => 6.01
       *
       * _.ceil(6040, -2);
       * // => 6100
       */
      var ceil = createRound('ceil');

      /**
       * Divide two numbers.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Math
       * @param {number} dividend The first number in a division.
       * @param {number} divisor The second number in a division.
       * @returns {number} Returns the quotient.
       * @example
       *
       * _.divide(6, 4);
       * // => 1.5
       */
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);

      /**
       * Computes `number` rounded down to `precision`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Math
       * @param {number} number The number to round down.
       * @param {number} [precision=0] The precision to round down to.
       * @returns {number} Returns the rounded down number.
       * @example
       *
       * _.floor(4.006);
       * // => 4
       *
       * _.floor(0.046, 2);
       * // => 0.04
       *
       * _.floor(4060, -2);
       * // => 4000
       */
      var floor = createRound('floor');

      /**
       * Computes the maximum value of `array`. If `array` is empty or falsey,
       * `undefined` is returned.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {*} Returns the maximum value.
       * @example
       *
       * _.max([4, 2, 8, 6]);
       * // => 8
       *
       * _.max([]);
       * // => undefined
       */
      function max(array) {
        return (array && array.length)
          ? baseExtremum(array, identity, baseGt)
          : undefined$1;
      }

      /**
       * This method is like `_.max` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the criterion by which
       * the value is ranked. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {*} Returns the maximum value.
       * @example
       *
       * var objects = [{ 'n': 1 }, { 'n': 2 }];
       *
       * _.maxBy(objects, function(o) { return o.n; });
       * // => { 'n': 2 }
       *
       * // The `_.property` iteratee shorthand.
       * _.maxBy(objects, 'n');
       * // => { 'n': 2 }
       */
      function maxBy(array, iteratee) {
        return (array && array.length)
          ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
          : undefined$1;
      }

      /**
       * Computes the mean of the values in `array`.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {number} Returns the mean.
       * @example
       *
       * _.mean([4, 2, 8, 6]);
       * // => 5
       */
      function mean(array) {
        return baseMean(array, identity);
      }

      /**
       * This method is like `_.mean` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the value to be averaged.
       * The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the mean.
       * @example
       *
       * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
       *
       * _.meanBy(objects, function(o) { return o.n; });
       * // => 5
       *
       * // The `_.property` iteratee shorthand.
       * _.meanBy(objects, 'n');
       * // => 5
       */
      function meanBy(array, iteratee) {
        return baseMean(array, getIteratee(iteratee, 2));
      }

      /**
       * Computes the minimum value of `array`. If `array` is empty or falsey,
       * `undefined` is returned.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {*} Returns the minimum value.
       * @example
       *
       * _.min([4, 2, 8, 6]);
       * // => 2
       *
       * _.min([]);
       * // => undefined
       */
      function min(array) {
        return (array && array.length)
          ? baseExtremum(array, identity, baseLt)
          : undefined$1;
      }

      /**
       * This method is like `_.min` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the criterion by which
       * the value is ranked. The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {*} Returns the minimum value.
       * @example
       *
       * var objects = [{ 'n': 1 }, { 'n': 2 }];
       *
       * _.minBy(objects, function(o) { return o.n; });
       * // => { 'n': 1 }
       *
       * // The `_.property` iteratee shorthand.
       * _.minBy(objects, 'n');
       * // => { 'n': 1 }
       */
      function minBy(array, iteratee) {
        return (array && array.length)
          ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
          : undefined$1;
      }

      /**
       * Multiply two numbers.
       *
       * @static
       * @memberOf _
       * @since 4.7.0
       * @category Math
       * @param {number} multiplier The first number in a multiplication.
       * @param {number} multiplicand The second number in a multiplication.
       * @returns {number} Returns the product.
       * @example
       *
       * _.multiply(6, 4);
       * // => 24
       */
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);

      /**
       * Computes `number` rounded to `precision`.
       *
       * @static
       * @memberOf _
       * @since 3.10.0
       * @category Math
       * @param {number} number The number to round.
       * @param {number} [precision=0] The precision to round to.
       * @returns {number} Returns the rounded number.
       * @example
       *
       * _.round(4.006);
       * // => 4
       *
       * _.round(4.006, 2);
       * // => 4.01
       *
       * _.round(4060, -2);
       * // => 4100
       */
      var round = createRound('round');

      /**
       * Subtract two numbers.
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {number} minuend The first number in a subtraction.
       * @param {number} subtrahend The second number in a subtraction.
       * @returns {number} Returns the difference.
       * @example
       *
       * _.subtract(6, 4);
       * // => 2
       */
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);

      /**
       * Computes the sum of the values in `array`.
       *
       * @static
       * @memberOf _
       * @since 3.4.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @returns {number} Returns the sum.
       * @example
       *
       * _.sum([4, 2, 8, 6]);
       * // => 20
       */
      function sum(array) {
        return (array && array.length)
          ? baseSum(array, identity)
          : 0;
      }

      /**
       * This method is like `_.sum` except that it accepts `iteratee` which is
       * invoked for each element in `array` to generate the value to be summed.
       * The iteratee is invoked with one argument: (value).
       *
       * @static
       * @memberOf _
       * @since 4.0.0
       * @category Math
       * @param {Array} array The array to iterate over.
       * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
       * @returns {number} Returns the sum.
       * @example
       *
       * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
       *
       * _.sumBy(objects, function(o) { return o.n; });
       * // => 20
       *
       * // The `_.property` iteratee shorthand.
       * _.sumBy(objects, 'n');
       * // => 20
       */
      function sumBy(array, iteratee) {
        return (array && array.length)
          ? baseSum(array, getIteratee(iteratee, 2))
          : 0;
      }

      /*------------------------------------------------------------------------*/

      // Add methods that return wrapped values in chain sequences.
      lodash.after = after;
      lodash.ary = ary;
      lodash.assign = assign;
      lodash.assignIn = assignIn;
      lodash.assignInWith = assignInWith;
      lodash.assignWith = assignWith;
      lodash.at = at;
      lodash.before = before;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.castArray = castArray;
      lodash.chain = chain;
      lodash.chunk = chunk;
      lodash.compact = compact;
      lodash.concat = concat;
      lodash.cond = cond;
      lodash.conforms = conforms;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.curry = curry;
      lodash.curryRight = curryRight;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defaultsDeep = defaultsDeep;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.differenceBy = differenceBy;
      lodash.differenceWith = differenceWith;
      lodash.drop = drop;
      lodash.dropRight = dropRight;
      lodash.dropRightWhile = dropRightWhile;
      lodash.dropWhile = dropWhile;
      lodash.fill = fill;
      lodash.filter = filter;
      lodash.flatMap = flatMap;
      lodash.flatMapDeep = flatMapDeep;
      lodash.flatMapDepth = flatMapDepth;
      lodash.flatten = flatten;
      lodash.flattenDeep = flattenDeep;
      lodash.flattenDepth = flattenDepth;
      lodash.flip = flip;
      lodash.flow = flow;
      lodash.flowRight = flowRight;
      lodash.fromPairs = fromPairs;
      lodash.functions = functions;
      lodash.functionsIn = functionsIn;
      lodash.groupBy = groupBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.intersectionBy = intersectionBy;
      lodash.intersectionWith = intersectionWith;
      lodash.invert = invert;
      lodash.invertBy = invertBy;
      lodash.invokeMap = invokeMap;
      lodash.iteratee = iteratee;
      lodash.keyBy = keyBy;
      lodash.keys = keys;
      lodash.keysIn = keysIn;
      lodash.map = map;
      lodash.mapKeys = mapKeys;
      lodash.mapValues = mapValues;
      lodash.matches = matches;
      lodash.matchesProperty = matchesProperty;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.mergeWith = mergeWith;
      lodash.method = method;
      lodash.methodOf = methodOf;
      lodash.mixin = mixin;
      lodash.negate = negate;
      lodash.nthArg = nthArg;
      lodash.omit = omit;
      lodash.omitBy = omitBy;
      lodash.once = once;
      lodash.orderBy = orderBy;
      lodash.over = over;
      lodash.overArgs = overArgs;
      lodash.overEvery = overEvery;
      lodash.overSome = overSome;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.partition = partition;
      lodash.pick = pick;
      lodash.pickBy = pickBy;
      lodash.property = property;
      lodash.propertyOf = propertyOf;
      lodash.pull = pull;
      lodash.pullAll = pullAll;
      lodash.pullAllBy = pullAllBy;
      lodash.pullAllWith = pullAllWith;
      lodash.pullAt = pullAt;
      lodash.range = range;
      lodash.rangeRight = rangeRight;
      lodash.rearg = rearg;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.reverse = reverse;
      lodash.sampleSize = sampleSize;
      lodash.set = set;
      lodash.setWith = setWith;
      lodash.shuffle = shuffle;
      lodash.slice = slice;
      lodash.sortBy = sortBy;
      lodash.sortedUniq = sortedUniq;
      lodash.sortedUniqBy = sortedUniqBy;
      lodash.split = split;
      lodash.spread = spread;
      lodash.tail = tail;
      lodash.take = take;
      lodash.takeRight = takeRight;
      lodash.takeRightWhile = takeRightWhile;
      lodash.takeWhile = takeWhile;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.thru = thru;
      lodash.toArray = toArray;
      lodash.toPairs = toPairs;
      lodash.toPairsIn = toPairsIn;
      lodash.toPath = toPath;
      lodash.toPlainObject = toPlainObject;
      lodash.transform = transform;
      lodash.unary = unary;
      lodash.union = union;
      lodash.unionBy = unionBy;
      lodash.unionWith = unionWith;
      lodash.uniq = uniq;
      lodash.uniqBy = uniqBy;
      lodash.uniqWith = uniqWith;
      lodash.unset = unset;
      lodash.unzip = unzip;
      lodash.unzipWith = unzipWith;
      lodash.update = update;
      lodash.updateWith = updateWith;
      lodash.values = values;
      lodash.valuesIn = valuesIn;
      lodash.without = without;
      lodash.words = words;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.xorBy = xorBy;
      lodash.xorWith = xorWith;
      lodash.zip = zip;
      lodash.zipObject = zipObject;
      lodash.zipObjectDeep = zipObjectDeep;
      lodash.zipWith = zipWith;

      // Add aliases.
      lodash.entries = toPairs;
      lodash.entriesIn = toPairsIn;
      lodash.extend = assignIn;
      lodash.extendWith = assignInWith;

      // Add methods to `lodash.prototype`.
      mixin(lodash, lodash);

      /*------------------------------------------------------------------------*/

      // Add methods that return unwrapped values in chain sequences.
      lodash.add = add;
      lodash.attempt = attempt;
      lodash.camelCase = camelCase;
      lodash.capitalize = capitalize;
      lodash.ceil = ceil;
      lodash.clamp = clamp;
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.cloneDeepWith = cloneDeepWith;
      lodash.cloneWith = cloneWith;
      lodash.conformsTo = conformsTo;
      lodash.deburr = deburr;
      lodash.defaultTo = defaultTo;
      lodash.divide = divide;
      lodash.endsWith = endsWith;
      lodash.eq = eq;
      lodash.escape = escape;
      lodash.escapeRegExp = escapeRegExp;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.floor = floor;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.get = get;
      lodash.gt = gt;
      lodash.gte = gte;
      lodash.has = has;
      lodash.hasIn = hasIn;
      lodash.head = head;
      lodash.identity = identity;
      lodash.includes = includes;
      lodash.indexOf = indexOf;
      lodash.inRange = inRange;
      lodash.invoke = invoke;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isArrayBuffer = isArrayBuffer;
      lodash.isArrayLike = isArrayLike;
      lodash.isArrayLikeObject = isArrayLikeObject;
      lodash.isBoolean = isBoolean;
      lodash.isBuffer = isBuffer;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isEqualWith = isEqualWith;
      lodash.isError = isError;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isInteger = isInteger;
      lodash.isLength = isLength;
      lodash.isMap = isMap;
      lodash.isMatch = isMatch;
      lodash.isMatchWith = isMatchWith;
      lodash.isNaN = isNaN;
      lodash.isNative = isNative;
      lodash.isNil = isNil;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isObjectLike = isObjectLike;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isSafeInteger = isSafeInteger;
      lodash.isSet = isSet;
      lodash.isString = isString;
      lodash.isSymbol = isSymbol;
      lodash.isTypedArray = isTypedArray;
      lodash.isUndefined = isUndefined;
      lodash.isWeakMap = isWeakMap;
      lodash.isWeakSet = isWeakSet;
      lodash.join = join;
      lodash.kebabCase = kebabCase;
      lodash.last = last;
      lodash.lastIndexOf = lastIndexOf;
      lodash.lowerCase = lowerCase;
      lodash.lowerFirst = lowerFirst;
      lodash.lt = lt;
      lodash.lte = lte;
      lodash.max = max;
      lodash.maxBy = maxBy;
      lodash.mean = mean;
      lodash.meanBy = meanBy;
      lodash.min = min;
      lodash.minBy = minBy;
      lodash.stubArray = stubArray;
      lodash.stubFalse = stubFalse;
      lodash.stubObject = stubObject;
      lodash.stubString = stubString;
      lodash.stubTrue = stubTrue;
      lodash.multiply = multiply;
      lodash.nth = nth;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.pad = pad;
      lodash.padEnd = padEnd;
      lodash.padStart = padStart;
      lodash.parseInt = parseInt;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.repeat = repeat;
      lodash.replace = replace;
      lodash.result = result;
      lodash.round = round;
      lodash.runInContext = runInContext;
      lodash.sample = sample;
      lodash.size = size;
      lodash.snakeCase = snakeCase;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.sortedIndexBy = sortedIndexBy;
      lodash.sortedIndexOf = sortedIndexOf;
      lodash.sortedLastIndex = sortedLastIndex;
      lodash.sortedLastIndexBy = sortedLastIndexBy;
      lodash.sortedLastIndexOf = sortedLastIndexOf;
      lodash.startCase = startCase;
      lodash.startsWith = startsWith;
      lodash.subtract = subtract;
      lodash.sum = sum;
      lodash.sumBy = sumBy;
      lodash.template = template;
      lodash.times = times;
      lodash.toFinite = toFinite;
      lodash.toInteger = toInteger;
      lodash.toLength = toLength;
      lodash.toLower = toLower;
      lodash.toNumber = toNumber;
      lodash.toSafeInteger = toSafeInteger;
      lodash.toString = toString;
      lodash.toUpper = toUpper;
      lodash.trim = trim;
      lodash.trimEnd = trimEnd;
      lodash.trimStart = trimStart;
      lodash.truncate = truncate;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;
      lodash.upperCase = upperCase;
      lodash.upperFirst = upperFirst;

      // Add aliases.
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.first = head;

      mixin(lodash, (function() {
        var source = {};
        baseForOwn(lodash, function(func, methodName) {
          if (!hasOwnProperty.call(lodash.prototype, methodName)) {
            source[methodName] = func;
          }
        });
        return source;
      }()), { 'chain': false });

      /*------------------------------------------------------------------------*/

      /**
       * The semantic version number.
       *
       * @static
       * @memberOf _
       * @type {string}
       */
      lodash.VERSION = VERSION;

      // Assign default placeholders.
      arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
        lodash[methodName].placeholder = lodash;
      });

      // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
      arrayEach(['drop', 'take'], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);

          var result = (this.__filtered__ && !index)
            ? new LazyWrapper(this)
            : this.clone();

          if (result.__filtered__) {
            result.__takeCount__ = nativeMin(n, result.__takeCount__);
          } else {
            result.__views__.push({
              'size': nativeMin(n, MAX_ARRAY_LENGTH),
              'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
            });
          }
          return result;
        };

        LazyWrapper.prototype[methodName + 'Right'] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });

      // Add `LazyWrapper` methods that accept an `iteratee` value.
      arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
        var type = index + 1,
            isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

        LazyWrapper.prototype[methodName] = function(iteratee) {
          var result = this.clone();
          result.__iteratees__.push({
            'iteratee': getIteratee(iteratee, 3),
            'type': type
          });
          result.__filtered__ = result.__filtered__ || isFilter;
          return result;
        };
      });

      // Add `LazyWrapper` methods for `_.head` and `_.last`.
      arrayEach(['head', 'last'], function(methodName, index) {
        var takeName = 'take' + (index ? 'Right' : '');

        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });

      // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
      arrayEach(['initial', 'tail'], function(methodName, index) {
        var dropName = 'drop' + (index ? '' : 'Right');

        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });

      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };

      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };

      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };

      LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
        if (typeof path == 'function') {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path, args);
        });
      });

      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };

      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger(start);

        var result = this;
        if (result.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result);
        }
        if (start < 0) {
          result = result.takeRight(-start);
        } else if (start) {
          result = result.drop(start);
        }
        if (end !== undefined$1) {
          end = toInteger(end);
          result = end < 0 ? result.dropRight(-end) : result.take(end - start);
        }
        return result;
      };

      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };

      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };

      // Add `LazyWrapper` methods to `lodash.prototype`.
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
            isTaker = /^(?:head|last)$/.test(methodName),
            lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
            retUnwrapped = isTaker || /^find/.test(methodName);

        if (!lodashFunc) {
          return;
        }
        lodash.prototype[methodName] = function() {
          var value = this.__wrapped__,
              args = isTaker ? [1] : arguments,
              isLazy = value instanceof LazyWrapper,
              iteratee = args[0],
              useLazy = isLazy || isArray(value);

          var interceptor = function(value) {
            var result = lodashFunc.apply(lodash, arrayPush([value], args));
            return (isTaker && chainAll) ? result[0] : result;
          };

          if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
            // Avoid lazy use if the iteratee has a "length" value other than `1`.
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__,
              isHybrid = !!this.__actions__.length,
              isUnwrapped = retUnwrapped && !chainAll,
              onlyLazy = isLazy && !isHybrid;

          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result = func.apply(value, args);
            result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined$1 });
            return new LodashWrapper(result, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result = this.thru(interceptor);
          return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
        };
      });

      // Add `Array` methods to `lodash.prototype`.
      arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
        var func = arrayProto[methodName],
            chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
            retUnwrapped = /^(?:pop|shift)$/.test(methodName);

        lodash.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
          }
          return this[chainName](function(value) {
            return func.apply(isArray(value) ? value : [], args);
          });
        };
      });

      // Map minified method names to their real names.
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + '';
          if (!hasOwnProperty.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ 'name': methodName, 'func': lodashFunc });
        }
      });

      realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
        'name': 'wrapper',
        'func': undefined$1
      }];

      // Add methods to `LazyWrapper`.
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;

      // Add chain sequence methods to the `lodash` wrapper.
      lodash.prototype.at = wrapperAt;
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.commit = wrapperCommit;
      lodash.prototype.next = wrapperNext;
      lodash.prototype.plant = wrapperPlant;
      lodash.prototype.reverse = wrapperReverse;
      lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

      // Add lazy aliases.
      lodash.prototype.first = lodash.prototype.head;

      if (symIterator) {
        lodash.prototype[symIterator] = wrapperToIterator;
      }
      return lodash;
    });

    /*--------------------------------------------------------------------------*/

    // Export lodash.
    var _ = runInContext();

    // Some AMD build optimizers, like r.js, check for condition patterns like:
    if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = _)._ = _;
      // Export for CommonJS support.
      freeExports._ = _;
    }
    else {
      // Export to the global object.
      root._ = _;
    }
  }.call(commonjsGlobal));
  });

  /**
   * @see https://github.com/jeeliz/jeelizWeboji
   */
  class WebojiModel extends BaseModel {
    constructor(...args) {
      super(...args);

      this.data = {
        // weboji [yaw, pitch, roll]
        rotation: [],
        // weboji [x, y, scale]
        translation: [],
        // [0...10] Morphs between 0 - 1
        morphs: []
      };

      this.calibrator = new Calibrator(this.config, this.handsfree);
      this.calibrate = () => {
        this.calibrator.start.call(this.calibrator);
      };
    }

    /**
     * Adds data
     */
    getData() {
      this.data.rotation = this.api.get_rotationStabilized();
      this.data.translation = this.api.get_positionScale();
      this.data.morphs = this.api.get_morphTargetInfluencesStabilized();
      this.data.state = this.getStates();

      return this.data
    }

    getStates() {
      /**
       * Handles extra calculations for weboji morphs
       */
      const morphs = this.data.morphs;
      const state = this.data.state || {};

      // Smiles
      state.smileRight =
        morphs[0] > this.handsfree.config.weboji.morphs.threshold.smileRight;
      state.smileLeft =
        morphs[1] > this.handsfree.config.weboji.morphs.threshold.smileLeft;
      state.smile = state.smileRight && state.smileLeft;
      state.smirk =
        (state.smileRight && !state.smileLeft) ||
        (!state.smileRight && state.smileLeft);
      state.pursed =
        morphs[7] > this.handsfree.config.weboji.morphs.threshold.mouthRound;

      // Eyebrows
      state.browLeftUp =
        morphs[4] > this.handsfree.config.weboji.morphs.threshold.browLeftUp;
      state.browRightUp =
        morphs[5] > this.handsfree.config.weboji.morphs.threshold.browRightUp;
      state.browsUp =
        morphs[4] > this.handsfree.config.weboji.morphs.threshold.browLeftUp &&
        morphs[5] > this.handsfree.config.weboji.morphs.threshold.browLeftUp;

      state.browLeftDown =
        morphs[2] > this.handsfree.config.weboji.morphs.threshold.browLeftDown;
      state.browRightDown =
        morphs[3] > this.handsfree.config.weboji.morphs.threshold.browRightDown;
      state.browsDown =
        morphs[2] > this.handsfree.config.weboji.morphs.threshold.browLeftDown &&
        morphs[3] > this.handsfree.config.weboji.morphs.threshold.browLeftDown;

      state.browsUpDown =
        (state.browLeftDown && state.browRightUp) ||
        (state.browRightDown && state.browLeftUp);

      // Eyes
      state.eyeLeftClosed =
        morphs[8] > this.handsfree.config.weboji.morphs.threshold.eyeLeftClosed;
      state.eyeRightClosed =
        morphs[9] > this.handsfree.config.weboji.morphs.threshold.eyeRightClosed;
      state.eyesClosed = state.eyeLeftClosed && state.eyeRightClosed;

      // Mouth
      state.mouthClosed = morphs[6] === 0;
      state.mouthOpen =
        morphs[6] > this.handsfree.config.weboji.morphs.threshold.mouthOpen;

      return state
    }

    /**
     * Loads the actual model and initializes Weboji
     * @see https://github.com/jeeliz/jeelizWeboji
     */
    onDepsLoaded() {
      const url = this.handsfree.config.assetsPath + 'jeelizFaceTransferNNC.json';

      this.api = window.JEEFACETRANSFERAPI;
      this.apiHelper = window.JEELIZ_RESIZER;

      fetch(url)
        .then((model) => {
          return model.json()
        })
        // Next, let's initialize the weboji tracker API
        .then((model) => {
          this.apiHelper.size_canvas({
            canvasId: `handsfree-canvas-${this.handsfree.id}`,
            callback: (videoSettings) => {
              if (typeof videoSettings === 'object') {
                videoSettings = lodash.merge(videoSettings, this.handsfree.config.weboji.videoSettings);
              } else {
                videoSettings = this.handsfree.config.weboji.videoSettings;
              }
              
              this.api.init({
                canvasId: `handsfree-canvas-${this.handsfree.id}`,
                NNC: JSON.stringify(model),
                videoSettings,
                callbackReady: () => {
                  this.isReady = true;
                  this.api.set_animateDelay(this.config.throttle),
                  this.emit('modelLoaded');
                  document.body.classList.add('handsfree-model-weboji');
                }
              });
            }
          });
        })
        .catch((ev) => {
          console.log(ev);
          console.error(`Couldn't load weboji tracking model at ${url}`);
          this.emit('modelError');
        });
    }

    /**
     * Throttles the model
     */
    throttle(time, opts) {
      this.api && this.api.set_animateDelay(time);
      super.throttle(time, opts);
    }
  }

  /**
   * @see https://ml5js.org/reference/api-PoseNet/
   */
  class PoseNet extends BaseModel {
    constructor(...args) {
      super(...args);

      this.data = {
        score: 0,
        keypoints: []
      };
    }

    /**
     * Stores the data in this.data
     */
    getData() {
      if (!this.isGettingData) {
        this.isGettingData = true;
        this.api.singlePose(this.handsfree.feedback.$video);
      }
    }

    /**
     * Listens for the posenet "pose" event
     */
    listenForPose() {
      this.api.on('pose', (pose) => {
        this.isGettingData = false;
        this.data = pose[0];
      });
    }

    /**
     * Loads the actual model and initializes posenet
     * @see https://ml5js.org/reference/api-PoseNet/
     */
    onDepsLoaded() {
      this.handsfree.getUserMedia(() => {
        this.api = ml5.poseNet(() => {
          this.isReady = true;
          this.emit('modelLoaded');
            document.body.classList.add('handsfree-model-posenet');
            this.listenForPose();
        }, this.config);
      });
    }
  }

  /**
   * @see https://github.com/tensorflow/tfjs-models/tree/master/handpose
   */
  class Handpose extends BaseModel {
    constructor(...args) {
      super(...args);

      this.data = {};

      // Various THREE variables
      this.three = {
        scene: null,
        camera: null,
        renderer: null,
        meshes: []
      };

      // landmark indices that represent the palm
      // 8 = Index finger tip
      // 12 = Middle finger tip
      this.palmPoints = [0, 1, 2, 5, 9, 13, 17];

      this.fingerLookupIndices = {
        thumb: [0, 1, 2, 3, 4],
        indexFinger: [0, 5, 6, 7, 8],
        middleFinger: [0, 9, 10, 11, 12],
        ringFinger: [0, 13, 14, 15, 16],
        pinky: [0, 17, 18, 19, 20]
      };
    }

    /**
     * Called when depenencies are loaded
     * - Sets up camera
     * - Sets up Three.js
     * 
     * @todo is async necessary?
     */
     onDepsLoaded () {
      this.handsfree.getUserMedia(async () => {
        await tf.setBackend('webgl');
        this.api = await handpose.load(this.handsfree.config.handpose.model);

        this.setup3D();

        this.isReady = true;
        this.emit('modelLoaded');
        document.body.classList.add('handsfree-model-handpose');
      });
    }

    /**
     * Sets up the 3D environment
     */
    setup3D () {
      // Setup Three
      this.three = {
        scene: new window.THREE.Scene(),
        camera: new window.THREE.PerspectiveCamera(90, window.outerWidth / window.outerHeight, 0.1, 1000),
        renderer: new THREE.WebGLRenderer(),
        meshes: []
      };
      this.three.renderer.setSize(window.outerWidth, window.outerHeight);
      this.three.renderer.domElement.classList.add('handsfree-handpose-canvas');
      this.handsfree.feedback.$wrap.appendChild(this.three.renderer.domElement);
      this.three.camera.position.z = -this.handsfree.feedback.$video.videoWidth / 2;
      this.three.camera.lookAt(new window.THREE.Vector3(0, 0, 0));

      // Camera plane
      this.three.screen = new window.THREE.Mesh(
        // new window.THREE.PlaneGeometry(window.outerWidth, window.outerHeight),
        new window.THREE.BoxGeometry(window.outerWidth, window.outerHeight, 1),
        new window.THREE.MeshNormalMaterial()
      );
      this.three.screen.position.z = 300;
      this.three.scene.add(this.three.screen);

      // Camera raycaster
      this.three.raycaster = new window.THREE.Raycaster();
      this.three.arrow = new window.THREE.ArrowHelper(this.three.raycaster.ray.direction, this.three.raycaster.ray.origin, 300, 0xff0000);
      this.three.scene.add(this.three.arrow);

      // Create model representations (one for each keypoint)
      for (let i = 0; i < 21; i++){
        const {isPalm} = this.getLandmarkProperty(i);
      
        const obj = new window.THREE.Object3D(); // a parent object to facilitate rotation/scaling
      
        // we make each bone a cylindrical shape, but you can use your own models here too
        const geometry = new window.THREE.CylinderGeometry(isPalm ? 5 : 10, 5, 1);
      
        let material = new window.THREE.MeshNormalMaterial();
      
        const mesh = new window.THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
      
        obj.add(mesh);
        this.three.scene.add(obj);
        this.three.meshes.push(obj);

        // uncomment this to help identify joints
        // if (i === 4) {
        //   mesh.material.transparent = true
        //   mesh.material.opacity = 0
        // }
      }

      // Create center of palm
      const obj = new window.THREE.Object3D();
      const geometry = new window.THREE.CylinderGeometry(5, 5, 1);
      let material = new window.THREE.MeshNormalMaterial();
    
      const mesh = new window.THREE.Mesh(geometry, material);
      mesh.rotation.x = Math.PI / 2;
    
      this.three.centerPalmObj = obj;
      obj.add(mesh);
      this.three.scene.add(obj);
      this.three.meshes.push(obj);    
    }

    // compute some metadata given a landmark index
    // - is the landmark a palm keypoint or a finger keypoint?
    // - what's the next landmark to connect to if we're drawing a bone?
    getLandmarkProperty (i) {
      const palms = [0, 1, 2, 5, 9, 13, 17]; //landmark indices that represent the palm

      const idx = palms.indexOf(i);
      const isPalm = idx != -1;
      let next; // who to connect with?

      if (!isPalm) { // connect with previous finger landmark if it's a finger landmark
        next = i - 1;
      }else { // connect with next palm landmark if it's a palm landmark
        next = palms[(idx + 1) % palms.length];
      }

      return {isPalm, next}
    }

    /**
     * update threejs object position and orientation from the detected hand pose
     * threejs has a "scene" model, so we don't have to specify what to draw each frame,
     * instead we put objects at right positions and threejs renders them all
     * @param {*} hand 
     */
    updateMeshes (hand) {
      for (let i = 0; i < this.three.meshes.length - 1 /* palmbase */; i++) {
        const {next} = this.getLandmarkProperty(i);
    
        const p0 = this.webcam2space(...hand.landmarks[i]);  // one end of the bone
        const p1 = this.webcam2space(...hand.landmarks[next]);  // the other end of the bone
    
        // compute the center of the bone (midpoint)
        const mid = p0.clone().lerp(p1, 0.5);
        this.three.meshes[i].position.set(mid.x, mid.y, mid.z);
    
        // compute the length of the bone
        this.three.meshes[i].scale.z = p0.distanceTo(p1);

        // compute orientation of the bone
        this.three.meshes[i].lookAt(p1);

        if (i === 8) {
          this.three.arrow.position.set(mid.x, mid.y, mid.z);
          const direction = new window.THREE.Vector3().subVectors(p0, mid);
          this.three.arrow.setDirection(direction.normalize());
          this.three.arrow.setLength(800);
          this.three.arrow.direction = direction;
        }
      }

      this.updateCenterPalmMesh(hand);
    }

    /**
     * Update the palm
     */
    updateCenterPalmMesh (hand) {
      let points = [];
      let mid = {
        x: 0,
        y: 0,
        z: 0
      };

      // Get position for the palm
      this.palmPoints.forEach((i, n) => {
        points.push(this.webcam2space(...hand.landmarks[i]));
        mid.x += points[n].x;
        mid.y += points[n].y;
        mid.z += points[n].z;
      });

      mid.x = mid.x / this.palmPoints.length;
      mid.y = mid.y / this.palmPoints.length;
      mid.z = mid.z / this.palmPoints.length;
      
      this.three.centerPalmObj.position.set(mid.x, mid.y, mid.z);
      this.three.centerPalmObj.scale.z = 10;
      this.three.centerPalmObj.rotation.x = this.three.meshes[12].rotation.x - Math.PI / 2;
      this.three.centerPalmObj.rotation.y = -this.three.meshes[12].rotation.y;
      this.three.centerPalmObj.rotation.z = this.three.meshes[12].rotation.z;
    }
    
    // transform webcam coordinates to threejs 3d coordinates
    webcam2space (x, y, z) {
      return new window.THREE.Vector3(
        (x-this.handsfree.feedback.$video.videoWidth / 2),
        -(y-this.handsfree.feedback.$video.videoHeight / 2), // in threejs, +y is up
        -z
      )
    }

    /**
     * Runs inference and sets up other data
     */
    async getData () {
      if (!this.handsfree.feedback.$video) return

      const predictions = await this.api.estimateHands(this.handsfree.feedback.$video);

      this.data = {
        ...predictions[0],
        meshes: this.three.meshes
      };

      if (predictions[0]) {
        this.handsfree.handpose.updateMeshes(this.data);
      }
      
      this.handsfree.handpose.three.renderer.render(this.handsfree.handpose.three.scene, this.handsfree.handpose.three.camera);
      return this.data
    }
  }

  /**
   * Plugin class
   */
  class Plugin {
    constructor(plugin, handsfree) {
      // Props
      this.plugin = plugin;
      this.handsfree = handsfree;

      // Copy properties and methods from plugin into class
      Object.keys(plugin).forEach((prop) => {
        this[prop] = plugin[prop];
      });

      // handsfree.config.plugin[name] overwrites plugin.config
      let handsfreePluginConfig = handsfree.config.plugin[plugin.name];
      if (typeof handsfreePluginConfig === 'boolean') {
        handsfreePluginConfig = { enabled: handsfreePluginConfig };
      }

      // Disable plugins via new Handsfree(config)
      if (typeof handsfreePluginConfig === 'object') {
        merge_1(this.config, handsfreePluginConfig);
        if (typeof handsfreePluginConfig.enabled === 'boolean') {
          this.enabled = handsfreePluginConfig.enabled;
        }
      }
    }

    /**
     * Toggle plugins
     */
    enable() {
      !this.enabled && this.onEnable && this.onEnable(this.handsfree);
      this.enabled = true;
    }
    disable() {
      this.enabled && this.onDisable && this.onDisable(this.handsfree);
      this.enabled = false;
    }
  }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  /*!
   * GSAP 3.5.1
   * https://greensock.com
   *
   * @license Copyright 2008-2020, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */

  /* eslint-disable */
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
      _defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
  },
      _bigNum = 1e8,
      _tinyNum = 1 / _bigNum,
      _2PI = Math.PI * 2,
      _HALF_PI = _2PI / 4,
      _gsID = 0,
      _sqrt = Math.sqrt,
      _cos = Math.cos,
      _sin = Math.sin,
      _isString = function _isString(value) {
    return typeof value === "string";
  },
      _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
      _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
      _isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
      _isObject = function _isObject(value) {
    return typeof value === "object";
  },
      _isNotFalse = function _isNotFalse(value) {
    return value !== false;
  },
      _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
      _isFuncOrString = function _isFuncOrString(value) {
    return _isFunction(value) || _isString(value);
  },
      _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
      // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
  _isArray = Array.isArray,
      _strictNumExp = /(?:-?\.?\d|\.)+/gi,
      //only numbers (including negatives and decimals) but NOT relative values.
  _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
      //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
  _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      _complexStringNumExp = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
      //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
  _relExp = /[+-]=-?[\.\d]+/,
      _delimitedValueExp = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
      _globalTimeline,
      _win,
      _coreInitted,
      _doc,
      _globals = {},
      _installScope = {},
      _coreReady,
      _install = function _install(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  },
      _missingPlugin = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  },
      _warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
  },
      _addGlobal = function _addGlobal(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  },
      _emptyFunc = function _emptyFunc() {
    return 0;
  },
      _reservedProps = {},
      _lazyTweens = [],
      _lazyLookup = {},
      _lastRenderedFrame,
      _plugins = {},
      _effects = {},
      _nextGCFrame = 30,
      _harnessPlugins = [],
      _callbackNames = "",
      _harness = function _harness(targets) {
    var target = targets[0],
        harnessPlugin,
        i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);

    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      i = _harnessPlugins.length;

      while (i-- && !_harnessPlugins[i].targetTest(target)) {}

      harnessPlugin = _harnessPlugins[i];
    }

    i = targets.length;

    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }

    return targets;
  },
      _getCache = function _getCache(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  },
      _getProperty = function _getProperty(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  },
      _forEachName = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  },
      //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
  _round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
      _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
    var l = toFind.length,
        i = 0;

    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

    return i < l;
  },
      _parseVars = function _parseVars(params, type, parent) {
    //reads the arguments passed to one of the key methods and figures out if the user is defining things with the OLD/legacy syntax where the duration is the 2nd parameter, and then it adjusts things accordingly and spits back the corrected vars object (with the duration added if necessary, as well as runBackwards or startAt or immediateRender). type 0 = to()/staggerTo(), 1 = from()/staggerFrom(), 2 = fromTo()/staggerFromTo()
    var isLegacy = _isNumber(params[1]),
        varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
        vars = params[varsIndex],
        irVars;

    isLegacy && (vars.duration = params[1]);
    vars.parent = parent;

    if (type) {
      irVars = vars;

      while (parent && !("immediateRender" in irVars)) {
        // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }

      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
    }

    return vars;
  },
      _lazyRender = function _lazyRender() {
    var l = _lazyTweens.length,
        a = _lazyTweens.slice(0),
        i,
        tween;

    _lazyLookup = {};
    _lazyTweens.length = 0;

    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  },
      _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    _lazyTweens.length && _lazyRender();
    animation.render(time, suppressEvents, force);
    _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
  },
      _numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  },
      _passThrough = function _passThrough(p) {
    return p;
  },
      _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }

    return obj;
  },
      _setKeyframeDefaults = function _setKeyframeDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" || p === "ease" || (obj[p] = defaults[p]);
    }
  },
      _merge = function _merge(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }

    return base;
  },
      _mergeDeep = function _mergeDeep(base, toMerge) {
    for (var p in toMerge) {
      base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p];
    }

    return base;
  },
      _copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {},
        p;

    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }

    return copy;
  },
      _inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || _globalTimeline,
        func = vars.keyframes ? _setKeyframeDefaults : _setDefaults;

    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }

    return vars;
  },
      _arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length,
        match = i === a2.length;

    while (match && i-- && a1[i] === a2[i]) {}

    return i < 0;
  },
      _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = parent[lastProp],
        t;

    if (sortBy) {
      t = child[sortBy];

      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }

    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }

    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  },
      _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = child._prev,
        next = child._next;

    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }

    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }

    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
  },
      _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
  },
      _uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
      var a = animation;

      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }

    return animation;
  },
      _recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;

    while (parent && parent.parent) {
      //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }

    return animation;
  },
      _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
  },
      _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  },
      // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
  _animationCycle = function _animationCycle(tTime, cycleDuration) {
    return (tTime /= cycleDuration) && ~~tTime === tTime ? ~~tTime - 1 : ~~tTime;
  },
      _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  },
      _setEnd = function _setEnd(animation) {
    return animation._end = _round(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  },
      _alignPlayhead = function _alignPlayhead(animation, totalTime) {
    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
    var parent = animation._dp;

    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _round(animation._dp._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

      _setEnd(animation);

      parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
    }

    return animation;
  },

  /*
  _totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
  	let cycleDuration = duration + repeatDelay,
  		time = _round(clampedTotalTime % cycleDuration);
  	if (time > duration) {
  		time = duration;
  	}
  	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
  },
  */
  _postAddChecks = function _postAddChecks(timeline, child) {
    var t;

    if (child._time || child._initted && !child._dur) {
      //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
      t = _parentToChildTotalTime(timeline.rawTime(), child);

      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
      //in case any of the ancestors had completed but should now be enabled...
      if (timeline._dur < timeline.duration()) {
        t = timeline;

        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

          t = t._dp;
        }
      }

      timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
    }
  },
      _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _round(position + child._delay);
    child._end = _round(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

    timeline._recent = child;
    skipChecks || _postAddChecks(timeline, child);
    return timeline;
  },
      _scrollTrigger = function _scrollTrigger(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  },
      _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
    _initTween(tween, totalTime);

    if (!tween._initted) {
      return 1;
    }

    if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);

      tween._lazy = [totalTime, suppressEvents];
      return 1;
    }
  },
      _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio,
        ratio = totalTime < 0 || !totalTime && prevRatio && !tween._start && tween._zTime > _tinyNum && !tween._dp._lock || (tween._ts < 0 || tween._dp._ts < 0) && tween.data !== "isFromStart" && tween.data !== "isStart" ? 0 : 1,
        // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0. Also, if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0.
    repeatDelay = tween._rDelay,
        tTime = 0,
        pt,
        iteration,
        prevIteration;

    if (repeatDelay && tween._repeat) {
      // in case there's a zero-duration tween that has a repeat with a repeatDelay
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      prevIteration = _animationCycle(tween._tTime, repeatDelay);

      if (iteration !== prevIteration) {
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }

    if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
        // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        return;
      }

      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

      suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      suppressEvents || _callback(tween, "onStart");
      pt = tween._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);

        if (!suppressEvents) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  },
      _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;

    if (time > prevTime) {
      child = animation._first;

      while (child && child._start <= time) {
        if (!child._dur && child.data === "isPause" && child._start > prevTime) {
          return child;
        }

        child = child._next;
      }
    } else {
      child = animation._last;

      while (child && child._start >= time) {
        if (!child._dur && child.data === "isPause" && child._start < prevTime) {
          return child;
        }

        child = child._prev;
      }
    }
  },
      _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat,
        dur = _round(duration) || 0,
        totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _round(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  },
      _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  },
      _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc
  },
      _parsePosition = function _parsePosition(animation, position) {
    var labels = animation.labels,
        recent = animation._recent || _zeroPosition,
        clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
        //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
    i,
        offset;

    if (_isString(position) && (isNaN(position) || position in labels)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      i = position.charAt(0);

      if (i === "<" || i === ">") {
        return (i === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0);
      }

      i = position.indexOf("=");

      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }

      offset = +(position.charAt(i - 1) + position.substr(i + 1));
      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1)) + offset : clippedDuration + offset;
    }

    return position == null ? clippedDuration : +position;
  },
      _conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
  },
      _clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
  },
      getUnit = function getUnit(value) {
    return (value = (value + "").substr((parseFloat(value) + "").length)) && isNaN(value) ? value : "";
  },
      // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
  clamp = function clamp(min, max, value) {
    return _conditionalReturn(value, function (v) {
      return _clamp(min, max, v);
    });
  },
      _slice = [].slice,
      _isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
  },
      _flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }

    return ar.forEach(function (value) {
      var _accumulator;

      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  },
      //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  toArray = function toArray(value, leaveStrings) {
    return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call(_doc.querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  },
      shuffle = function shuffle(a) {
    return a.sort(function () {
      return .5 - Math.random();
    });
  },
      // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
  //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  distribute = function distribute(v) {
    if (_isFunction(v)) {
      return v;
    }

    var vars = _isObject(v) ? v : {
      each: v
    },
        //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = _parseEase(vars.ease),
        from = vars.from || 0,
        base = parseFloat(vars.base) || 0,
        cache = {},
        isDecimal = from > 0 && from < 1,
        ratios = isNaN(from) || isDecimal,
        axis = vars.axis,
        ratioX = from,
        ratioY = from;

    if (_isString(from)) {
      ratioX = ratioY = {
        center: .5,
        edges: .5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }

    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrapAt;

      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

        if (!wrapAt) {
          max = -_bigNum;

          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

          wrapAt--;
        }

        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
        originY = ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum;

        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }

        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0; //unit

        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }

      l = (distances[i] - distances.min) / distances.max || 0;
      return _round(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
    };
  },
      _roundModifier = function _roundModifier(v) {
    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
    var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

    return function (raw) {
      return Math.floor(Math.round(parseFloat(raw) / v) * v * p) / p + (_isNumber(raw) ? 0 : getUnit(raw));
    };
  },
      snap = function snap(snapTo, value) {
    var isArray = _isArray(snapTo),
        radius,
        is2D;

    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum;

      if (snapTo.values) {
        snapTo = toArray(snapTo.values);

        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }

    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function (raw) {
      var x = parseFloat(is2D ? raw.x : raw),
          y = parseFloat(is2D ? raw.y : 0),
          min = _bigNum,
          closest = 0,
          i = snapTo.length,
          dx,
          dy;

      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }

        if (dx < min) {
          min = dx;
          closest = i;
        }
      }

      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  },
      random = function random(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min + Math.random() * (max - min)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  },
      pipe = function pipe() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }

    return function (value) {
      return functions.reduce(function (v, f) {
        return f(v);
      }, value);
    };
  },
      unitize = function unitize(func, unit) {
    return function (value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  },
      normalize = function normalize(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  },
      _wrapArray = function _wrapArray(a, wrapper, value) {
    return _conditionalReturn(value, function (index) {
      return a[~~wrapper(index)];
    });
  },
      wrap = function wrap(min, max, value) {
    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
      return (range + (value - min) % range) % range + min;
    });
  },
      wrapYoyo = function wrapYoyo(min, max, value) {
    var range = max - min,
        total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
      value = (total + (value - min) % total) % total || 0;
      return min + (value > range ? total - value : value);
    });
  },
      _replaceRandom = function _replaceRandom(value) {
    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
    var prev = 0,
        s = "",
        i,
        nums,
        end,
        isArray;

    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }

    return s + value.substr(prev, value.length - prev);
  },
      mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin,
        outRange = outMax - outMin;
    return _conditionalReturn(value, function (value) {
      return outMin + ((value - inMin) / inRange * outRange || 0);
    });
  },
      interpolate = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function (p) {
      return (1 - p) * start + p * end;
    };

    if (!func) {
      var isString = _isString(start),
          master = {},
          p,
          i,
          interpolators,
          l,
          il;

      progress === true && (mutate = 1) && (progress = null);

      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;

        for (i = 1; i < l; i++) {
          interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
        }

        l--;

        func = function func(p) {
          p *= l;
          var i = Math.min(il, ~~p);
          return interpolators[i](p - i);
        };

        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }

      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }

        func = function func(p) {
          return _renderPropTweens(p, master) || (isString ? start.p : start);
        };
      }
    }

    return _conditionalReturn(progress, func);
  },
      _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    //used for nextLabel() and previousLabel()
    var labels = timeline.labels,
        min = _bigNum,
        p,
        distance,
        label;

    for (p in labels) {
      distance = labels[p] - fromTime;

      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }

    return label;
  },
      _callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars,
        callback = v[type],
        params,
        scope;

    if (!callback) {
      return;
    }

    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

    return params ? callback.apply(scope, params) : callback.call(scope);
  },
      _interrupt = function _interrupt(animation) {
    _removeFromParent(animation);

    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  },
      _quickTween,
      _createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

    var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
      this._props = [];
    } : config,
        //in case someone passes in an object that's not a plugin, like CustomEase
    instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    },
        statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };

    _wake();

    if (config !== Plugin) {
      if (_plugins[name]) {
        return;
      }

      _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


      _plugins[Plugin.prop = name] = Plugin;

      if (config.targetTest) {
        _harnessPlugins.push(Plugin);

        _reservedProps[name] = 1;
      }

      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
    }

    _addGlobal(name, Plugin);

    config.register && config.register(gsap, Plugin, PropTween);
  },

  /*
   * --------------------------------------------------------------------------------------
   * COLORS
   * --------------------------------------------------------------------------------------
   */
  _255 = 255,
      _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  },
      _hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
  },
      splitColor = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
        r,
        g,
        b,
        h,
        s,
        l,
        max,
        min,
        d,
        wasHSL;

    if (!a) {
      if (v.substr(-1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          //for shorthand like #9F0
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);

        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= .5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1); //cast as number

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }

      a = a.map(Number);
    }

    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = ~~(h + .5);
      a[1] = ~~(s * 100 + .5);
      a[2] = ~~(l * 100 + .5);
    }

    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  },
      _colorOrderData = function _colorOrderData(v) {
    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
    var values = [],
        c = [],
        i = -1;
    v.split(_colorExp).forEach(function (v) {
      var a = v.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  },
      _formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "",
        colors = (s + result).match(_colorExp),
        type = toHSL ? "hsla(" : "rgba(",
        i = 0,
        c,
        shell,
        d,
        l;

    if (!colors) {
      return s;
    }

    colors = colors.map(function (color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });

    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;

      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;

        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }

    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }

    return result + shell[l];
  },
      _colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b",
        //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
    p;

    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }

    return new RegExp(s + ")", "gi");
  }(),
      _hslExp = /hsl[a]?\(/,
      _colorStringFilter = function _colorStringFilter(a) {
    var combined = a.join(" "),
        toHSL;
    _colorExp.lastIndex = 0;

    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

      return true;
    }
  },

  /*
   * --------------------------------------------------------------------------------------
   * TICKER
   * --------------------------------------------------------------------------------------
   */
  _tickerActive,
      _ticker = function () {
    var _getTime = Date.now,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _startTime = _getTime(),
        _lastUpdate = _startTime,
        _gap = 1000 / 240,
        _nextTime = _gap,
        _listeners = [],
        _id,
        _req,
        _raf,
        _self,
        _delta,
        _i,
        _tick = function _tick(v) {
      var elapsed = _getTime() - _lastUpdate,
          manual = v === true,
          overlap,
          dispatch,
          time,
          frame;

      elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;

      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1000;
        _self.time = time = time / 1000;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }

      manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

      if (dispatch) {
        for (_i = 0; _i < _listeners.length; _i++) {
          // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
          _listeners[_i](time, _delta, frame, v);
        }
      }
    };

    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1000 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists()) {
            _win = _coreInitted = window;
            _doc = _win.document || {};
            _globals.gsap = gsap;
            (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

            _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

            _raf = _win.requestAnimationFrame;
          }

          _id && _self.sleep();

          _req = _raf || function (f) {
            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
          };

          _tickerActive = 1;

          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
      },
      fps: function fps(_fps) {
        _gap = 1000 / (_fps || 240);
        _nextTime = _self.time * 1000 + _gap;
      },
      add: function add(callback) {
        _listeners.indexOf(callback) < 0 && _listeners.push(callback);

        _wake();
      },
      remove: function remove(callback) {
        var i;
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners
    };
    return _self;
  }(),
      _wake = function _wake() {
    return !_tickerActive && _ticker.wake();
  },
      //also ensures the core classes are initialized.

  /*
  * -------------------------------------------------
  * EASING
  * -------------------------------------------------
  */
  _easeMap = {},
      _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
      _quotesExp = /["']/g,
      _parseObjectInString = function _parseObjectInString(value) {
    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
    var obj = {},
        split = value.substr(1, value.length - 3).split(":"),
        key = split[0],
        i = 1,
        l = split.length,
        index,
        val,
        parsedVal;

    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }

    return obj;
  },
      _valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1,
        close = value.indexOf(")"),
        nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  },
      _configEaseFromString = function _configEaseFromString(name) {
    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
    var split = (name + "").split("("),
        ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  },
      _invertEase = function _invertEase(ease) {
    return function (p) {
      return 1 - ease(1 - p);
    };
  },
      // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
  _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first,
        ease;

    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }

      child = child._next;
    }
  },
      _parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  },
      _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
      };
    }

    if (easeInOut === void 0) {
      easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }

    var ease = {
      easeIn: easeIn,
      easeOut: easeOut,
      easeInOut: easeInOut
    },
        lowercaseName;

    _forEachName(names, function (name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });

    return ease;
  },
      _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function (p) {
      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
  },
      _configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1,
        //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
    p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
        p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
        easeOut = function easeOut(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    p2 = _2PI / p2; //precalculate to optimize

    ease.config = function (amplitude, period) {
      return _configElastic(type, amplitude, period);
    };

    return ease;
  },
      _configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }

    var easeOut = function easeOut(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    ease.config = function (overshoot) {
      return _configBack(type, overshoot);
    };

    return ease;
  }; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
  // _weightedEase = ratio => {
  // 	let y = 0.5 + ratio / 2;
  // 	return p => (2 * (1 - p) * p * y + p * p);
  // },
  // a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
  // _weightedEaseStrong = ratio => {
  // 	ratio = .5 + ratio / 2;
  // 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
  // 		b = ratio - o,
  // 		c = ratio + o;
  // 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
  // };


  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
    var power = i < 5 ? i + 1 : i;

    _insertEase(name + ",Power" + (power - 1), i ? function (p) {
      return Math.pow(p, power);
    } : function (p) {
      return p;
    }, function (p) {
      return 1 - Math.pow(1 - p, power);
    }, function (p) {
      return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });

  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

  (function (n, c) {
    var n1 = 1 / c,
        n2 = 2 * n1,
        n3 = 2.5 * n1,
        easeOut = function easeOut(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };

    _insertEase("Bounce", function (p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);

  _insertEase("Expo", function (p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });

  _insertEase("Circ", function (p) {
    return -(_sqrt(1 - p * p) - 1);
  });

  _insertEase("Sine", function (p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });

  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }

      var p1 = 1 / steps,
          p2 = steps + (immediateStart ? 0 : 1),
          p3 = immediateStart ? 1 : 0,
          max = 1 - _tinyNum;
      return function (p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];

  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  /*
   * --------------------------------------------------------------------------------------
   * CACHE
   * --------------------------------------------------------------------------------------
   */


  var GSCache = function GSCache(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  /*
   * --------------------------------------------------------------------------------------
   * ANIMATION
   * --------------------------------------------------------------------------------------
   */

  var Animation = /*#__PURE__*/function () {
    function Animation(vars, time) {
      var parent = vars.parent || _globalTimeline;
      this.vars = vars;
      this._delay = +vars.delay || 0;

      if (this._repeat = vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }

      this._ts = 1;

      _setDuration(this, +vars.duration, 1, 1);

      this.data = vars.data;
      _tickerActive || _ticker.wake();
      parent && _addToTimeline(parent, this, time || time === 0 ? time : parent._time, 1);
      vars.reversed && this.reverse();
      vars.paused && this.paused(true);
    }

    var _proto = Animation.prototype;

    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }

      return this._delay;
    };

    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };

    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }

      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };

    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();

      if (!arguments.length) {
        return this._tTime;
      }

      var parent = this._dp;

      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime); //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.


        while (parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }

          parent = parent.parent;
        }

        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }

      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
        this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause

        _lazySafeRender(this, _totalTime, suppressEvents);
      }

      return this;
    };

    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % this._dur || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
    };

    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };

    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };

    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;

      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    } // potential future addition:
    // isPlayingBackwards() {
    // 	let animation = this,
    // 		orientation = 1; // 1 = forward, -1 = backward
    // 	while (animation) {
    // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
    // 		animation = animation.parent;
    // 	}
    // 	return orientation < 0;
    // }
    ;

    _proto.timeScale = function timeScale(value) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
      }

      if (this._rts === value) {
        return this;
      }

      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
      // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

      return _recacheAncestors(this.totalTime(_clamp(-this._delay, this._tDur, tTime), true));
    };

    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }

      if (this._ps !== value) {
        this._ps = value;

        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

          this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
        } else {
          _wake();

          this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && (this._tTime -= _tinyNum) && Math.abs(this._zTime) !== _tinyNum); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
        }
      }

      return this;
    };

    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }

      return this._start;
    };

    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
    };

    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp; // _dp = detatched parent

      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };

    _proto.globalTime = function globalTime(rawTime) {
      var animation = this,
          time = arguments.length ? rawTime : animation.rawTime();

      while (animation) {
        time = animation._start + time / (animation._ts || 1);
        animation = animation._dp;
      }

      return time;
    };

    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value;
        return _onUpdateTotalDuration(this);
      }

      return this._repeat;
    };

    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        this._rDelay = value;
        return _onUpdateTotalDuration(this);
      }

      return this._rDelay;
    };

    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }

      return this._yoyo;
    };

    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };

    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };

    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };

    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };

    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };

    _proto.resume = function resume() {
      return this.paused(false);
    };

    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

        return this;
      }

      return this._rts < 0;
    };

    _proto.invalidate = function invalidate() {
      this._initted = 0;
      this._zTime = -_tinyNum;
      return this;
    };

    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp,
          start = this._start,
          rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };

    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;

      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }

        return this;
      }

      return vars[type];
    };

    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function (resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
            _resolve = function _resolve() {
          var _then = self.then;
          self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };

        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };

    _proto.kill = function kill() {
      _interrupt(this);
    };

    return Animation;
  }();

  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  /*
   * -------------------------------------------------
   * TIMELINE
   * -------------------------------------------------
   */


  var Timeline = /*#__PURE__*/function (_Animation) {
    _inheritsLoose(Timeline, _Animation);

    function Timeline(vars, time) {
      var _this;

      if (vars === void 0) {
        vars = {};
      }

      _this = _Animation.call(this, vars, time) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _this.parent && _postAddChecks(_this.parent, _assertThisInitialized(_this));
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }

    var _proto2 = Timeline.prototype;

    _proto2.to = function to(targets, vars, position) {
      new Tween(targets, _parseVars(arguments, 0, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
      return this;
    };

    _proto2.from = function from(targets, vars, position) {
      new Tween(targets, _parseVars(arguments, 1, this), _parsePosition(this, _isNumber(vars) ? arguments[3] : position));
      return this;
    };

    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      new Tween(targets, _parseVars(arguments, 2, this), _parsePosition(this, _isNumber(fromVars) ? arguments[4] : position));
      return this;
    };

    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };

    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), _parsePosition(this, position));
    } //ONLY for backward compatibility! Maybe delete?
    ;

    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };

    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._dirty ? this.totalDuration() : this._tDur,
          dur = this._dur,
          tTime = this !== _globalTimeline && totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
          time,
          child,
          next,
          iteration,
          cycleDuration,
          prevPaused,
          pauseTween,
          timeScale,
          prevStart,
          prevIteration,
          yoyo,
          isYoyo;

      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }

        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;

        if (crossingStart) {
          dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }

        if (this._repeat) {
          //adjust the time for repeats and yoyos
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

          if (tTime === tDur) {
            // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          /*
          make sure children at the end/beginning of the timeline are rendered properly. If, for example,
          a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
          would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
          could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
          we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
          ensure that zero-duration tweens at the very beginning or end of the Timeline work.
          */


          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1,
                doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : dur;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _round(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

            if (prevTime !== this._time || prevPaused !== !this._ts) {
              return this;
            }

            dur = this._dur; // in case the duration changed in the onRepeat

            tDur = this._tDur;

            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -0.0001;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }

            this._lock = 0;

            if (!this._ts && !prevPaused) {
              return this;
            } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


            _propagateYoyoEase(this, isYoyo);
          }
        }

        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _round(prevTime), _round(time));

          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }

        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
        }

        !prevTime && time && !suppressEvents && _callback(this, "onStart");

        if (time >= prevTime && totalTime >= 0) {
          child = this._first;

          while (child) {
            next = child._next;

            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

                break;
              }
            }

            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

          while (child) {
            next = child._prev;

            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

                break;
              }
            }

            child = next;
          }
        }

        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

          if (this._ts) {
            //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
            this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

            _setEnd(this);

            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && tDur >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
          (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto2.add = function add(child, position) {
      var _this2 = this;

      if (!_isNumber(position)) {
        position = _parsePosition(this, position);
      }

      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function (obj) {
            return _this2.add(obj, position);
          });
          return this;
        }

        if (_isString(child)) {
          return this.addLabel(child, position);
        }

        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }

      return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
    };

    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }

      if (tweens === void 0) {
        tweens = true;
      }

      if (timelines === void 0) {
        timelines = true;
      }

      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }

      var a = [],
          child = this._first;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }

        child = child._next;
      }

      return a;
    };

    _proto2.getById = function getById(id) {
      var animations = this.getChildren(1, 1, 1),
          i = animations.length;

      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };

    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }

      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }

      _removeLinkedListItem(this, child);

      if (child === this._recent) {
        this._recent = this._last;
      }

      return _uncache(this);
    };

    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }

      this._forcing = 1;

      if (!this._dp && this._ts) {
        //special case for the global timeline (or any other that has no parent or detached parent).
        this._start = _round(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }

      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

      this._forcing = 0;
      return this;
    };

    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };

    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };

    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };

    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);

      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }

        child = child._next;
      }
    };

    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive),
          i = tweens.length;

      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }

      return this;
    };

    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
      var a = [],
          parsedTargets = toArray(targets),
          child = this._first,
          isGlobalTime = _isNumber(onlyActive),
          // a number is interpreted as a global time. If the animation spans
      children;

      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }

        child = child._next;
      }

      return a;
    };

    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};

      var tl = this,
          endTime = _parsePosition(tl, position),
          _vars = vars,
          startAt = _vars.startAt,
          _onStart = _vars.onStart,
          onStartParams = _vars.onStartParams,
          tween = Tween.to(tl, _setDefaults(vars, {
        ease: "none",
        lazy: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();
          var duration = vars.duration || Math.abs((endTime - tl._time) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
        }
      }));

      return tween;
    };

    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };

    _proto2.recent = function recent() {
      return this._recent;
    };

    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };

    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };

    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };

    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }

      var child = this._first,
          labels = this.labels,
          p;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }

        child = child._next;
      }

      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }

      return _uncache(this);
    };

    _proto2.invalidate = function invalidate() {
      var child = this._first;
      this._lock = 0;

      while (child) {
        child.invalidate();
        child = child._next;
      }

      return _Animation.prototype.invalidate.call(this);
    };

    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }

      var child = this._first,
          next;

      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }

      this._time = this._tTime = this._pTime = 0;
      includeLabels && (this.labels = {});
      return _uncache(this);
    };

    _proto2.totalDuration = function totalDuration(value) {
      var max = 0,
          self = this,
          child = self._last,
          prevStart = _bigNum,
          prev,
          start,
          parent;

      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }

      if (self._dirty) {
        parent = self.parent;

        while (child) {
          prev = child._prev; //record it here in case the tween changes position in the sequence...

          child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

          start = child._start;

          if (start > prevStart && self._sort && child._ts && !self._lock) {
            //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
            self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }

          if (start < 0 && child._ts) {
            //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
            max -= start;

            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }

            self.shiftChildren(-start, false, -1e999);
            prevStart = 0;
          }

          child._end > max && child._ts && (max = child._end);
          child = prev;
        }

        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

        self._dirty = 0;
      }

      return self._tDur;
    };

    Timeline.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

        _lastRenderedFrame = _ticker.frame;
      }

      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }

          child || _ticker.sleep();
        }
      }
    };

    return Timeline;
  }(Animation);

  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });

  var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
        index = 0,
        matchIndex = 0,
        result,
        startNums,
        color,
        endNum,
        chunk,
        startNum,
        hasRandom,
        a;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings

    end += "";

    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }

    startNums = start.match(_complexStringNumExp) || [];

    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }

      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? parseFloat(endNum.substr(2)) * (endNum.charAt(0) === "-" ? -1 : 1) : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

    pt.fp = funcParam;

    if (_relExp.test(end) || hasRandom) {
      pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    }

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

    return pt;
  },
      _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop],
        parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
        setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
        pt;

    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }

      if (end.charAt(1) === "=") {
        end = parseFloat(parsedStart) + parseFloat(end.substr(2)) * (end.charAt(0) === "-" ? -1 : 1) + (getUnit(parsedStart) || 0);
      }
    }

    if (parsedStart !== end) {
      if (!isNaN(parsedStart * end)) {
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }

      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  },
      //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
  _processVars = function _processVars(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }

    var copy = {},
        p;

    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }

    return copy;
  },
      _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;

    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

        i = plugin._props.length;

        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }

    return plugin;
  },
      _overwritingTween,
      //store a reference temporarily so we can avoid overwriting itself.
  _initTween = function _initTween(tween, time) {
    var vars = tween.vars,
        ease = vars.ease,
        startAt = vars.startAt,
        immediateRender = vars.immediateRender,
        lazy = vars.lazy,
        onUpdate = vars.onUpdate,
        onUpdateParams = vars.onUpdateParams,
        callbackScope = vars.callbackScope,
        runBackwards = vars.runBackwards,
        yoyoEase = vars.yoyoEase,
        keyframes = vars.keyframes,
        autoRevert = vars.autoRevert,
        dur = tween._dur,
        prevStartAt = tween._startAt,
        targets = tween._targets,
        parent = tween.parent,
        fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
        autoOverwrite = tween._overwrite === "auto",
        tl = tween.timeline,
        cleanVars,
        i,
        p,
        pt,
        target,
        hasPriority,
        gsData,
        harness,
        plugin,
        ptLookup,
        index,
        harnessVars,
        overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

    if (yoyoEase && tween._yoyo && !tween._repeat) {
      //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }

    if (!tl) {
      //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

      cleanVars = _copyExcluding(vars, _reservedProps);
      prevStartAt && prevStartAt.render(-1, true).kill();

      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent: parent,
          immediateRender: true,
          lazy: _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate,
          onUpdateParams: onUpdateParams,
          callbackScope: callbackScope,
          stagger: 0
        }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


        if (immediateRender) {
          if (time > 0) {
            autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
          } else if (dur && !(time < 0 && prevStartAt)) {
            time && (tween._zTime = time);
            return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
          }
        }
      } else if (runBackwards && dur) {
        //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
        if (prevStartAt) {
          !autoRevert && (tween._startAt = 0);
        } else {
          time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && _isNotFalse(lazy),
            immediateRender: immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

          _removeFromParent(tween._startAt = Tween.set(targets, p));

          if (!immediateRender) {
            _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

          } else if (!time) {
            return;
          }
        }
      }

      tween._pt = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;

      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

        index = fullTargets === targets ? i : fullTargets.indexOf(target);

        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

          plugin._props.forEach(function (name) {
            ptLookup[name] = pt;
          });

          plugin.priority && (hasPriority = 1);
        }

        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }

        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;

          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(0)); //Also make sure the overwriting doesn't overwrite THIS tween!!!


          overwritten = !tween.parent;
          _overwritingTween = 0;
        }

        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }

      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
    }

    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.
  },
      _addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
        propertyAliases = harness && harness.aliases,
        copy,
        p,
        i,
        aliases;

    if (!propertyAliases) {
      return vars;
    }

    copy = _merge({}, vars);

    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;

        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }

    return copy;
  },
      _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  },
      _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
      _staggerPropsToSkip = (_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger").split(",");
  /*
   * --------------------------------------------------------------------------------------
   * TWEEN
   * --------------------------------------------------------------------------------------
   */


  var Tween = /*#__PURE__*/function (_Animation2) {
    _inheritsLoose(Tween, _Animation2);

    function Tween(targets, vars, time, skipInherit) {
      var _this3;

      if (typeof vars === "number") {
        time.duration = vars;
        vars = time;
        time = null;
      }

      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars), time) || this;
      var _this3$vars = _this3.vars,
          duration = _this3$vars.duration,
          delay = _this3$vars.delay,
          immediateRender = _this3$vars.immediateRender,
          stagger = _this3$vars.stagger,
          overwrite = _this3$vars.overwrite,
          keyframes = _this3$vars.keyframes,
          defaults = _this3$vars.defaults,
          scrollTrigger = _this3$vars.scrollTrigger,
          yoyoEase = _this3$vars.yoyoEase,
          parent = _this3.parent,
          parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
          tl,
          i,
          copy,
          l,
          p,
          curTarget,
          staggerFunc,
          staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

      _this3._overwrite = overwrite;

      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults || {}
        });
        tl.kill();
        tl.parent = _assertThisInitialized(_this3);

        if (keyframes) {
          _setDefaults(tl.vars.defaults, {
            ease: "none"
          });

          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
        } else {
          l = parsedTargets.length;
          staggerFunc = stagger ? distribute(stagger) : _emptyFunc;

          if (_isObject(stagger)) {
            //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }

          for (i = 0; i < l; i++) {
            copy = {};

            for (p in vars) {
              if (_staggerPropsToSkip.indexOf(p) < 0) {
                copy[p] = vars[p];
              }
            }

            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

            if (!stagger && l === 1 && copy.delay) {
              // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }

            tl.to(curTarget, copy, staggerFunc(i, curTarget, parsedTargets));
          }

          tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
        }

        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
      }

      if (overwrite === true) {
        _overwritingTween = _assertThisInitialized(_this3);

        _globalTimeline.killTweensOf(parsedTargets);

        _overwritingTween = 0;
      }

      parent && _postAddChecks(parent, _assertThisInitialized(_this3));

      if (immediateRender || !duration && !keyframes && _this3._start === _round(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

        _this3.render(Math.max(0, -delay)); //in case delay is negative

      }

      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }

    var _proto3 = Tween.prototype;

    _proto3.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._tDur,
          dur = this._dur,
          tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          time,
          pt,
          iteration,
          cycleDuration,
          prevIteration,
          isYoyo,
          ratio,
          timeline,
          yoyoEase;

      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || this._startAt && this._zTime < 0 !== totalTime < 0) {
        //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
        time = tTime;
        timeline = this.timeline;

        if (this._repeat) {
          //adjust the time for repeats and yoyos
          cycleDuration = dur + this._rDelay;
          time = _round(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

          if (tTime === tDur) {
            // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          isYoyo = this._yoyo && iteration & 1;

          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);

          if (time === prevTime && !force && this._initted) {
            //could be during the repeatDelay part. No need to render and fire callbacks.
            return this;
          }

          if (iteration !== prevIteration) {
            timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
              this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

              this.render(_round(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }

        if (!this._initted) {
          if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
            this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

            return this;
          }

          if (dur !== this._dur) {
            // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._tTime = tTime;
        this._time = time;

        if (!this._act && this._ts) {
          this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

          this._lazy = 0;
        }

        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }

        time && !prevTime && !suppressEvents && _callback(this, "onStart");
        pt = this._pt;

        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }

        timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * ratio, suppressEvents, force) || this._startAt && (this._zTime = totalTime);

        if (this._onUpdate && !suppressEvents) {
          totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

          _callback(this, "onUpdate");
        }

        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto3.targets = function targets() {
      return this._targets;
    };

    _proto3.invalidate = function invalidate() {
      this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate();
      return _Animation2.prototype.invalidate.call(this);
    };

    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }

      if (!targets && (!vars || vars === "all")) {
        this._lazy = 0;

        if (this.parent) {
          return _interrupt(this);
        }
      }

      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweenng, interrupt.

        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

        return this;
      }

      var parsedTargets = this._targets,
          killingTargets = targets ? toArray(targets) : parsedTargets,
          propTweenLookup = this._ptLookup,
          firstPT = this._pt,
          overwrittenProps,
          curLookup,
          curOverwriteProps,
          props,
          p,
          pt,
          i;

      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }

      overwrittenProps = this._op = this._op || [];

      if (vars !== "all") {
        //so people can pass in a comma-delimited list of property names
        if (_isString(vars)) {
          p = {};

          _forEachName(vars, function (name) {
            return p[name] = 1;
          });

          vars = p;
        }

        vars = _addAliasesToVars(parsedTargets, vars);
      }

      i = parsedTargets.length;

      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];

          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }

          for (p in props) {
            pt = curLookup && curLookup[p];

            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }

              delete curLookup[p];
            }

            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }

      this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

      return this;
    };

    Tween.to = function to(targets, vars) {
      return new Tween(targets, vars, arguments[2]);
    };

    Tween.from = function from(targets, vars) {
      return new Tween(targets, _parseVars(arguments, 1));
    };

    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay: delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };

    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
      return new Tween(targets, _parseVars(arguments, 2));
    };

    Tween.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween(targets, vars);
    };

    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };

    return Tween;
  }(Animation);

  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  }); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
  // _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
  // 	Tween.prototype[name] = function() {
  // 		let tl = new Timeline();
  // 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
  // 	}
  // });
  //for backward compatibility. Leverage the timeline calls.


  _forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
    Tween[name] = function () {
      var tl = new Timeline(),
          params = _slice.call(arguments, 0);

      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  /*
   * --------------------------------------------------------------------------------------
   * PROPTWEEN
   * --------------------------------------------------------------------------------------
   */


  var _setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
  },
      _setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
  },
      _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
  },
      _setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
  },
      _getSetter = function _getSetter(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  },
      _renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000, data);
  },
      _renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  },
      _renderComplexString = function _renderComplexString(ratio, data) {
    var pt = data._pt,
        s = "";

    if (!ratio && data.b) {
      //b = beginning string
      s = data.b;
    } else if (ratio === 1 && data.e) {
      //e = ending string
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

        pt = pt._next;
      }

      s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
    }

    data.set(data.t, data.p, s, data);
  },
      _renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  },
      _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt,
        next;

    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  },
      _killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt,
        hasNonDependentRemaining,
        next;

    while (pt) {
      next = pt._next;

      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }

      pt = next;
    }

    return !hasNonDependentRemaining;
  },
      _setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  },
      _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt,
        next,
        pt2,
        first,
        last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

    while (pt) {
      next = pt._next;
      pt2 = first;

      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }

      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }

      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }

      pt = next;
    }

    parent._pt = first;
  }; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


  var PropTween = /*#__PURE__*/function () {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;

      if (next) {
        next._prev = this;
      }
    }

    var _proto4 = PropTween.prototype;

    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target; //modifier target

      this.tween = tween;
    };

    return PropTween;
  }(); //Initialization tasks

  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
    return _reservedProps[name] = 1;
  });

  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  /*
   * --------------------------------------------------------------------------------------
   * GSAP
   * --------------------------------------------------------------------------------------
   */

  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(function (config) {
        return _createPlugin(config);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

      var getter = _getCache(target || {}).get,
          format = unit ? _passThrough : _numericIfPossible;

      unit === "native" && (unit = "");
      return !target ? target : !property ? function (property, unit, uncache) {
        return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);

      if (target.length > 1) {
        var setters = target.map(function (t) {
          return gsap.quickSetter(t, property, unit);
        }),
            l = setters.length;
        return function (value) {
          var i = l;

          while (i--) {
            setters[i](value);
          }
        };
      }

      target = target[0] || {};

      var Plugin = _plugins[property],
          cache = _getCache(target),
          p = cache.harness && (cache.harness.aliases || {})[property] || property,
          // in case it's an alias, like "rotate" for "rotation".
      setter = Plugin ? function (value) {
        var p = new Plugin();
        _quickTween._pt = 0;
        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p.render(1, p);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);

      return Plugin ? setter : function (value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref) {
      var name = _ref.name,
          effect = _ref.effect,
          plugins = _ref.plugins,
          defaults = _ref.defaults,
          extendTimeline = _ref.extendTimeline;
      (plugins || "").split(",").forEach(function (pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });

      _effects[name] = function (targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
      };

      if (extendTimeline) {
        Timeline.prototype[name] = function (targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }

      var tl = new Timeline(vars),
          child,
          next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

      _globalTimeline.remove(tl);

      tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;

      while (child) {
        next = child._next;

        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }

        child = next;
      }

      _addToTimeline(_globalTimeline, tl, 0);

      return tl;
    },
    utils: {
      wrap: wrap,
      wrapYoyo: wrapYoyo,
      distribute: distribute,
      random: random,
      snap: snap,
      normalize: normalize,
      getUnit: getUnit,
      clamp: clamp,
      splitColor: splitColor,
      toArray: toArray,
      mapRange: mapRange,
      pipe: pipe,
      unitize: unitize,
      interpolate: interpolate,
      shuffle: shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween: PropTween,
      globals: _addGlobal,
      Tween: Tween,
      Timeline: Timeline,
      Animation: Animation,
      getCache: _getCache,
      _removeLinkedListItem: _removeLinkedListItem
    }
  };

  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
    return _gsap[name] = Tween[name];
  });

  _ticker.add(Timeline.updateRoot);

  _quickTween = _gsap.to({}, {
    duration: 0
  }); // ---- EXTRA PLUGINS --------------------------------------------------------

  var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;

    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }

    return pt;
  },
      _addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets,
        p,
        i,
        pt;

    for (p in modifiers) {
      i = targets.length;

      while (i--) {
        pt = tween._ptLookup[i][p];

        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            // is a plugin
            pt = _getPluginPropTween(pt, p);
          }

          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  },
      _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
      name: name,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init(target, vars, tween) {
        tween._onInit = function (tween) {
          var temp, p;

          if (_isString(vars)) {
            temp = {};

            _forEachName(vars, function (name) {
              return temp[name] = 1;
            }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


            vars = temp;
          }

          if (modifier) {
            temp = {};

            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }

            vars = temp;
          }

          _addModifiers(tween, vars);
        };
      }
    };
  }; //register core plugins


  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt;

      for (p in vars) {
        pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
        pt && (pt.op = p);

        this._props.push(p);
      }
    }
  }, {
    name: "endArray",
    init: function init(target, value) {
      var i = value.length;

      while (i--) {
        this.add(target, i, target[i] || 0, value[i]);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

  Tween.version = Timeline.version = gsap.version = "3.5.1";
  _coreReady = 1;

  if (_windowExists()) {
    _wake();
  }

  /*!
   * CSSPlugin 3.5.1
   * https://greensock.com
   *
   * Copyright 2008-2020, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */

  var _win$1,
      _doc$1,
      _docElement,
      _pluginInitted,
      _tempDiv,
      _tempDivStyler,
      _recentSetterPlugin,
      _windowExists$1 = function _windowExists() {
    return typeof window !== "undefined";
  },
      _transformProps = {},
      _RAD2DEG = 180 / Math.PI,
      _DEG2RAD = Math.PI / 180,
      _atan2 = Math.atan2,
      _bigNum$1 = 1e8,
      _capsExp = /([A-Z])/g,
      _horizontalExp = /(?:left|right|width|margin|padding|x)/i,
      _complexExp = /[\s,\(]\S/,
      _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
      _renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
  },
      //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
  _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
  },
      _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  },
      _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  },
      _setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
  },
      _setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
  },
      _setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
  },
      _setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  },
      _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  },
      _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  },
      _transformProp = "transform",
      _transformOriginProp = _transformProp + "Origin",
      _supports3D,
      _createElement = function _createElement(type, ns) {
    var e = _doc$1.createElementNS ? _doc$1.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$1.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

    return e.style ? e : _doc$1.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
  },
      _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
  },
      _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
      _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || _tempDiv,
        s = e.style,
        i = 5;

    if (property in s && !preferPrefix) {
      return property;
    }

    property = property.charAt(0).toUpperCase() + property.substr(1);

    while (i-- && !(_prefixes[i] + property in s)) {}

    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  },
      _initCore = function _initCore() {
    if (_windowExists$1() && window.document) {
      _win$1 = window;
      _doc$1 = _win$1.document;
      _docElement = _doc$1.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _tempDivStyler = _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

      _supports3D = !!_checkPropPrefix("perspective");
      _pluginInitted = 1;
    }
  },
      _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox; //store the original

        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }

    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;

    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  },
      _getBBox = function _getBBox(target) {
    var bounds;

    try {
      bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }

    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  },
      _isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      //reports if the element is an SVG on which getBBox() actually works
  _removeProperty = function _removeProperty(target, property) {
    if (property) {
      var style = target.style;

      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }

      if (style.removeProperty) {
        if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          property = "-" + property;
        }

        style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        style.removeAttribute(property);
      }
    }
  },
      _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;

    plugin._props.push(property);

    return pt;
  },
      _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  },
      //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
  _convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0,
        curUnit = (value + "").trim().substr((curValue + "").length) || "px",
        // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
    style = _tempDiv.style,
        horizontal = _horizontalExp.test(property),
        isRootSVG = target.tagName.toLowerCase() === "svg",
        measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
        amount = 100,
        toPixels = unit === "px",
        toPercent = unit === "%",
        px,
        parent,
        cache,
        isSVG;

    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }

    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);

    if (toPercent && (_transformProps[property] || ~property.indexOf("adius"))) {
      //transforms and borderRadius are relative to the size of the element itself!
      return _round(curValue / (isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty]) * amount);
    }

    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }

    if (!parent || parent === _doc$1 || !parent.appendChild) {
      parent = _doc$1.body;
    }

    cache = parent._gsap;

    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
      return _round(curValue / cache.width * amount);
    } else {
      (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";

      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }

    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  },
      _get = function _get(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();

    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];

      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }

    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];

      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
      }
    }

    return unit && !~(value + "").indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  },
      _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    //note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    if (!start || start === "none") {
      // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
      var p = _checkPropPrefix(prop, target, 1),
          s = p && _getComputedProperty(target, p, 1);

      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
      }
    }

    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
        index = 0,
        matchIndex = 0,
        a,
        result,
        startValues,
        startNum,
        color,
        startValue,
        endValue,
        endNum,
        chunk,
        endUnit,
        startUnit,
        relative,
        endValues;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings

    end += "";

    if (end === "auto") {
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      target.style[prop] = start;
    }

    a = [start, end];

    _colorStringFilter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];

    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);

        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }

        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          relative = endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

          if (relative) {
            endValue = endValue.substr(2);
          }

          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;

          if (!endUnit) {
            //if something like "perspective:300" is passed in and we must add a unit to the end
            endUnit = endUnit || _config.units[prop] || startUnit;

            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }

          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          } //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: relative ? relative * endNum : endNum - startNum,
            m: color && color < 4 ? Math.round : 0
          };
        }
      }

      pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }

    if (_relExp.test(end)) {
      pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    }

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

    return pt;
  },
      _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
      _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "),
        x = split[0],
        y = split[1] || "50%";

    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      //the user provided them in the wrong order, so flip them
      value = x;
      x = y;
      y = value;
    }

    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  },
      _renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t,
          style = target.style,
          props = data.u,
          cache = target._gsap,
          prop,
          clearTransforms,
          i;

      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;

        while (--i > -1) {
          prop = props[i];

          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }

          _removeProperty(target, prop);
        }
      }

      if (clearTransforms) {
        _removeProperty(target, _transformProp);

        if (cache) {
          cache.svg && target.removeAttribute("transform");

          _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


          cache.uncache = 1;
        }
      }
    }
  },
      // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
  _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;

        plugin._props.push(property);

        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */

  },

  /*
   * --------------------------------------------------------------------------------------
   * TRANSFORMS
   * --------------------------------------------------------------------------------------
   */
  _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _rotationalProperties = {},
      _isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  },
      _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = _getComputedProperty(target, _transformProp);

    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  },
      _getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || _getCache(target),
        style = target.style,
        matrix = _getComputedTransformMatrixAsArray(target),
        parent,
        nextSibling,
        temp,
        addedToDOM;

    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;

      if (!parent || !target.offsetParent) {
        // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
        addedToDOM = 1; //flag

        nextSibling = target.nextSibling;

        _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

      }

      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");

      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }

    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  },
      _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap,
        matrix = matrixArray || _getMatrix(target, true),
        xOriginOld = cache.xOrigin || 0,
        yOriginOld = cache.yOrigin || 0,
        xOffsetOld = cache.xOffset || 0,
        yOffsetOld = cache.yOffset || 0,
        a = matrix[0],
        b = matrix[1],
        c = matrix[2],
        d = matrix[3],
        tx = matrix[4],
        ty = matrix[5],
        originSplit = origin.split(" "),
        xOrigin = parseFloat(originSplit[0]) || 0,
        yOrigin = parseFloat(originSplit[1]) || 0,
        bounds,
        determinant,
        x,
        y;

    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }

    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }

    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }

    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  },
      _parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new GSCache(target);

    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }

    var style = target.style,
        invertedScaleX = cache.scaleX < 0,
        px = "px",
        deg = "deg",
        origin = _getComputedProperty(target, _transformOriginProp) || "0",
        x,
        y,
        z,
        scaleX,
        scaleY,
        rotation,
        rotationX,
        rotationY,
        skewX,
        skewY,
        perspective,
        xOrigin,
        yOrigin,
        matrix,
        angle,
        cos,
        sin,
        a,
        b,
        c,
        d,
        a12,
        a22,
        t1,
        t2,
        t3,
        a13,
        a23,
        a33,
        a42,
        a43,
        a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    matrix = _getMatrix(target, cache.svg);

    if (cache.svg) {
      t1 = !cache.uncache && target.getAttribute("data-svg-origin");

      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }

    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;

    if (matrix !== _identity2DMatrix) {
      a = matrix[0]; //a11

      b = matrix[1]; //a21

      c = matrix[2]; //a31

      d = matrix[3]; //a41

      x = a12 = matrix[4];
      y = a22 = matrix[5]; //2D matrix

      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.cos(skewX * _DEG2RAD));

        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        } //3D matrix

      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY


        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        } //rotationZ


        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }

        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }

        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }

      if (cache.svg) {
        //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }

    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }

    cache.x = ((cache.xPercent = x && Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0) ? 0 : x) + px;
    cache.y = ((cache.yPercent = y && Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0) ? 0 : y) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;

    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }

    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  },
      _firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  },
      //for handling transformOrigin values, stripping out the 3rd dimension
  _addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  },
      _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;

    _renderCSSTransforms(ratio, cache);
  },
      _zeroDeg = "0deg",
      _zeroPx = "0px",
      _endParenthesis = ") ",
      _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this,
        xPercent = _ref.xPercent,
        yPercent = _ref.yPercent,
        x = _ref.x,
        y = _ref.y,
        z = _ref.z,
        rotation = _ref.rotation,
        rotationY = _ref.rotationY,
        rotationX = _ref.rotationX,
        skewX = _ref.skewX,
        skewY = _ref.skewY,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        transformPerspective = _ref.transformPerspective,
        force3D = _ref.force3D,
        target = _ref.target,
        zOrigin = _ref.zOrigin,
        transforms = "",
        use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD,
          a13 = Math.sin(angle),
          a33 = Math.cos(angle),
          cos;

      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }

    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }

    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }

    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }

    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }

    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }

    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }

    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }

    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }

    target.style[_transformProp] = transforms || "translate(0, 0)";
  },
      _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this,
        xPercent = _ref2.xPercent,
        yPercent = _ref2.yPercent,
        x = _ref2.x,
        y = _ref2.y,
        rotation = _ref2.rotation,
        skewX = _ref2.skewX,
        skewY = _ref2.skewY,
        scaleX = _ref2.scaleX,
        scaleY = _ref2.scaleY,
        target = _ref2.target,
        xOrigin = _ref2.xOrigin,
        yOrigin = _ref2.yOrigin,
        xOffset = _ref2.xOffset,
        yOffset = _ref2.yOffset,
        forceCSS = _ref2.forceCSS,
        tx = parseFloat(x),
        ty = parseFloat(y),
        a11,
        a21,
        a12,
        a22,
        temp;

    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);

    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }

    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;

      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;

        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }

      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }

    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }

    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }

    if (xPercent || yPercent) {
      //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }

    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);

    if (forceCSS) {
      //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
      target.style[_transformProp] = temp;
    }
  },
      _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue, relative) {
    var cap = 360,
        isString = _isString(endValue),
        endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
        change = relative ? endNum * relative : endNum - startNum,
        finalValue = startNum + change + "deg",
        direction,
        pt;

    if (isString) {
      direction = endValue.split("_")[1];

      if (direction === "short") {
        change %= cap;

        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }

      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum$1) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum$1) % cap - ~~(change / cap) * cap;
      }
    }

    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";

    plugin._props.push(property);

    return pt;
  },
      _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
    var style = _tempDivStyler.style,
        startCache = target._gsap,
        exclude = "perspective,force3D,transformOrigin,svgOrigin",
        endCache,
        p,
        startValue,
        endValue,
        startNum,
        endNum,
        startUnit,
        endUnit;
    style.cssText = getComputedStyle(target).cssText + ";position:absolute;display:block;"; //%-based translations will fail unless we set the width/height to match the original target (and padding/borders can affect it)

    style[_transformProp] = transforms;

    _doc$1.body.appendChild(_tempDivStyler);

    endCache = _parseTransform(_tempDivStyler, 1);

    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];

      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, startCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;

        plugin._props.push(p);
      }
    }

    _doc$1.body.removeChild(_tempDivStyler);
  }; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


  _forEachName("padding,margin,Width,Radius", function (name, index) {
    var t = "Top",
        r = "Right",
        b = "Bottom",
        l = "Left",
        props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
      return index < 2 ? name + side : "border" + side + name;
    });

    _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
      var a, vars;

      if (arguments.length < 4) {
        // getter, passed target, property, and unit (from _get())
        a = props.map(function (prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }

      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function (prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });

  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
      var props = this._props,
          style = target.style,
          startValue,
          endValue,
          endNum,
          startNum,
          type,
          specialProp,
          p,
          startUnit,
          endUnit,
          relative,
          isTransformRelated,
          transformPropTween,
          cache,
          smooth,
          hasPriority;
      _pluginInitted || _initCore();

      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }

        endValue = vars[p];

        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          //plugins
          continue;
        }

        type = typeof endValue;
        specialProp = _specialProps[p];

        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }

        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }

        if (specialProp) {
          if (specialProp(this, target, p, endValue, tween)) {
            hasPriority = 1;
          }
        } else if (p.substr(0, 2) === "--") {
          //CSS variable
          this.add(style, "setProperty", getComputedStyle(target).getPropertyValue(p) + "", endValue + "", index, targets, 0, 0, p);
        } else if (type !== "undefined") {
          startValue = _get(target, p);
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" ? +(endValue.charAt(0) + "1") : 0;

          if (relative) {
            endValue = endValue.substr(2);
          }

          endNum = parseFloat(endValue);

          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
                startNum = 0;
              }

              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }

            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }

          isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

          if (isTransformRelated) {
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform || _parseTransform(target); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

              transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
            }

            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, relative ? relative * endNum : endNum - cache.scaleY);
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }

              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);

              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, endValue, relative);

              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);

              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }

          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0); // protect against NaN

            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, relative ? relative * endNum : endNum - startNum, endUnit === "px" && vars.autoRound !== false && !isTransformRelated ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;

            if (startUnit !== endUnit) {
              //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
              this.add(target, p, target[p], endValue, index, targets);
            } else {
              _missingPlugin(p, endValue);

              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, endValue);
          }

          props.push(p);
        }
      }

      hasPriority && _sortPropTweensByPriority(this);
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty: _removeProperty,
      _getMatrix: _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;

  (function (positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
      _transformProps[name] = 1;
    });

    _forEachName(rotation, function (name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });

    _propertyAliases[all[13]] = positionAndScale + "," + rotation;

    _forEachName(aliases, function (name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
    _config.units[name] = "px";
  });

  gsap.registerPlugin(CSSPlugin);

  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap, // to protect from tree shaking
  	TweenMaxWithCSS = gsapWithCSS.core.Tween;

  //BONUS EXPORTS
  //export * from "./CustomEase.js";
  //export * from "./DrawSVGPlugin.js";
  //export * from "./Physics2DPlugin.js";
  //export * from "./PhysicsPropsPlugin.js";
  //export * from "./ScrambleTextPlugin.js";
  //export * from "./CustomBounce.js";
  //export * from "./CustomWiggle.js";
  //export * from "./GSDevTools.js";
  //export * from "./InertiaPlugin.js";
  //export * from "./MorphSVGPlugin.js";
  //export * from "./MotionPathHelper.js";
  //export * from "./SplitText.js";

  var _facePointer = {
    // The pointer element
    $pointer: null,

    // Pointers position
    pointer: { x: 0, y: 0 },

    // Used to smoothen out the pointer
    tween: {
      x: 0,
      y: 0,
      positionList: []
    },

    config: {
      offset: {
        x: 0,
        y: 0,
        // A little nudge for when camera is above screen
        pitch: -15,
        yaw: -12,
        roll: 0
      },

      speed: {
        x: 1,
        y: 1
      }
    },

    /**
     * Create a pointer for each user
     */
    onUse() {
      if (!this.$pointer) {
        const $pointer = document.createElement('div');
        $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-face', 'handsfree-hide-when-started-without-weboji');
        document.body.appendChild($pointer);
        this.$pointer = $pointer;
      }

      this.pointer = { x: 0, y: 0 };
    },

    onEnable() {
      this.onUse();
    },

    onFrame({ weboji }) {
      if (!weboji) return

      // Get X/Y as if looking straight aweboji
      let x = weboji.translation[0] * window.outerWidth;
      let y = window.outerHeight - weboji.translation[1] * window.outerHeight;
      let z = (1 - weboji.translation[2]) * window.outerWidth * 2.5;

      // Add pitch/yaw
      x +=
        z *
        Math.tan(weboji.rotation[1] + (this.config.offset.yaw * Math.PI) / 180) *
        this.config.speed.x;

      y +=
        z *
          Math.tan(
            weboji.rotation[0] + (this.config.offset.pitch * Math.PI) / 180
          ) *
          this.config.speed.y -
        window.outerHeight;

      // Add offsets
      x += this.config.offset.x;
      y += this.config.offset.y;

      // @todo Make the sensitivity variable
      TweenMaxWithCSS.to(this.tween, 1, {
        x,
        y,
        overwrite: true,
        ease: 'linear.easeNone',
        immediateRender: true
      });

      this.$pointer.style.left = `${this.tween.x}px`;
      this.$pointer.style.top = `${this.tween.y}px`;
      weboji.pointer = {
        x: this.tween.x,
        y: this.tween.y
      };
    },

    /**
     * Toggle pointer
     */
    onDisable() {
      this.$pointer.classList.add('handsfree-hidden');
    },
    onEnable() {
      this.$pointer.classList.remove('handsfree-hidden');
    }
  };

  /**
   * Click on things with a gesture
   */
  var _faceClick = {
    config: {
      // How often in milliseconds to trigger clicks
      throttle: 50,

      // Max number of frames to keep down
      maxMouseDownedFrames: 1,

      // Morphs to watch for and their required confidences
      morphs: {
        0: 0.25,
        1: 0.25
      }
    },

    // Number of frames mouse has been downed
    mouseDowned: 0,
    // Is the mouse up?
    mouseUp: false,
    // Whether one of the morph confidences have been met
    thresholdMet: false,

    onUse() {
      this.throttle(this.config.throttle);
    },

    /**
     * Maps .maybeClick to a new throttled function
     */
    throttle(throttle) {
      this.maybeClick = this.handsfree.throttle(
        function(weboji) {
          this.click(weboji);
        },
        throttle,
        { trailing: false }
      );
    },

    /**
     * Detect click state and trigger a real click event
     */
    onFrame({ weboji }) {
      if (!weboji) return

      // @FIXME we shouldn't need to do this, but this is occasionally reset to {x: 0, y: 0} when running in client mode
      if (!weboji.pointer.x && !weboji.pointer.y) return

      // Detect if the threshold for clicking is met with specific morphs
      this.thresholdMet = false;
      Object.keys(this.config.morphs).forEach((key) => {
        const morph = +this.config.morphs[key];
        if (morph > 0 && weboji.morphs[key] >= morph) this.thresholdMet = true;
      });

      // Click/release and add body classes
      if (this.thresholdMet) {
        this.mouseDowned++;
        document.body.classList.add('handsfree-clicked');
      } else {
        this.mouseUp = this.mouseDowned;
        this.mouseDowned = 0;
        document.body.classList.remove('handsfree-clicked');
      }

      // Set the state
      if (
        this.mouseDowned > 0 &&
        this.mouseDowned <= this.config.maxMouseDownedFrames
      )
        weboji.pointer.state = 'mouseDown';
      else if (this.mouseDowned > this.config.maxMouseDownedFrames)
        weboji.pointer.state = 'mouseDrag';
      else if (this.mouseUp) weboji.pointer.state = 'mouseUp';
      else ;

      // Actually click something (or focus it)
      if (weboji.pointer.state === 'mouseDown') {
        this.maybeClick(weboji);
      }
    },

    /**
     * The actual click method, this is what gets throttled
     */
    click(weboji) {
      const $el = document.elementFromPoint(weboji.pointer.x, weboji.pointer.y);
      if ($el) {
        $el.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: weboji.pointer.x,
            clientY: weboji.pointer.y
          })
        );

        // Focus
        if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
          $el.focus();

        weboji.pointer.$target = $el;
      }
    },

    /**
     * Throttles the click event
     * - Defined in onuse
     */
    maybeClick: function() {}
  };

  /**
   * Hides the pointer after numFramesToGhost frames
   */
  var _faceGhostedPointer = {
    // Disable by default
    enabled: false,
    // Number of frames held still
    framesStill: 0,

    config: {
      // Number of frames held to ghost a pointer
      numFramesToGhost: 90,
      // Number of pixels required to update number frames held
      distToReset: 6
    },

    last: {
      x: 0,
      y: 0
    },

    onDisable({ weboji }) {
      if (!weboji) return

      this.handsfree.plugin.facePointer.$pointer.classList.remove(
        'handsfree-pointer-hidden'
      );
    },

    /**
     * Handles ghosting
     */
    onFrame({ weboji }) {
      const dist = Math.sqrt(
        Math.pow(this.last.x - weboji.pointer.x, 2) +
          Math.pow(this.last.y - weboji.pointer.y, 2)
      );

      if (dist < this.config.distToReset) {
        this.framesStill += 1;
      } else {
        this.framesStill = 0;
      }

      if (this.framesStill > this.config.numFramesToGhost) {
        this.handsfree.plugin.facePointer.$pointer.classList.add(
          'handsfree-pointer-hidden'
        );
      } else {
        this.handsfree.plugin.facePointer.$pointer.classList.remove(
          'handsfree-pointer-hidden'
        );
      }

      this.last.x = weboji.pointer.x;
      this.last.y = weboji.pointer.y;
    }
  };

  /**
   * Scrolls the page vertically
   */
  var _faceScroll = {
    // Number of frames the current element is the same as the last
    numFramesFocused: 0,
    // The last scrollable target focused
    $lastTarget: null,
    // The current scrollable target
    $target: null,

    config: {
      // Number of frames over the same element before activating that element
      framesToFocus: 10,

      vertScroll: {
        // The multiplier to scroll by. Lower numbers are slower
        scrollSpeed: 0.15,
        // How many pixels from the the edge to scroll
        scrollZone: 100
      }
    },

    onUse () {
      this.$target = window;
    },

    /**
     * Scroll the page when the cursor goes above/below the threshold
     */
    onFrame({ weboji }) {
      if (!weboji) return

      // @FIXME we shouldn't need to do this, but this is occasionally reset to {x: 0, y: 0} when running in client mode
      if (!weboji.pointer.x && !weboji.pointer.y) return

      // Check for hover
      this.checkForFocus(weboji);
      let isScrolling = false;

      // Get bounds
      let bounds;
      let scrollTop = this.getTargetScrollTop();

      if (this.$target.getBoundingClientRect) {
        bounds = this.$target.getBoundingClientRect();
      } else {
        bounds = { top: 0, bottom: window.innerHeight };
      }

      // Check on click
      if (weboji.pointer.state === 'mouseDown') {
        this.numFramesFocused = 0;
        this.maybeSetTarget(weboji);
      }

      // Scroll up
      if (weboji.pointer.y < bounds.top + this.config.vertScroll.scrollZone) {
        this.$target.scrollTo(
          0,
          scrollTop +
            (weboji.pointer.y - bounds.top - this.config.vertScroll.scrollZone) *
              this.config.vertScroll.scrollSpeed
        );

        isScrolling = true;
      }

      // Scroll down
      if (weboji.pointer.y > bounds.bottom - this.config.vertScroll.scrollZone) {
        this.$target.scrollTo(
          0,
          scrollTop -
            (bounds.bottom -
              weboji.pointer.y -
              this.config.vertScroll.scrollZone) *
              this.config.vertScroll.scrollSpeed
        );

        isScrolling = true;
      }

      isScrolling && this.maybeSelectNewTarget();
    },

    /**
     * Check that the scroll is actually happening, otherwise traverse up the DOM
     */
    maybeSelectNewTarget() {
      let curScrollTop = this.getTargetScrollTop();
      let didNotScroll = false;

      // Check if we have scrolled up
      this.$target.scrollTo(0, curScrollTop + 1);
      if (curScrollTop === this.getTargetScrollTop()) {
        didNotScroll = true;
      } else {
        this.$target.scrollTo(0, curScrollTop - 1);
        return
      }

      // Check if we have scrolled down
      this.$target.scrollTo(0, curScrollTop - 1);
      if (curScrollTop === this.getTargetScrollTop()) {
        if (didNotScroll) {
          this.numFramesFocused = 0;

          this.selectTarget(
            this.recursivelyFindScrollbar(this.$target.parentElement)
          );
        }
      } else {
        this.$target.scrollTo(0, curScrollTop + 1);
        return
      }
    },

    /**
     * Gets the scrolltop, taking account the window object
     */
    getTargetScrollTop() {
      return this.$target.scrollY || this.$target.scrollTop || 0
    },

    /**
     * Checks to see if we've hovered over an element for x turns
     */
    checkForFocus: throttle_1(function(weboji) {
      let $potTarget = document.elementFromPoint(
        weboji.pointer.x,
        weboji.pointer.y
      );
      if (!$potTarget) return
      $potTarget = this.recursivelyFindScrollbar($potTarget);

      if ($potTarget === this.$lastTarget) {
        ++this.numFramesFocused;
      } else {
        this.numFramesFocused = 0;
      }

      if (this.numFramesFocused > this.config.framesToFocus) {
        this.selectTarget($potTarget);
      }

      this.$lastTarget = $potTarget;
    }, 100),

    /**
     * Select and style the element
     */
    selectTarget($potTarget) {
      // Check required in case the window is the target
      if (this.$target.classList) {
        this.$target.classList.remove('handsfree-scroll-focus');
      }
      if ($potTarget && $potTarget.classList) {
        $potTarget.classList.add('handsfree-scroll-focus');
      }

      if ($potTarget.nodeName === 'HTML' || !$potTarget.nodeName) {
        $potTarget = window;
      }

      this.$target = $potTarget;
    },

    /**
     * Sets a new scroll target on click
     */
    maybeSetTarget(weboji) {
      if (weboji.pointer.state === 'mouseDown' && weboji.pointer.$target) {
        this.selectTarget(this.recursivelyFindScrollbar(weboji.pointer.$target));
      }
    },

    /**
     * Traverses up the DOM until a scrollbar is found, or until we hit the body/window
     */
    recursivelyFindScrollbar($target) {
      const styles =
        $target && $target.getBoundingClientRect ? getComputedStyle($target) : {};

      if (
        $target &&
        $target.scrollHeight > $target.clientHeight &&
        (styles.overflow === 'auto' ||
          styles.overflow === 'auto scroll' ||
          styles.overflowY === 'auto' ||
          styles.overflowY === 'auto scroll')
      ) {
        return $target
      } else {
        if ($target && $target.parentElement) {
          return this.recursivelyFindScrollbar($target.parentElement)
        } else {
          return window
        }
      }
    }
  };

  var _fingerPointer = {
    enabled: false,
    
    // The pointer element
    $pointer: null,

    // Pointers position
    pointer: { x: 0, y: 0 },

    // Used to smoothen out the pointer
    tween: {
      x: 0,
      y: 0,
      positionList: []
    },

    config: {
      offset: {
        x: 0,
        y: 0,
        // A little nudge for when camera is above screen
        pitch: -15,
        yaw: -12,
        roll: 0
      },

      speed: {
        x: 1,
        y: 1
      }
    },

    /**
     * Create a pointer for each user
     */
    onUse() {
      if (!this.$pointer) {
        const $pointer = document.createElement('div');
        $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-finger', 'handsfree-hide-when-started-without-handpose');
        document.body.appendChild($pointer);
        this.$pointer = $pointer;
      }

      this.pointer = { x: 0, y: 0 };
    },

    onEnable() {
      this.onUse();
    },

    onFrame({ handpose }) {
      if (!handpose || !handpose.annotations) return

      this.handsfree.handpose.updateMeshes(handpose);
      this.handsfree.handpose.three.renderer.render(this.handsfree.handpose.three.scene, this.handsfree.handpose.three.camera);

      this.handsfree.handpose.three.raycaster.set(this.handsfree.handpose.three.arrow.position, this.handsfree.handpose.three.arrow.direction.normalize());
      const hits = this.handsfree.handpose.three.raycaster.intersectObject(this.handsfree.handpose.three.screen, true);

      if (hits && hits.length) {
        TweenMaxWithCSS.to(this.tween, 1, {
          x: window.outerWidth - this.handsfree.normalize(this.handsfree.handpose.three.renderer.domElement.width - (hits[0].point.x + this.handsfree.handpose.three.renderer.domElement.width / 2), this.handsfree.handpose.three.renderer.domElement.width) * window.outerWidth,
          y: this.handsfree.normalize(hits[0].point.y + this.handsfree.handpose.three.renderer.domElement.height / 2, this.handsfree.handpose.three.renderer.domElement.height) * window.outerHeight, 
          overwrite: true,
          ease: 'linear.easeNone',
          immediate: true
        });
      }

      this.$pointer.style.left = `${this.tween.x}px`;
      this.$pointer.style.top = `${this.tween.y}px`;
      
      handpose.pointer = {
        x: this.tween.x,
        y: this.tween.y
      };
    },

    /**
     * Toggle pointer
     */
    onDisable() {
      this.$pointer.classList.add('handsfree-hidden');
    },

    onEnable() {
      this.$pointer.classList.remove('handsfree-hidden');
    }
  };

  /**
   * Move a pointer with your palm
   */

  var _palmPointer = {
    // The pointer element
    $pointer: null,

    // Pointers position
    pointer: { x: 0, y: 0 },

    // Used to smoothen out the pointer
    tween: {
      x: 0,
      y: 0,
      positionList: []
    },

    config: {
      offset: {
        x: 0,
        y: -0.75
      },

      speed: {
        x: 1.5,
        y: 1.5
      }
    },

    /**
     * Create a pointer for each user
     */
    onUse() {
      if (!this.$pointer) {
        const $pointer = document.createElement('div');
        $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-finger', 'handsfree-hide-when-started-without-handpose');
        document.body.appendChild($pointer);
        this.$pointer = $pointer;
      }

      this.pointer = { x: 0, y: 0 };
    },

    onEnable() {
      this.onUse();
    },

    onFrame({ hand }) {
      if (!hand || !hand.annotations) return

      TweenMaxWithCSS.to(this.tween, 1, {
        x: this.handsfree.normalize(hand.annotations.palmBase[0][0], this.handsfree.feedback.$video.width * .85) * (window.outerWidth * this.config.speed.x) + this.config.offset.x,
        y: this.handsfree.normalize(this.handsfree.feedback.$video.height * .85 - hand.annotations.palmBase[0][1], this.handsfree.feedback.$video.height * .85) * (window.outerHeight * this.config.speed.y) + (window.outerHeight * this.config.offset.y),
        overwrite: true,
        ease: 'linear.easeNone',
        immediate: true
      });

      this.$pointer.style.left = `${this.tween.x}px`;
      this.$pointer.style.top = `${this.tween.y}px`;
      
      hand.pointer = {
        x: this.tween.x,
        y: this.tween.y
      };
    },

    /**
     * Toggle pointer
     */
    onDisable() {
      this.$pointer.classList.add('handsfree-hidden');
    },

    onEnable() {
      this.$pointer.classList.remove('handsfree-hidden');
    }
  };

  /**
   * Click on things with a pinch gesture
   */
  var _pinchClick = {
    config: {
      // How often in milliseconds to trigger clicks
      throttle: 50,

      // Max number of frames to keep down
      maxMouseDownedFrames: 1,

      // Number of pixels that the finger/thumb tips must be within to trigger a click
      pinchDistance: 40
    },

    // Number of frames mouse has been downed
    mouseDowned: 0,
    // Is the mouse up?
    mouseUp: false,
    // Whether one of the morph confidences have been met
    thresholdMet: false,

    onUse() {
      this.throttle(this.config.throttle);
    },

    /**
     * Maps .maybeClick to a new throttled function
     */
    throttle(throttle) {
      this.maybeClick = this.handsfree.throttle(
        function(hand) {
          this.click(hand);
        },
        throttle,
        { trailing: false }
      );
    },

    /**
     * Detect click state and trigger a real click event
     */
    onFrame({ hand }) {
      if (!hand || !hand.annotations) return

      // Detect if the threshold for clicking is met with specific morphs
      const a = hand.annotations.indexFinger[3][0] - hand.annotations.thumb[3][0];
      const b = hand.annotations.indexFinger[3][1] - hand.annotations.thumb[3][1];
      const c = Math.sqrt(a*a + b*b);
      this.thresholdMet = c < this.config.pinchDistance;

      // Click/release and add body classes
      if (this.thresholdMet) {
        this.mouseDowned++;
        document.body.classList.add('handsfree-clicked');
      } else {
        this.mouseUp = this.mouseDowned;
        this.mouseDowned = 0;
        document.body.classList.remove('handsfree-clicked');
      }

      // Set the state
      if (this.mouseDowned > 0 && this.mouseDowned <= this.config.maxMouseDownedFrames)
        hand.pointer.state = 'mouseDown';
      else if (this.mouseDowned > this.config.maxMouseDownedFrames)
        hand.pointer.state = 'mouseDrag';
      else if (this.mouseUp) hand.pointer.state = 'mouseUp';
      else ;

      // Actually click something (or focus it)
      if (hand.pointer.state === 'mouseDown') {
        this.maybeClick(hand);
      }
    },

    /**
     * The actual click method, this is what gets throttled
     */
    click(hand) {
      const $el = document.elementFromPoint(hand.pointer.x, hand.pointer.y);
      if ($el) {
        $el.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: hand.pointer.x,
            clientY: hand.pointer.y
          })
        );

        // Focus
        if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
          $el.focus();

        hand.pointer.$target = $el;
      }
    },

    /**
     * Throttles the click event
     * - Defined in onuse
     */
    maybeClick: function() {}
  };

  /**
   * Scrolls the page vertically by closing hand
   */
  var _handScroll = {
    // Number of frames the current element is the same as the last
    numFramesFocused: 0,
    // The current scrollable target
    $target: null,

    // The original grab point
    origScrollTop: {
      x: 0,
      y: 0
    },

    // Number of frames that has passed since the last grab
    framesSinceLastGrab: 0,

    config: {
      // Number of frames over the same element before activating that element
      framesToFocus: 10,

      // Number of pixels the middle and thumb tips must be near each other to drag
      threshold: 60,

      // Number of frames where a hold is not registered before releasing a drag
      numThresholdErrorFrames: 5,

      vertScroll: {
        // The multiplier to scroll by. Lower numbers are slower
        scrollSpeed: 0.15,
        // How many pixels from the the edge to scroll
        scrollZone: 100
      }
    },

    onUse () {
      this.$target = window;
    },

    /**
     * Scroll the page when the cursor goes above/below the threshold
     */
    onFrame({hand}) {
      if (!hand || !hand.annotations) return

      // Detect if the threshold for clicking is met with specific morphs
      const a = hand.annotations.middleFinger[3][0] - hand.annotations.thumb[3][0];
      const b = hand.annotations.middleFinger[3][1] - hand.annotations.thumb[3][1];
      const c = Math.sqrt(a*a + b*b);
      this.thresholdMet = c < this.config.threshold;

      // Set the original grab point
      if (this.thresholdMet) {
        if (this.framesSinceLastGrab > this.config.numThresholdErrorFrames) {
          this.checkForFocus(hand);
          this.origScrollTop = this.getTargetScrollTop() + hand.pointer.y;
        }
        this.framesSinceLastGrab = 0;
      }
      ++this.framesSinceLastGrab;
      
      // Scroll
      if (this.framesSinceLastGrab < this.config.numThresholdErrorFrames) {
        this.$target.scrollTo(0, this.origScrollTop - hand.pointer.y);
      }
    },

    /**
     * Gets the scrolltop, taking account the window object
     */
    getTargetScrollTop () {
      return this.$target.scrollY || this.$target.scrollTop || 0
    },

    /**
     * Checks to see if we've hovered over an element for x turns
     */
    checkForFocus (hand) {
      let $potTarget = document.elementFromPoint(
        hand.pointer.x,
        hand.pointer.y
      );
      if (!$potTarget) return

      $potTarget = this.recursivelyFindScrollbar($potTarget);
      this.selectTarget($potTarget);
    },

    /**
     * Select and style the element
     */
    selectTarget ($potTarget) {
      // Check required in case the window is the target
      if (this.$target.classList) {
        this.$target.classList.remove('handsfree-scroll-focus');
      }
      if ($potTarget && $potTarget.classList) {
        $potTarget.classList.add('handsfree-scroll-focus');
      }

      if ($potTarget.nodeName === 'HTML' || !$potTarget.nodeName) {
        $potTarget = window;
      }

      this.$target = $potTarget;
    },

    /**
     * Traverses up the DOM until a scrollbar is found, or until we hit the body/window
     */
    recursivelyFindScrollbar($target) {
      const styles =
        $target && $target.getBoundingClientRect ? getComputedStyle($target) : {};

      if (
        $target &&
        $target.scrollHeight > $target.clientHeight &&
        (styles.overflow === 'auto' ||
          styles.overflow === 'auto scroll' ||
          styles.overflowY === 'auto' ||
          styles.overflowY === 'auto scroll')
      ) {
        return $target
      } else {
        if ($target && $target.parentElement) {
          return this.recursivelyFindScrollbar($target.parentElement)
        } else {
          return window
        }
      }
    }
  };

  // import './assets/handsfree.scss'

  const defaultPlugins = {
    facePointer: _facePointer,
    faceClick: _faceClick,
    faceGhostedPointer: _faceGhostedPointer,
    faceScroll: _faceScroll,
    fingerPointer: _fingerPointer,
    palmPointer: _palmPointer,
    pinchClick: _pinchClick,
    handScroll: _handScroll
  };

  let assetsPath = document.currentScript ? document.currentScript.getAttribute('src') : '';

  // Counter for unique instance IDs
  let id = 0;

  /**
   * Defaults to use for instantiation
   */
  const configDefaults = {
    // Model defaults
    weboji: {
      enabled: false,
      throttle: 0,
      
      // Custom video settings
      videoSettings: null,
      
      // Represents the calibrator settings
      calibrator: {
        // (optional) The target element to act as the calibrator wrapping div
        target: null,
        // The message to display over the marker, can be HTML
        instructions: 'Point head towards center of circle below',
        // (optional if .target === null, otherwise required) The target element to act as the calibrator target (should be inside target)
        marker: null
      },

      // Thresholds needed before these are considered "activated"
      morphs: {
        threshold: {
          smileRight: 0.7,
          smileLeft: 0.7,
          browLeftDown: 0.8,
          browRightDown: 0.8,
          browLeftUp: 0.8,
          browRightUp: 0.8,
          eyeLeftClosed: 0.4,
          eyeRightClosed: 0.4,
          mouthOpen: 0.3,
          mouthRound: 0.8,
          upperLip: 0.5
        }
      }
    },

    posenet: {
      enabled: false,
      throttle: 0,
      imageScaleFactor: 0.3,
      outputStride: 16,
      flipHorizontal: false,
      minConfidence: 0.5,
      maxPoseDetections: 5,
      scoreThreshold: 0.5,
      nmsRadius: 20,
      detectionType: 'single',
      multiplier: 0.75
    },

    handpose: {
      enabled: false,
      
      // How many milliseconds to wait between each inference
      throttle: 0,

      // Model config
      model: {
        // How many frames to go without running the bounding box detector.
        // - Set to a lower value if you want a safety net in case the mesh
        //   detector produces consistently flawed predictions
        maxContinuousChecks: Infinity,

        // Threshold for discarding a prediction
        detectionConfidence: 0.8,

        // A float representing the threshold for deciding whether boxes overlap
        // too much in non-maximum suppression. Must be between [0, 1]
        iouThreshold: 0.3,

        // A threshold for deciding when to remove boxes based on score in non-maximum suppression
        scoreThreshold: 0.75
      }
    },

    feedback: {
      enabled: false,
      // set in constructor due to document not being defined during build
      $target: null
    }
  };

  /**
   * ✨ Handsfree.js
   */
  class Handsfree {
    constructor(config = {}) {
      this.id = ++id;

      // Setup defaults once a context is defined
      configDefaults.feedback.$target = document.body;

      // Determine a default assetsPath, using this <script>'s src
      this._defaultAssetsPath =
        trim_1(assetsPath.substr(0, assetsPath.lastIndexOf('/') + 1), '/') + '/assets/';
      
      // Setup options
      this.updateConfig({
        assetsPath: this._defaultAssetsPath,
        weboji: configDefaults.weboji,
        posenet: configDefaults.posenet,
        handpose: configDefaults.handpose,

        // Plugin overrides
        plugin: {},
        feedback: configDefaults.feedback
      }, config);

      // Flags
      this.isStarted = false;
      this.isLooping = false;

      // Video, canvas, and other feedback elements
      this.feedback = {};
      this.createFeedback();

      // Models
      this.model = {};

      // Plugins
      this.plugin = {};
      this.prevDisabledPlugins = [];
      this.loadDefaultPlugins();

      this.emit('init', this);
    }

    /**
     * Merges new configs
     */
    updateConfig (defaults, config) {
      // Handle aliases
      if (config) {
        if (config.face) config.weboji = config.face;
        if (config.pose) config.posenet = config.pose;
        if (config.hand) config.handpose = config.hand;
      }

      this.config = merge_1(defaults, config);

      // Transform configDefaults (string => [string])
      const configs = ['weboji', 'posenet', 'handpose', 'feedback'];
      configs.forEach(config => {
        if (typeof this.config[config] === 'boolean') {
          let isEnabled = this.config[config];
          this.config[config] = configDefaults[config];
          this.config[config].enabled = isEnabled;
        }
      });

      // Track the models we're using
      this.activeModels = [];
      
      if (this.config.weboji.enabled) this.activeModels.push('weboji');
      if (this.config.posenet.enabled) this.activeModels.push('posenet');
      if (this.config.handpose.enabled) this.activeModels.push('handpose');
    }

    /**
     * Starts Handsfree and updates existing config
     * ⭐ Use this method to safely live-update the user experience,
     * for example when transitioning to a new view or part of a game or app
     * or when switching from a Face Pointer to a Finger Pointer without a refresh
     * 
     * - opts will be deep merged with the handsfree.config
     * - if first argument is a function, then it is used as callback and no updates are done
     * - Once models loaded, starts loop and runs the callback
     * - If already started or no models need to be loaded then any new configs are merged in real time
     *    (eg, running models will be stopped if you explicitely disable them, plugin configs may be udpated)
     * 
     * @param {Opts|Function} opts (Optional) To be merged into. If function, then it is used as callback instead 
     * @param {Function} callback (Optional) The callback to call once everything is started
     */
    start(opts, callback) {
      if (typeof opts === 'function') {
        callback = opts;
      }

      // Merge opts with current config
      this.updateConfig(this.config, opts);
      
      // @todo #63 Start each model that needs to be started
      // @todo #63 Stop active models if required
      // @todo #63 Start the game loop
      
      // Start required models
      this.startModels(this.activeModels);

      // Start game loop
      if (!this.isLooping) {
        this.isLooping = true;
        this.loop();
      }
      
      // Run callback
      callback && callback();
    }

    /**
     * Helper to normalze a value within a max range
     */
    normalize (value, max) {
      return (max - value) / max
    }

    /**
     * The main "Game Loop"
     */
    loop() {
      let data = {};
      let hasData = false;

      // Get model data
      this.activeModels.forEach((modelName) => {
        if (this[modelName].isReady && this[modelName].enabled) {
          this[modelName].getData();
          data[modelName] = this[modelName].data || {};

          // Alias
          if (modelName === 'weboji') {
            data.face = data.weboji;
            this.face = this.weboji;
            if (this.weboji.data) hasData = true;
          }
          if (modelName === 'handpose') {
            data.hand = data.handpose;
            this.hand = this.handpose;
            if (this.handpose.data) hasData = true;
          }
          if (modelName === 'posenet') {
            data.pose = data.posenet;
            this.pose = this.posenet;
            if (this.pose.data) hasData = true;
          }
        }
      });

      // Run on frames
      if (hasData) {
        Object.keys(this.plugin).forEach((name) => {
          this.plugin[name].enabled &&
            this.plugin[name].onFrame &&
            this.plugin[name].onFrame(data);
        });
        this.emit('data', data);
      }

      // Emit event and loop again
      this.isLooping && requestAnimationFrame(() => this.isLooping && this.loop());
    }

    /**
     * Stop all models
     */
    stop() {
      location.reload();
    }

    /**
     * Starts all active models
     * @param {Array} models A list of model names to load
     * @returns {Promise} Resolves after all models loaded or rejected
     */
    startModels(models) {
      return new Promise((resolve) => {
        // Set loading/ready classes
        document.body.classList.add('handsfree-loading');
        let numModels = this.activeModels.length;
        this.on('modelLoaded', () => {
          if (--numModels === 0) {
            document.body.classList.remove('handsfree-loading');
            document.body.classList.add('handsfree-started');
            resolve();
          }
        });

        // Loop through each model and initialize them
        models.forEach((modelName) => {
          switch (modelName) {
            /**
             * Weboji
             */
            case 'head':
            case 'face':
            case 'weboji':
              if (!this.weboji) {
                this.face = this.weboji = new WebojiModel(
                  {
                    name: 'weboji',
                    ...this.config.weboji,
                    deps: this.config.assetsPath + '/jeelizFaceTransfer.js'
                  },
                  this
                );
              } else {
                this.emit('modelLoaded');
              }
              break

            /**
             * PoseNet
             */
            case 'pose':
            case 'posenet':
              if (!this.posenet) {
                this.pose = this.posenet = new PoseNet(
                  {
                    name: 'posenet',
                    ...this.config.posenet,
                    deps: this.config.assetsPath + '/ml5.min.js'
                  },
                  this
                );
              } else {
                this.emit('modelLoaded');
              }
            break

            /**
             * Handpose
             */
            case 'hand':
            case 'handpose':
              if (!this.handpose) {
                this.hand = this.handpose = new Handpose({
                  name: 'handpose',
                  ...this.config.handpose,
                  deps: this.config.assetsPath + '/handpose-bundle.js'
                }, this);
              } else {
                this.emit('modelLoaded');
              }
            break
          }
        });
      })
    }

    /**
     * Adds a callback (we call it a plugin) to be called after every tracked frame
     *
     * @param {String} name The plugin name
     * @param {Object|Function} config The config object, or a callback to run on every fram
     * @returns {Plugin} The plugin object
     */
    use(name, config) {
      // Make sure we have an options object
      if (typeof config === 'function') {
        config = {
          onFrame: config
        };
      }

      config = Object.assign(
        {
          // Stores the plugins name for internal use
          name,
          // Whether the plugin is enabled by default
          enabled: true,
          // A set of default config values the user can override during instanciation
          config: {},
          // (instance) => Called on every frame
          onFrame: null,
          // (instance) => Called when the plugin is first used
          onUse: null,
          // (instance) => Called when the plugin is enabled
          onEnable: null,
          // (instance) => Called when the plugin is disabled
          onDisable: null
        },
        config
      );

      // Create the plugin
      this.plugin[name] = new Plugin(config, this);
      this.plugin[name].enabled &&
        this.plugin[name].onUse &&
        this.plugin[name].onUse();

      return this.plugin[name]
    }

    /**
     * Triggers an event on the document
     *
     * @param {String} eventName The event name, appended as `handsfree-${eventName}`
     */
    emit(eventName, detail = null) {
      const event = new CustomEvent(`handsfree-${eventName}`, { detail });
      document.dispatchEvent(event);
    }

    /**
     * Calls a callback on `document` when an event is triggered
     *
     * @param {String} eventName The `handsfree-${eventName}` to listen to
     * @param {Function} callback The callback to call
     */
    on(eventName, callback) {
      document.addEventListener(`handsfree-${eventName}`, (ev) => {
        callback(ev.detail);
      });
    }

    /**
     * Disables all plugins
     * @param {String|Array} plugins List of plugin names to disable, or null to disable all
     */
    disablePlugins(plugins) {
      if (!plugins) plugins = Object.keys(this.plugin);
      if (typeof plugins === 'string') plugins = [plugins];

      this.prevDisabledPlugins = [];

      plugins.forEach((name) => {
        this.plugin[name].disable();
        this.prevDisabledPlugins.push(name);
      });
    }

    /**
     * Reenables plugins previously disabled with disableAllPlugins
     */
    reenablePlugins() {
      this.prevDisabledPlugins.forEach((name) => {
        this.plugin[name].enable();
      });
      this.prevDisabledPlugins = [];
    }

    /**
     * Enable all plugins
     * @param {Array} plugins List of plugin names to enable, or null to disable all
     */
    enablePlugins(plugins) {
      if (!plugins) plugins = Object.keys(this.plugin);
      this.prevDisabledPlugins = [];

      plugins.forEach((name) => {
        this.plugin[name].enable();
        this.prevDisabledPlugins.push(name);
      });
    }

    /**
     * Load default plugins
     */
    loadDefaultPlugins() {
      Object.keys(defaultPlugins).forEach(name => {
        this.use(name, defaultPlugins[name]);
      });
    }

    /**
     * Throttles callback to run timeInMilliseconds
     *
     * @param {function} callback The callback to run
     * @param {Integer} time How many milliseconds to throttle (in other words, run this method at most ever x milliseconds)
     * @param {Object} options {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
     */
    throttle(cb, time, opts) {
      return throttle_1(cb, time, opts)
    }

    /**
     * Creates the feedback debugger, which contains the canvas/video element
     */
    createFeedback() {
      const $wrap = document.createElement('DIV');
      $wrap.classList.add('handsfree-feedback');
      this.feedback.$wrap = $wrap;

      // Main canvas
      const $canvas = document.createElement('CANVAS');
      $canvas.classList.add('handsfree-canvas');
      $canvas.setAttribute('id', `handsfree-canvas-${this.id}`);
      $wrap.appendChild($canvas);
      this.feedback.$canvas = $canvas;

      // Create video element
      const $video = document.createElement('VIDEO');
      $video.setAttribute('playsinline', true);
      $video.classList.add('handsfree-video');
      $video.setAttribute('id', `handsfree-video-${this.id}`);
      // @TODO make this configurable
      $video.width = 640;
      $video.height = 480;
      $wrap.appendChild($video);
      this.feedback.$video = $video;

      // Debug canvas
      const $debug = document.createElement('CANVAS');
      $debug.classList.add('handsfree-debug');
      $debug.setAttribute('id', `handsfree-debug-${this.id}`);
      $wrap.appendChild($debug);
      this.feedback.$debug = $debug;
      $debug.width = $video.width;
      $debug.height = $video.height;

      // Toggle the debugger
      if (this.config.feedback.enabled) {
        this.feedback.isVisible = true;
      } else {
        this.feedback.isVisible = false;
        $wrap.style.display = 'none';
      }

      this.config.feedback.$target.appendChild($wrap);
    }

    /**
     * Toggle feedback on/off
     */
    showFeedback() {
      this.feedback.isVisible = true;
      this.feedback.$wrap.style.display = 'block';
    }
    hideFeedback() {
      this.feedback.isVisible = false;
      this.feedback.$wrap.style.display = 'none';
    }

    /**
     * Gets the webcam media stream into handsfree.feedback.stream
     * @param {Object} callback The callback to call after the stream is received
     */
    getUserMedia(callback) {
      if (!this.feedback.stream) {
        navigator.mediaDevices
          .getUserMedia({ audio: false, video: true })
          .then((stream) => {
            this.feedback.stream = stream;
            this.feedback.$video.srcObject = stream;
            this.feedback.$video.onloadedmetadata = () => {
              this.feedback.$video.play();
              callback && callback();
            };
          })
          .catch((err) => {
            console.error(`Error loading models: ${err}`);
          });
      } else {
        this.feedback.$video.play();
        callback && callback();
      }
    }
  }

  return Handsfree;

})));
