(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Handsfree = factory());
}(this, (function () { 'use strict';

  class BaseModel {
    constructor (handsfree, config) {
      this.handsfree = handsfree;
      this.config = config;
      this.data = {};
      
      // Whether we've loaded dependencies or not
      this.dependenciesLoaded = false;

      // Whether the model is enabled or not
      this.enabled = config.enabled;

      // Collection of plugins
      this.plugins = [];

      setTimeout(() => {
        const getData = this.getData;
        
        this.getData = async () => {
          const data = await getData.apply(this, arguments);
          this.runPlugins();
          return data
        };
      }, 0);
    }

    // Implement in the model class
    loadDependencies (callback) {}
    updateData () {}

    /**
     * Enable model
     * @param {*} handleLoad If true then it'll also attempt to load,
     *    otherwise you'll need to handle it yourself. This is mostly used internally
     *    to prevent the .update() method from double loading
     */
    enable (handleLoad = true) {
      this.enabled = true;
      document.body.classList.add(`handsfree-model-${this.name}`);

      if (handleLoad && !this.dependenciesLoaded) {
        this.loadDependencies();
      }

      // Weboji uses a webgl context
      if (this.name === 'weboji') {
        this.handsfree.debug.$canvas.weboji.style.display = 'block';
      }
    }

    disable () {
      this.enabled = false;
      document.body.classList.remove(`handsfree-model-${this.name}`);
      setTimeout(() => {
        // Weboji uses a webgl context so let's just hide it
        if (this.name === 'weboji') {
          this.handsfree.debug.$canvas.weboji.style.display = 'none';
        } else {
          this.handsfree.debug.context[this.name].clearRect(0, 0, this.handsfree.debug.$canvas[this.name].width, this.handsfree.debug.$canvas[this.name].height);
        }
      }, 0);
    }

    /**
     * Loads a script and runs a callback
     * @param {string} src The absolute path of the source file
     * @param {*} callback The callback to call after the file is loaded
     */
    loadDependency (src, callback) {
      const $script = document.createElement('script');
      $script.async = true;

      $script.onload = () => {
        callback();
      };
      $script.onerror = () => {
        this.handsfree.emit('modelError', `Error loading ${src}`);
      };

      $script.src = src;
      document.body.appendChild($script);
    }

    /**
     * Run all the plugins attached to this model
     */
    runPlugins () {
      // Exit if no data
      if (this.name === 'handpose' && !this.data.annotations) {
        return
      }
      
      if (Object.keys(this.data).length) {
        this.plugins.forEach(name => {
          this.handsfree.plugin[name].enabled && this.handsfree.plugin[name]?.onFrame(this.handsfree.data);
        });
      }
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

  class HolisticModel extends BaseModel {
    constructor (handsfree, config) {
      super(handsfree, config);
      this.name = 'weboji';
    }

    loadDependencies (callback) {
      // Load holistic
      this.loadDependency(`${this.handsfree.config.assetsPath}/jeeliz/jeelizFaceTransfer.js`, () => {
        const url = this.handsfree.config.assetsPath + '/jeeliz/jeelizFaceTransferNNC.json';
        this.api = window.JEEFACETRANSFERAPI;

        fetch(url)
          .then(model => model.json())
          // Next, let's initialize the weboji tracker API
          .then(model => {
            window.JEELIZ_RESIZER.size_canvas({
              canvasId: `handsfree-canvas-weboji-${this.handsfree.id}`,
              callback: (videoSettings) => {
                if (typeof videoSettings === 'object') {
                  videoSettings = merge_1(videoSettings, this.handsfree.config.weboji.videoSettings);
                } else {
                  videoSettings = this.handsfree.config.weboji.videoSettings;
                }

                this.api.init({
                  canvasId: `handsfree-canvas-weboji-${this.handsfree.id}`,
                  NNC: JSON.stringify(model),
                  videoSettings,
                  callbackReady: () => {
                    callback && callback(this);
                    
                    this.dependenciesLoaded = true;
                    this.handsfree.emit('modelReady', this);
                    this.handsfree.emit('webojiModelReady', this);
                    document.body.classList.add('handsfree-model-weboji');
                  }
                });
              }
            });
          })
          .catch((ev) => {
            console.log(ev);
            console.error(`Couldn't load weboji tracking model at ${url}`);
            this.handsfree.emit('modelError', ev);
          });
      });
    }

    async getData () {
      this.data.rotation = await this.api.get_rotationStabilized();
      this.data.translation = await this.api.get_positionScale();
      this.data.morphs = await this.api.get_morphTargetInfluencesStabilized();
      this.data.state = await this.getStates();
      this.handsfree.data.weboji = this.data;

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
  }

  class HandsModel extends BaseModel {
    constructor (handsfree, config) {
      super(handsfree, config);
      this.name = 'hands';

      // Without this the loading event will happen before the first frame
      this.hasLoadedAndRun = false;

      this.palmPoints = [0, 1, 2, 5, 9, 13, 17];
    }

    loadDependencies (callback) {
      // Load hands
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/hands/node_modules/@mediapipe/hands/hands.js`, () => {
        this.api = new window.Hands({locateFile: file => {
          return `${this.handsfree.config.assetsPath}/@mediapipe/hands/node_modules/@mediapipe/hands/${file}`
        }});

        // Load the hands camera module
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
          this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
            this.camera = new Camera(this.handsfree.debug.$video, {
              // Run inference
              onFrame: async () => {
                if (!this.hasLoadedAndRun) {
                  this.hasLoadedAndRun = true;
                  this.handsfree.emit('modelReady', this);
                  this.handsfree.emit('handsModelReady', this);
                  document.body.classList.add('handsfree-model-hands');      
                } else if (this.enabled && this.handsfree.isLooping) {
                  await this.api.send({image: this.handsfree.debug.$video});
                }
              },
              width: this.handsfree.debug.$video.width,
              height: this.handsfree.debug.$video.height
            });

            this.dependenciesLoaded = true;
            this.camera.start();

            callback && callback(this);
          });
        });

        this.api.setOptions(this.handsfree.config.hands);
        this.api.onResults(results => this.updateData(results));
      });
    }

    getData () {}
    
    updateData (results) {
      this.data = results;
      this.handsfree.data.hands = results;
      if (this.handsfree.config.showDebug) {
        this.debug(results);
      }
    }

    /**
     * Debugs the hands model
     */
    debug (results) {
      this.handsfree.debug.context.hands.clearRect(0, 0, this.handsfree.debug.$canvas.hands.width, this.handsfree.debug.$canvas.hands.height);
      
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(this.handsfree.debug.context.hands, landmarks, HAND_CONNECTIONS, {color: '#00FF00', lineWidth: 5});
          drawLandmarks(this.handsfree.debug.context.hands, landmarks, {color: '#FF0000', lineWidth: 2});
        }
      }
    }
  }

  class FacemeshModel extends BaseModel {
    constructor (handsfree, config) {
      super(handsfree, config);
      this.name = 'facemesh';

      // Without this the loading event will happen before the first frame
      this.hasLoadedAndRun = false;

      this.palmPoints = [0, 1, 2, 5, 9, 13, 17];
    }

    loadDependencies (callback) {
      // Load facemesh
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/face_mesh/node_modules/@mediapipe/face_mesh/face_mesh.js`, () => {
        this.api = new window.FaceMesh({locateFile: file => {
          return `${this.handsfree.config.assetsPath}/@mediapipe/face_mesh/node_modules/@mediapipe/face_mesh/${file}`
        }});

        // Load the facemesh camera module
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
          this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
            this.camera = new Camera(this.handsfree.debug.$video, {
              // Run inference
              onFrame: async () => {
                if (!this.hasLoadedAndRun) {
                  this.hasLoadedAndRun = true;
                  this.handsfree.emit('modelReady', this);
                  this.handsfree.emit('facemeshModelReady', this);
                  document.body.classList.add('handsfree-model-facemesh');      
                } else if (this.enabled && this.handsfree.isLooping) {
                  await this.api.send({image: this.handsfree.debug.$video});
                }
              },
              width: this.handsfree.debug.$video.width,
              height: this.handsfree.debug.$video.height
            });

            this.camera.start();
            this.dependenciesLoaded = true;

            callback && callback(this);
          });
        });

        this.api.setOptions(this.handsfree.config.facemesh);
        this.api.onResults(results => this.updateData(results));
      });
    }

    getData () {}
    
    updateData (results) {
      this.data = results;
      this.handsfree.data.facemesh = results;
      if (this.handsfree.config.showDebug) {
        this.debug(results);
      }
    }

    /**
     * Debugs the facemesh model
     */
    debug (results) {
      this.handsfree.debug.context.facemesh.clearRect(0, 0, this.handsfree.debug.$canvas.facemesh.width, this.handsfree.debug.$canvas.facemesh.height);

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 1});
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_LEFT_EYE, {color: '#30FF30'});
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
          drawConnectors(this.handsfree.debug.context.facemesh, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'});
        }
      }
    }
  }

  class PoseModel extends BaseModel {
    constructor (handsfree, config) {
      super(handsfree, config);
      this.name = 'pose';

      // Without this the loading event will happen before the first frame
      this.hasLoadedAndRun = false;

      this.palmPoints = [0, 1, 2, 5, 9, 13, 17];
    }

    loadDependencies (callback) {
      // Load pose
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/pose/node_modules/@mediapipe/pose/pose.js`, () => {
        this.api = new window.Pose({locateFile: file => {
          return `${this.handsfree.config.assetsPath}/@mediapipe/pose/node_modules/@mediapipe/pose/${file}`
        }});

        // Load the pose camera module
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
          this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
            this.camera = new Camera(this.handsfree.debug.$video, {
              // Run inference
              onFrame: async () => {
                if (!this.hasLoadedAndRun) {
                  this.hasLoadedAndRun = true;
                  this.handsfree.emit('modelReady', this);
                  this.handsfree.emit('poseModelReady', this);
                  document.body.classList.add('handsfree-model-pose');      
                } else if (this.enabled && this.handsfree.isLooping) {
                  await this.api.send({image: this.handsfree.debug.$video});
                }
              },
              width: this.handsfree.debug.$video.width,
              height: this.handsfree.debug.$video.height
            });

            this.camera.start();
            this.dependenciesLoaded = true;

            callback && callback(this);
            
          });
        });

        this.api.setOptions(this.handsfree.config.pose);
        this.api.onResults(results => this.updateData(results));
      });
    }

    getData () {}
    
    updateData (results) {
      this.data = results;
      this.handsfree.data.pose = results;
      if (this.handsfree.config.showDebug) {
        this.debug(results);
      }
    }

    /**
     * Debugs the pose model
     */
    debug (results) {
      this.handsfree.debug.context.pose.clearRect(0, 0, this.handsfree.debug.$canvas.pose.width, this.handsfree.debug.$canvas.pose.height);

      if (results.poseLandmarks) {
        drawConnectors(this.handsfree.debug.context.pose, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
        drawLandmarks(this.handsfree.debug.context.pose, results.poseLandmarks, {color: '#FF0000', lineWidth: 2});
      }
    }
  }

  class HolisticModel$1 extends BaseModel {
    constructor (handsfree, config) {
      super(handsfree, config);
      this.name = 'holistic';

      // Without this the loading event will happen before the first frame
      this.hasLoadedAndRun = false;

      this.palmPoints = [0, 1, 2, 5, 9, 13, 17];
    }

    loadDependencies (callback) {
      // Load holistic
      this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/holistic/node_modules/@mediapipe/holistic/holistic.js`, () => {
        this.api = new window.Holistic({locateFile: file => {
          return `${this.handsfree.config.assetsPath}/@mediapipe/holistic/node_modules/@mediapipe/holistic/${file}`
        }});

        // Load the holistic camera module
        this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/drawing_utils/node_modules/@mediapipe/drawing_utils/drawing_utils.js`, () => {
          this.loadDependency(`${this.handsfree.config.assetsPath}/@mediapipe/camera_utils/node_modules/@mediapipe/camera_utils/camera_utils.js`, () => {
            this.camera = new Camera(this.handsfree.debug.$video, {
              // Run inference
              onFrame: async () => {
                if (!this.hasLoadedAndRun) {
                  this.hasLoadedAndRun = true;
                  this.handsfree.emit('modelReady', this);
                  this.handsfree.emit('holisticModelReady', this);
                  document.body.classList.add('handsfree-model-holistic');      
                } else if (this.enabled && this.handsfree.isLooping) {
                  await this.api.send({image: this.handsfree.debug.$video});
                }
              },
              width: this.handsfree.debug.$video.width,
              height: this.handsfree.debug.$video.height
            });

            this.camera.start();
            this.dependenciesLoaded = true;

            callback && callback(this);          
          });
        });

        this.api.setOptions(this.handsfree.config.holistic);
        this.api.onResults(results => this.updateData(results));
      });
    }

    getData () {}
    
    updateData (results) {
      this.data = results;
      this.handsfree.data.holistic = results;
      if (this.handsfree.config.showDebug) {
        this.debug(results);
      }
    }

    /**
     * Debugs the holistic model
     */
    debug (results) {
      this.handsfree.debug.context.holistic.clearRect(0, 0, this.handsfree.debug.$canvas.holistic.width, this.handsfree.debug.$canvas.holistic.height);

      drawConnectors(this.handsfree.debug.context.holistic, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#0f0',
        lineWidth: 4
      });
      
      drawLandmarks(this.handsfree.debug.context.holistic, results.poseLandmarks, {
        color: '#f00',
        lineWidth: 2
      });
      
      drawConnectors(this.handsfree.debug.context.holistic, results.faceLandmarks, FACEMESH_TESSELATION, {
        color: '#f0f',
        lineWidth: 1
      });
      
      drawConnectors(this.handsfree.debug.context.holistic, results.leftHandLandmarks, HAND_CONNECTIONS, {
        color: '#0f0',
        lineWidth: 5
      });
      
      drawLandmarks(this.handsfree.debug.context.holistic, results.leftHandLandmarks, {
        color: '#f0f',
        lineWidth: 2
      });
      
      drawConnectors(this.handsfree.debug.context.holistic, results.rightHandLandmarks, HAND_CONNECTIONS, {
        color: '#0f0',
        lineWidth: 5
      });

      drawLandmarks(this.handsfree.debug.context.holistic, results.rightHandLandmarks, {
        color: '#f0f',
        lineWidth: 2
      });    
    }
  }

  /**
   * The base plugin class
   * - When you do `handsfree.use()` it actually extends this class
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
      let handsfreePluginConfig = handsfree.config?.plugin?.[plugin.name];
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
    enable () {
      !this.enabled && this.onEnable && this.onEnable(this.handsfree);
      this.enabled = true;
    }
    disable () {
      this.enabled && this.onDisable && this.onDisable(this.handsfree);
      this.enabled = false;
    }
  }

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
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

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
    value = value.replace(reTrim, '');
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

  /**
   * The following are all the defaults
   * 
   * @see https://handsfree.js.org/ref/prop/config
   */
  var defaultConfig = {
    // Use CDN by default
    assetsPath: 'https://unpkg.com/handsfree@8.0.0/build/lib/assets',
    
    // Setup config. Ignore this to have everything done for you automatically
    setup: {
      // The canvas element to use for rendering debug info like skeletons and keypoints
      canvas: {
        weboji: {
          // The canvas element to hold the skeletons and keypoints for weboji model
          $el: null,
          width: 1280,
          height: 720
        },
        hands: {
          // The canvas element to hold the skeletons and keypoints for hand model
          $el: null,
          width: 1280,
          height: 720
        },
        holistic: {
          // The canvas element to hold the skeletons and keypoints for holistic model
          $el: null,
          width: 1280,
          height: 720
        },
        pose: {
          // The canvas element to hold the skeletons and keypoints for pose model
          $el: null,
          width: 1280,
          height: 720
        },
        facemesh: {
          // The canvas element to hold the skeletons and keypoints for facemesh model
          $el: null,
          width: 1280,
          height: 720
        }
      },
      // The video source to use. If not present, one will be created to capture webcam
      video: {
        // The video element to hold the webcam stream
        $el: null,
        width: 1280,
        height: 720
      },
      // The wrapping element
      wrap: {
        // The element to put the video and canvas inside of
        $el: null,
        // The parent element
        $parent: null
      }
    },

    // Weboji model
    weboji: {
      enabled: false,
      throttle: 0,

      videoSettings: {
        // The video, canvas, or image element
        // Omit this to auto create a <VIDEO> with the webcam
        videoElement: null,

        // ID of the device to use
        // Omit this to use the system default
        deviceId: null,

        // Which camera to use on the device
        // Possible values: 'user' (front), 'environment' (back)
        facingMode: 'user',

        // Video dimensions
        idealWidth: 320,
        idealHeight: 240,
        minWidth: 240,
        maxWidth: 1280,
        minHeight: 240,
        maxHeight: 1280
      },

      // Thresholds needed before these are considered "activated"
      // - Ranges from 0 (not active) to 1 (fully active)
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

    // Hands model
    hands: {
      enabled: false,
      // The maximum number of hands to detect [0 - 4]
      maxNumHands: 2,

      // Minimum confidence [0 - 1] for a hand to be considered detected
      minDetectionConfidence: 0.5,

      // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
      // Higher values are more robust at the expense of higher latency
      minTrackingConfidence: 0.5
    },

    // Facemesh model
    facemesh: {
      enabled: false,
      // The maximum number of faces to detect [1 - 4]
      maxNumFaces: 1,

      // Minimum confidence [0 - 1] for a face to be considered detected
      minDetectionConfidence: 0.5,
      
      // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
      // Higher values are more robust at the expense of higher latency
      minTrackingConfidence: 0.5
    },

    // Pose model
    pose: {
      enabled: false,
      
      // Outputs only the top 25 pose landmarks if true,
      // otherwise shows all 33 full body pose landmarks
      // - Note: Setting this to true may result in better accuracy 
      upperBodyOnly: false,

      // Helps reduce jitter over multiple frames if true
      smoothLandmarks: true,

      // Minimum confidence [0 - 1] for a person detection to be considered detected
      minDetectionConfidence: 0.5,

      // Minimum confidence [0 - 1] for the pose tracker to be considered detected
      // Higher values are more robust at the expense of higher latency
      minTrackingConfidence: 0.5
    },

    // Holistic model
    holistic: {
      enabled: false,
      
      // Outputs only the top 25 pose landmarks if true,
      // otherwise shows all 33 full body pose landmarks
      // - Note: Setting this to true may result in better accuracy 
      upperBodyOnly: true,

      // Helps reduce jitter over multiple frames if true
      smoothLandmarks: true,

      // Minimum confidence [0 - 1] for a person detection to be considered detected
      minDetectionConfidence: 0.5,
          
      // Minimum confidence [0 - 1] for the pose tracker to be considered detected
      // Higher values are more robust at the expense of higher latency
      minTrackingConfidence: 0.5
    },
  };

  /*
            ✨
            (\.   \      ,/)
              \(   |\     )/
              //\  | \   /\\
            (/ /\_#oo#_/\ \)
              \/\  ####  /\/
                  \`##'


            🧙‍♂️ Presenting 🧙‍♀️

                Handsfree.js
                  8.0.0

    Docs:       https://handsfree.js.org
    Repo:       https://github.com/midiblocks/handsfree
    Discord:    https://discord.gg/TWemTd85
    Newsletter: http://eepurl.com/hhD7S1

    


    /////////////////////////////////////////////////////////////
    ///////////////////// Table of Contents /////////////////////
    /////////////////////////////////////////////////////////////

    Use "CTRL+F + #n" to hop around in this file
    
    #1 Setup
    #2 Loop
    #3 Plugins
    #4 Events
    #5 Helpers
    #6 Core Plugin Imports

  */


  /////////////////////////////////////////////////////////////
  ////////////////////////// #1 SETUP /////////////////////////
  /////////////////////////////////////////////////////////////

  // Used to separate video, canvas, etc ID's
  let id = 0;

  /**
   * The Handsfree class
   */
  class Handsfree {
    /**
     * Let's do this 🖐
     * @see https://handsfree.js.org/ref/prop/config
     * 
     * @param {Object} config The initial config to use
     */
    constructor (config = {}) {
      // Assign the instance ID
      this.id = ++id;
      this.version = '8.0.0';
      this.data = {};

      // Plugins
      this.plugin = {};
      this.taggedPlugins = {};
      
      // Clean config and set defaults
      this.config = this.cleanConfig(config);

      // Setup
      this.setupDebugger();
      this.prepareModels();
      this.loadCorePlugins();

      // Start tracking when all models are loaded
      this.numModelsLoaded = 0;
      this.on('modelReady', () => {
        let numActiveModels = 0;
        Object.keys(this.model).forEach(modelName => {
          this.model[modelName].enabled && ++numActiveModels;
        });
        
        if (++this.numModelsLoaded === numActiveModels) {
          document.body.classList.remove('handsfree-loading');
          document.body.classList.add('handsfree-started');

          this.isLooping = true;
          this.loop();
        }
      });

      this.emit('init', this);
    }

    /**
     * Prepares the models
     */
    prepareModels () {
      this.model = {
        weboji: {},
        hands: {},
        facemesh: {},
        pose: {},
        holistic: {}
      };
      this.model.weboji = new HolisticModel(this, this.config.weboji);
      this.model.hands = new HandsModel(this, this.config.hands);
      this.model.pose = new PoseModel(this, this.config.pose);
      this.model.facemesh = new FacemeshModel(this, this.config.facemesh);
      this.model.holistic = new HolisticModel$1(this, this.config.holistic);
    }

    /**
     * Sets up the video and canvas elements
     */
    setupDebugger () {
      this.debug = {};
      
      // Feedback wrap
      if (!this.config.setup.wrap.$el) {
        const $wrap = document.createElement('DIV');
        $wrap.classList.add('handsfree-feedback');
        this.config.setup.wrap.$el = $wrap;
      }
      this.debug.$wrap = this.config.setup.wrap.$el;

      // Create video element
      if (!this.config.setup.video.$el) {
        const $video = document.createElement('VIDEO');
        $video.setAttribute('playsinline', true);
        $video.classList.add('handsfree-video');
        $video.setAttribute('id', `handsfree-video-${this.id}`);
        this.config.setup.video.$el = $video;
      }
      this.debug.$video = this.config.setup.video.$el;
      this.debug.$video.width = this.config.setup.video.width;
      this.debug.$video.height = this.config.setup.video.height;
      this.debug.$wrap.appendChild(this.debug.$video);

      // Context 2D canvases
      this.debug.$canvas = {};
      this.debug.context = {};
      this.config.setup.canvas.video = {}
      // The video canvas is used to display the video
      ;['weboji', 'video', 'facemesh', 'pose', 'hands', 'holistic'].forEach(model => {
        this.debug.$canvas[model] = {};
        this.debug.context[model] = {};
        
        let $canvas = this.config.setup.canvas[model].$el;
        if (!$canvas) {
          $canvas = document.createElement('CANVAS');
          this.config.setup.canvas[model].$el = $canvas;
        }
        
        // Classes
        $canvas.classList.add('handsfree-canvas', `handsfree-canvas-${model}`, `handsfree-hide-when-started-without-${model}`);
        $canvas.setAttribute('id', `handsfree-canvas-${model}-${this.id}`);

        // Dimensions
        this.debug.$canvas[model] = this.config.setup.canvas[model].$el;
        this.debug.$canvas[model].width = this.config.setup.canvas[model].width;
        this.debug.$canvas[model].height = this.config.setup.canvas[model].height;
        this.debug.$wrap.appendChild(this.debug.$canvas[model]);

        // Context
        if (model === 'weboji') {
          this.debug.context[model] = this.debug.$canvas[model].getContext('webgl');  
        } else {
          this.debug.context[model] = this.debug.$canvas[model].getContext('2d');  
        }
      });
      
      // Append everything to the body
      this.config.setup.wrap.$parent.appendChild(this.debug.$wrap);

      // Add classes
      this.config.showDebug && document.body.classList.add('handsfree-show-debug');
      this.config.showVideo && document.body.classList.add('handsfree-show-video');
    }

    /**
     * Cleans and sanitizes the config, setting up defaults
     * @see https://handsfree.js.org/ref/method/cleanConfig
     * 
     * @param config {Object} The config object to use
     * @param defaults {Object} (Optional) The defaults to use.
     *    If null, then the original Handsfree.js defaults will be used
     * 
     * @returns {Object} The cleaned config
     */
    cleanConfig (config, defaults) {
      // Set default
      if (!defaults) defaults = Object.assign({}, defaultConfig);
      
      defaults.setup.wrap.$parent = document.body;

      // Map booleans to objects
      if (typeof config.weboji === 'boolean') {
        config.weboji = {enabled: config.weboji};
      }
      if (typeof config.hands === 'boolean') {
        config.hands = {enabled: config.hands};
      }
      if (typeof config.facemesh === 'boolean') {
        config.facemesh = {enabled: config.facemesh};
      }
      if (typeof config.pose === 'boolean') {
        config.pose = {enabled: config.pose};
      }
      if (typeof config.holistic === 'boolean') {
        config.holistic = {enabled: config.holistic};
      }

      return merge_1({}, defaults, config)
    }

    /**
     * Updates the instance, loading required dependencies
     * @see https://handsfree.js.org./ref/method/update
     * 
     * @param {Object} config The changes to apply
     * @param {Function} callback Called after
     */
    update (config, callback) {
      let wasEnabled;
      config = this.cleanConfig(config, this.config)

      // Run enable/disable methods on changed models
      ;['hands', 'facemesh', 'pose', 'holistic', 'weboji'].forEach(model => {
        wasEnabled = this.model[model].enabled;
        this.model[model].enabled = config[model].enabled;
        this.model[model].config = config[model].config;

        if (wasEnabled && !config[model].enabled) this.model[model].disable();
        else if (!wasEnabled && config[model].enabled) this.model[model].enable(false);
      });
      
      // Start
      this.config = config;
      if (this.isLooping && callback) {
        callback();
      } else {
        this.start(callback);
      }
    }




    /////////////////////////////////////////////////////////////
    /////////////////////////// #2 LOOP /////////////////////////
    /////////////////////////////////////////////////////////////


    

    /**
     * Starts the trackers
     * @see https://handsfree.js.org/ref/method/start
     * 
     * @param {Function} callback The callback to run before the very first frame
     */
    start (callback) {
      document.body.classList.add('handsfree-loading');
      this.emit('loading', this);

      // Call the callback once things are loaded
      callback && document.addEventListener('handsfree-modelReady', callback, {once: true});
      
      // Load dependencies
      this.numModelsLoaded = 0;
      Object.keys(this.model).forEach(modelName => {
        const model = this.model[modelName];
        
        if (model.enabled && !model.dependenciesLoaded) {
          model.loadDependencies();
        } else if (model.enabled) {
          this.emit('modelReady', model);
          this.emit(`${modelName}ModelReady`, model);
        }
      });
    }

    /**
     * Stops tracking
     * - Currently this just stops the tracker
     * 
     * @see https://handsfree.js.org/ref/method/stop
     */
    stop () {
      location.reload();
    }

    /**
     * Pauses inference to free up resources but maintains the
     * webcam stream so that it can be unpaused instantly
     * 
     * @see https://handsfree.js.org/ref/method/pause
     */
    pause () {
      this.isLooping = false;
    }

    /**
     * Resumes the loop from an unpaused state
     * 
     * @see https://handsfree.js.org/ref/method/pause
     */
    unpause () {
      if (!this.isLooping) {
        this.isLooping = true;
        this.loop();
      }
    }

    /**
     * Called on every webcam frame
     * @see https://handsfree.js.org/ref/method/loop
     */
    loop () {
      // Get model data
      Object.keys(this.model).forEach(modelName => {
        const model = this.model[modelName];
        if (model.enabled && model.dependenciesLoaded) {
          model.getData();
        }
      });
      this.emit('data', this.data);

      // Run untagged plugins
      this.taggedPlugins.untagged?.forEach(pluginName => {
        this.plugin[pluginName].enabled && this.plugin[pluginName]?.onFrame(this.data);
      });

      // Render video behind everything else
      if (this.config.showDebug) {
        const activeModel = ['hands', 'pose', 'holistic', 'facemesh'].find(model => {
          if (this.model[model].enabled) {
            return model
          }
        });

        if (activeModel && this.model[activeModel]?.camera) {
          // @fixme let's optimize this
          this.debug.$canvas.video.width = this.debug.$canvas[activeModel].width;
          this.debug.$canvas.video.height = this.debug.$canvas[activeModel].height;
          this.debug.context.video.drawImage(this.model[activeModel].camera.video, 0, 0, this.debug.$canvas.video.width, this.debug.$canvas.video.height);
        }
      }

      this.isLooping && requestAnimationFrame(() => this.isLooping && this.loop());
    }

    
    


    /////////////////////////////////////////////////////////////
    //////////////////////// #3 PLUGINS /////////////////////////
    /////////////////////////////////////////////////////////////


    


    /**
     * Adds a callback (we call it a plugin) to be called after every tracked frame
     * @see https://handsfree.js.org/ref/method/use
     *
     * @param {String} name The plugin name
     * @param {Object|Function} config The config object, or a callback to run on every fram
     * @returns {Plugin} The plugin object
     */
    use (name, config) {
      // Make sure we have an options object
      if (typeof config === 'function') {
        config = {
          onFrame: config
        };
      }

      config = merge_1({},
        {
          // Stores the plugins name for internal use
          name,
          // The model to apply this plugin to
          models: [],
          // Plugin tags for quickly turning things on/off
          tags: [],
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

      // Sanitize
      if (typeof config.models === 'string') {
        config.models = [config.models];
      }

      // Setup plugin tags
      if (typeof config.tags === 'string') {
        config.tags = [config.tags];
      }
      config.tags.forEach(tag => {
        if (!this.taggedPlugins[tag]) this.taggedPlugins[tag] = [];
        this.taggedPlugins[tag].push(name);
      });
      
      // Create the plugin
      this.plugin[name] = new Plugin(config, this);
      this.plugin[name].onUse && this.plugin[name].onUse();

      // Store a reference to the plugin to simplify things
      if (config.models.length) {
        config.models.forEach(modelName => {
          this.model[modelName].plugins.push(name);
        });
      } else {
        this.taggedPlugins.untagged.push(name);
      }
    
      return this.plugin[name]
    }

    /**
     * Enable plugins by tags
     * @see https://handsfree.js.org/ref/method/enablePlugins
     * 
     * @param {string|object} tags (Optional) The plugins with tags to enable. Enables all if null
     */
    enablePlugins (tags) {
      // Sanitize
      if (typeof tags === 'string') tags = [tags];
      if (!tags) tags = Object.keys(this.taggedPlugins);

      tags.forEach(tag => {
        this.taggedPlugins[tag].forEach(pluginName => {
          this.plugin[pluginName].enable();
        });
      });
    }

    /**
     * Disable plugins by tags
     * @see https://handsfree.js.org/ref/method/disablePlugins
     * 
     * @param {string|object} tags (Optional) The plugins with tags to disable. Disables all if null
     */
    disablePlugins (tags) {
      // Sanitize
      if (typeof tags === 'string') tags = [tags];
      if (!tags) tags = Object.keys(this.taggedPlugins);

      tags.forEach(tag => {
        this.taggedPlugins[tag].forEach(pluginName => {
          this.plugin[pluginName].disable();
        });
      });
    }




    /////////////////////////////////////////////////////////////
    ///////////////////////// #4 EVENTS /////////////////////////
    /////////////////////////////////////////////////////////////


    


    /**
     * Triggers a document event with `handsfree-${eventName}`
     * @see https://handsfree.js.org/ref/method/emit
     * 
     * @param {String} eventName The name of the event
     * @param {*} detail (optional) Data to send with the event
     */
    emit (eventName, detail = null) {
      const event = new CustomEvent(`handsfree-${eventName}`, {detail});
      document.dispatchEvent(event);
    }

    /**
     * Calls a callback on `document` when an event is triggered
     * @see https://handsfree.js.org/ref/method/on
     *
     * @param {String} eventName The `handsfree-${eventName}` to listen to
     * @param {Function} callback The callback to call
     */
    on (eventName, callback) {
      document.addEventListener(`handsfree-${eventName}`, (ev) => {
        callback(ev.detail);
      });
    }



    /////////////////////////////////////////////////////////////
    //////////////////////// #5 HELPERS /////////////////////////
    /////////////////////////////////////////////////////////////



    /**
     * Helper to normalze a value within a max range
     * @see https://handsfree.js.org/ref/method/normalize
     * 
     * @param {Number} value The value to normalize
     * @param {Number} max The maximum value to normalize to, or the upper bound
     * @param {Number} min The minimum value to normalize to, or the lower bound
     */
    normalize (value, max, min = 0) {
      return (value - min) / (max - min)
    }

    /**
     * Gets the webcam media stream into handsfree.feedback.stream
     * @see https://handsfree.js.org/ref/method/getUserMedia
     * 
     * @param {Object} callback The callback to call after the stream is received
     */
    getUserMedia (callback) {
      if (!this.debug.stream) {
        navigator.mediaDevices
          .getUserMedia({ audio: false, video: true })
          .then((stream) => {
            this.debug.stream = stream;
            this.debug.$video.srcObject = stream;
            this.debug.$video.onloadedmetadata = () => {
              this.debug.$video.play();
              this.emit('gotUserMedia', stream);
              callback && callback();
            };
          })
          .catch((err) => {
            console.error(`Error getting user media: ${err}`);
          });
      } else {
        this.debug.$video.play();
        this.emit('gotUserMedia', stream);
        callback && callback();
      }
    }

    /**
     * Loads all the core plugins (see #6)
     */
    loadCorePlugins () {
      Object.keys(corePlugins).forEach(name => {
        this.use(name, corePlugins[name]);
      });    
    }

    /**
     * Throttles callback to run timeInMilliseconds
     * @see https://handsfree.js.org/ref/method/throttle
     *
     * @param {function} callback The callback to run
     * @param {Integer} time How many milliseconds to throttle (in other words, run this method at most ever x milliseconds)
     * @param {Object} options {leading: true, trailing: true} @see https://lodash.com/docs/4.17.15#throttle
     */
    throttle(cb, time, opts) {
      return throttle_1(cb, time, opts)
    }
  }



  /////////////////////////////////////////////////////////////
  ///////////////// #6 Core Plugin Imports ////////////////////
  /////////////////////////////////////////////////////////////



  const corePlugins = {
    // Weboji
    facePointer: require('./plugin/weboji/facePointer').default,
    faceClick: require('./plugin/weboji/faceClick').default,
    faceScroll: require('./plugin/weboji/faceScroll').default,

    pinchScroll: require('./plugin/hands/pinchScroll').default
    
    // fingerPointer: require('./plugin/handpose/palmPointer').default,
    // palmPointer: require('./plugin/handpose/palmPointer').default,
    // pinchClick: require('./plugin/handpose/pinchClick').default,
    // handScroll: require('./plugin/handpose/handScroll').default,
    // palmPointers: require('./plugin/holistic/palmPointers').default
  };

  return Handsfree;

})));
