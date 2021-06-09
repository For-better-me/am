(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"按摩","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 109:
/*!***********************************!*\
  !*** E:/ui-app/anmo/apis/addr.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http2 = _interopRequireDefault(__webpack_require__(/*! ../utils/http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Addr = /*#__PURE__*/function () {function Addr() {_classCallCheck(this, Addr);}_createClass(Addr, null, [{ key: "list", value: function list(
    data) {
      return (0, _http2.default)({
        url: 'api/Collectaddress/getList',
        method: 'POST',
        data: data });

    } }, { key: "info", value: function info(
    data) {
      return (0, _http2.default)({
        url: 'api/Collectaddress/getInfo',
        method: 'POST',
        data: data });

    } }, { key: "add", value: function add(
    data) {
      return (0, _http2.default)({
        url: 'api/Collectaddress/addInfo',
        method: 'POST',
        data: data });

    } }, { key: "update", value: function update(
    data) {
      return (0, _http2.default)({
        url: 'api/Collectaddress/updateInfo',
        method: 'POST',
        data: data });

    } }, { key: "del", value: function del(
    data) {
      return (0, _http2.default)({
        url: 'api/Collectaddress/delInfo',
        method: 'POST',
        data: data });

    } }, { key: "setDefault", value: function setDefault(
    data) {
      return (0, _http2.default)({
        url: 'api/Collectaddress/updateCollectStatus',
        method: 'POST',
        data: data });

    } }]);return Addr;}();exports.default = Addr;

/***/ }),

/***/ 12:
/*!*********************************!*\
  !*** E:/ui-app/anmo/apis/my.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http2 = _interopRequireDefault(__webpack_require__(/*! ../utils/http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
My = /*#__PURE__*/function () {function My() {_classCallCheck(this, My);}_createClass(My, null, [{ key: "login", value: function login(
    data) {
      return (0, _http2.default)({
        url: 'api/user/login',
        method: 'POST',
        data: data,
        loading: false });

    } }, { key: "user", value: function user(
    data) {
      return (0, _http2.default)({
        url: 'api/user/getInfo',
        method: 'POST',
        data: data,
        loading: false });

    }
    // 1技师收藏，2商户收藏
  }, { key: "getCollectionList", value: function getCollectionList(type) {
      return (0, _http2.default)({
        url: 'api/Collection/getCollectionList',
        method: 'POST',
        data: {
          type: type + 1 } });


    }
    // 1未使用，2已使用，3已过期
  }, { key: "getMyCoupon", value: function getMyCoupon(data) {
      return (0, _http2.default)({
        url: 'api/Coupon/getUserCouponList',
        method: 'POST',
        data: data });

    } }, { key: "vipInfo", value: function vipInfo()
    {
      return (0, _http2.default)({
        url: 'api/Member/getInfo',
        method: 'POST' });

    } }]);return My;}();exports.default = My;

/***/ }),

/***/ 124:
/*!***********************************************!*\
  !*** E:/ui-app/anmo/static/img/no_coupon.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/no_coupon.png";

/***/ }),

/***/ 13:
/*!************************************!*\
  !*** E:/ui-app/anmo/utils/http.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // import UserApi from '../api/user'
var page = getCurrentPages();
var App = getApp();
var _http = function _http(opt) {//封装请求
  var _promise = new Promise(function (resolve, reject) {
    var defaultOpt = {
      loading: true, // 是否显示Loading提示窗
      method: 'POST', // 请求方法，必须大写！！
      data: {}, // 入参
      header: {
        token: uni.getStorageSync('token') ? uni.getStorageSync('token') : '' } };


    // 合并www.tjitfw.com
    var optReq = Object.assign({}, defaultOpt, opt);
    optReq.url = 'https://www.tjitfw.com/' + opt.url;
    var loading = optReq.loading; // 是否显示加载提示弹窗
    uni.request({
      url: optReq.url,
      method: optReq.method,
      data: optReq.data,
      header: optReq.header,
      success: function success(res) {
        if (res.data.code == 1001) {
          uni.clearStorageSync();
          uni.setStorageSync('prePage', '');
          uni.reLaunch({
            url: '/pages/mine/login.vue' });


        } else if (res.data.code == 0) {
          uni.hideLoading();
          resolve(res.data.data);
          console.log('请求成功', opt.url, res.data);
        } else {
          uni.hideLoading();
          reject(res.data);
        }
      },
      fail: function fail(res) {
        reject(res);
        console.log(opt.url, '通信接口失败');
      } });

    if (loading) {
      uni.showLoading({
        title: '加载中',
        mask: true });

    }
  });

  return _promise.catch(function (err) {
    uni.hideLoading();
    if (err.code == 1001) {
      uni.hideLoading();
      console.log('err1001', err.msg, opt);
    } else
    if (err.code == -1) {
      uni.showToast({
        title: err.msg,
        icon: 'none',
        duration: 2000 });

      console.log('非err1001', err.msg, opt.url);
    }
    return Promise.reject({
      code: err.code,
      msg: err.msg });

  });

};var _default =


_http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 17:
/*!*************************************!*\
  !*** E:/ui-app/anmo/store/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    location: {
      lat: 39.14111,
      lng: 117.00739 } },


  getters: {
    getLocation: function getLocation(state) {
      return state.location;
    } },

  mutations: {
    SET_LOCATION: function SET_LOCATION(state, location) {
      state.location = location;
    } },

  actions: {
    setLocation: function setLocation(_ref, info) {var commit = _ref.commit,state = _ref.state;
      commit('SET_LOCATION', info);
    } } });exports.default = _default;

/***/ }),

/***/ 173:
/*!*****************************************!*\
  !*** E:/ui-app/anmo/utils/listMixin.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default = {
  data: function data() {
    return {
      list: [],
      page: 1,
      limit: 10,
      total: 0 };

  },
  methods: {
    getList: function getList() {var _this = this;
      var data = _objectSpread({
        page: 1,
        limit: 10 },
      this.listQuery);


      return new Promise(function (resolve, reject) {
        _this.http(data).then(function (res) {
          _this.list = _this.list.concat(res.list);
          _this.total = res.total_page;
          resolve(res);
        }).catch(function (err) {
          reject(err);
        });
      });
    },
    loadMore: function loadMore() {
      if (++this.page > this.total) {
        this.$util.showToast('没有更多了！');
      }
      this.getList();
    } },

  onReachBottom: function onReachBottom() {
    if (++this.page > this.total) {
      this.$util.showToast('没有更多了！');
    }
    this.getList();
  } };exports.default = _default;

/***/ }),

/***/ 18:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 19:
/*!*************************************!*\
  !*** E:/ui-app/anmo/utils/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function uploadImg() {var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function success(res) {
        var imgs = res.tempFilePaths;
        resolve(imgs);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });

}

function uploadFile() {var imgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []; // 封装上传图片接口
  var self = this;
  var index = 0; // 当前要上传第几个图片的索引
  var filePath = []; // 上传成功后的文件地址
  var token = uni.getStorageSync('token');
  uni.showLoading({
    title: '上传中',
    mask: true });


  return new Promise(function (resolve, reject) {
    (function up() {
      uni.uploadFile({
        url: 'https://www.tjitfw.com/api/upload/uploadFile',
        filePath: imgs[index],
        name: 'file',
        success: function success(res) {
          var data = JSON.parse(res.data);
          console.log(data);
          if (data.code == 0) {
            filePath.push(data.data);
            index++;
            // 递归上传图片（微信上传接口不支持多个文件）
            if (imgs.length > index) {
              up();
            } else {
              uni.hideLoading();
              resolve(filePath);
            }
          } else {
            uni.hideLoading();
            reject('上传失败，请重试');
          }
        },
        fail: function fail(err) {
          uni.hideLoading();
          reject('上传失败，请重试');
        } });

    })();
  });
}

function preImg(urls) {var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  uni.previewImage({
    urls: urls,
    current: urls[current],
    fail: function fail() {
      uni.showToast({
        title: '预览失败，请重新尝试',
        icon: 'none' });

    } });

}

function weekDay(t) {
  var queryBeginDate = 'sd',
  queryEndDate = 'sds';
  var weekDay = getSelectDate(t);
  console.log(weekDay);
  return weekDay;

  function formatDate(date) {
    console.log(date, '===========');
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return mymonth + "月" + myweekday + "日";
  }

  // 获取本周、上周、本月的日期，每周从星期一开始
  function getSelectDate(t) {
    var now = new Date(); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    var nowDay = now.getDate(); //当前日 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getFullYear(); //当前年 
    switch (t) {
      case "1": //本周
        queryBeginDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1));
        queryEndDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 7));
        break;
      case "2": //上周
        queryBeginDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6));
        queryEndDate = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 0));
        break;
      case "3": //本月
        queryBeginDate = formatDate(new Date(nowYear, nowMonth, 1));
        queryEndDate = formatDate(new Date(new Date(nowYear, nowMonth + 1, 1) - 1000 * 60 * 60 * 24));
        break;
      default:
        break;}

    return {
      queryBeginDate: queryBeginDate,
      queryEndDate: queryEndDate };


  }
}

function showToast(tip) {var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  uni.showToast({
    title: tip,
    icon: icon,
    duration: 2000 });

}

function formatNum(n) {
  return n > 9 ? n : '0' + n;
}
function getStatusBarHeight() {
  try {
    var res = uni.getSystemInfoSync();
    var rate = res.screenWidth / res.screenHeight;
    var h = res.statusBarHeight;
    if (h > 44) {
      return h + 4 + 'px';
    } else {
      return h + 8 + 'px';
    }

  } catch (e) {
    // Do something when catch error
  }
}
function goTechnicianPage(id) {
  uni.navigateTo({
    url: '/pages/technician/info?id=' + id });

}
function goShopPage(id) {
  uni.navigateTo({
    url: '/pages/service/shopInfo?id=' + id });

}
function call(phoneNumber) {
  uni.makePhoneCall({
    phoneNumber: phoneNumber });

}var _default =
{
  uploadImg: uploadImg,
  uploadFile: uploadFile,
  preImg: preImg,
  weekDay: weekDay,
  showToast: showToast,
  formatNum: formatNum,
  getStatusBarHeight: getStatusBarHeight,
  goShopPage: goShopPage,
  goTechnicianPage: goTechnicianPage,
  call: call };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"按摩","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"按摩","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"按摩","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"按摩","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 26:
/*!***********************************!*\
  !*** E:/ui-app/anmo/apis/shop.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http2 = _interopRequireDefault(__webpack_require__(/*! ../utils/http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Shop = /*#__PURE__*/function () {function Shop() {_classCallCheck(this, Shop);}_createClass(Shop, null, [{ key: "getShopList", value: function getShopList()
    {
      return (0, _http2.default)({
        url: 'api/Artificer/getMerchantList',
        method: 'POST' });

    } }, { key: "getShopInfo", value: function getShopInfo()
    {
      return (0, _http2.default)({
        url: 'api/Artificer/getMerchantList',
        method: 'POST' });

    } }, { key: "getNearbyShopList", value: function getNearbyShopList(
    data) {
      return (0, _http2.default)({
        url: 'api/Nearbystore/getList',
        method: 'POST',
        data: data });

    } }, { key: "updateFollow", value: function updateFollow(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/addCollectionInfo',
        method: 'POST',
        data: data,
        loading: false });

    } }, { key: "info", value: function info(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getInfo',
        method: 'POST',
        data: data });

    } }, { key: "infoRecommend", value: function infoRecommend(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getRecommendList',
        method: 'POST',
        data: data });

    } }, { key: "infoTechnician", value: function infoTechnician(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getArtificerList',
        method: 'POST',
        data: data });

    } }, { key: "infoProject", value: function infoProject(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getProjectList',
        method: 'POST',
        data: data });

    } }, { key: "infoComment", value: function infoComment(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getCommentList',
        method: 'POST',
        data: data });

    } }, { key: "infoAbout", value: function infoAbout(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getAboutInfo',
        method: 'POST',
        data: data });

    } }, { key: "infoBasic", value: function infoBasic(
    data) {
      return (0, _http2.default)({
        url: 'api/Merchant/getInfo',
        method: 'POST',
        data: data });

    } }]);return Shop;}();exports.default = Shop;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 35:
/*!**************************************!*\
  !*** E:/ui-app/anmo/apis/service.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http2 = _interopRequireDefault(__webpack_require__(/*! ../utils/http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Service = /*#__PURE__*/function () {function Service() {_classCallCheck(this, Service);}_createClass(Service, null, [{ key: "getNearbyTechnicianList", value: function getNearbyTechnicianList(
    data) {
      return (0, _http2.default)({
        url: 'api/Artificer/getNearbyList',
        method: 'POST',
        data: data });

    } }, { key: "getPrettyTechnicianList", value: function getPrettyTechnicianList(
    data) {
      return (0, _http2.default)({
        url: 'api/Artificer/getPrettyList',
        method: 'POST',
        data: data });

    } }, { key: "getAllTechnicianList", value: function getAllTechnicianList(
    data) {
      return (0, _http2.default)({
        url: 'api/Artificer/getPrettyList',
        method: 'POST',
        data: data });

    } }, { key: "getTechnicianInfo", value: function getTechnicianInfo(
    data) {
      return (0, _http2.default)({
        url: 'api/Artificer/getInfo',
        method: 'POST',
        data: data });

    } }, { key: "getFeature", value: function getFeature(
    data) {
      return (0, _http2.default)({
        url: 'api/Artificer/getTechniqueList',
        method: 'POST',
        data: data });

    } }, { key: "updateFollow", value: function updateFollow(
    data) {
      return (0, _http2.default)({
        url: 'api/Collection/addCollectionInfo',
        method: 'POST',
        data: data });

    } }, { key: "onCallType", value: function onCallType(
    data) {
      return (0, _http2.default)({
        url: 'api/Doorserver/getCategoryList',
        method: 'POST',
        data: data });

    } }, { key: "onCallList", value: function onCallList(
    data) {
      return (0, _http2.default)({
        url: 'api/Doorserver/getList',
        method: 'POST',
        data: data });

    } }]);return Service;}();exports.default = Service;

/***/ }),

/***/ 4:
/*!*********************************!*\
  !*** E:/ui-app/anmo/pages.json ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 44:
/*!************************************!*\
  !*** E:/ui-app/anmo/apis/other.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http2 = _interopRequireDefault(__webpack_require__(/*! ../utils/http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Other = /*#__PURE__*/function () {function Other() {_classCallCheck(this, Other);}_createClass(Other, null, [{ key: "banner", value: function banner()
    {
      return (0, _http2.default)({
        url: 'api/Focus/getList',
        method: 'POST' });

    } }, { key: "homeRecommend", value: function homeRecommend(
    data) {
      return (0, _http2.default)({
        url: 'api/Recommend/getList',
        method: 'POST',
        data: data });

    } }]);return Other;}();exports.default = Other;

/***/ }),

/***/ 45:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_sm.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 46:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_lq.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/menu_lq.png";

/***/ }),

/***/ 47:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_md.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 48:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_qy.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 49:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_js.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;
var DIFF_TIME = 60 * 1000 * 60 * 24;

var statConfig = __webpack_require__(/*! uni-stat-config */ 7).default || __webpack_require__(/*! uni-stat-config */ 7);
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {var _platformList;
  var aliArr = ['y', 'a', 'p', 'mp-ali'];
  var platformList = (_platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx' }, _defineProperty(_platformList,
  aliArr.reverse().join(''), 'ali'), _defineProperty(_platformList,
  'mp-baidu', 'bd'), _defineProperty(_platformList,
  'mp-toutiao', 'tt'), _defineProperty(_platformList,
  'mp-qq', 'qq'), _defineProperty(_platformList,
  'quickapp-native', 'qn'), _defineProperty(_platformList,
  'mp-kuaishou', 'ks'), _platformList);

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (!page) return '';
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  if (!page) return '';
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var Report_Data_Time = 'Report_Data_Time';
var Report_Status = 'Report_Status';
var isReportData = function isReportData() {
  return new Promise(function (resolve, reject) {
    var start_time = '';
    var end_time = new Date().getTime();
    var diff_time = DIFF_TIME;
    var report_status = 1;
    try {
      start_time = uni.getStorageSync(Report_Data_Time);
      report_status = uni.getStorageSync(Report_Status);
    } catch (e) {
      start_time = '';
      report_status = 1;
    }

    if (report_status === '') {
      requestData(function (_ref)

      {var enable = _ref.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
        if (enable === 1) {
          resolve();
        }
      });
      return;
    }

    if (report_status === 1) {
      resolve();
    }

    if (!start_time) {
      uni.setStorageSync(Report_Data_Time, end_time);
      start_time = end_time;
    }

    if (end_time - start_time > diff_time) {
      requestData(function (_ref2)

      {var enable = _ref2.enable;
        uni.setStorageSync(Report_Data_Time, end_time);
        uni.setStorageSync(Report_Status, enable);
      });
    }

  });
};

var requestData = function requestData(done) {
  var formData = {
    usv: STAT_VERSION,
    conf: JSON.stringify({
      ak: statConfig.appid }) };


  uni.request({
    url: STAT_URL,
    method: 'GET',
    data: formData,
    success: function success(res) {var

      data =
      res.data;
      if (data.ret === 0) {
        typeof done === 'function' && done({
          enable: data.enable });

      }
    },
    fail: function fail(e) {
      var report_status_code = 1;
      try {
        report_status_code = uni.getStorageSync(Report_Status);
      } catch (e) {
        report_status_code = 1;
      }
      if (report_status_code === '') {
        report_status_code = 1;
      }
      typeof done === 'function' && done({
        enable: report_status_code });

    } });

};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 8).default;
var statConfig$1 = __webpack_require__(/*! uni-stat-config */ 7).default || __webpack_require__(/*! uni-stat-config */ 7);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig$1.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "getIsReportData", value: function getIsReportData()

    {
      return isReportData();
    } }, { key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref3$key = _ref3.key,key = _ref3$key === void 0 ? '' : _ref3$key,_ref3$value = _ref3.value,value = _ref3$value === void 0 ? "" : _ref3$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig$1.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      this.getIsReportData().then(function () {
        uni.request({
          url: STAT_URL,
          method: 'POST',
          // header: {
          //   'content-type': 'application/json' // 默认值
          // },
          data: optionsData,
          success: function success() {
            // if (process.env.NODE_ENV === 'development') {
            //   console.log('stat request success');
            // }
          },
          fail: function fail(e) {
            if (++_this5._retry < 3) {
              setTimeout(function () {
                _this5._sendRequest(optionsData);
              }, 1000);
            }
          } });

      });
    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      this.getIsReportData().then(function () {
        var image = new Image();
        var options = getSgin(GetEncodeURIComponentOptions(data)).options;
        image.src = STAT_H5_URL + '?' + options;
      });
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 50:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_yz.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 51:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_sf.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 52:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/menu_ns.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"@dcloudio/uni-stat@next\",\"_id\":\"@dcloudio/uni-stat@2.0.0-31920210514002\",\"_inBundle\":false,\"_integrity\":\"sha512-hHyvtmMQDGCdzfS6O3ShhRkMtCapknAiZphv/xfwhilxETXZFUO2jrEalR0e3CqkwW7T3phTMAOxo0wyY5NjsQ==\",\"_location\":\"/@dcloudio/uni-stat\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"@dcloudio/uni-stat@next\",\"name\":\"@dcloudio/uni-stat\",\"escapedName\":\"@dcloudio%2funi-stat\",\"scope\":\"@dcloudio\",\"rawSpec\":\"next\",\"saveSpec\":null,\"fetchSpec\":\"next\"},\"_requiredBy\":[\"#USER\",\"/\",\"/@dcloudio/vue-cli-plugin-uni\"],\"_resolved\":\"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-31920210514002.tgz\",\"_shasum\":\"761406e2c24784359f02e5f8b6e1a6bf3ee42cc3\",\"_spec\":\"@dcloudio/uni-stat@next\",\"_where\":\"/Users/guoshengqiang/Documents/dcloud-plugins-new/release/uniapp-cli\",\"author\":\"\",\"bugs\":{\"url\":\"https://github.com/dcloudio/uni-app/issues\"},\"bundleDependencies\":false,\"deprecated\":false,\"description\":\"\",\"devDependencies\":{\"@babel/core\":\"^7.5.5\",\"@babel/preset-env\":\"^7.5.5\",\"eslint\":\"^6.1.0\",\"rollup\":\"^1.19.3\",\"rollup-plugin-babel\":\"^4.3.3\",\"rollup-plugin-clear\":\"^2.0.7\",\"rollup-plugin-commonjs\":\"^10.0.2\",\"rollup-plugin-copy\":\"^3.1.0\",\"rollup-plugin-eslint\":\"^7.0.0\",\"rollup-plugin-json\":\"^4.0.0\",\"rollup-plugin-node-resolve\":\"^5.2.0\",\"rollup-plugin-replace\":\"^2.2.0\",\"rollup-plugin-uglify\":\"^6.0.2\"},\"files\":[\"dist\",\"package.json\",\"LICENSE\"],\"gitHead\":\"c437ad9a231afa04b5ac0f48bfe5a6aef2936c52\",\"homepage\":\"https://github.com/dcloudio/uni-app#readme\",\"license\":\"Apache-2.0\",\"main\":\"dist/index.js\",\"name\":\"@dcloudio/uni-stat\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/dcloudio/uni-app.git\",\"directory\":\"packages/uni-stat\"},\"scripts\":{\"build\":\"NODE_ENV=production rollup -c rollup.config.js\",\"dev\":\"NODE_ENV=development rollup -w -c rollup.config.js\"},\"version\":\"2.0.0-31920210514002\"}");

/***/ }),

/***/ 61:
/*!*************************************!*\
  !*** E:/ui-app/anmo/apis/coupon.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http2 = _interopRequireDefault(__webpack_require__(/*! ../utils/http */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Coupon = /*#__PURE__*/function () {function Coupon() {_classCallCheck(this, Coupon);}_createClass(Coupon, null, [{ key: "list", value: function list()
    {
      return (0, _http2.default)({
        url: '/api/Coupon/getList',
        method: 'POST' });

    } }, { key: "info", value: function info(
    data) {
      return (0, _http2.default)({
        url: '/api/Coupon/getInfo',
        method: 'POST',
        data: data });

    } }, { key: "add", value: function add(
    data) {
      return (0, _http2.default)({
        url: '/api/Coupon/addInfo',
        method: 'POST',
        data: data,
        loading: false });

    } }]);return Coupon;}();exports.default = Coupon;

/***/ }),

/***/ 7:
/*!*************************************************!*\
  !*** E:/ui-app/anmo/pages.json?{"type":"stat"} ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__E6332AD" };exports.default = _default;

/***/ }),

/***/ 75:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/no_data.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/no_data.png";

/***/ }),

/***/ 8:
/*!**************************************************!*\
  !*** E:/ui-app/anmo/pages.json?{"type":"style"} ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/service/shopInfo": { "navigationBarTitleText": "店铺详情", "usingComponents": { "home": "/pages/service/component/shopHome", "case": "/pages/service/component/shopCase", "value": "/pages/service/component/shopValue", "us": "/pages/service/component/shopUs" }, "usingAutoImportComponents": {} }, "pages/technician/info": { "navigationBarTitleText": "技师详情", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/home/index": { "navigationBarTitleText": "首页", "navigationStyle": "custom", "usingComponents": { "recommend-scroll": "/pages/home/component/recommendIScroll" }, "usingAutoImportComponents": {} }, "pages/service/couponInfo": { "navigationBarTitleText": "优惠券详情", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/service/coupon": { "navigationBarTitleText": "领券中心", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/mine/sign": { "navigationBarTitleText": "签到", "navigationStyle": "custom", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/address/list": { "navigationBarTitleText": "我的地址", "usingComponents": { "no-data": "/base/nodata" }, "usingAutoImportComponents": {} }, "pages/address/edit": { "navigationBarTitleText": "新建地址", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/mine/index": { "navigationBarTitleText": "我的", "navigationStyle": "custom", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/mine/coupon": { "navigationBarTitleText": "我的优惠券", "usingComponents": { "no-data": "/base/nodata" }, "usingAutoImportComponents": {} }, "pages/mine/toBeVip": { "navigationBarTitleText": "开通会员", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/mine/collection": { "navigationBarTitleText": "我的收藏", "usingComponents": { "collect-scroll": "/pages/mine/component/collectScroll" }, "usingAutoImportComponents": {} }, "pages/order/orderValue": { "navigationBarTitleText": "评价", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/order/detail": { "navigationBarTitleText": "订单详情", "navigationStyle": "custom", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/order/index": { "navigationBarTitleText": "订单", "usingComponents": { "order-list": "/pages/order/component/orderList" }, "usingAutoImportComponents": {} }, "pages/service/shopNearby": { "navigationBarTitleText": "附近门店", "usingComponents": { "star": "/base/star" }, "usingAutoImportComponents": {} }, "pages/service/technicianPretty": { "navigationBarTitleText": "颜值专区", "usingComponents": { "filter-opts": "/base/filterOpts", "star": "/base/star" }, "usingAutoImportComponents": {} }, "pages/service/technicianNearby": { "navigationBarTitleText": "附近技师", "usingComponents": { "technician-temp": "/pages/technician/component/technicianTemp" }, "usingAutoImportComponents": {} }, "pages/service/onCall": { "navigationBarTitleText": "上门服务", "usingComponents": { "filter-opts": "/base/filterOpts", "case-temp": "/pages/service/component/caseTemp" }, "usingAutoImportComponents": {} }, "pages/technician/index": { "navigationBarTitleText": "技师", "usingComponents": { "technician-temp": "/pages/technician/component/technicianTemp", "filter-opts": "/base/filterOpts" }, "usingAutoImportComponents": {} }, "pages/mine/login": { "navigationBarTitleText": "登录", "usingComponents": {}, "usingAutoImportComponents": {} }, "pages/service/feature": { "navigationBarTitleText": "手法专区", "usingComponents": { "technician-temp": "/pages/technician/component/technicianTemp" }, "usingAutoImportComponents": {} } }, "globalStyle": { "navigationBarTextStyle": "white", "navigationBarTitleText": "按摩", "navigationBarBackgroundColor": "#FF8C69", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 92:
/*!*********************************************!*\
  !*** E:/ui-app/anmo/static/img/no_addr.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/no_addr.png";

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map