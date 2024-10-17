/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:05.335Z
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Cropper = factory());
})(this, function() {
  "use strict";
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        _defineProperty(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t)
      return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i2 = e.call(t, r || "default");
      if ("object" != typeof i2)
        return i2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i2 = _toPrimitive(t, "string");
    return "symbol" == typeof i2 ? i2 : i2 + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
      arr2[i2] = arr[i2];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? "ontouchstart" in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? "PointerEvent" in WINDOW : false;
  var NAMESPACE = "cropper";
  var ACTION_ALL = "all";
  var ACTION_CROP = "crop";
  var ACTION_MOVE = "move";
  var ACTION_ZOOM = "zoom";
  var ACTION_EAST = "e";
  var ACTION_WEST = "w";
  var ACTION_SOUTH = "s";
  var ACTION_NORTH = "n";
  var ACTION_NORTH_EAST = "ne";
  var ACTION_NORTH_WEST = "nw";
  var ACTION_SOUTH_EAST = "se";
  var ACTION_SOUTH_WEST = "sw";
  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move");
  var DATA_ACTION = "".concat(NAMESPACE, "Action");
  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");
  var DRAG_MODE_CROP = "crop";
  var DRAG_MODE_MOVE = "move";
  var DRAG_MODE_NONE = "none";
  var EVENT_CROP = "crop";
  var EVENT_CROP_END = "cropend";
  var EVENT_CROP_MOVE = "cropmove";
  var EVENT_CROP_START = "cropstart";
  var EVENT_DBLCLICK = "dblclick";
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? "touchstart" : "mousedown";
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? "touchmove" : "mousemove";
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? "touchend touchcancel" : "mouseup";
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? "pointerdown" : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? "pointermove" : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? "pointerup pointercancel" : EVENT_TOUCH_END;
  var EVENT_READY = "ready";
  var EVENT_RESIZE = "resize";
  var EVENT_WHEEL = "wheel";
  var EVENT_ZOOM = "zoom";
  var MIME_TYPE_JPEG = "image/jpeg";
  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
  var REGEXP_DATA_URL = /^data:/;
  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
  var REGEXP_TAG_NAME = /^img|canvas$/i;
  var MIN_CONTAINER_WIDTH = 200;
  var MIN_CONTAINER_HEIGHT = 100;
  var DEFAULTS = {
    // Define the view mode of the cropper
    viewMode: 0,
    // 0, 1, 2, 3
    // Define the dragging mode of the cropper
    dragMode: DRAG_MODE_CROP,
    // 'crop', 'move' or 'none'
    // Define the initial aspect ratio of the crop box
    initialAspectRatio: NaN,
    // Define the aspect ratio of the crop box
    aspectRatio: NaN,
    // An object with the previous cropping result data
    data: null,
    // A selector for adding extra containers to preview
    preview: "",
    // Re-render the cropper when resize the window
    responsive: true,
    // Restore the cropped area after resize the window
    restore: true,
    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,
    // Check the current image's Exif Orientation information
    checkOrientation: true,
    // Show the black modal
    modal: true,
    // Show the dashed lines for guiding
    guides: true,
    // Show the center indicator for guiding
    center: true,
    // Show the white modal to highlight the crop box
    highlight: true,
    // Show the grid background
    background: true,
    // Enable to crop the image automatically when initialize
    autoCrop: true,
    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,
    // Enable to move the image
    movable: true,
    // Enable to rotate the image
    rotatable: true,
    // Enable to scale the image
    scalable: true,
    // Enable to zoom the image
    zoomable: true,
    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,
    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,
    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,
    // Enable to move the crop box
    cropBoxMovable: true,
    // Enable to resize the crop box
    cropBoxResizable: true,
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: MIN_CONTAINER_WIDTH,
    minContainerHeight: MIN_CONTAINER_HEIGHT,
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };
  var TEMPLATE = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
  var isNaN = Number.isNaN || WINDOW.isNaN;
  function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }
  var isPositiveNumber = function isPositiveNumber2(value) {
    return value > 0 && value < Infinity;
  };
  function isUndefined(value) {
    return typeof value === "undefined";
  }
  function isObject(value) {
    return _typeof(value) === "object" && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }
    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, "isPrototypeOf");
    } catch (error) {
      return false;
    }
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  var slice = Array.prototype.slice;
  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }
  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length)) {
        toArray(data).forEach(function(value, key) {
          callback.call(data, value, key, data);
        });
      } else if (isObject(data)) {
        Object.keys(data).forEach(function(key) {
          callback.call(data, data[key], key, data);
        });
      }
    }
    return data;
  }
  var assign = Object.assign || function assign2(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (isObject(target) && args.length > 0) {
      args.forEach(function(arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function(key) {
            target[key] = arg[key];
          });
        }
      });
    }
    return target;
  };
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }
  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function(value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value = "".concat(value, "px");
      }
      style[property] = value;
    });
  }
  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }
  function addClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function(elem) {
        addClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.add(value);
      return;
    }
    var className = element.className.trim();
    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }
  function removeClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function(elem) {
        removeClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.remove(value);
      return;
    }
    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, "");
    }
  }
  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function(elem) {
        toggleClass(elem, value, added);
      });
      return;
    }
    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
  function toParamCase(value) {
    return value.replace(REGEXP_CAMEL_CASE, "$1-$2").toLowerCase();
  }
  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }
    if (element.dataset) {
      return element.dataset[name];
    }
    return element.getAttribute("data-".concat(toParamCase(name)));
  }
  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(toParamCase(name)), data);
    }
  }
  function removeData(element, name) {
    if (isObject(element[name])) {
      try {
        delete element[name];
      } catch (error) {
        element[name] = void 0;
      }
    } else if (element.dataset) {
      try {
        delete element.dataset[name];
      } catch (error) {
        element.dataset[name] = void 0;
      }
    } else {
      element.removeAttribute("data-".concat(toParamCase(name)));
    }
  }
  var REGEXP_SPACES = /\s\s*/;
  var onceSupported = function() {
    var supported = false;
    if (IS_BROWSER) {
      var once = false;
      var listener = function listener2() {
      };
      var options = Object.defineProperty({}, "once", {
        get: function get() {
          supported = true;
          return once;
        },
        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener("test", listener, options);
      WINDOW.removeEventListener("test", listener, options);
    }
    return supported;
  }();
  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function(event) {
      if (!onceSupported) {
        var listeners = element.listeners;
        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];
          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }
          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }
      element.removeEventListener(event, handler, options);
    });
  }
  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function(event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners, listeners = _element$listeners === void 0 ? {} : _element$listeners;
        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          listener.apply(element, args);
        };
        if (!listeners[event]) {
          listeners[event] = {};
        }
        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }
        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }
      element.addEventListener(event, _handler, options);
    });
  }
  function dispatchEvent(element, type, data) {
    var event;
    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent(type, true, true, data);
    }
    return element.dispatchEvent(event);
  }
  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  var location = WINDOW.location;
  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
  function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }
  function addTimestamp(url) {
    var timestamp = "timestamp=".concat((/* @__PURE__ */ new Date()).getTime());
    return url + (url.indexOf("?") === -1 ? "?" : "&") + timestamp;
  }
  function getTransforms(_ref) {
    var rotate = _ref.rotate, scaleX = _ref.scaleX, scaleY = _ref.scaleY, translateX = _ref.translateX, translateY = _ref.translateY;
    var values = [];
    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }
    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    }
    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }
    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }
    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }
    var transform = values.length ? values.join(" ") : "none";
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform
    };
  }
  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);
    var maxRatio = 0;
    forEach(pointers, function(pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function(pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        if (Math.abs(ratio) > Math.abs(maxRatio)) {
          maxRatio = ratio;
        }
      });
    });
    return maxRatio;
  }
  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX, pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      startX: pageX,
      startY: pageY
    }, end);
  }
  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function(_ref3) {
      var startX = _ref3.startX, startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX,
      pageY
    };
  }
  function getAdjustedSizes(_ref4) {
    var aspectRatio = _ref4.aspectRatio, height = _ref4.height, width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain";
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;
      if (type === "contain" && adjustedWidth > width || type === "cover" && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }
    return {
      width,
      height
    };
  }
  function getRotatedSizes(_ref5) {
    var width = _ref5.width, height = _ref5.height, degree = _ref5.degree;
    degree = Math.abs(degree) % 180;
    if (degree === 90) {
      return {
        width: height,
        height: width
      };
    }
    var arc = degree % 90 * Math.PI / 180;
    var sinArc = Math.sin(arc);
    var cosArc = Math.cos(arc);
    var newWidth = width * cosArc + height * sinArc;
    var newHeight = width * sinArc + height * cosArc;
    return degree > 90 ? {
      width: newHeight,
      height: newWidth
    } : {
      width: newWidth,
      height: newHeight
    };
  }
  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
    var imageAspectRatio = _ref6.aspectRatio, imageNaturalWidth = _ref6.naturalWidth, imageNaturalHeight = _ref6.naturalHeight, _ref6$rotate = _ref6.rotate, rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate, _ref6$scaleX = _ref6.scaleX, scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX, _ref6$scaleY = _ref6.scaleY, scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
    var aspectRatio = _ref7.aspectRatio, naturalWidth = _ref7.naturalWidth, naturalHeight = _ref7.naturalHeight;
    var _ref8$fillColor = _ref8.fillColor, fillColor = _ref8$fillColor === void 0 ? "transparent" : _ref8$fillColor, _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled, imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE, _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality, imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? "low" : _ref8$imageSmoothingQ, _ref8$maxWidth = _ref8.maxWidth, maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth, _ref8$maxHeight = _ref8.maxHeight, maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight, _ref8$minWidth = _ref8.minWidth, minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth, _ref8$minHeight = _ref8.minHeight, minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var maxSizes = getAdjustedSizes({
      aspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var minSizes = getAdjustedSizes({
      aspectRatio,
      width: minWidth,
      height: minHeight
    }, "cover");
    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));
    var destMaxSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var destMinSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: minWidth,
      height: minHeight
    }, "cover");
    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.scale(scaleX, scaleY);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
    context.imageSmoothingQuality = imageSmoothingQuality;
    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function(param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    context.restore();
    return canvas;
  }
  var fromCharCode = String.fromCharCode;
  function getStringFromCharCode(dataView, start, length) {
    var str = "";
    length += start;
    for (var i2 = start; i2 < length; i2 += 1) {
      str += fromCharCode(dataView.getUint8(i2));
    }
    return str;
  }
  var REGEXP_DATA_URL_HEAD = /^data:.*,/;
  function dataURLToArrayBuffer(dataURL) {
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, "");
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    forEach(uint8, function(value, i2) {
      uint8[i2] = binary.charCodeAt(i2);
    });
    return arrayBuffer;
  }
  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = [];
    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);
    while (uint8.length > 0) {
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }
    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join("")));
  }
  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation;
    try {
      var littleEndian;
      var app1Start;
      var ifdStart;
      if (dataView.getUint8(0) === 255 && dataView.getUint8(1) === 216) {
        var length = dataView.byteLength;
        var offset = 2;
        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 255 && dataView.getUint8(offset + 1) === 225) {
            app1Start = offset;
            break;
          }
          offset += 1;
        }
      }
      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === "Exif") {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 18761;
          if (littleEndian || endianness === 19789) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 42) {
              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
              if (firstIFDOffset >= 8) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }
      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);
        var _offset;
        var i2;
        for (i2 = 0; i2 < _length; i2 += 1) {
          _offset = ifdStart + i2 * 12 + 2;
          if (dataView.getUint16(_offset, littleEndian) === 274) {
            _offset += 8;
            orientation = dataView.getUint16(_offset, littleEndian);
            dataView.setUint16(_offset, 1, littleEndian);
            break;
          }
        }
      }
    } catch (error) {
      orientation = 1;
    }
    return orientation;
  }
  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;
    switch (orientation) {
      case 2:
        scaleX = -1;
        break;
      case 3:
        rotate = -180;
        break;
      case 4:
        scaleY = -1;
        break;
      case 5:
        rotate = 90;
        scaleY = -1;
        break;
      case 6:
        rotate = 90;
        break;
      case 7:
        rotate = 90;
        scaleX = -1;
        break;
      case 8:
        rotate = -90;
        break;
    }
    return {
      rotate,
      scaleX,
      scaleY
    };
  }
  var render = {
    render: function render2() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();
      this.renderCanvas();
      if (this.cropped) {
        this.renderCropBox();
      }
    },
    initContainer: function initContainer() {
      var element = this.element, options = this.options, container = this.container, cropper = this.cropper;
      var minWidth = Number(options.minContainerWidth);
      var minHeight = Number(options.minContainerHeight);
      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);
      var containerData = {
        width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
        height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
      };
      this.containerData = containerData;
      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });
      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },
    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var containerData = this.containerData, imageData = this.imageData;
      var viewMode = this.options.viewMode;
      var rotated = Math.abs(imageData.rotate) % 180 === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;
      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else if (viewMode === 3) {
        canvasHeight = containerData.width / aspectRatio;
      } else {
        canvasWidth = containerData.height * aspectRatio;
      }
      var canvasData = {
        aspectRatio,
        naturalWidth,
        naturalHeight,
        width: canvasWidth,
        height: canvasHeight
      };
      this.canvasData = canvasData;
      this.limited = viewMode === 1 || viewMode === 2;
      this.limitCanvas(true, true);
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      canvasData.left = (containerData.width - canvasData.width) / 2;
      canvasData.top = (containerData.height - canvasData.height) / 2;
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      this.initialCanvasData = assign({}, canvasData);
    },
    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
      var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
      var viewMode = options.viewMode;
      var aspectRatio = canvasData.aspectRatio;
      var cropped = this.cropped && cropBoxData;
      if (sizeLimited) {
        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
        var minCanvasHeight = Number(options.minCanvasHeight) || 0;
        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
          } else if (minCanvasHeight) {
            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
          } else if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        }
        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio,
          width: minCanvasWidth,
          height: minCanvasHeight
        });
        minCanvasWidth = _getAdjustedSizes.width;
        minCanvasHeight = _getAdjustedSizes.height;
        canvasData.minWidth = minCanvasWidth;
        canvasData.minHeight = minCanvasHeight;
        canvasData.maxWidth = Infinity;
        canvasData.maxHeight = Infinity;
      }
      if (positionLimited) {
        if (viewMode > (cropped ? 0 : 1)) {
          var newCanvasLeft = containerData.width - canvasData.width;
          var newCanvasTop = containerData.height - canvasData.height;
          canvasData.minLeft = Math.min(0, newCanvasLeft);
          canvasData.minTop = Math.min(0, newCanvasTop);
          canvasData.maxLeft = Math.max(0, newCanvasLeft);
          canvasData.maxTop = Math.max(0, newCanvasTop);
          if (cropped && this.limited) {
            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;
            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
              }
              if (canvasData.height >= containerData.height) {
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxTop = Math.max(0, newCanvasTop);
              }
            }
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerData.width;
          canvasData.maxTop = containerData.height;
        }
      }
    },
    renderCanvas: function renderCanvas(changed, transformed) {
      var canvasData = this.canvasData, imageData = this.imageData;
      if (transformed) {
        var _getRotatedSizes = getRotatedSizes({
          width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
          height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
          degree: imageData.rotate || 0
        }), naturalWidth = _getRotatedSizes.width, naturalHeight = _getRotatedSizes.height;
        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        canvasData.aspectRatio = naturalWidth / naturalHeight;
        canvasData.naturalWidth = naturalWidth;
        canvasData.naturalHeight = naturalHeight;
        this.limitCanvas(true, false);
      }
      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }
      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      this.limitCanvas(false, true);
      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      setStyle(this.canvas, assign({
        width: canvasData.width,
        height: canvasData.height
      }, getTransforms({
        translateX: canvasData.left,
        translateY: canvasData.top
      })));
      this.renderImage(changed);
      if (this.cropped && this.limited) {
        this.limitCropBox(true, true);
      }
    },
    renderImage: function renderImage(changed) {
      var canvasData = this.canvasData, imageData = this.imageData;
      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
      assign(imageData, {
        width,
        height,
        left: (canvasData.width - width) / 2,
        top: (canvasData.height - height) / 2
      });
      setStyle(this.image, assign({
        width: imageData.width,
        height: imageData.height
      }, getTransforms(assign({
        translateX: imageData.left,
        translateY: imageData.top
      }, imageData))));
      if (changed) {
        this.output();
      }
    },
    initCropBox: function initCropBox() {
      var options = this.options, canvasData = this.canvasData;
      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var cropBoxData = {
        width: canvasData.width,
        height: canvasData.height
      };
      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }
      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true);
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      this.initialCropBoxData = assign({}, cropBoxData);
    },
    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
      var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData, limited = this.limited;
      var aspectRatio = options.aspectRatio;
      if (sizeLimited) {
        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;
        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
        if (aspectRatio) {
          if (minCropBoxWidth && minCropBoxHeight) {
            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
              minCropBoxHeight = minCropBoxWidth / aspectRatio;
            } else {
              minCropBoxWidth = minCropBoxHeight * aspectRatio;
            }
          } else if (minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else if (minCropBoxHeight) {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
          } else {
            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
          }
        }
        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }
      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = Math.max(0, canvasData.left);
          cropBoxData.minTop = Math.max(0, canvasData.top);
          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },
    renderCropBox: function renderCropBox() {
      var options = this.options, containerData = this.containerData, cropBoxData = this.cropBoxData;
      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }
      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      this.limitCropBox(false, true);
      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      if (options.movable && options.cropBoxMovable) {
        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
      }
      setStyle(this.cropBox, assign({
        width: cropBoxData.width,
        height: cropBoxData.height
      }, getTransforms({
        translateX: cropBoxData.left,
        translateY: cropBoxData.top
      })));
      if (this.cropped && this.limited) {
        this.limitCanvas(true, true);
      }
      if (!this.disabled) {
        this.output();
      }
    },
    output: function output() {
      this.preview();
      dispatchEvent(this.element, EVENT_CROP, this.getData());
    }
  };
  var preview = {
    initPreview: function initPreview() {
      var element = this.element, crossOrigin = this.crossOrigin;
      var preview2 = this.options.preview;
      var url = crossOrigin ? this.crossOriginUrl : this.url;
      var alt = element.alt || "The image to preview";
      var image = document.createElement("img");
      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }
      image.src = url;
      image.alt = alt;
      this.viewBox.appendChild(image);
      this.viewBoxImage = image;
      if (!preview2) {
        return;
      }
      var previews = preview2;
      if (typeof preview2 === "string") {
        previews = element.ownerDocument.querySelectorAll(preview2);
      } else if (preview2.querySelector) {
        previews = [preview2];
      }
      this.previews = previews;
      forEach(previews, function(el) {
        var img = document.createElement("img");
        setData(el, DATA_PREVIEW, {
          width: el.offsetWidth,
          height: el.offsetHeight,
          html: el.innerHTML
        });
        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }
        img.src = url;
        img.alt = alt;
        img.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"';
        el.innerHTML = "";
        el.appendChild(img);
      });
    },
    resetPreview: function resetPreview() {
      forEach(this.previews, function(element) {
        var data = getData(element, DATA_PREVIEW);
        setStyle(element, {
          width: data.width,
          height: data.height
        });
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },
    preview: function preview2() {
      var imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width, cropBoxHeight = cropBoxData.height;
      var width = imageData.width, height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;
      if (!this.cropped || this.disabled) {
        return;
      }
      setStyle(this.viewBoxImage, assign({
        width,
        height
      }, getTransforms(assign({
        translateX: -left,
        translateY: -top
      }, imageData))));
      forEach(this.previews, function(element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;
        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }
        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }
        setStyle(element, {
          width: newWidth,
          height: newHeight
        });
        setStyle(element.getElementsByTagName("img")[0], assign({
          width: width * ratio,
          height: height * ratio
        }, getTransforms(assign({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, imageData))));
      });
    }
  };
  var events = {
    bind: function bind() {
      var element = this.element, options = this.options, cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }
      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }
      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
      if (options.responsive) {
        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
      }
    },
    unbind: function unbind() {
      var element = this.element, options = this.options, cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }
      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
      }
      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this.onResize);
      }
    }
  };
  var handlers = {
    resize: function resize() {
      if (this.disabled) {
        return;
      }
      var options = this.options, container = this.container, containerData = this.containerData;
      var ratioX = container.offsetWidth / containerData.width;
      var ratioY = container.offsetHeight / containerData.height;
      var ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY;
      if (ratio !== 1) {
        var canvasData;
        var cropBoxData;
        if (options.restore) {
          canvasData = this.getCanvasData();
          cropBoxData = this.getCropBoxData();
        }
        this.render();
        if (options.restore) {
          this.setCanvasData(forEach(canvasData, function(n, i2) {
            canvasData[i2] = n * ratio;
          }));
          this.setCropBoxData(forEach(cropBoxData, function(n, i2) {
            cropBoxData[i2] = n * ratio;
          }));
        }
      }
    },
    dblclick: function dblclick() {
      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
        return;
      }
      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
    },
    wheel: function wheel(event) {
      var _this = this;
      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;
      if (this.disabled) {
        return;
      }
      event.preventDefault();
      if (this.wheeling) {
        return;
      }
      this.wheeling = true;
      setTimeout(function() {
        _this.wheeling = false;
      }, 50);
      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }
      this.zoom(-delta * ratio, event);
    },
    cropStart: function cropStart(event) {
      var buttons = event.buttons, button = event.button;
      if (this.disabled || (event.type === "mousedown" || event.type === "pointerdown" && event.pointerType === "mouse") && // No primary button (Usually the left button)
      (isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 || event.ctrlKey)) {
        return;
      }
      var options = this.options, pointers = this.pointers;
      var action;
      if (event.changedTouches) {
        forEach(event.changedTouches, function(touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        pointers[event.pointerId || 0] = getPointer(event);
      }
      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
        action = ACTION_ZOOM;
      } else {
        action = getData(event.target, DATA_ACTION);
      }
      if (!REGEXP_ACTIONS.test(action)) {
        return;
      }
      if (dispatchEvent(this.element, EVENT_CROP_START, {
        originalEvent: event,
        action
      }) === false) {
        return;
      }
      event.preventDefault();
      this.action = action;
      this.cropping = false;
      if (action === ACTION_CROP) {
        this.cropping = true;
        addClass(this.dragBox, CLASS_MODAL);
      }
    },
    cropMove: function cropMove(event) {
      var action = this.action;
      if (this.disabled || !action) {
        return;
      }
      var pointers = this.pointers;
      event.preventDefault();
      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
        originalEvent: event,
        action
      }) === false) {
        return;
      }
      if (event.changedTouches) {
        forEach(event.changedTouches, function(touch) {
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }
      this.change(event);
    },
    cropEnd: function cropEnd(event) {
      if (this.disabled) {
        return;
      }
      var action = this.action, pointers = this.pointers;
      if (event.changedTouches) {
        forEach(event.changedTouches, function(touch) {
          delete pointers[touch.identifier];
        });
      } else {
        delete pointers[event.pointerId || 0];
      }
      if (!action) {
        return;
      }
      event.preventDefault();
      if (!Object.keys(pointers).length) {
        this.action = "";
      }
      if (this.cropping) {
        this.cropping = false;
        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
      }
      dispatchEvent(this.element, EVENT_CROP_END, {
        originalEvent: event,
        action
      });
    }
  };
  var change = {
    change: function change2(event) {
      var options = this.options, canvasData = this.canvasData, containerData = this.containerData, cropBoxData = this.cropBoxData, pointers = this.pointers;
      var action = this.action;
      var aspectRatio = options.aspectRatio;
      var left = cropBoxData.left, top = cropBoxData.top, width = cropBoxData.width, height = cropBoxData.height;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = containerData.width;
      var maxHeight = containerData.height;
      var renderable = true;
      var offset;
      if (!aspectRatio && event.shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }
      if (this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
      }
      var pointer = pointers[Object.keys(pointers)[0]];
      var range = {
        x: pointer.endX - pointer.startX,
        y: pointer.endY - pointer.startY
      };
      var check = function check2(side) {
        switch (side) {
          case ACTION_EAST:
            if (right + range.x > maxWidth) {
              range.x = maxWidth - right;
            }
            break;
          case ACTION_WEST:
            if (left + range.x < minLeft) {
              range.x = minLeft - left;
            }
            break;
          case ACTION_NORTH:
            if (top + range.y < minTop) {
              range.y = minTop - top;
            }
            break;
          case ACTION_SOUTH:
            if (bottom + range.y > maxHeight) {
              range.y = maxHeight - bottom;
            }
            break;
        }
      };
      switch (action) {
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;
        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_EAST);
          width += range.x;
          if (width < 0) {
            action = ACTION_WEST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          if (height < 0) {
            action = ACTION_SOUTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_WEST);
          width -= range.x;
          left += range.x;
          if (width < 0) {
            action = ACTION_EAST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_SOUTH);
          height += range.y;
          if (height < 0) {
            action = ACTION_NORTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            check(ACTION_NORTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += cropBoxData.width - width;
          } else {
            check(ACTION_NORTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_WEST);
            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_EAST);
            width += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_MOVE:
          this.move(range.x, range.y);
          renderable = false;
          break;
        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), event);
          renderable = false;
          break;
        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }
          offset = getOffset(this.cropper);
          left = pointer.startX - offset.left;
          top = pointer.startY - offset.top;
          width = cropBoxData.minWidth;
          height = cropBoxData.minHeight;
          if (range.x > 0) {
            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
          } else if (range.x < 0) {
            left -= width;
            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
          }
          if (range.y < 0) {
            top -= height;
          }
          if (!this.cropped) {
            removeClass(this.cropBox, CLASS_HIDDEN);
            this.cropped = true;
            if (this.limited) {
              this.limitCropBox(true, true);
            }
          }
          break;
      }
      if (renderable) {
        cropBoxData.width = width;
        cropBoxData.height = height;
        cropBoxData.left = left;
        cropBoxData.top = top;
        this.action = action;
        this.renderCropBox();
      }
      forEach(pointers, function(p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    }
  };
  var methods = {
    // Show the crop box manually
    crop: function crop() {
      if (this.ready && !this.cropped && !this.disabled) {
        this.cropped = true;
        this.limitCropBox(true, true);
        if (this.options.modal) {
          addClass(this.dragBox, CLASS_MODAL);
        }
        removeClass(this.cropBox, CLASS_HIDDEN);
        this.setCropBoxData(this.initialCropBoxData);
      }
      return this;
    },
    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (this.ready && !this.disabled) {
        this.imageData = assign({}, this.initialImageData);
        this.canvasData = assign({}, this.initialCanvasData);
        this.cropBoxData = assign({}, this.initialCropBoxData);
        this.renderCanvas();
        if (this.cropped) {
          this.renderCropBox();
        }
      }
      return this;
    },
    // Clear the crop box
    clear: function clear() {
      if (this.cropped && !this.disabled) {
        assign(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });
        this.cropped = false;
        this.renderCropBox();
        this.limitCanvas(true, true);
        this.renderCanvas();
        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }
      return this;
    },
    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
     * @returns {Cropper} this
     */
    replace: function replace(url) {
      var hasSameSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (!this.disabled && url) {
        if (this.isImg) {
          this.element.src = url;
        }
        if (hasSameSize) {
          this.url = url;
          this.image.src = url;
          if (this.ready) {
            this.viewBoxImage.src = url;
            forEach(this.previews, function(element) {
              element.getElementsByTagName("img")[0].src = url;
            });
          }
        } else {
          if (this.isImg) {
            this.replaced = true;
          }
          this.options.data = null;
          this.uncreate();
          this.load(url);
        }
      }
      return this;
    },
    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.ready && this.disabled) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.ready && !this.disabled) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    /**
     * Destroy the cropper and remove the instance from the image
     * @returns {Cropper} this
     */
    destroy: function destroy() {
      var element = this.element;
      if (!element[NAMESPACE]) {
        return this;
      }
      element[NAMESPACE] = void 0;
      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }
      this.uncreate();
      return this;
    },
    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
     * @returns {Cropper} this
     */
    move: function move(offsetX) {
      var offsetY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : offsetX;
      var _this$canvasData = this.canvasData, left = _this$canvasData.left, top = _this$canvasData.top;
      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
    },
    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Cropper} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x;
      var canvasData = this.canvasData;
      var changed = false;
      x = Number(x);
      y = Number(y);
      if (this.ready && !this.disabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }
        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }
        if (changed) {
          this.renderCanvas(true);
        }
      }
      return this;
    },
    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvasData = this.canvasData;
      ratio = Number(ratio);
      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }
      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
    },
    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Object} pivot - The zoom pivot point coordinate.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
      var options = this.options, canvasData = this.canvasData;
      var width = canvasData.width, height = canvasData.height, naturalWidth = canvasData.naturalWidth, naturalHeight = canvasData.naturalHeight;
      ratio = Number(ratio);
      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;
        if (dispatchEvent(this.element, EVENT_ZOOM, {
          ratio,
          oldRatio: width / naturalWidth,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }
        if (_originalEvent) {
          var pointers = this.pointers;
          var offset = getOffset(this.cropper);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };
          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
        } else {
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }
        canvasData.width = newWidth;
        canvasData.height = newHeight;
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotate: function rotate(degree) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    },
    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotateTo: function rotateTo(degree) {
      degree = Number(degree);
      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.renderCanvas(true, true);
      }
      return this;
    },
    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Cropper} this
     */
    scaleX: function scaleX(_scaleX) {
      var scaleY = this.imageData.scaleY;
      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
    },
    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scaleY: function scaleY(_scaleY) {
      var scaleX = this.imageData.scaleX;
      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
    },
    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : scaleX;
      var imageData = this.imageData;
      var transformed = false;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);
      if (this.ready && !this.disabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          transformed = true;
        }
        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          transformed = true;
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
      }
      return this;
    },
    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData: function getData2() {
      var rounded = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var options = this.options, imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
        var ratio = imageData.width / imageData.naturalWidth;
        forEach(data, function(n, i2) {
          data[i2] = n / ratio;
        });
        if (rounded) {
          var bottom = Math.round(data.y + data.height);
          var right = Math.round(data.x + data.width);
          data.x = Math.round(data.x);
          data.y = Math.round(data.y);
          data.width = right - data.x;
          data.height = bottom - data.y;
        }
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (options.rotatable) {
        data.rotate = imageData.rotate || 0;
      }
      if (options.scalable) {
        data.scaleX = imageData.scaleX || 1;
        data.scaleY = imageData.scaleY || 1;
      }
      return data;
    },
    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Cropper} this
     */
    setData: function setData2(data) {
      var options = this.options, imageData = this.imageData, canvasData = this.canvasData;
      var cropBoxData = {};
      if (this.ready && !this.disabled && isPlainObject(data)) {
        var transformed = false;
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            transformed = true;
          }
        }
        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            transformed = true;
          }
          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            transformed = true;
          }
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
        var ratio = imageData.width / imageData.naturalWidth;
        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }
        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }
        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }
        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }
        this.setCropBoxData(cropBoxData);
      }
      return this;
    },
    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData: function getContainerData() {
      return this.ready ? assign({}, this.containerData) : {};
    },
    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData: function getImageData() {
      return this.sized ? assign({}, this.imageData) : {};
    },
    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData: function getCanvasData() {
      var canvasData = this.canvasData;
      var data = {};
      if (this.ready) {
        forEach(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n) {
          data[n] = canvasData[n];
        });
      }
      return data;
    },
    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Cropper} this
     */
    setCanvasData: function setCanvasData(data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      if (this.ready && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }
        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }
        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData: function getCropBoxData() {
      var cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          left: cropBoxData.left,
          top: cropBoxData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
      }
      return data || {};
    },
    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Cropper} this
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;
      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }
        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }
        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }
        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          heightChanged = true;
          cropBoxData.height = data.height;
        }
        if (aspectRatio) {
          if (widthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (heightChanged) {
            cropBoxData.width = cropBoxData.height * aspectRatio;
          }
        }
        this.renderCropBox();
      }
      return this;
    },
    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas: function getCroppedCanvas() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!this.ready || !window.HTMLCanvasElement) {
        return null;
      }
      var canvasData = this.canvasData;
      var source = getSourceCanvas(this.image, this.imageData, canvasData, options);
      if (!this.cropped) {
        return source;
      }
      var _this$getData = this.getData(options.rounded), initialX = _this$getData.x, initialY = _this$getData.y, initialWidth = _this$getData.width, initialHeight = _this$getData.height;
      var ratio = source.width / Math.floor(canvasData.naturalWidth);
      if (ratio !== 1) {
        initialX *= ratio;
        initialY *= ratio;
        initialWidth *= ratio;
        initialHeight *= ratio;
      }
      var aspectRatio = initialWidth / initialHeight;
      var maxSizes = getAdjustedSizes({
        aspectRatio,
        width: options.maxWidth || Infinity,
        height: options.maxHeight || Infinity
      });
      var minSizes = getAdjustedSizes({
        aspectRatio,
        width: options.minWidth || 0,
        height: options.minHeight || 0
      }, "cover");
      var _getAdjustedSizes = getAdjustedSizes({
        aspectRatio,
        width: options.width || (ratio !== 1 ? source.width : initialWidth),
        height: options.height || (ratio !== 1 ? source.height : initialHeight)
      }), width = _getAdjustedSizes.width, height = _getAdjustedSizes.height;
      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = normalizeDecimalNumber(width);
      canvas.height = normalizeDecimalNumber(height);
      context.fillStyle = options.fillColor || "transparent";
      context.fillRect(0, 0, width, height);
      var _options$imageSmoothi = options.imageSmoothingEnabled, imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi, imageSmoothingQuality = options.imageSmoothingQuality;
      context.imageSmoothingEnabled = imageSmoothingEnabled;
      if (imageSmoothingQuality) {
        context.imageSmoothingQuality = imageSmoothingQuality;
      }
      var sourceWidth = source.width;
      var sourceHeight = source.height;
      var srcX = initialX;
      var srcY = initialY;
      var srcWidth;
      var srcHeight;
      var dstX;
      var dstY;
      var dstWidth;
      var dstHeight;
      if (srcX <= -initialWidth || srcX > sourceWidth) {
        srcX = 0;
        srcWidth = 0;
        dstX = 0;
        dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
        dstWidth = srcWidth;
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
        dstWidth = srcWidth;
      }
      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
        srcY = 0;
        srcHeight = 0;
        dstY = 0;
        dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
        dstHeight = srcHeight;
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
        dstHeight = srcHeight;
      }
      var params = [srcX, srcY, srcWidth, srcHeight];
      if (dstWidth > 0 && dstHeight > 0) {
        var scale = width / initialWidth;
        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
      }
      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function(param) {
        return Math.floor(normalizeDecimalNumber(param));
      }))));
      return canvas;
    },
    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Cropper} this
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;
      if (!this.disabled && !isUndefined(aspectRatio)) {
        options.aspectRatio = Math.max(0, aspectRatio) || NaN;
        if (this.ready) {
          this.initCropBox();
          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }
      return this;
    },
    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Cropper} this
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options, dragBox = this.dragBox, face = this.face;
      if (this.ready && !this.disabled) {
        var croppable = mode === DRAG_MODE_CROP;
        var movable = options.movable && mode === DRAG_MODE_MOVE;
        mode = croppable || movable ? mode : DRAG_MODE_NONE;
        options.dragMode = mode;
        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);
        if (!options.cropBoxMovable) {
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }
      return this;
    }
  };
  var AnotherCropper = WINDOW.Cropper;
  var Cropper = /* @__PURE__ */ function() {
    function Cropper2(element) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck(this, Cropper2);
      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
        throw new Error("The first argument is required and must be an <img> or <canvas> element.");
      }
      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.cropped = false;
      this.disabled = false;
      this.pointers = {};
      this.ready = false;
      this.reloading = false;
      this.replaced = false;
      this.sized = false;
      this.sizing = false;
      this.init();
    }
    return _createClass(Cropper2, [{
      key: "init",
      value: function init() {
        var element = this.element;
        var tagName = element.tagName.toLowerCase();
        var url;
        if (element[NAMESPACE]) {
          return;
        }
        element[NAMESPACE] = this;
        if (tagName === "img") {
          this.isImg = true;
          url = element.getAttribute("src") || "";
          this.originalUrl = url;
          if (!url) {
            return;
          }
          url = element.src;
        } else if (tagName === "canvas" && window.HTMLCanvasElement) {
          url = element.toDataURL();
        }
        this.load(url);
      }
    }, {
      key: "load",
      value: function load(url) {
        var _this = this;
        if (!url) {
          return;
        }
        this.url = url;
        this.imageData = {};
        var element = this.element, options = this.options;
        if (!options.rotatable && !options.scalable) {
          options.checkOrientation = false;
        }
        if (!options.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (REGEXP_DATA_URL.test(url)) {
          if (REGEXP_DATA_URL_JPEG.test(url)) {
            this.read(dataURLToArrayBuffer(url));
          } else {
            this.clone();
          }
          return;
        }
        var xhr = new XMLHttpRequest();
        var clone = this.clone.bind(this);
        this.reloading = true;
        this.xhr = xhr;
        xhr.onabort = clone;
        xhr.onerror = clone;
        xhr.ontimeout = clone;
        xhr.onprogress = function() {
          if (xhr.getResponseHeader("content-type") !== MIME_TYPE_JPEG) {
            xhr.abort();
          }
        };
        xhr.onload = function() {
          _this.read(xhr.response);
        };
        xhr.onloadend = function() {
          _this.reloading = false;
          _this.xhr = null;
        };
        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
          url = addTimestamp(url);
        }
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.withCredentials = element.crossOrigin === "use-credentials";
        xhr.send();
      }
    }, {
      key: "read",
      value: function read(arrayBuffer) {
        var options = this.options, imageData = this.imageData;
        var orientation = resetAndGetOrientation(arrayBuffer);
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;
        if (orientation > 1) {
          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
          var _parseOrientation = parseOrientation(orientation);
          rotate = _parseOrientation.rotate;
          scaleX = _parseOrientation.scaleX;
          scaleY = _parseOrientation.scaleY;
        }
        if (options.rotatable) {
          imageData.rotate = rotate;
        }
        if (options.scalable) {
          imageData.scaleX = scaleX;
          imageData.scaleY = scaleY;
        }
        this.clone();
      }
    }, {
      key: "clone",
      value: function clone() {
        var element = this.element, url = this.url;
        var crossOrigin = element.crossOrigin;
        var crossOriginUrl = url;
        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
          if (!crossOrigin) {
            crossOrigin = "anonymous";
          }
          crossOriginUrl = addTimestamp(url);
        }
        this.crossOrigin = crossOrigin;
        this.crossOriginUrl = crossOriginUrl;
        var image = document.createElement("img");
        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }
        image.src = crossOriginUrl || url;
        image.alt = element.alt || "The image to crop";
        this.image = image;
        image.onload = this.start.bind(this);
        image.onerror = this.stop.bind(this);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        this.sizing = true;
        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
        var done = function done2(naturalWidth, naturalHeight) {
          assign(_this2.imageData, {
            naturalWidth,
            naturalHeight,
            aspectRatio: naturalWidth / naturalHeight
          });
          _this2.initialImageData = assign({}, _this2.imageData);
          _this2.sizing = false;
          _this2.sized = true;
          _this2.build();
        };
        if (image.naturalWidth && !isIOSWebKit) {
          done(image.naturalWidth, image.naturalHeight);
          return;
        }
        var sizingImage = document.createElement("img");
        var body = document.body || document.documentElement;
        this.sizingImage = sizingImage;
        sizingImage.onload = function() {
          done(sizingImage.width, sizingImage.height);
          if (!isIOSWebKit) {
            body.removeChild(sizingImage);
          }
        };
        sizingImage.src = image.src;
        if (!isIOSWebKit) {
          sizingImage.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;";
          body.appendChild(sizingImage);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        image.parentNode.removeChild(image);
        this.image = null;
      }
    }, {
      key: "build",
      value: function build() {
        if (!this.sized || this.ready) {
          return;
        }
        var element = this.element, options = this.options, image = this.image;
        var container = element.parentNode;
        var template = document.createElement("div");
        template.innerHTML = TEMPLATE;
        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
        this.container = container;
        this.cropper = cropper;
        this.canvas = canvas;
        this.dragBox = dragBox;
        this.cropBox = cropBox;
        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
        this.face = face;
        canvas.appendChild(image);
        addClass(element, CLASS_HIDDEN);
        container.insertBefore(cropper, element.nextSibling);
        removeClass(image, CLASS_HIDE);
        this.initPreview();
        this.bind();
        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
        addClass(cropBox, CLASS_HIDDEN);
        if (!options.guides) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
        }
        if (!options.center) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
        }
        if (options.background) {
          addClass(cropper, "".concat(NAMESPACE, "-bg"));
        }
        if (!options.highlight) {
          addClass(face, CLASS_INVISIBLE);
        }
        if (options.cropBoxMovable) {
          addClass(face, CLASS_MOVE);
          setData(face, DATA_ACTION, ACTION_ALL);
        }
        if (!options.cropBoxResizable) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
        }
        this.render();
        this.ready = true;
        this.setDragMode(options.dragMode);
        if (options.autoCrop) {
          this.crop();
        }
        this.setData(options.data);
        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: "unbuild",
      value: function unbuild() {
        if (!this.ready) {
          return;
        }
        this.ready = false;
        this.unbind();
        this.resetPreview();
        var parentNode = this.cropper.parentNode;
        if (parentNode) {
          parentNode.removeChild(this.cropper);
        }
        removeClass(this.element, CLASS_HIDDEN);
      }
    }, {
      key: "uncreate",
      value: function uncreate() {
        if (this.ready) {
          this.unbuild();
          this.ready = false;
          this.cropped = false;
        } else if (this.sizing) {
          this.sizingImage.onload = null;
          this.sizing = false;
          this.sized = false;
        } else if (this.reloading) {
          this.xhr.onabort = null;
          this.xhr.abort();
        } else if (this.image) {
          this.stop();
        }
      }
      /**
       * Get the no conflict cropper class.
       * @returns {Cropper} The cropper class.
       */
    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Cropper = AnotherCropper;
        return Cropper2;
      }
      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */
    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);
  }();
  assign(Cropper.prototype, render, preview, events, handlers, change, methods);
  return Cropper;
});
!function(t, r) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (t || self).ColorThief = r();
}(this, function() {
  if (!t)
    var t = { map: function(t2, r2) {
      var n2 = {};
      return r2 ? t2.map(function(t3, o2) {
        return n2.index = o2, r2.call(n2, t3);
      }) : t2.slice();
    }, naturalOrder: function(t2, r2) {
      return t2 < r2 ? -1 : t2 > r2 ? 1 : 0;
    }, sum: function(t2, r2) {
      var n2 = {};
      return t2.reduce(r2 ? function(t3, o2, e) {
        return n2.index = e, t3 + r2.call(n2, o2);
      } : function(t3, r3) {
        return t3 + r3;
      }, 0);
    }, max: function(r2, n2) {
      return Math.max.apply(null, n2 ? t.map(r2, n2) : r2);
    } };
  var r = function() {
    var r2 = 5, n2 = 8 - r2, o2 = 1e3;
    function e(t2, n3, o3) {
      return (t2 << 2 * r2) + (n3 << r2) + o3;
    }
    function i2(t2) {
      var r3 = [], n3 = false;
      function o3() {
        r3.sort(t2), n3 = true;
      }
      return { push: function(t3) {
        r3.push(t3), n3 = false;
      }, peek: function(t3) {
        return n3 || o3(), void 0 === t3 && (t3 = r3.length - 1), r3[t3];
      }, pop: function() {
        return n3 || o3(), r3.pop();
      }, size: function() {
        return r3.length;
      }, map: function(t3) {
        return r3.map(t3);
      }, debug: function() {
        return n3 || o3(), r3;
      } };
    }
    function u(t2, r3, n3, o3, e2, i3, u2) {
      var a2 = this;
      a2.r1 = t2, a2.r2 = r3, a2.g1 = n3, a2.g2 = o3, a2.b1 = e2, a2.b2 = i3, a2.histo = u2;
    }
    function a() {
      this.vboxes = new i2(function(r3, n3) {
        return t.naturalOrder(r3.vbox.count() * r3.vbox.volume(), n3.vbox.count() * n3.vbox.volume());
      });
    }
    function c(r3, n3) {
      if (n3.count()) {
        var o3 = n3.r2 - n3.r1 + 1, i3 = n3.g2 - n3.g1 + 1, u2 = t.max([o3, i3, n3.b2 - n3.b1 + 1]);
        if (1 == n3.count())
          return [n3.copy()];
        var a2, c2, f, s, l = 0, h = [], v = [];
        if (u2 == o3)
          for (a2 = n3.r1; a2 <= n3.r2; a2++) {
            for (s = 0, c2 = n3.g1; c2 <= n3.g2; c2++)
              for (f = n3.b1; f <= n3.b2; f++)
                s += r3[e(a2, c2, f)] || 0;
            h[a2] = l += s;
          }
        else if (u2 == i3)
          for (a2 = n3.g1; a2 <= n3.g2; a2++) {
            for (s = 0, c2 = n3.r1; c2 <= n3.r2; c2++)
              for (f = n3.b1; f <= n3.b2; f++)
                s += r3[e(c2, a2, f)] || 0;
            h[a2] = l += s;
          }
        else
          for (a2 = n3.b1; a2 <= n3.b2; a2++) {
            for (s = 0, c2 = n3.r1; c2 <= n3.r2; c2++)
              for (f = n3.g1; f <= n3.g2; f++)
                s += r3[e(c2, f, a2)] || 0;
            h[a2] = l += s;
          }
        return h.forEach(function(t2, r4) {
          v[r4] = l - t2;
        }), function(t2) {
          var r4, o4, e2, i4, u3, c3 = t2 + "1", f2 = t2 + "2", s2 = 0;
          for (a2 = n3[c3]; a2 <= n3[f2]; a2++)
            if (h[a2] > l / 2) {
              for (e2 = n3.copy(), i4 = n3.copy(), u3 = (r4 = a2 - n3[c3]) <= (o4 = n3[f2] - a2) ? Math.min(n3[f2] - 1, ~~(a2 + o4 / 2)) : Math.max(n3[c3], ~~(a2 - 1 - r4 / 2)); !h[u3]; )
                u3++;
              for (s2 = v[u3]; !s2 && h[u3 - 1]; )
                s2 = v[--u3];
              return e2[f2] = u3, i4[c3] = e2[f2] + 1, [e2, i4];
            }
        }(u2 == o3 ? "r" : u2 == i3 ? "g" : "b");
      }
    }
    return u.prototype = { volume: function(t2) {
      var r3 = this;
      return r3._volume && !t2 || (r3._volume = (r3.r2 - r3.r1 + 1) * (r3.g2 - r3.g1 + 1) * (r3.b2 - r3.b1 + 1)), r3._volume;
    }, count: function(t2) {
      var r3 = this, n3 = r3.histo;
      if (!r3._count_set || t2) {
        var o3, i3, u2, a2 = 0;
        for (o3 = r3.r1; o3 <= r3.r2; o3++)
          for (i3 = r3.g1; i3 <= r3.g2; i3++)
            for (u2 = r3.b1; u2 <= r3.b2; u2++)
              a2 += n3[e(o3, i3, u2)] || 0;
        r3._count = a2, r3._count_set = true;
      }
      return r3._count;
    }, copy: function() {
      var t2 = this;
      return new u(t2.r1, t2.r2, t2.g1, t2.g2, t2.b1, t2.b2, t2.histo);
    }, avg: function(t2) {
      var n3 = this, o3 = n3.histo;
      if (!n3._avg || t2) {
        var i3, u2, a2, c2, f = 0, s = 1 << 8 - r2, l = 0, h = 0, v = 0;
        for (u2 = n3.r1; u2 <= n3.r2; u2++)
          for (a2 = n3.g1; a2 <= n3.g2; a2++)
            for (c2 = n3.b1; c2 <= n3.b2; c2++)
              f += i3 = o3[e(u2, a2, c2)] || 0, l += i3 * (u2 + 0.5) * s, h += i3 * (a2 + 0.5) * s, v += i3 * (c2 + 0.5) * s;
        n3._avg = f ? [~~(l / f), ~~(h / f), ~~(v / f)] : [~~(s * (n3.r1 + n3.r2 + 1) / 2), ~~(s * (n3.g1 + n3.g2 + 1) / 2), ~~(s * (n3.b1 + n3.b2 + 1) / 2)];
      }
      return n3._avg;
    }, contains: function(t2) {
      var r3 = this, o3 = t2[0] >> n2;
      return gval = t2[1] >> n2, bval = t2[2] >> n2, o3 >= r3.r1 && o3 <= r3.r2 && gval >= r3.g1 && gval <= r3.g2 && bval >= r3.b1 && bval <= r3.b2;
    } }, a.prototype = { push: function(t2) {
      this.vboxes.push({ vbox: t2, color: t2.avg() });
    }, palette: function() {
      return this.vboxes.map(function(t2) {
        return t2.color;
      });
    }, size: function() {
      return this.vboxes.size();
    }, map: function(t2) {
      for (var r3 = this.vboxes, n3 = 0; n3 < r3.size(); n3++)
        if (r3.peek(n3).vbox.contains(t2))
          return r3.peek(n3).color;
      return this.nearest(t2);
    }, nearest: function(t2) {
      for (var r3, n3, o3, e2 = this.vboxes, i3 = 0; i3 < e2.size(); i3++)
        ((n3 = Math.sqrt(Math.pow(t2[0] - e2.peek(i3).color[0], 2) + Math.pow(t2[1] - e2.peek(i3).color[1], 2) + Math.pow(t2[2] - e2.peek(i3).color[2], 2))) < r3 || void 0 === r3) && (r3 = n3, o3 = e2.peek(i3).color);
      return o3;
    }, forcebw: function() {
      var r3 = this.vboxes;
      r3.sort(function(r4, n4) {
        return t.naturalOrder(t.sum(r4.color), t.sum(n4.color));
      });
      var n3 = r3[0].color;
      n3[0] < 5 && n3[1] < 5 && n3[2] < 5 && (r3[0].color = [0, 0, 0]);
      var o3 = r3.length - 1, e2 = r3[o3].color;
      e2[0] > 251 && e2[1] > 251 && e2[2] > 251 && (r3[o3].color = [255, 255, 255]);
    } }, { quantize: function(f, s) {
      if (!f.length || s < 2 || s > 256)
        return false;
      var l = function(t2) {
        var o3, i3 = new Array(1 << 3 * r2);
        return t2.forEach(function(t3) {
          o3 = e(t3[0] >> n2, t3[1] >> n2, t3[2] >> n2), i3[o3] = (i3[o3] || 0) + 1;
        }), i3;
      }(f);
      l.forEach(function() {
      });
      var h = function(t2, r3) {
        var o3, e2, i3, a2 = 1e6, c2 = 0, f2 = 1e6, s2 = 0, l2 = 1e6, h2 = 0;
        return t2.forEach(function(t3) {
          (o3 = t3[0] >> n2) < a2 ? a2 = o3 : o3 > c2 && (c2 = o3), (e2 = t3[1] >> n2) < f2 ? f2 = e2 : e2 > s2 && (s2 = e2), (i3 = t3[2] >> n2) < l2 ? l2 = i3 : i3 > h2 && (h2 = i3);
        }), new u(a2, c2, f2, s2, l2, h2, r3);
      }(f, l), v = new i2(function(r3, n3) {
        return t.naturalOrder(r3.count(), n3.count());
      });
      function g(t2, r3) {
        for (var n3, e2 = t2.size(), i3 = 0; i3 < o2; ) {
          if (e2 >= r3)
            return;
          if (i3++ > o2)
            return;
          if ((n3 = t2.pop()).count()) {
            var u2 = c(l, n3), a2 = u2[0], f2 = u2[1];
            if (!a2)
              return;
            t2.push(a2), f2 && (t2.push(f2), e2++);
          } else
            t2.push(n3), i3++;
        }
      }
      v.push(h), g(v, 0.75 * s);
      for (var p = new i2(function(r3, n3) {
        return t.naturalOrder(r3.count() * r3.volume(), n3.count() * n3.volume());
      }); v.size(); )
        p.push(v.pop());
      g(p, s);
      for (var b = new a(); p.size(); )
        b.push(p.pop());
      return b;
    } };
  }().quantize, n = function(t2) {
    this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = t2.naturalWidth, this.height = this.canvas.height = t2.naturalHeight, this.context.drawImage(t2, 0, 0, this.width, this.height);
  };
  n.prototype.getImageData = function() {
    return this.context.getImageData(0, 0, this.width, this.height);
  };
  var o = function() {
  };
  return o.prototype.getColor = function(t2, r2) {
    return void 0 === r2 && (r2 = 10), this.getPalette(t2, 5, r2)[0];
  }, o.prototype.getPalette = function(t2, o2, e) {
    var i2 = function(t3) {
      var r2 = t3.colorCount, n2 = t3.quality;
      if (void 0 !== r2 && Number.isInteger(r2)) {
        if (1 === r2)
          throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
        r2 = Math.max(r2, 2), r2 = Math.min(r2, 20);
      } else
        r2 = 10;
      return (void 0 === n2 || !Number.isInteger(n2) || n2 < 1) && (n2 = 10), { colorCount: r2, quality: n2 };
    }({ colorCount: o2, quality: e }), u = new n(t2), a = function(t3, r2, n2) {
      for (var o3, e2, i3, u2, a2, c2 = t3, f = [], s = 0; s < r2; s += n2)
        e2 = c2[0 + (o3 = 4 * s)], i3 = c2[o3 + 1], u2 = c2[o3 + 2], (void 0 === (a2 = c2[o3 + 3]) || a2 >= 125) && (e2 > 250 && i3 > 250 && u2 > 250 || f.push([e2, i3, u2]));
      return f;
    }(u.getImageData().data, u.width * u.height, i2.quality), c = r(a, i2.colorCount);
    return c ? c.palette() : null;
  }, o.prototype.getColorFromUrl = function(t2, r2, n2) {
    var o2 = this, e = document.createElement("img");
    e.addEventListener("load", function() {
      var i2 = o2.getPalette(e, 5, n2);
      r2(i2[0], t2);
    }), e.src = t2;
  }, o.prototype.getImageData = function(t2, r2) {
    var n2 = new XMLHttpRequest();
    n2.open("GET", t2, true), n2.responseType = "arraybuffer", n2.onload = function() {
      if (200 == this.status) {
        var t3 = new Uint8Array(this.response);
        i = t3.length;
        for (var n3 = new Array(i), o2 = 0; o2 < t3.length; o2++)
          n3[o2] = String.fromCharCode(t3[o2]);
        var e = n3.join(""), u = window.btoa(e);
        r2("data:image/png;base64," + u);
      }
    }, n2.send();
  }, o.prototype.getColorAsync = function(t2, r2, n2) {
    var o2 = this;
    this.getImageData(t2, function(t3) {
      var e = document.createElement("img");
      e.addEventListener("load", function() {
        var t4 = o2.getPalette(e, 5, n2);
        r2(t4[0], this);
      }), e.src = t3;
    });
  }, o;
});
!function(t, r) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (t || self).ColorThief = r();
}(this, function() {
  if (!t)
    var t = { map: function(t2, r2) {
      var n2 = {};
      return r2 ? t2.map(function(t3, o2) {
        return n2.index = o2, r2.call(n2, t3);
      }) : t2.slice();
    }, naturalOrder: function(t2, r2) {
      return t2 < r2 ? -1 : t2 > r2 ? 1 : 0;
    }, sum: function(t2, r2) {
      var n2 = {};
      return t2.reduce(r2 ? function(t3, o2, e) {
        return n2.index = e, t3 + r2.call(n2, o2);
      } : function(t3, r3) {
        return t3 + r3;
      }, 0);
    }, max: function(r2, n2) {
      return Math.max.apply(null, n2 ? t.map(r2, n2) : r2);
    } };
  var r = function() {
    var r2 = 5, n2 = 8 - r2, o2 = 1e3;
    function e(t2, n3, o3) {
      return (t2 << 2 * r2) + (n3 << r2) + o3;
    }
    function i2(t2) {
      var r3 = [], n3 = false;
      function o3() {
        r3.sort(t2), n3 = true;
      }
      return { push: function(t3) {
        r3.push(t3), n3 = false;
      }, peek: function(t3) {
        return n3 || o3(), void 0 === t3 && (t3 = r3.length - 1), r3[t3];
      }, pop: function() {
        return n3 || o3(), r3.pop();
      }, size: function() {
        return r3.length;
      }, map: function(t3) {
        return r3.map(t3);
      }, debug: function() {
        return n3 || o3(), r3;
      } };
    }
    function u(t2, r3, n3, o3, e2, i3, u2) {
      var a2 = this;
      a2.r1 = t2, a2.r2 = r3, a2.g1 = n3, a2.g2 = o3, a2.b1 = e2, a2.b2 = i3, a2.histo = u2;
    }
    function a() {
      this.vboxes = new i2(function(r3, n3) {
        return t.naturalOrder(r3.vbox.count() * r3.vbox.volume(), n3.vbox.count() * n3.vbox.volume());
      });
    }
    function c(r3, n3) {
      if (n3.count()) {
        var o3 = n3.r2 - n3.r1 + 1, i3 = n3.g2 - n3.g1 + 1, u2 = t.max([o3, i3, n3.b2 - n3.b1 + 1]);
        if (1 == n3.count())
          return [n3.copy()];
        var a2, c2, f, s, l = 0, h = [], v = [];
        if (u2 == o3)
          for (a2 = n3.r1; a2 <= n3.r2; a2++) {
            for (s = 0, c2 = n3.g1; c2 <= n3.g2; c2++)
              for (f = n3.b1; f <= n3.b2; f++)
                s += r3[e(a2, c2, f)] || 0;
            h[a2] = l += s;
          }
        else if (u2 == i3)
          for (a2 = n3.g1; a2 <= n3.g2; a2++) {
            for (s = 0, c2 = n3.r1; c2 <= n3.r2; c2++)
              for (f = n3.b1; f <= n3.b2; f++)
                s += r3[e(c2, a2, f)] || 0;
            h[a2] = l += s;
          }
        else
          for (a2 = n3.b1; a2 <= n3.b2; a2++) {
            for (s = 0, c2 = n3.r1; c2 <= n3.r2; c2++)
              for (f = n3.g1; f <= n3.g2; f++)
                s += r3[e(c2, f, a2)] || 0;
            h[a2] = l += s;
          }
        return h.forEach(function(t2, r4) {
          v[r4] = l - t2;
        }), function(t2) {
          var r4, o4, e2, i4, u3, c3 = t2 + "1", f2 = t2 + "2", s2 = 0;
          for (a2 = n3[c3]; a2 <= n3[f2]; a2++)
            if (h[a2] > l / 2) {
              for (e2 = n3.copy(), i4 = n3.copy(), u3 = (r4 = a2 - n3[c3]) <= (o4 = n3[f2] - a2) ? Math.min(n3[f2] - 1, ~~(a2 + o4 / 2)) : Math.max(n3[c3], ~~(a2 - 1 - r4 / 2)); !h[u3]; )
                u3++;
              for (s2 = v[u3]; !s2 && h[u3 - 1]; )
                s2 = v[--u3];
              return e2[f2] = u3, i4[c3] = e2[f2] + 1, [e2, i4];
            }
        }(u2 == o3 ? "r" : u2 == i3 ? "g" : "b");
      }
    }
    return u.prototype = { volume: function(t2) {
      var r3 = this;
      return r3._volume && !t2 || (r3._volume = (r3.r2 - r3.r1 + 1) * (r3.g2 - r3.g1 + 1) * (r3.b2 - r3.b1 + 1)), r3._volume;
    }, count: function(t2) {
      var r3 = this, n3 = r3.histo;
      if (!r3._count_set || t2) {
        var o3, i3, u2, a2 = 0;
        for (o3 = r3.r1; o3 <= r3.r2; o3++)
          for (i3 = r3.g1; i3 <= r3.g2; i3++)
            for (u2 = r3.b1; u2 <= r3.b2; u2++)
              a2 += n3[e(o3, i3, u2)] || 0;
        r3._count = a2, r3._count_set = true;
      }
      return r3._count;
    }, copy: function() {
      var t2 = this;
      return new u(t2.r1, t2.r2, t2.g1, t2.g2, t2.b1, t2.b2, t2.histo);
    }, avg: function(t2) {
      var n3 = this, o3 = n3.histo;
      if (!n3._avg || t2) {
        var i3, u2, a2, c2, f = 0, s = 1 << 8 - r2, l = 0, h = 0, v = 0;
        for (u2 = n3.r1; u2 <= n3.r2; u2++)
          for (a2 = n3.g1; a2 <= n3.g2; a2++)
            for (c2 = n3.b1; c2 <= n3.b2; c2++)
              f += i3 = o3[e(u2, a2, c2)] || 0, l += i3 * (u2 + 0.5) * s, h += i3 * (a2 + 0.5) * s, v += i3 * (c2 + 0.5) * s;
        n3._avg = f ? [~~(l / f), ~~(h / f), ~~(v / f)] : [~~(s * (n3.r1 + n3.r2 + 1) / 2), ~~(s * (n3.g1 + n3.g2 + 1) / 2), ~~(s * (n3.b1 + n3.b2 + 1) / 2)];
      }
      return n3._avg;
    }, contains: function(t2) {
      var r3 = this, o3 = t2[0] >> n2;
      return gval = t2[1] >> n2, bval = t2[2] >> n2, o3 >= r3.r1 && o3 <= r3.r2 && gval >= r3.g1 && gval <= r3.g2 && bval >= r3.b1 && bval <= r3.b2;
    } }, a.prototype = { push: function(t2) {
      this.vboxes.push({ vbox: t2, color: t2.avg() });
    }, palette: function() {
      return this.vboxes.map(function(t2) {
        return t2.color;
      });
    }, size: function() {
      return this.vboxes.size();
    }, map: function(t2) {
      for (var r3 = this.vboxes, n3 = 0; n3 < r3.size(); n3++)
        if (r3.peek(n3).vbox.contains(t2))
          return r3.peek(n3).color;
      return this.nearest(t2);
    }, nearest: function(t2) {
      for (var r3, n3, o3, e2 = this.vboxes, i3 = 0; i3 < e2.size(); i3++)
        ((n3 = Math.sqrt(Math.pow(t2[0] - e2.peek(i3).color[0], 2) + Math.pow(t2[1] - e2.peek(i3).color[1], 2) + Math.pow(t2[2] - e2.peek(i3).color[2], 2))) < r3 || void 0 === r3) && (r3 = n3, o3 = e2.peek(i3).color);
      return o3;
    }, forcebw: function() {
      var r3 = this.vboxes;
      r3.sort(function(r4, n4) {
        return t.naturalOrder(t.sum(r4.color), t.sum(n4.color));
      });
      var n3 = r3[0].color;
      n3[0] < 5 && n3[1] < 5 && n3[2] < 5 && (r3[0].color = [0, 0, 0]);
      var o3 = r3.length - 1, e2 = r3[o3].color;
      e2[0] > 251 && e2[1] > 251 && e2[2] > 251 && (r3[o3].color = [255, 255, 255]);
    } }, { quantize: function(f, s) {
      if (!f.length || s < 2 || s > 256)
        return false;
      var l = function(t2) {
        var o3, i3 = new Array(1 << 3 * r2);
        return t2.forEach(function(t3) {
          o3 = e(t3[0] >> n2, t3[1] >> n2, t3[2] >> n2), i3[o3] = (i3[o3] || 0) + 1;
        }), i3;
      }(f);
      l.forEach(function() {
      });
      var h = function(t2, r3) {
        var o3, e2, i3, a2 = 1e6, c2 = 0, f2 = 1e6, s2 = 0, l2 = 1e6, h2 = 0;
        return t2.forEach(function(t3) {
          (o3 = t3[0] >> n2) < a2 ? a2 = o3 : o3 > c2 && (c2 = o3), (e2 = t3[1] >> n2) < f2 ? f2 = e2 : e2 > s2 && (s2 = e2), (i3 = t3[2] >> n2) < l2 ? l2 = i3 : i3 > h2 && (h2 = i3);
        }), new u(a2, c2, f2, s2, l2, h2, r3);
      }(f, l), v = new i2(function(r3, n3) {
        return t.naturalOrder(r3.count(), n3.count());
      });
      function g(t2, r3) {
        for (var n3, e2 = t2.size(), i3 = 0; i3 < o2; ) {
          if (e2 >= r3)
            return;
          if (i3++ > o2)
            return;
          if ((n3 = t2.pop()).count()) {
            var u2 = c(l, n3), a2 = u2[0], f2 = u2[1];
            if (!a2)
              return;
            t2.push(a2), f2 && (t2.push(f2), e2++);
          } else
            t2.push(n3), i3++;
        }
      }
      v.push(h), g(v, 0.75 * s);
      for (var p = new i2(function(r3, n3) {
        return t.naturalOrder(r3.count() * r3.volume(), n3.count() * n3.volume());
      }); v.size(); )
        p.push(v.pop());
      g(p, s);
      for (var b = new a(); p.size(); )
        b.push(p.pop());
      return b;
    } };
  }().quantize, n = function(t2) {
    this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = t2.naturalWidth, this.height = this.canvas.height = t2.naturalHeight, this.context.drawImage(t2, 0, 0, this.width, this.height);
  };
  n.prototype.getImageData = function() {
    return this.context.getImageData(0, 0, this.width, this.height);
  };
  var o = function() {
  };
  return o.prototype.getColor = function(t2, r2) {
    return void 0 === r2 && (r2 = 10), this.getPalette(t2, 5, r2)[0];
  }, o.prototype.getPalette = function(t2, o2, e) {
    var i2 = function(t3) {
      var r2 = t3.colorCount, n2 = t3.quality;
      if (void 0 !== r2 && Number.isInteger(r2)) {
        if (1 === r2)
          throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
        r2 = Math.max(r2, 2), r2 = Math.min(r2, 20);
      } else
        r2 = 10;
      return (void 0 === n2 || !Number.isInteger(n2) || n2 < 1) && (n2 = 10), { colorCount: r2, quality: n2 };
    }({ colorCount: o2, quality: e }), u = new n(t2), a = function(t3, r2, n2) {
      for (var o3, e2, i3, u2, a2, c2 = t3, f = [], s = 0; s < r2; s += n2)
        e2 = c2[0 + (o3 = 4 * s)], i3 = c2[o3 + 1], u2 = c2[o3 + 2], (void 0 === (a2 = c2[o3 + 3]) || a2 >= 125) && (e2 > 250 && i3 > 250 && u2 > 250 || f.push([e2, i3, u2]));
      return f;
    }(u.getImageData().data, u.width * u.height, i2.quality), c = r(a, i2.colorCount);
    return c ? c.palette() : null;
  }, o.prototype.getColorFromUrl = function(t2, r2, n2) {
    var o2 = this, e = document.createElement("img");
    e.addEventListener("load", function() {
      var i2 = o2.getPalette(e, 5, n2);
      r2(i2[0], t2);
    }), e.src = t2;
  }, o.prototype.getImageData = function(t2, r2) {
    var n2 = new XMLHttpRequest();
    n2.open("GET", t2, true), n2.responseType = "arraybuffer", n2.onload = function() {
      if (200 == this.status) {
        var t3 = new Uint8Array(this.response);
        i = t3.length;
        for (var n3 = new Array(i), o2 = 0; o2 < t3.length; o2++)
          n3[o2] = String.fromCharCode(t3[o2]);
        var e = n3.join(""), u = window.btoa(e);
        r2("data:image/png;base64," + u);
      }
    }, n2.send();
  }, o.prototype.getColorAsync = function(t2, r2, n2) {
    var o2 = this;
    this.getImageData(t2, function(t3) {
      var e = document.createElement("img");
      e.addEventListener("load", function() {
        var t4 = o2.getPalette(e, 5, n2);
        r2(t4[0], this);
      }), e.src = t3;
    });
  }, o;
});
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e();
}(this, function() {
  "use strict";
  const t = /* @__PURE__ */ new Map(), e = { set(e2, i3, n2) {
    t.has(e2) || t.set(e2, /* @__PURE__ */ new Map());
    const s2 = t.get(e2);
    s2.has(i3) || 0 === s2.size ? s2.set(i3, n2) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s2.keys())[0]}.`);
  }, get: (e2, i3) => t.has(e2) && t.get(e2).get(i3) || null, remove(e2, i3) {
    if (!t.has(e2))
      return;
    const n2 = t.get(e2);
    n2.delete(i3), 0 === n2.size && t.delete(e2);
  } }, i2 = "transitionend", n = (t2) => (t2 && window.CSS && window.CSS.escape && (t2 = t2.replace(/#([^\s"#']+)/g, (t3, e2) => `#${CSS.escape(e2)}`)), t2), s = (t2) => {
    t2.dispatchEvent(new Event(i2));
  }, o = (t2) => !(!t2 || "object" != typeof t2) && (void 0 !== t2.jquery && (t2 = t2[0]), void 0 !== t2.nodeType), r = (t2) => o(t2) ? t2.jquery ? t2[0] : t2 : "string" == typeof t2 && t2.length > 0 ? document.querySelector(n(t2)) : null, a = (t2) => {
    if (!o(t2) || 0 === t2.getClientRects().length)
      return false;
    const e2 = "visible" === getComputedStyle(t2).getPropertyValue("visibility"), i3 = t2.closest("details:not([open])");
    if (!i3)
      return e2;
    if (i3 !== t2) {
      const e3 = t2.closest("summary");
      if (e3 && e3.parentNode !== i3)
        return false;
      if (null === e3)
        return false;
    }
    return e2;
  }, l = (t2) => !t2 || t2.nodeType !== Node.ELEMENT_NODE || !!t2.classList.contains("disabled") || (void 0 !== t2.disabled ? t2.disabled : t2.hasAttribute("disabled") && "false" !== t2.getAttribute("disabled")), c = (t2) => {
    if (!document.documentElement.attachShadow)
      return null;
    if ("function" == typeof t2.getRootNode) {
      const e2 = t2.getRootNode();
      return e2 instanceof ShadowRoot ? e2 : null;
    }
    return t2 instanceof ShadowRoot ? t2 : t2.parentNode ? c(t2.parentNode) : null;
  }, h = () => {
  }, d = (t2) => {
    t2.offsetHeight;
  }, u = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, f = [], p = () => "rtl" === document.documentElement.dir, m = (t2) => {
    var e2;
    e2 = () => {
      const e3 = u();
      if (e3) {
        const i3 = t2.NAME, n2 = e3.fn[i3];
        e3.fn[i3] = t2.jQueryInterface, e3.fn[i3].Constructor = t2, e3.fn[i3].noConflict = () => (e3.fn[i3] = n2, t2.jQueryInterface);
      }
    }, "loading" === document.readyState ? (f.length || document.addEventListener("DOMContentLoaded", () => {
      for (const t3 of f)
        t3();
    }), f.push(e2)) : e2();
  }, g = (t2, e2 = [], i3 = t2) => "function" == typeof t2 ? t2(...e2) : i3, _ = (t2, e2, n2 = true) => {
    if (!n2)
      return void g(t2);
    const o2 = ((t3) => {
      if (!t3)
        return 0;
      let { transitionDuration: e3, transitionDelay: i3 } = window.getComputedStyle(t3);
      const n3 = Number.parseFloat(e3), s2 = Number.parseFloat(i3);
      return n3 || s2 ? (e3 = e3.split(",")[0], i3 = i3.split(",")[0], 1e3 * (Number.parseFloat(e3) + Number.parseFloat(i3))) : 0;
    })(e2) + 5;
    let r2 = false;
    const a2 = ({ target: n3 }) => {
      n3 === e2 && (r2 = true, e2.removeEventListener(i2, a2), g(t2));
    };
    e2.addEventListener(i2, a2), setTimeout(() => {
      r2 || s(e2);
    }, o2);
  }, b = (t2, e2, i3, n2) => {
    const s2 = t2.length;
    let o2 = t2.indexOf(e2);
    return -1 === o2 ? !i3 && n2 ? t2[s2 - 1] : t2[0] : (o2 += i3 ? 1 : -1, n2 && (o2 = (o2 + s2) % s2), t2[Math.max(0, Math.min(o2, s2 - 1))]);
  }, v = /[^.]*(?=\..*)\.|.*/, y = /\..*/, w = /::\d+$/, A = {};
  let E = 1;
  const T = { mouseenter: "mouseover", mouseleave: "mouseout" }, C = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function O(t2, e2) {
    return e2 && `${e2}::${E++}` || t2.uidEvent || E++;
  }
  function x(t2) {
    const e2 = O(t2);
    return t2.uidEvent = e2, A[e2] = A[e2] || {}, A[e2];
  }
  function k(t2, e2, i3 = null) {
    return Object.values(t2).find((t3) => t3.callable === e2 && t3.delegationSelector === i3);
  }
  function L(t2, e2, i3) {
    const n2 = "string" == typeof e2, s2 = n2 ? i3 : e2 || i3;
    let o2 = I(t2);
    return C.has(o2) || (o2 = t2), [n2, s2, o2];
  }
  function S(t2, e2, i3, n2, s2) {
    if ("string" != typeof e2 || !t2)
      return;
    let [o2, r2, a2] = L(e2, i3, n2);
    if (e2 in T) {
      const t3 = (t4) => function(e3) {
        if (!e3.relatedTarget || e3.relatedTarget !== e3.delegateTarget && !e3.delegateTarget.contains(e3.relatedTarget))
          return t4.call(this, e3);
      };
      r2 = t3(r2);
    }
    const l2 = x(t2), c2 = l2[a2] || (l2[a2] = {}), h2 = k(c2, r2, o2 ? i3 : null);
    if (h2)
      return void (h2.oneOff = h2.oneOff && s2);
    const d2 = O(r2, e2.replace(v, "")), u2 = o2 ? /* @__PURE__ */ function(t3, e3, i4) {
      return function n3(s3) {
        const o3 = t3.querySelectorAll(e3);
        for (let { target: r3 } = s3; r3 && r3 !== this; r3 = r3.parentNode)
          for (const a3 of o3)
            if (a3 === r3)
              return P(s3, { delegateTarget: r3 }), n3.oneOff && N.off(t3, s3.type, e3, i4), i4.apply(r3, [s3]);
      };
    }(t2, i3, r2) : /* @__PURE__ */ function(t3, e3) {
      return function i4(n3) {
        return P(n3, { delegateTarget: t3 }), i4.oneOff && N.off(t3, n3.type, e3), e3.apply(t3, [n3]);
      };
    }(t2, r2);
    u2.delegationSelector = o2 ? i3 : null, u2.callable = r2, u2.oneOff = s2, u2.uidEvent = d2, c2[d2] = u2, t2.addEventListener(a2, u2, o2);
  }
  function D(t2, e2, i3, n2, s2) {
    const o2 = k(e2[i3], n2, s2);
    o2 && (t2.removeEventListener(i3, o2, Boolean(s2)), delete e2[i3][o2.uidEvent]);
  }
  function $(t2, e2, i3, n2) {
    const s2 = e2[i3] || {};
    for (const [o2, r2] of Object.entries(s2))
      o2.includes(n2) && D(t2, e2, i3, r2.callable, r2.delegationSelector);
  }
  function I(t2) {
    return t2 = t2.replace(y, ""), T[t2] || t2;
  }
  const N = { on(t2, e2, i3, n2) {
    S(t2, e2, i3, n2, false);
  }, one(t2, e2, i3, n2) {
    S(t2, e2, i3, n2, true);
  }, off(t2, e2, i3, n2) {
    if ("string" != typeof e2 || !t2)
      return;
    const [s2, o2, r2] = L(e2, i3, n2), a2 = r2 !== e2, l2 = x(t2), c2 = l2[r2] || {}, h2 = e2.startsWith(".");
    if (void 0 === o2) {
      if (h2)
        for (const i4 of Object.keys(l2))
          $(t2, l2, i4, e2.slice(1));
      for (const [i4, n3] of Object.entries(c2)) {
        const s3 = i4.replace(w, "");
        a2 && !e2.includes(s3) || D(t2, l2, r2, n3.callable, n3.delegationSelector);
      }
    } else {
      if (!Object.keys(c2).length)
        return;
      D(t2, l2, r2, o2, s2 ? i3 : null);
    }
  }, trigger(t2, e2, i3) {
    if ("string" != typeof e2 || !t2)
      return null;
    const n2 = u();
    let s2 = null, o2 = true, r2 = true, a2 = false;
    e2 !== I(e2) && n2 && (s2 = n2.Event(e2, i3), n2(t2).trigger(s2), o2 = !s2.isPropagationStopped(), r2 = !s2.isImmediatePropagationStopped(), a2 = s2.isDefaultPrevented());
    const l2 = P(new Event(e2, { bubbles: o2, cancelable: true }), i3);
    return a2 && l2.preventDefault(), r2 && t2.dispatchEvent(l2), l2.defaultPrevented && s2 && s2.preventDefault(), l2;
  } };
  function P(t2, e2 = {}) {
    for (const [i3, n2] of Object.entries(e2))
      try {
        t2[i3] = n2;
      } catch (e3) {
        Object.defineProperty(t2, i3, { configurable: true, get: () => n2 });
      }
    return t2;
  }
  function j(t2) {
    if ("true" === t2)
      return true;
    if ("false" === t2)
      return false;
    if (t2 === Number(t2).toString())
      return Number(t2);
    if ("" === t2 || "null" === t2)
      return null;
    if ("string" != typeof t2)
      return t2;
    try {
      return JSON.parse(decodeURIComponent(t2));
    } catch (e2) {
      return t2;
    }
  }
  function M(t2) {
    return t2.replace(/[A-Z]/g, (t3) => `-${t3.toLowerCase()}`);
  }
  const F = { setDataAttribute(t2, e2, i3) {
    t2.setAttribute(`data-bs-${M(e2)}`, i3);
  }, removeDataAttribute(t2, e2) {
    t2.removeAttribute(`data-bs-${M(e2)}`);
  }, getDataAttributes(t2) {
    if (!t2)
      return {};
    const e2 = {}, i3 = Object.keys(t2.dataset).filter((t3) => t3.startsWith("bs") && !t3.startsWith("bsConfig"));
    for (const n2 of i3) {
      let i4 = n2.replace(/^bs/, "");
      i4 = i4.charAt(0).toLowerCase() + i4.slice(1, i4.length), e2[i4] = j(t2.dataset[n2]);
    }
    return e2;
  }, getDataAttribute: (t2, e2) => j(t2.getAttribute(`data-bs-${M(e2)}`)) };
  class H {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2;
    }
    _mergeConfigObj(t2, e2) {
      const i3 = o(e2) ? F.getDataAttribute(e2, "config") : {};
      return { ...this.constructor.Default, ..."object" == typeof i3 ? i3 : {}, ...o(e2) ? F.getDataAttributes(e2) : {}, ..."object" == typeof t2 ? t2 : {} };
    }
    _typeCheckConfig(t2, e2 = this.constructor.DefaultType) {
      for (const [n2, s2] of Object.entries(e2)) {
        const e3 = t2[n2], r2 = o(e3) ? "element" : null == (i3 = e3) ? `${i3}` : Object.prototype.toString.call(i3).match(/\s([a-z]+)/i)[1].toLowerCase();
        if (!new RegExp(s2).test(r2))
          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n2}" provided type "${r2}" but expected type "${s2}".`);
      }
      var i3;
    }
  }
  class W extends H {
    constructor(t2, i3) {
      super(), (t2 = r(t2)) && (this._element = t2, this._config = this._getConfig(i3), e.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      e.remove(this._element, this.constructor.DATA_KEY), N.off(this._element, this.constructor.EVENT_KEY);
      for (const t2 of Object.getOwnPropertyNames(this))
        this[t2] = null;
    }
    _queueCallback(t2, e2, i3 = true) {
      _(t2, e2, i3);
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2, this._element), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    static getInstance(t2) {
      return e.get(r(t2), this.DATA_KEY);
    }
    static getOrCreateInstance(t2, e2 = {}) {
      return this.getInstance(t2) || new this(t2, "object" == typeof e2 ? e2 : null);
    }
    static get VERSION() {
      return "5.3.3";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t2) {
      return `${t2}${this.EVENT_KEY}`;
    }
  }
  const B = (t2) => {
    let e2 = t2.getAttribute("data-bs-target");
    if (!e2 || "#" === e2) {
      let i3 = t2.getAttribute("href");
      if (!i3 || !i3.includes("#") && !i3.startsWith("."))
        return null;
      i3.includes("#") && !i3.startsWith("#") && (i3 = `#${i3.split("#")[1]}`), e2 = i3 && "#" !== i3 ? i3.trim() : null;
    }
    return e2 ? e2.split(",").map((t3) => n(t3)).join(",") : null;
  }, z = { find: (t2, e2 = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e2, t2)), findOne: (t2, e2 = document.documentElement) => Element.prototype.querySelector.call(e2, t2), children: (t2, e2) => [].concat(...t2.children).filter((t3) => t3.matches(e2)), parents(t2, e2) {
    const i3 = [];
    let n2 = t2.parentNode.closest(e2);
    for (; n2; )
      i3.push(n2), n2 = n2.parentNode.closest(e2);
    return i3;
  }, prev(t2, e2) {
    let i3 = t2.previousElementSibling;
    for (; i3; ) {
      if (i3.matches(e2))
        return [i3];
      i3 = i3.previousElementSibling;
    }
    return [];
  }, next(t2, e2) {
    let i3 = t2.nextElementSibling;
    for (; i3; ) {
      if (i3.matches(e2))
        return [i3];
      i3 = i3.nextElementSibling;
    }
    return [];
  }, focusableChildren(t2) {
    const e2 = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t3) => `${t3}:not([tabindex^="-"])`).join(",");
    return this.find(e2, t2).filter((t3) => !l(t3) && a(t3));
  }, getSelectorFromElement(t2) {
    const e2 = B(t2);
    return e2 && z.findOne(e2) ? e2 : null;
  }, getElementFromSelector(t2) {
    const e2 = B(t2);
    return e2 ? z.findOne(e2) : null;
  }, getMultipleElementsFromSelector(t2) {
    const e2 = B(t2);
    return e2 ? z.find(e2) : [];
  } }, R = (t2, e2 = "hide") => {
    const i3 = `click.dismiss${t2.EVENT_KEY}`, n2 = t2.NAME;
    N.on(document, i3, `[data-bs-dismiss="${n2}"]`, function(i4) {
      if (["A", "AREA"].includes(this.tagName) && i4.preventDefault(), l(this))
        return;
      const s2 = z.getElementFromSelector(this) || this.closest(`.${n2}`);
      t2.getOrCreateInstance(s2)[e2]();
    });
  }, q = ".bs.alert", V = `close${q}`, K = `closed${q}`;
  class Q extends W {
    static get NAME() {
      return "alert";
    }
    close() {
      if (N.trigger(this._element, V).defaultPrevented)
        return;
      this._element.classList.remove("show");
      const t2 = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, t2);
    }
    _destroyElement() {
      this._element.remove(), N.trigger(this._element, K), this.dispose();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Q.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2)
            throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  R(Q, "close"), m(Q);
  const X = '[data-bs-toggle="button"]';
  class Y extends W {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Y.getOrCreateInstance(this);
        "toggle" === t2 && e2[t2]();
      });
    }
  }
  N.on(document, "click.bs.button.data-api", X, (t2) => {
    t2.preventDefault();
    const e2 = t2.target.closest(X);
    Y.getOrCreateInstance(e2).toggle();
  }), m(Y);
  const U = ".bs.swipe", G = `touchstart${U}`, J = `touchmove${U}`, Z = `touchend${U}`, tt = `pointerdown${U}`, et = `pointerup${U}`, it = { endCallback: null, leftCallback: null, rightCallback: null }, nt = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
  class st extends H {
    constructor(t2, e2) {
      super(), this._element = t2, t2 && st.isSupported() && (this._config = this._getConfig(e2), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
    }
    static get Default() {
      return it;
    }
    static get DefaultType() {
      return nt;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      N.off(this._element, U);
    }
    _start(t2) {
      this._supportPointerEvents ? this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX) : this._deltaX = t2.touches[0].clientX;
    }
    _end(t2) {
      this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX - this._deltaX), this._handleSwipe(), g(this._config.endCallback);
    }
    _move(t2) {
      this._deltaX = t2.touches && t2.touches.length > 1 ? 0 : t2.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t2 = Math.abs(this._deltaX);
      if (t2 <= 40)
        return;
      const e2 = t2 / this._deltaX;
      this._deltaX = 0, e2 && g(e2 > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents ? (N.on(this._element, tt, (t2) => this._start(t2)), N.on(this._element, et, (t2) => this._end(t2)), this._element.classList.add("pointer-event")) : (N.on(this._element, G, (t2) => this._start(t2)), N.on(this._element, J, (t2) => this._move(t2)), N.on(this._element, Z, (t2) => this._end(t2)));
    }
    _eventIsPointerPenTouch(t2) {
      return this._supportPointerEvents && ("pen" === t2.pointerType || "touch" === t2.pointerType);
    }
    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }
  const ot = ".bs.carousel", rt = ".data-api", at = "next", lt = "prev", ct = "left", ht = "right", dt = `slide${ot}`, ut = `slid${ot}`, ft = `keydown${ot}`, pt = `mouseenter${ot}`, mt = `mouseleave${ot}`, gt = `dragstart${ot}`, _t = `load${ot}${rt}`, bt = `click${ot}${rt}`, vt = "carousel", yt = "active", wt = ".active", At = ".carousel-item", Et = wt + At, Tt = { ArrowLeft: ht, ArrowRight: ct }, Ct = { interval: 5e3, keyboard: true, pause: "hover", ride: false, touch: true, wrap: true }, Ot = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
  class xt extends W {
    constructor(t2, e2) {
      super(t2, e2), this._interval = null, this._activeElement = null, this._isSliding = false, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = z.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === vt && this.cycle();
    }
    static get Default() {
      return Ct;
    }
    static get DefaultType() {
      return Ot;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(at);
    }
    nextWhenVisible() {
      !document.hidden && a(this._element) && this.next();
    }
    prev() {
      this._slide(lt);
    }
    pause() {
      this._isSliding && s(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      this._config.ride && (this._isSliding ? N.one(this._element, ut, () => this.cycle()) : this.cycle());
    }
    to(t2) {
      const e2 = this._getItems();
      if (t2 > e2.length - 1 || t2 < 0)
        return;
      if (this._isSliding)
        return void N.one(this._element, ut, () => this.to(t2));
      const i3 = this._getItemIndex(this._getActive());
      if (i3 === t2)
        return;
      const n2 = t2 > i3 ? at : lt;
      this._slide(n2, e2[t2]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.defaultInterval = t2.interval, t2;
    }
    _addEventListeners() {
      this._config.keyboard && N.on(this._element, ft, (t2) => this._keydown(t2)), "hover" === this._config.pause && (N.on(this._element, pt, () => this.pause()), N.on(this._element, mt, () => this._maybeEnableCycle())), this._config.touch && st.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t3 of z.find(".carousel-item img", this._element))
        N.on(t3, gt, (t4) => t4.preventDefault());
      const t2 = { leftCallback: () => this._slide(this._directionToOrder(ct)), rightCallback: () => this._slide(this._directionToOrder(ht)), endCallback: () => {
        "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval));
      } };
      this._swipeHelper = new st(this._element, t2);
    }
    _keydown(t2) {
      if (/input|textarea/i.test(t2.target.tagName))
        return;
      const e2 = Tt[t2.key];
      e2 && (t2.preventDefault(), this._slide(this._directionToOrder(e2)));
    }
    _getItemIndex(t2) {
      return this._getItems().indexOf(t2);
    }
    _setActiveIndicatorElement(t2) {
      if (!this._indicatorsElement)
        return;
      const e2 = z.findOne(wt, this._indicatorsElement);
      e2.classList.remove(yt), e2.removeAttribute("aria-current");
      const i3 = z.findOne(`[data-bs-slide-to="${t2}"]`, this._indicatorsElement);
      i3 && (i3.classList.add(yt), i3.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const t2 = this._activeElement || this._getActive();
      if (!t2)
        return;
      const e2 = Number.parseInt(t2.getAttribute("data-bs-interval"), 10);
      this._config.interval = e2 || this._config.defaultInterval;
    }
    _slide(t2, e2 = null) {
      if (this._isSliding)
        return;
      const i3 = this._getActive(), n2 = t2 === at, s2 = e2 || b(this._getItems(), i3, n2, this._config.wrap);
      if (s2 === i3)
        return;
      const o2 = this._getItemIndex(s2), r2 = (e3) => N.trigger(this._element, e3, { relatedTarget: s2, direction: this._orderToDirection(t2), from: this._getItemIndex(i3), to: o2 });
      if (r2(dt).defaultPrevented)
        return;
      if (!i3 || !s2)
        return;
      const a2 = Boolean(this._interval);
      this.pause(), this._isSliding = true, this._setActiveIndicatorElement(o2), this._activeElement = s2;
      const l2 = n2 ? "carousel-item-start" : "carousel-item-end", c2 = n2 ? "carousel-item-next" : "carousel-item-prev";
      s2.classList.add(c2), d(s2), i3.classList.add(l2), s2.classList.add(l2), this._queueCallback(() => {
        s2.classList.remove(l2, c2), s2.classList.add(yt), i3.classList.remove(yt, c2, l2), this._isSliding = false, r2(ut);
      }, i3, this._isAnimated()), a2 && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return z.findOne(Et, this._element);
    }
    _getItems() {
      return z.find(At, this._element);
    }
    _clearInterval() {
      this._interval && (clearInterval(this._interval), this._interval = null);
    }
    _directionToOrder(t2) {
      return p() ? t2 === ct ? lt : at : t2 === ct ? at : lt;
    }
    _orderToDirection(t2) {
      return p() ? t2 === lt ? ct : ht : t2 === lt ? ht : ct;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = xt.getOrCreateInstance(this, t2);
        if ("number" != typeof t2) {
          if ("string" == typeof t2) {
            if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2)
              throw new TypeError(`No method named "${t2}"`);
            e2[t2]();
          }
        } else
          e2.to(t2);
      });
    }
  }
  N.on(document, bt, "[data-bs-slide], [data-bs-slide-to]", function(t2) {
    const e2 = z.getElementFromSelector(this);
    if (!e2 || !e2.classList.contains(vt))
      return;
    t2.preventDefault();
    const i3 = xt.getOrCreateInstance(e2), n2 = this.getAttribute("data-bs-slide-to");
    return n2 ? (i3.to(n2), void i3._maybeEnableCycle()) : "next" === F.getDataAttribute(this, "slide") ? (i3.next(), void i3._maybeEnableCycle()) : (i3.prev(), void i3._maybeEnableCycle());
  }), N.on(window, _t, () => {
    const t2 = z.find('[data-bs-ride="carousel"]');
    for (const e2 of t2)
      xt.getOrCreateInstance(e2);
  }), m(xt);
  const kt = ".bs.collapse", Lt = `show${kt}`, St = `shown${kt}`, Dt = `hide${kt}`, $t = `hidden${kt}`, It = `click${kt}.data-api`, Nt = "show", Pt = "collapse", jt = "collapsing", Mt = `:scope .${Pt} .${Pt}`, Ft = '[data-bs-toggle="collapse"]', Ht = { parent: null, toggle: true }, Wt = { parent: "(null|element)", toggle: "boolean" };
  class Bt extends W {
    constructor(t2, e2) {
      super(t2, e2), this._isTransitioning = false, this._triggerArray = [];
      const i3 = z.find(Ft);
      for (const t3 of i3) {
        const e3 = z.getSelectorFromElement(t3), i4 = z.find(e3).filter((t4) => t4 === this._element);
        null !== e3 && i4.length && this._triggerArray.push(t3);
      }
      this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
    }
    static get Default() {
      return Ht;
    }
    static get DefaultType() {
      return Wt;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown())
        return;
      let t2 = [];
      if (this._config.parent && (t2 = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t3) => t3 !== this._element).map((t3) => Bt.getOrCreateInstance(t3, { toggle: false }))), t2.length && t2[0]._isTransitioning)
        return;
      if (N.trigger(this._element, Lt).defaultPrevented)
        return;
      for (const e3 of t2)
        e3.hide();
      const e2 = this._getDimension();
      this._element.classList.remove(Pt), this._element.classList.add(jt), this._element.style[e2] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
      const i3 = `scroll${e2[0].toUpperCase() + e2.slice(1)}`;
      this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(jt), this._element.classList.add(Pt, Nt), this._element.style[e2] = "", N.trigger(this._element, St);
      }, this._element, true), this._element.style[e2] = `${this._element[i3]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown())
        return;
      if (N.trigger(this._element, Dt).defaultPrevented)
        return;
      const t2 = this._getDimension();
      this._element.style[t2] = `${this._element.getBoundingClientRect()[t2]}px`, d(this._element), this._element.classList.add(jt), this._element.classList.remove(Pt, Nt);
      for (const t3 of this._triggerArray) {
        const e2 = z.getElementFromSelector(t3);
        e2 && !this._isShown(e2) && this._addAriaAndCollapsedClass([t3], false);
      }
      this._isTransitioning = true, this._element.style[t2] = "", this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(jt), this._element.classList.add(Pt), N.trigger(this._element, $t);
      }, this._element, true);
    }
    _isShown(t2 = this._element) {
      return t2.classList.contains(Nt);
    }
    _configAfterMerge(t2) {
      return t2.toggle = Boolean(t2.toggle), t2.parent = r(t2.parent), t2;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
    }
    _initializeChildren() {
      if (!this._config.parent)
        return;
      const t2 = this._getFirstLevelChildren(Ft);
      for (const e2 of t2) {
        const t3 = z.getElementFromSelector(e2);
        t3 && this._addAriaAndCollapsedClass([e2], this._isShown(t3));
      }
    }
    _getFirstLevelChildren(t2) {
      const e2 = z.find(Mt, this._config.parent);
      return z.find(t2, this._config.parent).filter((t3) => !e2.includes(t3));
    }
    _addAriaAndCollapsedClass(t2, e2) {
      if (t2.length)
        for (const i3 of t2)
          i3.classList.toggle("collapsed", !e2), i3.setAttribute("aria-expanded", e2);
    }
    static jQueryInterface(t2) {
      const e2 = {};
      return "string" == typeof t2 && /show|hide/.test(t2) && (e2.toggle = false), this.each(function() {
        const i3 = Bt.getOrCreateInstance(this, e2);
        if ("string" == typeof t2) {
          if (void 0 === i3[t2])
            throw new TypeError(`No method named "${t2}"`);
          i3[t2]();
        }
      });
    }
  }
  N.on(document, It, Ft, function(t2) {
    ("A" === t2.target.tagName || t2.delegateTarget && "A" === t2.delegateTarget.tagName) && t2.preventDefault();
    for (const t3 of z.getMultipleElementsFromSelector(this))
      Bt.getOrCreateInstance(t3, { toggle: false }).toggle();
  }), m(Bt);
  var zt = "top", Rt = "bottom", qt = "right", Vt = "left", Kt = "auto", Qt = [zt, Rt, qt, Vt], Xt = "start", Yt = "end", Ut = "clippingParents", Gt = "viewport", Jt = "popper", Zt = "reference", te = Qt.reduce(function(t2, e2) {
    return t2.concat([e2 + "-" + Xt, e2 + "-" + Yt]);
  }, []), ee = [].concat(Qt, [Kt]).reduce(function(t2, e2) {
    return t2.concat([e2, e2 + "-" + Xt, e2 + "-" + Yt]);
  }, []), ie = "beforeRead", ne = "read", se = "afterRead", oe = "beforeMain", re = "main", ae = "afterMain", le = "beforeWrite", ce = "write", he = "afterWrite", de = [ie, ne, se, oe, re, ae, le, ce, he];
  function ue(t2) {
    return t2 ? (t2.nodeName || "").toLowerCase() : null;
  }
  function fe(t2) {
    if (null == t2)
      return window;
    if ("[object Window]" !== t2.toString()) {
      var e2 = t2.ownerDocument;
      return e2 && e2.defaultView || window;
    }
    return t2;
  }
  function pe(t2) {
    return t2 instanceof fe(t2).Element || t2 instanceof Element;
  }
  function me(t2) {
    return t2 instanceof fe(t2).HTMLElement || t2 instanceof HTMLElement;
  }
  function ge(t2) {
    return "undefined" != typeof ShadowRoot && (t2 instanceof fe(t2).ShadowRoot || t2 instanceof ShadowRoot);
  }
  const _e = { name: "applyStyles", enabled: true, phase: "write", fn: function(t2) {
    var e2 = t2.state;
    Object.keys(e2.elements).forEach(function(t3) {
      var i3 = e2.styles[t3] || {}, n2 = e2.attributes[t3] || {}, s2 = e2.elements[t3];
      me(s2) && ue(s2) && (Object.assign(s2.style, i3), Object.keys(n2).forEach(function(t4) {
        var e3 = n2[t4];
        false === e3 ? s2.removeAttribute(t4) : s2.setAttribute(t4, true === e3 ? "" : e3);
      }));
    });
  }, effect: function(t2) {
    var e2 = t2.state, i3 = { popper: { position: e2.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
    return Object.assign(e2.elements.popper.style, i3.popper), e2.styles = i3, e2.elements.arrow && Object.assign(e2.elements.arrow.style, i3.arrow), function() {
      Object.keys(e2.elements).forEach(function(t3) {
        var n2 = e2.elements[t3], s2 = e2.attributes[t3] || {}, o2 = Object.keys(e2.styles.hasOwnProperty(t3) ? e2.styles[t3] : i3[t3]).reduce(function(t4, e3) {
          return t4[e3] = "", t4;
        }, {});
        me(n2) && ue(n2) && (Object.assign(n2.style, o2), Object.keys(s2).forEach(function(t4) {
          n2.removeAttribute(t4);
        }));
      });
    };
  }, requires: ["computeStyles"] };
  function be(t2) {
    return t2.split("-")[0];
  }
  var ve = Math.max, ye = Math.min, we = Math.round;
  function Ae() {
    var t2 = navigator.userAgentData;
    return null != t2 && t2.brands && Array.isArray(t2.brands) ? t2.brands.map(function(t3) {
      return t3.brand + "/" + t3.version;
    }).join(" ") : navigator.userAgent;
  }
  function Ee() {
    return !/^((?!chrome|android).)*safari/i.test(Ae());
  }
  function Te(t2, e2, i3) {
    void 0 === e2 && (e2 = false), void 0 === i3 && (i3 = false);
    var n2 = t2.getBoundingClientRect(), s2 = 1, o2 = 1;
    e2 && me(t2) && (s2 = t2.offsetWidth > 0 && we(n2.width) / t2.offsetWidth || 1, o2 = t2.offsetHeight > 0 && we(n2.height) / t2.offsetHeight || 1);
    var r2 = (pe(t2) ? fe(t2) : window).visualViewport, a2 = !Ee() && i3, l2 = (n2.left + (a2 && r2 ? r2.offsetLeft : 0)) / s2, c2 = (n2.top + (a2 && r2 ? r2.offsetTop : 0)) / o2, h2 = n2.width / s2, d2 = n2.height / o2;
    return { width: h2, height: d2, top: c2, right: l2 + h2, bottom: c2 + d2, left: l2, x: l2, y: c2 };
  }
  function Ce(t2) {
    var e2 = Te(t2), i3 = t2.offsetWidth, n2 = t2.offsetHeight;
    return Math.abs(e2.width - i3) <= 1 && (i3 = e2.width), Math.abs(e2.height - n2) <= 1 && (n2 = e2.height), { x: t2.offsetLeft, y: t2.offsetTop, width: i3, height: n2 };
  }
  function Oe(t2, e2) {
    var i3 = e2.getRootNode && e2.getRootNode();
    if (t2.contains(e2))
      return true;
    if (i3 && ge(i3)) {
      var n2 = e2;
      do {
        if (n2 && t2.isSameNode(n2))
          return true;
        n2 = n2.parentNode || n2.host;
      } while (n2);
    }
    return false;
  }
  function xe(t2) {
    return fe(t2).getComputedStyle(t2);
  }
  function ke(t2) {
    return ["table", "td", "th"].indexOf(ue(t2)) >= 0;
  }
  function Le(t2) {
    return ((pe(t2) ? t2.ownerDocument : t2.document) || window.document).documentElement;
  }
  function Se(t2) {
    return "html" === ue(t2) ? t2 : t2.assignedSlot || t2.parentNode || (ge(t2) ? t2.host : null) || Le(t2);
  }
  function De(t2) {
    return me(t2) && "fixed" !== xe(t2).position ? t2.offsetParent : null;
  }
  function $e(t2) {
    for (var e2 = fe(t2), i3 = De(t2); i3 && ke(i3) && "static" === xe(i3).position; )
      i3 = De(i3);
    return i3 && ("html" === ue(i3) || "body" === ue(i3) && "static" === xe(i3).position) ? e2 : i3 || function(t3) {
      var e3 = /firefox/i.test(Ae());
      if (/Trident/i.test(Ae()) && me(t3) && "fixed" === xe(t3).position)
        return null;
      var i4 = Se(t3);
      for (ge(i4) && (i4 = i4.host); me(i4) && ["html", "body"].indexOf(ue(i4)) < 0; ) {
        var n2 = xe(i4);
        if ("none" !== n2.transform || "none" !== n2.perspective || "paint" === n2.contain || -1 !== ["transform", "perspective"].indexOf(n2.willChange) || e3 && "filter" === n2.willChange || e3 && n2.filter && "none" !== n2.filter)
          return i4;
        i4 = i4.parentNode;
      }
      return null;
    }(t2) || e2;
  }
  function Ie(t2) {
    return ["top", "bottom"].indexOf(t2) >= 0 ? "x" : "y";
  }
  function Ne(t2, e2, i3) {
    return ve(t2, ye(e2, i3));
  }
  function Pe(t2) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t2);
  }
  function je(t2, e2) {
    return e2.reduce(function(e3, i3) {
      return e3[i3] = t2, e3;
    }, {});
  }
  const Me = { name: "arrow", enabled: true, phase: "main", fn: function(t2) {
    var e2, i3 = t2.state, n2 = t2.name, s2 = t2.options, o2 = i3.elements.arrow, r2 = i3.modifiersData.popperOffsets, a2 = be(i3.placement), l2 = Ie(a2), c2 = [Vt, qt].indexOf(a2) >= 0 ? "height" : "width";
    if (o2 && r2) {
      var h2 = function(t3, e3) {
        return Pe("number" != typeof (t3 = "function" == typeof t3 ? t3(Object.assign({}, e3.rects, { placement: e3.placement })) : t3) ? t3 : je(t3, Qt));
      }(s2.padding, i3), d2 = Ce(o2), u2 = "y" === l2 ? zt : Vt, f2 = "y" === l2 ? Rt : qt, p2 = i3.rects.reference[c2] + i3.rects.reference[l2] - r2[l2] - i3.rects.popper[c2], m2 = r2[l2] - i3.rects.reference[l2], g2 = $e(o2), _2 = g2 ? "y" === l2 ? g2.clientHeight || 0 : g2.clientWidth || 0 : 0, b2 = p2 / 2 - m2 / 2, v2 = h2[u2], y2 = _2 - d2[c2] - h2[f2], w2 = _2 / 2 - d2[c2] / 2 + b2, A2 = Ne(v2, w2, y2), E2 = l2;
      i3.modifiersData[n2] = ((e2 = {})[E2] = A2, e2.centerOffset = A2 - w2, e2);
    }
  }, effect: function(t2) {
    var e2 = t2.state, i3 = t2.options.element, n2 = void 0 === i3 ? "[data-popper-arrow]" : i3;
    null != n2 && ("string" != typeof n2 || (n2 = e2.elements.popper.querySelector(n2))) && Oe(e2.elements.popper, n2) && (e2.elements.arrow = n2);
  }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
  function Fe(t2) {
    return t2.split("-")[1];
  }
  var He = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function We(t2) {
    var e2, i3 = t2.popper, n2 = t2.popperRect, s2 = t2.placement, o2 = t2.variation, r2 = t2.offsets, a2 = t2.position, l2 = t2.gpuAcceleration, c2 = t2.adaptive, h2 = t2.roundOffsets, d2 = t2.isFixed, u2 = r2.x, f2 = void 0 === u2 ? 0 : u2, p2 = r2.y, m2 = void 0 === p2 ? 0 : p2, g2 = "function" == typeof h2 ? h2({ x: f2, y: m2 }) : { x: f2, y: m2 };
    f2 = g2.x, m2 = g2.y;
    var _2 = r2.hasOwnProperty("x"), b2 = r2.hasOwnProperty("y"), v2 = Vt, y2 = zt, w2 = window;
    if (c2) {
      var A2 = $e(i3), E2 = "clientHeight", T2 = "clientWidth";
      A2 === fe(i3) && "static" !== xe(A2 = Le(i3)).position && "absolute" === a2 && (E2 = "scrollHeight", T2 = "scrollWidth"), (s2 === zt || (s2 === Vt || s2 === qt) && o2 === Yt) && (y2 = Rt, m2 -= (d2 && A2 === w2 && w2.visualViewport ? w2.visualViewport.height : A2[E2]) - n2.height, m2 *= l2 ? 1 : -1), s2 !== Vt && (s2 !== zt && s2 !== Rt || o2 !== Yt) || (v2 = qt, f2 -= (d2 && A2 === w2 && w2.visualViewport ? w2.visualViewport.width : A2[T2]) - n2.width, f2 *= l2 ? 1 : -1);
    }
    var C2, O2 = Object.assign({ position: a2 }, c2 && He), x2 = true === h2 ? function(t3, e3) {
      var i4 = t3.x, n3 = t3.y, s3 = e3.devicePixelRatio || 1;
      return { x: we(i4 * s3) / s3 || 0, y: we(n3 * s3) / s3 || 0 };
    }({ x: f2, y: m2 }, fe(i3)) : { x: f2, y: m2 };
    return f2 = x2.x, m2 = x2.y, l2 ? Object.assign({}, O2, ((C2 = {})[y2] = b2 ? "0" : "", C2[v2] = _2 ? "0" : "", C2.transform = (w2.devicePixelRatio || 1) <= 1 ? "translate(" + f2 + "px, " + m2 + "px)" : "translate3d(" + f2 + "px, " + m2 + "px, 0)", C2)) : Object.assign({}, O2, ((e2 = {})[y2] = b2 ? m2 + "px" : "", e2[v2] = _2 ? f2 + "px" : "", e2.transform = "", e2));
  }
  const Be = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: function(t2) {
    var e2 = t2.state, i3 = t2.options, n2 = i3.gpuAcceleration, s2 = void 0 === n2 || n2, o2 = i3.adaptive, r2 = void 0 === o2 || o2, a2 = i3.roundOffsets, l2 = void 0 === a2 || a2, c2 = { placement: be(e2.placement), variation: Fe(e2.placement), popper: e2.elements.popper, popperRect: e2.rects.popper, gpuAcceleration: s2, isFixed: "fixed" === e2.options.strategy };
    null != e2.modifiersData.popperOffsets && (e2.styles.popper = Object.assign({}, e2.styles.popper, We(Object.assign({}, c2, { offsets: e2.modifiersData.popperOffsets, position: e2.options.strategy, adaptive: r2, roundOffsets: l2 })))), null != e2.modifiersData.arrow && (e2.styles.arrow = Object.assign({}, e2.styles.arrow, We(Object.assign({}, c2, { offsets: e2.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: l2 })))), e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-placement": e2.placement });
  }, data: {} };
  var ze = { passive: true };
  const Re = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
  }, effect: function(t2) {
    var e2 = t2.state, i3 = t2.instance, n2 = t2.options, s2 = n2.scroll, o2 = void 0 === s2 || s2, r2 = n2.resize, a2 = void 0 === r2 || r2, l2 = fe(e2.elements.popper), c2 = [].concat(e2.scrollParents.reference, e2.scrollParents.popper);
    return o2 && c2.forEach(function(t3) {
      t3.addEventListener("scroll", i3.update, ze);
    }), a2 && l2.addEventListener("resize", i3.update, ze), function() {
      o2 && c2.forEach(function(t3) {
        t3.removeEventListener("scroll", i3.update, ze);
      }), a2 && l2.removeEventListener("resize", i3.update, ze);
    };
  }, data: {} };
  var qe = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Ve(t2) {
    return t2.replace(/left|right|bottom|top/g, function(t3) {
      return qe[t3];
    });
  }
  var Ke = { start: "end", end: "start" };
  function Qe(t2) {
    return t2.replace(/start|end/g, function(t3) {
      return Ke[t3];
    });
  }
  function Xe(t2) {
    var e2 = fe(t2);
    return { scrollLeft: e2.pageXOffset, scrollTop: e2.pageYOffset };
  }
  function Ye(t2) {
    return Te(Le(t2)).left + Xe(t2).scrollLeft;
  }
  function Ue(t2) {
    var e2 = xe(t2), i3 = e2.overflow, n2 = e2.overflowX, s2 = e2.overflowY;
    return /auto|scroll|overlay|hidden/.test(i3 + s2 + n2);
  }
  function Ge(t2) {
    return ["html", "body", "#document"].indexOf(ue(t2)) >= 0 ? t2.ownerDocument.body : me(t2) && Ue(t2) ? t2 : Ge(Se(t2));
  }
  function Je(t2, e2) {
    var i3;
    void 0 === e2 && (e2 = []);
    var n2 = Ge(t2), s2 = n2 === (null == (i3 = t2.ownerDocument) ? void 0 : i3.body), o2 = fe(n2), r2 = s2 ? [o2].concat(o2.visualViewport || [], Ue(n2) ? n2 : []) : n2, a2 = e2.concat(r2);
    return s2 ? a2 : a2.concat(Je(Se(r2)));
  }
  function Ze(t2) {
    return Object.assign({}, t2, { left: t2.x, top: t2.y, right: t2.x + t2.width, bottom: t2.y + t2.height });
  }
  function ti(t2, e2, i3) {
    return e2 === Gt ? Ze(function(t3, e3) {
      var i4 = fe(t3), n2 = Le(t3), s2 = i4.visualViewport, o2 = n2.clientWidth, r2 = n2.clientHeight, a2 = 0, l2 = 0;
      if (s2) {
        o2 = s2.width, r2 = s2.height;
        var c2 = Ee();
        (c2 || !c2 && "fixed" === e3) && (a2 = s2.offsetLeft, l2 = s2.offsetTop);
      }
      return { width: o2, height: r2, x: a2 + Ye(t3), y: l2 };
    }(t2, i3)) : pe(e2) ? function(t3, e3) {
      var i4 = Te(t3, false, "fixed" === e3);
      return i4.top = i4.top + t3.clientTop, i4.left = i4.left + t3.clientLeft, i4.bottom = i4.top + t3.clientHeight, i4.right = i4.left + t3.clientWidth, i4.width = t3.clientWidth, i4.height = t3.clientHeight, i4.x = i4.left, i4.y = i4.top, i4;
    }(e2, i3) : Ze(function(t3) {
      var e3, i4 = Le(t3), n2 = Xe(t3), s2 = null == (e3 = t3.ownerDocument) ? void 0 : e3.body, o2 = ve(i4.scrollWidth, i4.clientWidth, s2 ? s2.scrollWidth : 0, s2 ? s2.clientWidth : 0), r2 = ve(i4.scrollHeight, i4.clientHeight, s2 ? s2.scrollHeight : 0, s2 ? s2.clientHeight : 0), a2 = -n2.scrollLeft + Ye(t3), l2 = -n2.scrollTop;
      return "rtl" === xe(s2 || i4).direction && (a2 += ve(i4.clientWidth, s2 ? s2.clientWidth : 0) - o2), { width: o2, height: r2, x: a2, y: l2 };
    }(Le(t2)));
  }
  function ei(t2) {
    var e2, i3 = t2.reference, n2 = t2.element, s2 = t2.placement, o2 = s2 ? be(s2) : null, r2 = s2 ? Fe(s2) : null, a2 = i3.x + i3.width / 2 - n2.width / 2, l2 = i3.y + i3.height / 2 - n2.height / 2;
    switch (o2) {
      case zt:
        e2 = { x: a2, y: i3.y - n2.height };
        break;
      case Rt:
        e2 = { x: a2, y: i3.y + i3.height };
        break;
      case qt:
        e2 = { x: i3.x + i3.width, y: l2 };
        break;
      case Vt:
        e2 = { x: i3.x - n2.width, y: l2 };
        break;
      default:
        e2 = { x: i3.x, y: i3.y };
    }
    var c2 = o2 ? Ie(o2) : null;
    if (null != c2) {
      var h2 = "y" === c2 ? "height" : "width";
      switch (r2) {
        case Xt:
          e2[c2] = e2[c2] - (i3[h2] / 2 - n2[h2] / 2);
          break;
        case Yt:
          e2[c2] = e2[c2] + (i3[h2] / 2 - n2[h2] / 2);
      }
    }
    return e2;
  }
  function ii(t2, e2) {
    void 0 === e2 && (e2 = {});
    var i3 = e2, n2 = i3.placement, s2 = void 0 === n2 ? t2.placement : n2, o2 = i3.strategy, r2 = void 0 === o2 ? t2.strategy : o2, a2 = i3.boundary, l2 = void 0 === a2 ? Ut : a2, c2 = i3.rootBoundary, h2 = void 0 === c2 ? Gt : c2, d2 = i3.elementContext, u2 = void 0 === d2 ? Jt : d2, f2 = i3.altBoundary, p2 = void 0 !== f2 && f2, m2 = i3.padding, g2 = void 0 === m2 ? 0 : m2, _2 = Pe("number" != typeof g2 ? g2 : je(g2, Qt)), b2 = u2 === Jt ? Zt : Jt, v2 = t2.rects.popper, y2 = t2.elements[p2 ? b2 : u2], w2 = function(t3, e3, i4, n3) {
      var s3 = "clippingParents" === e3 ? function(t4) {
        var e4 = Je(Se(t4)), i5 = ["absolute", "fixed"].indexOf(xe(t4).position) >= 0 && me(t4) ? $e(t4) : t4;
        return pe(i5) ? e4.filter(function(t5) {
          return pe(t5) && Oe(t5, i5) && "body" !== ue(t5);
        }) : [];
      }(t3) : [].concat(e3), o3 = [].concat(s3, [i4]), r3 = o3[0], a3 = o3.reduce(function(e4, i5) {
        var s4 = ti(t3, i5, n3);
        return e4.top = ve(s4.top, e4.top), e4.right = ye(s4.right, e4.right), e4.bottom = ye(s4.bottom, e4.bottom), e4.left = ve(s4.left, e4.left), e4;
      }, ti(t3, r3, n3));
      return a3.width = a3.right - a3.left, a3.height = a3.bottom - a3.top, a3.x = a3.left, a3.y = a3.top, a3;
    }(pe(y2) ? y2 : y2.contextElement || Le(t2.elements.popper), l2, h2, r2), A2 = Te(t2.elements.reference), E2 = ei({ reference: A2, element: v2, strategy: "absolute", placement: s2 }), T2 = Ze(Object.assign({}, v2, E2)), C2 = u2 === Jt ? T2 : A2, O2 = { top: w2.top - C2.top + _2.top, bottom: C2.bottom - w2.bottom + _2.bottom, left: w2.left - C2.left + _2.left, right: C2.right - w2.right + _2.right }, x2 = t2.modifiersData.offset;
    if (u2 === Jt && x2) {
      var k2 = x2[s2];
      Object.keys(O2).forEach(function(t3) {
        var e3 = [qt, Rt].indexOf(t3) >= 0 ? 1 : -1, i4 = [zt, Rt].indexOf(t3) >= 0 ? "y" : "x";
        O2[t3] += k2[i4] * e3;
      });
    }
    return O2;
  }
  function ni(t2, e2) {
    void 0 === e2 && (e2 = {});
    var i3 = e2, n2 = i3.placement, s2 = i3.boundary, o2 = i3.rootBoundary, r2 = i3.padding, a2 = i3.flipVariations, l2 = i3.allowedAutoPlacements, c2 = void 0 === l2 ? ee : l2, h2 = Fe(n2), d2 = h2 ? a2 ? te : te.filter(function(t3) {
      return Fe(t3) === h2;
    }) : Qt, u2 = d2.filter(function(t3) {
      return c2.indexOf(t3) >= 0;
    });
    0 === u2.length && (u2 = d2);
    var f2 = u2.reduce(function(e3, i4) {
      return e3[i4] = ii(t2, { placement: i4, boundary: s2, rootBoundary: o2, padding: r2 })[be(i4)], e3;
    }, {});
    return Object.keys(f2).sort(function(t3, e3) {
      return f2[t3] - f2[e3];
    });
  }
  const si = { name: "flip", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, i3 = t2.options, n2 = t2.name;
    if (!e2.modifiersData[n2]._skip) {
      for (var s2 = i3.mainAxis, o2 = void 0 === s2 || s2, r2 = i3.altAxis, a2 = void 0 === r2 || r2, l2 = i3.fallbackPlacements, c2 = i3.padding, h2 = i3.boundary, d2 = i3.rootBoundary, u2 = i3.altBoundary, f2 = i3.flipVariations, p2 = void 0 === f2 || f2, m2 = i3.allowedAutoPlacements, g2 = e2.options.placement, _2 = be(g2), b2 = l2 || (_2 !== g2 && p2 ? function(t3) {
        if (be(t3) === Kt)
          return [];
        var e3 = Ve(t3);
        return [Qe(t3), e3, Qe(e3)];
      }(g2) : [Ve(g2)]), v2 = [g2].concat(b2).reduce(function(t3, i4) {
        return t3.concat(be(i4) === Kt ? ni(e2, { placement: i4, boundary: h2, rootBoundary: d2, padding: c2, flipVariations: p2, allowedAutoPlacements: m2 }) : i4);
      }, []), y2 = e2.rects.reference, w2 = e2.rects.popper, A2 = /* @__PURE__ */ new Map(), E2 = true, T2 = v2[0], C2 = 0; C2 < v2.length; C2++) {
        var O2 = v2[C2], x2 = be(O2), k2 = Fe(O2) === Xt, L2 = [zt, Rt].indexOf(x2) >= 0, S2 = L2 ? "width" : "height", D2 = ii(e2, { placement: O2, boundary: h2, rootBoundary: d2, altBoundary: u2, padding: c2 }), $2 = L2 ? k2 ? qt : Vt : k2 ? Rt : zt;
        y2[S2] > w2[S2] && ($2 = Ve($2));
        var I2 = Ve($2), N2 = [];
        if (o2 && N2.push(D2[x2] <= 0), a2 && N2.push(D2[$2] <= 0, D2[I2] <= 0), N2.every(function(t3) {
          return t3;
        })) {
          T2 = O2, E2 = false;
          break;
        }
        A2.set(O2, N2);
      }
      if (E2)
        for (var P2 = function(t3) {
          var e3 = v2.find(function(e4) {
            var i4 = A2.get(e4);
            if (i4)
              return i4.slice(0, t3).every(function(t4) {
                return t4;
              });
          });
          if (e3)
            return T2 = e3, "break";
        }, j2 = p2 ? 3 : 1; j2 > 0 && "break" !== P2(j2); j2--)
          ;
      e2.placement !== T2 && (e2.modifiersData[n2]._skip = true, e2.placement = T2, e2.reset = true);
    }
  }, requiresIfExists: ["offset"], data: { _skip: false } };
  function oi(t2, e2, i3) {
    return void 0 === i3 && (i3 = { x: 0, y: 0 }), { top: t2.top - e2.height - i3.y, right: t2.right - e2.width + i3.x, bottom: t2.bottom - e2.height + i3.y, left: t2.left - e2.width - i3.x };
  }
  function ri(t2) {
    return [zt, qt, Rt, Vt].some(function(e2) {
      return t2[e2] >= 0;
    });
  }
  const ai = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: function(t2) {
    var e2 = t2.state, i3 = t2.name, n2 = e2.rects.reference, s2 = e2.rects.popper, o2 = e2.modifiersData.preventOverflow, r2 = ii(e2, { elementContext: "reference" }), a2 = ii(e2, { altBoundary: true }), l2 = oi(r2, n2), c2 = oi(a2, s2, o2), h2 = ri(l2), d2 = ri(c2);
    e2.modifiersData[i3] = { referenceClippingOffsets: l2, popperEscapeOffsets: c2, isReferenceHidden: h2, hasPopperEscaped: d2 }, e2.attributes.popper = Object.assign({}, e2.attributes.popper, { "data-popper-reference-hidden": h2, "data-popper-escaped": d2 });
  } }, li = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: function(t2) {
    var e2 = t2.state, i3 = t2.options, n2 = t2.name, s2 = i3.offset, o2 = void 0 === s2 ? [0, 0] : s2, r2 = ee.reduce(function(t3, i4) {
      return t3[i4] = function(t4, e3, i5) {
        var n3 = be(t4), s3 = [Vt, zt].indexOf(n3) >= 0 ? -1 : 1, o3 = "function" == typeof i5 ? i5(Object.assign({}, e3, { placement: t4 })) : i5, r3 = o3[0], a3 = o3[1];
        return r3 = r3 || 0, a3 = (a3 || 0) * s3, [Vt, qt].indexOf(n3) >= 0 ? { x: a3, y: r3 } : { x: r3, y: a3 };
      }(i4, e2.rects, o2), t3;
    }, {}), a2 = r2[e2.placement], l2 = a2.x, c2 = a2.y;
    null != e2.modifiersData.popperOffsets && (e2.modifiersData.popperOffsets.x += l2, e2.modifiersData.popperOffsets.y += c2), e2.modifiersData[n2] = r2;
  } }, ci = { name: "popperOffsets", enabled: true, phase: "read", fn: function(t2) {
    var e2 = t2.state, i3 = t2.name;
    e2.modifiersData[i3] = ei({ reference: e2.rects.reference, element: e2.rects.popper, strategy: "absolute", placement: e2.placement });
  }, data: {} }, hi = { name: "preventOverflow", enabled: true, phase: "main", fn: function(t2) {
    var e2 = t2.state, i3 = t2.options, n2 = t2.name, s2 = i3.mainAxis, o2 = void 0 === s2 || s2, r2 = i3.altAxis, a2 = void 0 !== r2 && r2, l2 = i3.boundary, c2 = i3.rootBoundary, h2 = i3.altBoundary, d2 = i3.padding, u2 = i3.tether, f2 = void 0 === u2 || u2, p2 = i3.tetherOffset, m2 = void 0 === p2 ? 0 : p2, g2 = ii(e2, { boundary: l2, rootBoundary: c2, padding: d2, altBoundary: h2 }), _2 = be(e2.placement), b2 = Fe(e2.placement), v2 = !b2, y2 = Ie(_2), w2 = "x" === y2 ? "y" : "x", A2 = e2.modifiersData.popperOffsets, E2 = e2.rects.reference, T2 = e2.rects.popper, C2 = "function" == typeof m2 ? m2(Object.assign({}, e2.rects, { placement: e2.placement })) : m2, O2 = "number" == typeof C2 ? { mainAxis: C2, altAxis: C2 } : Object.assign({ mainAxis: 0, altAxis: 0 }, C2), x2 = e2.modifiersData.offset ? e2.modifiersData.offset[e2.placement] : null, k2 = { x: 0, y: 0 };
    if (A2) {
      if (o2) {
        var L2, S2 = "y" === y2 ? zt : Vt, D2 = "y" === y2 ? Rt : qt, $2 = "y" === y2 ? "height" : "width", I2 = A2[y2], N2 = I2 + g2[S2], P2 = I2 - g2[D2], j2 = f2 ? -T2[$2] / 2 : 0, M2 = b2 === Xt ? E2[$2] : T2[$2], F2 = b2 === Xt ? -T2[$2] : -E2[$2], H2 = e2.elements.arrow, W2 = f2 && H2 ? Ce(H2) : { width: 0, height: 0 }, B2 = e2.modifiersData["arrow#persistent"] ? e2.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 }, z2 = B2[S2], R2 = B2[D2], q2 = Ne(0, E2[$2], W2[$2]), V2 = v2 ? E2[$2] / 2 - j2 - q2 - z2 - O2.mainAxis : M2 - q2 - z2 - O2.mainAxis, K2 = v2 ? -E2[$2] / 2 + j2 + q2 + R2 + O2.mainAxis : F2 + q2 + R2 + O2.mainAxis, Q2 = e2.elements.arrow && $e(e2.elements.arrow), X2 = Q2 ? "y" === y2 ? Q2.clientTop || 0 : Q2.clientLeft || 0 : 0, Y2 = null != (L2 = null == x2 ? void 0 : x2[y2]) ? L2 : 0, U2 = I2 + K2 - Y2, G2 = Ne(f2 ? ye(N2, I2 + V2 - Y2 - X2) : N2, I2, f2 ? ve(P2, U2) : P2);
        A2[y2] = G2, k2[y2] = G2 - I2;
      }
      if (a2) {
        var J2, Z2 = "x" === y2 ? zt : Vt, tt2 = "x" === y2 ? Rt : qt, et2 = A2[w2], it2 = "y" === w2 ? "height" : "width", nt2 = et2 + g2[Z2], st2 = et2 - g2[tt2], ot2 = -1 !== [zt, Vt].indexOf(_2), rt2 = null != (J2 = null == x2 ? void 0 : x2[w2]) ? J2 : 0, at2 = ot2 ? nt2 : et2 - E2[it2] - T2[it2] - rt2 + O2.altAxis, lt2 = ot2 ? et2 + E2[it2] + T2[it2] - rt2 - O2.altAxis : st2, ct2 = f2 && ot2 ? function(t3, e3, i4) {
          var n3 = Ne(t3, e3, i4);
          return n3 > i4 ? i4 : n3;
        }(at2, et2, lt2) : Ne(f2 ? at2 : nt2, et2, f2 ? lt2 : st2);
        A2[w2] = ct2, k2[w2] = ct2 - et2;
      }
      e2.modifiersData[n2] = k2;
    }
  }, requiresIfExists: ["offset"] };
  function di(t2, e2, i3) {
    void 0 === i3 && (i3 = false);
    var n2, s2, o2 = me(e2), r2 = me(e2) && function(t3) {
      var e3 = t3.getBoundingClientRect(), i4 = we(e3.width) / t3.offsetWidth || 1, n3 = we(e3.height) / t3.offsetHeight || 1;
      return 1 !== i4 || 1 !== n3;
    }(e2), a2 = Le(e2), l2 = Te(t2, r2, i3), c2 = { scrollLeft: 0, scrollTop: 0 }, h2 = { x: 0, y: 0 };
    return (o2 || !o2 && !i3) && (("body" !== ue(e2) || Ue(a2)) && (c2 = (n2 = e2) !== fe(n2) && me(n2) ? { scrollLeft: (s2 = n2).scrollLeft, scrollTop: s2.scrollTop } : Xe(n2)), me(e2) ? ((h2 = Te(e2, true)).x += e2.clientLeft, h2.y += e2.clientTop) : a2 && (h2.x = Ye(a2))), { x: l2.left + c2.scrollLeft - h2.x, y: l2.top + c2.scrollTop - h2.y, width: l2.width, height: l2.height };
  }
  function ui(t2) {
    var e2 = /* @__PURE__ */ new Map(), i3 = /* @__PURE__ */ new Set(), n2 = [];
    function s2(t3) {
      i3.add(t3.name), [].concat(t3.requires || [], t3.requiresIfExists || []).forEach(function(t4) {
        if (!i3.has(t4)) {
          var n3 = e2.get(t4);
          n3 && s2(n3);
        }
      }), n2.push(t3);
    }
    return t2.forEach(function(t3) {
      e2.set(t3.name, t3);
    }), t2.forEach(function(t3) {
      i3.has(t3.name) || s2(t3);
    }), n2;
  }
  var fi = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function pi() {
    for (var t2 = arguments.length, e2 = new Array(t2), i3 = 0; i3 < t2; i3++)
      e2[i3] = arguments[i3];
    return !e2.some(function(t3) {
      return !(t3 && "function" == typeof t3.getBoundingClientRect);
    });
  }
  function mi(t2) {
    void 0 === t2 && (t2 = {});
    var e2 = t2, i3 = e2.defaultModifiers, n2 = void 0 === i3 ? [] : i3, s2 = e2.defaultOptions, o2 = void 0 === s2 ? fi : s2;
    return function(t3, e3, i4) {
      void 0 === i4 && (i4 = o2);
      var s3, r2, a2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, fi, o2), modifiersData: {}, elements: { reference: t3, popper: e3 }, attributes: {}, styles: {} }, l2 = [], c2 = false, h2 = { state: a2, setOptions: function(i5) {
        var s4 = "function" == typeof i5 ? i5(a2.options) : i5;
        d2(), a2.options = Object.assign({}, o2, a2.options, s4), a2.scrollParents = { reference: pe(t3) ? Je(t3) : t3.contextElement ? Je(t3.contextElement) : [], popper: Je(e3) };
        var r3, c3, u2 = function(t4) {
          var e4 = ui(t4);
          return de.reduce(function(t5, i6) {
            return t5.concat(e4.filter(function(t6) {
              return t6.phase === i6;
            }));
          }, []);
        }((r3 = [].concat(n2, a2.options.modifiers), c3 = r3.reduce(function(t4, e4) {
          var i6 = t4[e4.name];
          return t4[e4.name] = i6 ? Object.assign({}, i6, e4, { options: Object.assign({}, i6.options, e4.options), data: Object.assign({}, i6.data, e4.data) }) : e4, t4;
        }, {}), Object.keys(c3).map(function(t4) {
          return c3[t4];
        })));
        return a2.orderedModifiers = u2.filter(function(t4) {
          return t4.enabled;
        }), a2.orderedModifiers.forEach(function(t4) {
          var e4 = t4.name, i6 = t4.options, n3 = void 0 === i6 ? {} : i6, s5 = t4.effect;
          if ("function" == typeof s5) {
            var o3 = s5({ state: a2, name: e4, instance: h2, options: n3 });
            l2.push(o3 || function() {
            });
          }
        }), h2.update();
      }, forceUpdate: function() {
        if (!c2) {
          var t4 = a2.elements, e4 = t4.reference, i5 = t4.popper;
          if (pi(e4, i5)) {
            a2.rects = { reference: di(e4, $e(i5), "fixed" === a2.options.strategy), popper: Ce(i5) }, a2.reset = false, a2.placement = a2.options.placement, a2.orderedModifiers.forEach(function(t5) {
              return a2.modifiersData[t5.name] = Object.assign({}, t5.data);
            });
            for (var n3 = 0; n3 < a2.orderedModifiers.length; n3++)
              if (true !== a2.reset) {
                var s4 = a2.orderedModifiers[n3], o3 = s4.fn, r3 = s4.options, l3 = void 0 === r3 ? {} : r3, d3 = s4.name;
                "function" == typeof o3 && (a2 = o3({ state: a2, options: l3, name: d3, instance: h2 }) || a2);
              } else
                a2.reset = false, n3 = -1;
          }
        }
      }, update: (s3 = function() {
        return new Promise(function(t4) {
          h2.forceUpdate(), t4(a2);
        });
      }, function() {
        return r2 || (r2 = new Promise(function(t4) {
          Promise.resolve().then(function() {
            r2 = void 0, t4(s3());
          });
        })), r2;
      }), destroy: function() {
        d2(), c2 = true;
      } };
      if (!pi(t3, e3))
        return h2;
      function d2() {
        l2.forEach(function(t4) {
          return t4();
        }), l2 = [];
      }
      return h2.setOptions(i4).then(function(t4) {
        !c2 && i4.onFirstUpdate && i4.onFirstUpdate(t4);
      }), h2;
    };
  }
  var gi = mi(), _i = mi({ defaultModifiers: [Re, ci, Be, _e] }), bi = mi({ defaultModifiers: [Re, ci, Be, _e, li, si, hi, Me, ai] });
  const vi = Object.freeze(Object.defineProperty({ __proto__: null, afterMain: ae, afterRead: se, afterWrite: he, applyStyles: _e, arrow: Me, auto: Kt, basePlacements: Qt, beforeMain: oe, beforeRead: ie, beforeWrite: le, bottom: Rt, clippingParents: Ut, computeStyles: Be, createPopper: bi, createPopperBase: gi, createPopperLite: _i, detectOverflow: ii, end: Yt, eventListeners: Re, flip: si, hide: ai, left: Vt, main: re, modifierPhases: de, offset: li, placements: ee, popper: Jt, popperGenerator: mi, popperOffsets: ci, preventOverflow: hi, read: ne, reference: Zt, right: qt, start: Xt, top: zt, variationPlacements: te, viewport: Gt, write: ce }, Symbol.toStringTag, { value: "Module" })), yi = "dropdown", wi = ".bs.dropdown", Ai = ".data-api", Ei = "ArrowUp", Ti = "ArrowDown", Ci = `hide${wi}`, Oi = `hidden${wi}`, xi = `show${wi}`, ki = `shown${wi}`, Li = `click${wi}${Ai}`, Si = `keydown${wi}${Ai}`, Di = `keyup${wi}${Ai}`, $i = "show", Ii = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Ni = `${Ii}.${$i}`, Pi = ".dropdown-menu", ji = p() ? "top-end" : "top-start", Mi = p() ? "top-start" : "top-end", Fi = p() ? "bottom-end" : "bottom-start", Hi = p() ? "bottom-start" : "bottom-end", Wi = p() ? "left-start" : "right-start", Bi = p() ? "right-start" : "left-start", zi = { autoClose: true, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" }, Ri = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
  class qi extends W {
    constructor(t2, e2) {
      super(t2, e2), this._popper = null, this._parent = this._element.parentNode, this._menu = z.next(this._element, Pi)[0] || z.prev(this._element, Pi)[0] || z.findOne(Pi, this._parent), this._inNavbar = this._detectNavbar();
    }
    static get Default() {
      return zi;
    }
    static get DefaultType() {
      return Ri;
    }
    static get NAME() {
      return yi;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (l(this._element) || this._isShown())
        return;
      const t2 = { relatedTarget: this._element };
      if (!N.trigger(this._element, xi, t2).defaultPrevented) {
        if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
          for (const t3 of [].concat(...document.body.children))
            N.on(t3, "mouseover", h);
        this._element.focus(), this._element.setAttribute("aria-expanded", true), this._menu.classList.add($i), this._element.classList.add($i), N.trigger(this._element, ki, t2);
      }
    }
    hide() {
      if (l(this._element) || !this._isShown())
        return;
      const t2 = { relatedTarget: this._element };
      this._completeHide(t2);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
    }
    _completeHide(t2) {
      if (!N.trigger(this._element, Ci, t2).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const t3 of [].concat(...document.body.children))
            N.off(t3, "mouseover", h);
        this._popper && this._popper.destroy(), this._menu.classList.remove($i), this._element.classList.remove($i), this._element.setAttribute("aria-expanded", "false"), F.removeDataAttribute(this._menu, "popper"), N.trigger(this._element, Oi, t2);
      }
    }
    _getConfig(t2) {
      if ("object" == typeof (t2 = super._getConfig(t2)).reference && !o(t2.reference) && "function" != typeof t2.reference.getBoundingClientRect)
        throw new TypeError(`${yi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      return t2;
    }
    _createPopper() {
      if (void 0 === vi)
        throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      let t2 = this._element;
      "parent" === this._config.reference ? t2 = this._parent : o(this._config.reference) ? t2 = r(this._config.reference) : "object" == typeof this._config.reference && (t2 = this._config.reference);
      const e2 = this._getPopperConfig();
      this._popper = bi(t2, this._menu, e2);
    }
    _isShown() {
      return this._menu.classList.contains($i);
    }
    _getPlacement() {
      const t2 = this._parent;
      if (t2.classList.contains("dropend"))
        return Wi;
      if (t2.classList.contains("dropstart"))
        return Bi;
      if (t2.classList.contains("dropup-center"))
        return "top";
      if (t2.classList.contains("dropdown-center"))
        return "bottom";
      const e2 = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t2.classList.contains("dropup") ? e2 ? Mi : ji : e2 ? Hi : Fi;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _getPopperConfig() {
      const t2 = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] };
      return (this._inNavbar || "static" === this._config.display) && (F.setDataAttribute(this._menu, "popper", "static"), t2.modifiers = [{ name: "applyStyles", enabled: false }]), { ...t2, ...g(this._config.popperConfig, [t2]) };
    }
    _selectMenuItem({ key: t2, target: e2 }) {
      const i3 = z.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t3) => a(t3));
      i3.length && b(i3, e2, t2 === Ti, !i3.includes(e2)).focus();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = qi.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2])
            throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
    static clearMenus(t2) {
      if (2 === t2.button || "keyup" === t2.type && "Tab" !== t2.key)
        return;
      const e2 = z.find(Ni);
      for (const i3 of e2) {
        const e3 = qi.getInstance(i3);
        if (!e3 || false === e3._config.autoClose)
          continue;
        const n2 = t2.composedPath(), s2 = n2.includes(e3._menu);
        if (n2.includes(e3._element) || "inside" === e3._config.autoClose && !s2 || "outside" === e3._config.autoClose && s2)
          continue;
        if (e3._menu.contains(t2.target) && ("keyup" === t2.type && "Tab" === t2.key || /input|select|option|textarea|form/i.test(t2.target.tagName)))
          continue;
        const o2 = { relatedTarget: e3._element };
        "click" === t2.type && (o2.clickEvent = t2), e3._completeHide(o2);
      }
    }
    static dataApiKeydownHandler(t2) {
      const e2 = /input|textarea/i.test(t2.target.tagName), i3 = "Escape" === t2.key, n2 = [Ei, Ti].includes(t2.key);
      if (!n2 && !i3)
        return;
      if (e2 && !i3)
        return;
      t2.preventDefault();
      const s2 = this.matches(Ii) ? this : z.prev(this, Ii)[0] || z.next(this, Ii)[0] || z.findOne(Ii, t2.delegateTarget.parentNode), o2 = qi.getOrCreateInstance(s2);
      if (n2)
        return t2.stopPropagation(), o2.show(), void o2._selectMenuItem(t2);
      o2._isShown() && (t2.stopPropagation(), o2.hide(), s2.focus());
    }
  }
  N.on(document, Si, Ii, qi.dataApiKeydownHandler), N.on(document, Si, Pi, qi.dataApiKeydownHandler), N.on(document, Li, qi.clearMenus), N.on(document, Di, qi.clearMenus), N.on(document, Li, Ii, function(t2) {
    t2.preventDefault(), qi.getOrCreateInstance(this).toggle();
  }), m(qi);
  const Vi = "backdrop", Ki = "show", Qi = `mousedown.bs.${Vi}`, Xi = { className: "modal-backdrop", clickCallback: null, isAnimated: false, isVisible: true, rootElement: "body" }, Yi = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
  class Ui extends H {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isAppended = false, this._element = null;
    }
    static get Default() {
      return Xi;
    }
    static get DefaultType() {
      return Yi;
    }
    static get NAME() {
      return Vi;
    }
    show(t2) {
      if (!this._config.isVisible)
        return void g(t2);
      this._append();
      const e2 = this._getElement();
      this._config.isAnimated && d(e2), e2.classList.add(Ki), this._emulateAnimation(() => {
        g(t2);
      });
    }
    hide(t2) {
      this._config.isVisible ? (this._getElement().classList.remove(Ki), this._emulateAnimation(() => {
        this.dispose(), g(t2);
      })) : g(t2);
    }
    dispose() {
      this._isAppended && (N.off(this._element, Qi), this._element.remove(), this._isAppended = false);
    }
    _getElement() {
      if (!this._element) {
        const t2 = document.createElement("div");
        t2.className = this._config.className, this._config.isAnimated && t2.classList.add("fade"), this._element = t2;
      }
      return this._element;
    }
    _configAfterMerge(t2) {
      return t2.rootElement = r(t2.rootElement), t2;
    }
    _append() {
      if (this._isAppended)
        return;
      const t2 = this._getElement();
      this._config.rootElement.append(t2), N.on(t2, Qi, () => {
        g(this._config.clickCallback);
      }), this._isAppended = true;
    }
    _emulateAnimation(t2) {
      _(t2, this._getElement(), this._config.isAnimated);
    }
  }
  const Gi = ".bs.focustrap", Ji = `focusin${Gi}`, Zi = `keydown.tab${Gi}`, tn = "backward", en = { autofocus: true, trapElement: null }, nn = { autofocus: "boolean", trapElement: "element" };
  class sn extends H {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isActive = false, this._lastTabNavDirection = null;
    }
    static get Default() {
      return en;
    }
    static get DefaultType() {
      return nn;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive || (this._config.autofocus && this._config.trapElement.focus(), N.off(document, Gi), N.on(document, Ji, (t2) => this._handleFocusin(t2)), N.on(document, Zi, (t2) => this._handleKeydown(t2)), this._isActive = true);
    }
    deactivate() {
      this._isActive && (this._isActive = false, N.off(document, Gi));
    }
    _handleFocusin(t2) {
      const { trapElement: e2 } = this._config;
      if (t2.target === document || t2.target === e2 || e2.contains(t2.target))
        return;
      const i3 = z.focusableChildren(e2);
      0 === i3.length ? e2.focus() : this._lastTabNavDirection === tn ? i3[i3.length - 1].focus() : i3[0].focus();
    }
    _handleKeydown(t2) {
      "Tab" === t2.key && (this._lastTabNavDirection = t2.shiftKey ? tn : "forward");
    }
  }
  const on = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", rn = ".sticky-top", an = "padding-right", ln = "margin-right";
  class cn {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t2 = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t2);
    }
    hide() {
      const t2 = this.getWidth();
      this._disableOverFlow(), this._setElementAttributes(this._element, an, (e2) => e2 + t2), this._setElementAttributes(on, an, (e2) => e2 + t2), this._setElementAttributes(rn, ln, (e2) => e2 - t2);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, an), this._resetElementAttributes(on, an), this._resetElementAttributes(rn, ln);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
    }
    _setElementAttributes(t2, e2, i3) {
      const n2 = this.getWidth();
      this._applyManipulationCallback(t2, (t3) => {
        if (t3 !== this._element && window.innerWidth > t3.clientWidth + n2)
          return;
        this._saveInitialAttribute(t3, e2);
        const s2 = window.getComputedStyle(t3).getPropertyValue(e2);
        t3.style.setProperty(e2, `${i3(Number.parseFloat(s2))}px`);
      });
    }
    _saveInitialAttribute(t2, e2) {
      const i3 = t2.style.getPropertyValue(e2);
      i3 && F.setDataAttribute(t2, e2, i3);
    }
    _resetElementAttributes(t2, e2) {
      this._applyManipulationCallback(t2, (t3) => {
        const i3 = F.getDataAttribute(t3, e2);
        null !== i3 ? (F.removeDataAttribute(t3, e2), t3.style.setProperty(e2, i3)) : t3.style.removeProperty(e2);
      });
    }
    _applyManipulationCallback(t2, e2) {
      if (o(t2))
        e2(t2);
      else
        for (const i3 of z.find(t2, this._element))
          e2(i3);
    }
  }
  const hn = ".bs.modal", dn = `hide${hn}`, un = `hidePrevented${hn}`, fn = `hidden${hn}`, pn = `show${hn}`, mn = `shown${hn}`, gn = `resize${hn}`, _n = `click.dismiss${hn}`, bn = `mousedown.dismiss${hn}`, vn = `keydown.dismiss${hn}`, yn = `click${hn}.data-api`, wn = "modal-open", An = "show", En = "modal-static", Tn = { backdrop: true, focus: true, keyboard: true }, Cn = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
  class On extends W {
    constructor(t2, e2) {
      super(t2, e2), this._dialog = z.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = false, this._isTransitioning = false, this._scrollBar = new cn(), this._addEventListeners();
    }
    static get Default() {
      return Tn;
    }
    static get DefaultType() {
      return Cn;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || this._isTransitioning || N.trigger(this._element, pn, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._isTransitioning = true, this._scrollBar.hide(), document.body.classList.add(wn), this._adjustDialog(), this._backdrop.show(() => this._showElement(t2)));
    }
    hide() {
      this._isShown && !this._isTransitioning && (N.trigger(this._element, dn).defaultPrevented || (this._isShown = false, this._isTransitioning = true, this._focustrap.deactivate(), this._element.classList.remove(An), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
    }
    dispose() {
      N.off(window, hn), N.off(this._dialog, hn), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Ui({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
    }
    _initializeFocusTrap() {
      return new sn({ trapElement: this._element });
    }
    _showElement(t2) {
      document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
      const e2 = z.findOne(".modal-body", this._dialog);
      e2 && (e2.scrollTop = 0), d(this._element), this._element.classList.add(An), this._queueCallback(() => {
        this._config.focus && this._focustrap.activate(), this._isTransitioning = false, N.trigger(this._element, mn, { relatedTarget: t2 });
      }, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      N.on(this._element, vn, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
      }), N.on(window, gn, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }), N.on(this._element, bn, (t2) => {
        N.one(this._element, _n, (e2) => {
          this._element === t2.target && this._element === e2.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", true), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = false, this._backdrop.hide(() => {
        document.body.classList.remove(wn), this._resetAdjustments(), this._scrollBar.reset(), N.trigger(this._element, fn);
      });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (N.trigger(this._element, un).defaultPrevented)
        return;
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._element.style.overflowY;
      "hidden" === e2 || this._element.classList.contains(En) || (t2 || (this._element.style.overflowY = "hidden"), this._element.classList.add(En), this._queueCallback(() => {
        this._element.classList.remove(En), this._queueCallback(() => {
          this._element.style.overflowY = e2;
        }, this._dialog);
      }, this._dialog), this._element.focus());
    }
    _adjustDialog() {
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._scrollBar.getWidth(), i3 = e2 > 0;
      if (i3 && !t2) {
        const t3 = p() ? "paddingLeft" : "paddingRight";
        this._element.style[t3] = `${e2}px`;
      }
      if (!i3 && t2) {
        const t3 = p() ? "paddingRight" : "paddingLeft";
        this._element.style[t3] = `${e2}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }
    static jQueryInterface(t2, e2) {
      return this.each(function() {
        const i3 = On.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === i3[t2])
            throw new TypeError(`No method named "${t2}"`);
          i3[t2](e2);
        }
      });
    }
  }
  N.on(document, yn, '[data-bs-toggle="modal"]', function(t2) {
    const e2 = z.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), N.one(e2, pn, (t3) => {
      t3.defaultPrevented || N.one(e2, fn, () => {
        a(this) && this.focus();
      });
    });
    const i3 = z.findOne(".modal.show");
    i3 && On.getInstance(i3).hide(), On.getOrCreateInstance(e2).toggle(this);
  }), R(On), m(On);
  const xn = ".bs.offcanvas", kn = ".data-api", Ln = `load${xn}${kn}`, Sn = "show", Dn = "showing", $n = "hiding", In = ".offcanvas.show", Nn = `show${xn}`, Pn = `shown${xn}`, jn = `hide${xn}`, Mn = `hidePrevented${xn}`, Fn = `hidden${xn}`, Hn = `resize${xn}`, Wn = `click${xn}${kn}`, Bn = `keydown.dismiss${xn}`, zn = { backdrop: true, keyboard: true, scroll: false }, Rn = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
  class qn extends W {
    constructor(t2, e2) {
      super(t2, e2), this._isShown = false, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
    }
    static get Default() {
      return zn;
    }
    static get DefaultType() {
      return Rn;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || N.trigger(this._element, Nn, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._backdrop.show(), this._config.scroll || new cn().hide(), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.classList.add(Dn), this._queueCallback(() => {
        this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(Sn), this._element.classList.remove(Dn), N.trigger(this._element, Pn, { relatedTarget: t2 });
      }, this._element, true));
    }
    hide() {
      this._isShown && (N.trigger(this._element, jn).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = false, this._element.classList.add($n), this._backdrop.hide(), this._queueCallback(() => {
        this._element.classList.remove(Sn, $n), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new cn().reset(), N.trigger(this._element, Fn);
      }, this._element, true)));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const t2 = Boolean(this._config.backdrop);
      return new Ui({ className: "offcanvas-backdrop", isVisible: t2, isAnimated: true, rootElement: this._element.parentNode, clickCallback: t2 ? () => {
        "static" !== this._config.backdrop ? this.hide() : N.trigger(this._element, Mn);
      } : null });
    }
    _initializeFocusTrap() {
      return new sn({ trapElement: this._element });
    }
    _addEventListeners() {
      N.on(this._element, Bn, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : N.trigger(this._element, Mn));
      });
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = qn.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2)
            throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  N.on(document, Wn, '[data-bs-toggle="offcanvas"]', function(t2) {
    const e2 = z.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && t2.preventDefault(), l(this))
      return;
    N.one(e2, Fn, () => {
      a(this) && this.focus();
    });
    const i3 = z.findOne(In);
    i3 && i3 !== e2 && qn.getInstance(i3).hide(), qn.getOrCreateInstance(e2).toggle(this);
  }), N.on(window, Ln, () => {
    for (const t2 of z.find(In))
      qn.getOrCreateInstance(t2).show();
  }), N.on(window, Hn, () => {
    for (const t2 of z.find("[aria-modal][class*=show][class*=offcanvas-]"))
      "fixed" !== getComputedStyle(t2).position && qn.getOrCreateInstance(t2).hide();
  }), R(qn), m(qn);
  const Vn = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], dd: [], div: [], dl: [], dt: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }, Kn = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), Qn = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Xn = (t2, e2) => {
    const i3 = t2.nodeName.toLowerCase();
    return e2.includes(i3) ? !Kn.has(i3) || Boolean(Qn.test(t2.nodeValue)) : e2.filter((t3) => t3 instanceof RegExp).some((t3) => t3.test(i3));
  }, Yn = { allowList: Vn, content: {}, extraClass: "", html: false, sanitize: true, sanitizeFn: null, template: "<div></div>" }, Un = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" }, Gn = { entry: "(string|element|function|null)", selector: "(string|element)" };
  class Jn extends H {
    constructor(t2) {
      super(), this._config = this._getConfig(t2);
    }
    static get Default() {
      return Yn;
    }
    static get DefaultType() {
      return Un;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content).map((t2) => this._resolvePossibleFunction(t2)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t2) {
      return this._checkContent(t2), this._config.content = { ...this._config.content, ...t2 }, this;
    }
    toHtml() {
      const t2 = document.createElement("div");
      t2.innerHTML = this._maybeSanitize(this._config.template);
      for (const [e3, i4] of Object.entries(this._config.content))
        this._setContent(t2, i4, e3);
      const e2 = t2.children[0], i3 = this._resolvePossibleFunction(this._config.extraClass);
      return i3 && e2.classList.add(...i3.split(" ")), e2;
    }
    _typeCheckConfig(t2) {
      super._typeCheckConfig(t2), this._checkContent(t2.content);
    }
    _checkContent(t2) {
      for (const [e2, i3] of Object.entries(t2))
        super._typeCheckConfig({ selector: e2, entry: i3 }, Gn);
    }
    _setContent(t2, e2, i3) {
      const n2 = z.findOne(i3, t2);
      n2 && ((e2 = this._resolvePossibleFunction(e2)) ? o(e2) ? this._putElementInTemplate(r(e2), n2) : this._config.html ? n2.innerHTML = this._maybeSanitize(e2) : n2.textContent = e2 : n2.remove());
    }
    _maybeSanitize(t2) {
      return this._config.sanitize ? function(t3, e2, i3) {
        if (!t3.length)
          return t3;
        if (i3 && "function" == typeof i3)
          return i3(t3);
        const n2 = new window.DOMParser().parseFromString(t3, "text/html"), s2 = [].concat(...n2.body.querySelectorAll("*"));
        for (const t4 of s2) {
          const i4 = t4.nodeName.toLowerCase();
          if (!Object.keys(e2).includes(i4)) {
            t4.remove();
            continue;
          }
          const n3 = [].concat(...t4.attributes), s3 = [].concat(e2["*"] || [], e2[i4] || []);
          for (const e3 of n3)
            Xn(e3, s3) || t4.removeAttribute(e3.nodeName);
        }
        return n2.body.innerHTML;
      }(t2, this._config.allowList, this._config.sanitizeFn) : t2;
    }
    _resolvePossibleFunction(t2) {
      return g(t2, [this]);
    }
    _putElementInTemplate(t2, e2) {
      if (this._config.html)
        return e2.innerHTML = "", void e2.append(t2);
      e2.textContent = t2.textContent;
    }
  }
  const Zn = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), ts = "fade", es = "show", is = ".modal", ns = "hide.bs.modal", ss = "hover", os = "focus", rs = { AUTO: "auto", TOP: "top", RIGHT: p() ? "left" : "right", BOTTOM: "bottom", LEFT: p() ? "right" : "left" }, as = { allowList: Vn, animation: true, boundary: "clippingParents", container: false, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: false, offset: [0, 6], placement: "top", popperConfig: null, sanitize: true, sanitizeFn: null, selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" }, ls = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
  class cs extends W {
    constructor(t2, e2) {
      if (void 0 === vi)
        throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      super(t2, e2), this._isEnabled = true, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
    }
    static get Default() {
      return as;
    }
    static get DefaultType() {
      return ls;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout), N.off(this._element.closest(is), ns, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled)
        return;
      const t2 = N.trigger(this._element, this.constructor.eventName("show")), e2 = (c(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
      if (t2.defaultPrevented || !e2)
        return;
      this._disposePopper();
      const i3 = this._getTipElement();
      this._element.setAttribute("aria-describedby", i3.getAttribute("id"));
      const { container: n2 } = this._config;
      if (this._element.ownerDocument.documentElement.contains(this.tip) || (n2.append(i3), N.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i3), i3.classList.add(es), "ontouchstart" in document.documentElement)
        for (const t3 of [].concat(...document.body.children))
          N.on(t3, "mouseover", h);
      this._queueCallback(() => {
        N.trigger(this._element, this.constructor.eventName("shown")), false === this._isHovered && this._leave(), this._isHovered = false;
      }, this.tip, this._isAnimated());
    }
    hide() {
      if (this._isShown() && !N.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
        if (this._getTipElement().classList.remove(es), "ontouchstart" in document.documentElement)
          for (const t2 of [].concat(...document.body.children))
            N.off(t2, "mouseover", h);
        this._activeTrigger.click = false, this._activeTrigger[os] = false, this._activeTrigger[ss] = false, this._isHovered = null, this._queueCallback(() => {
          this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), N.trigger(this._element, this.constructor.eventName("hidden")));
        }, this.tip, this._isAnimated());
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
    }
    _createTipElement(t2) {
      const e2 = this._getTemplateFactory(t2).toHtml();
      if (!e2)
        return null;
      e2.classList.remove(ts, es), e2.classList.add(`bs-${this.constructor.NAME}-auto`);
      const i3 = ((t3) => {
        do {
          t3 += Math.floor(1e6 * Math.random());
        } while (document.getElementById(t3));
        return t3;
      })(this.constructor.NAME).toString();
      return e2.setAttribute("id", i3), this._isAnimated() && e2.classList.add(ts), e2;
    }
    setContent(t2) {
      this._newContent = t2, this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t2) {
      return this._templateFactory ? this._templateFactory.changeContent(t2) : this._templateFactory = new Jn({ ...this._config, content: t2, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory;
    }
    _getContentForTemplate() {
      return { ".tooltip-inner": this._getTitle() };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    _initializeOnDelegatedTarget(t2) {
      return this.constructor.getOrCreateInstance(t2.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(ts);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(es);
    }
    _createPopper(t2) {
      const e2 = g(this._config.placement, [this, t2, this._element]), i3 = rs[e2.toUpperCase()];
      return bi(this._element, t2, this._getPopperConfig(i3));
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _resolvePossibleFunction(t2) {
      return g(t2, [this._element]);
    }
    _getPopperConfig(t2) {
      const e2 = { placement: t2, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } }, { name: "preSetPlacement", enabled: true, phase: "beforeMain", fn: (t3) => {
        this._getTipElement().setAttribute("data-popper-placement", t3.state.placement);
      } }] };
      return { ...e2, ...g(this._config.popperConfig, [e2]) };
    }
    _setListeners() {
      const t2 = this._config.trigger.split(" ");
      for (const e2 of t2)
        if ("click" === e2)
          N.on(this._element, this.constructor.eventName("click"), this._config.selector, (t3) => {
            this._initializeOnDelegatedTarget(t3).toggle();
          });
        else if ("manual" !== e2) {
          const t3 = e2 === ss ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), i3 = e2 === ss ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
          N.on(this._element, t3, this._config.selector, (t4) => {
            const e3 = this._initializeOnDelegatedTarget(t4);
            e3._activeTrigger["focusin" === t4.type ? os : ss] = true, e3._enter();
          }), N.on(this._element, i3, this._config.selector, (t4) => {
            const e3 = this._initializeOnDelegatedTarget(t4);
            e3._activeTrigger["focusout" === t4.type ? os : ss] = e3._element.contains(t4.relatedTarget), e3._leave();
          });
        }
      this._hideModalHandler = () => {
        this._element && this.hide();
      }, N.on(this._element.closest(is), ns, this._hideModalHandler);
    }
    _fixTitle() {
      const t2 = this._element.getAttribute("title");
      t2 && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t2), this._element.setAttribute("data-bs-original-title", t2), this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered ? this._isHovered = true : (this._isHovered = true, this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() || (this._isHovered = false, this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
    }
    _setTimeout(t2, e2) {
      clearTimeout(this._timeout), this._timeout = setTimeout(t2, e2);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(t2) {
      const e2 = F.getDataAttributes(this._element);
      for (const t3 of Object.keys(e2))
        Zn.has(t3) && delete e2[t3];
      return t2 = { ...e2, ..."object" == typeof t2 && t2 ? t2 : {} }, t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2.container = false === t2.container ? document.body : r(t2.container), "number" == typeof t2.delay && (t2.delay = { show: t2.delay, hide: t2.delay }), "number" == typeof t2.title && (t2.title = t2.title.toString()), "number" == typeof t2.content && (t2.content = t2.content.toString()), t2;
    }
    _getDelegateConfig() {
      const t2 = {};
      for (const [e2, i3] of Object.entries(this._config))
        this.constructor.Default[e2] !== i3 && (t2[e2] = i3);
      return t2.selector = false, t2.trigger = "manual", t2;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = cs.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2])
            throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  m(cs);
  const hs = { ...cs.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" }, ds = { ...cs.DefaultType, content: "(null|string|element|function)" };
  class us extends cs {
    static get Default() {
      return hs;
    }
    static get DefaultType() {
      return ds;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return { ".popover-header": this._getTitle(), ".popover-body": this._getContent() };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = us.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2])
            throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  m(us);
  const fs = ".bs.scrollspy", ps = `activate${fs}`, ms = `click${fs}`, gs = `load${fs}.data-api`, _s = "active", bs = "[href]", vs = ".nav-link", ys = `${vs}, .nav-item > ${vs}, .list-group-item`, ws = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: false, target: null, threshold: [0.1, 0.5, 1] }, As = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
  class Es extends W {
    constructor(t2, e2) {
      super(t2, e2), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh();
    }
    static get Default() {
      return ws;
    }
    static get DefaultType() {
      return As;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
      for (const t2 of this._observableSections.values())
        this._observer.observe(t2);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.target = r(t2.target) || document.body, t2.rootMargin = t2.offset ? `${t2.offset}px 0px -30%` : t2.rootMargin, "string" == typeof t2.threshold && (t2.threshold = t2.threshold.split(",").map((t3) => Number.parseFloat(t3))), t2;
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll && (N.off(this._config.target, ms), N.on(this._config.target, ms, bs, (t2) => {
        const e2 = this._observableSections.get(t2.target.hash);
        if (e2) {
          t2.preventDefault();
          const i3 = this._rootElement || window, n2 = e2.offsetTop - this._element.offsetTop;
          if (i3.scrollTo)
            return void i3.scrollTo({ top: n2, behavior: "smooth" });
          i3.scrollTop = n2;
        }
      }));
    }
    _getNewObserver() {
      const t2 = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
      return new IntersectionObserver((t3) => this._observerCallback(t3), t2);
    }
    _observerCallback(t2) {
      const e2 = (t3) => this._targetLinks.get(`#${t3.target.id}`), i3 = (t3) => {
        this._previousScrollData.visibleEntryTop = t3.target.offsetTop, this._process(e2(t3));
      }, n2 = (this._rootElement || document.documentElement).scrollTop, s2 = n2 >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = n2;
      for (const o2 of t2) {
        if (!o2.isIntersecting) {
          this._activeTarget = null, this._clearActiveClass(e2(o2));
          continue;
        }
        const t3 = o2.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (s2 && t3) {
          if (i3(o2), !n2)
            return;
        } else
          s2 || t3 || i3(o2);
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
      const t2 = z.find(bs, this._config.target);
      for (const e2 of t2) {
        if (!e2.hash || l(e2))
          continue;
        const t3 = z.findOne(decodeURI(e2.hash), this._element);
        a(t3) && (this._targetLinks.set(decodeURI(e2.hash), e2), this._observableSections.set(e2.hash, t3));
      }
    }
    _process(t2) {
      this._activeTarget !== t2 && (this._clearActiveClass(this._config.target), this._activeTarget = t2, t2.classList.add(_s), this._activateParents(t2), N.trigger(this._element, ps, { relatedTarget: t2 }));
    }
    _activateParents(t2) {
      if (t2.classList.contains("dropdown-item"))
        z.findOne(".dropdown-toggle", t2.closest(".dropdown")).classList.add(_s);
      else
        for (const e2 of z.parents(t2, ".nav, .list-group"))
          for (const t3 of z.prev(e2, ys))
            t3.classList.add(_s);
    }
    _clearActiveClass(t2) {
      t2.classList.remove(_s);
      const e2 = z.find(`${bs}.${_s}`, t2);
      for (const t3 of e2)
        t3.classList.remove(_s);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Es.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2)
            throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  N.on(window, gs, () => {
    for (const t2 of z.find('[data-bs-spy="scroll"]'))
      Es.getOrCreateInstance(t2);
  }), m(Es);
  const Ts = ".bs.tab", Cs = `hide${Ts}`, Os = `hidden${Ts}`, xs = `show${Ts}`, ks = `shown${Ts}`, Ls = `click${Ts}`, Ss = `keydown${Ts}`, Ds = `load${Ts}`, $s = "ArrowLeft", Is = "ArrowRight", Ns = "ArrowUp", Ps = "ArrowDown", js = "Home", Ms = "End", Fs = "active", Hs = "fade", Ws = "show", Bs = ".dropdown-toggle", zs = `:not(${Bs})`, Rs = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', qs = `.nav-link${zs}, .list-group-item${zs}, [role="tab"]${zs}, ${Rs}`, Vs = `.${Fs}[data-bs-toggle="tab"], .${Fs}[data-bs-toggle="pill"], .${Fs}[data-bs-toggle="list"]`;
  class Ks extends W {
    constructor(t2) {
      super(t2), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), N.on(this._element, Ss, (t3) => this._keydown(t3)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const t2 = this._element;
      if (this._elemIsActive(t2))
        return;
      const e2 = this._getActiveElem(), i3 = e2 ? N.trigger(e2, Cs, { relatedTarget: t2 }) : null;
      N.trigger(t2, xs, { relatedTarget: e2 }).defaultPrevented || i3 && i3.defaultPrevented || (this._deactivate(e2, t2), this._activate(t2, e2));
    }
    _activate(t2, e2) {
      t2 && (t2.classList.add(Fs), this._activate(z.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.removeAttribute("tabindex"), t2.setAttribute("aria-selected", true), this._toggleDropDown(t2, true), N.trigger(t2, ks, { relatedTarget: e2 })) : t2.classList.add(Ws);
      }, t2, t2.classList.contains(Hs)));
    }
    _deactivate(t2, e2) {
      t2 && (t2.classList.remove(Fs), t2.blur(), this._deactivate(z.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.setAttribute("aria-selected", false), t2.setAttribute("tabindex", "-1"), this._toggleDropDown(t2, false), N.trigger(t2, Os, { relatedTarget: e2 })) : t2.classList.remove(Ws);
      }, t2, t2.classList.contains(Hs)));
    }
    _keydown(t2) {
      if (![$s, Is, Ns, Ps, js, Ms].includes(t2.key))
        return;
      t2.stopPropagation(), t2.preventDefault();
      const e2 = this._getChildren().filter((t3) => !l(t3));
      let i3;
      if ([js, Ms].includes(t2.key))
        i3 = e2[t2.key === js ? 0 : e2.length - 1];
      else {
        const n2 = [Is, Ps].includes(t2.key);
        i3 = b(e2, t2.target, n2, true);
      }
      i3 && (i3.focus({ preventScroll: true }), Ks.getOrCreateInstance(i3).show());
    }
    _getChildren() {
      return z.find(qs, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t2) => this._elemIsActive(t2)) || null;
    }
    _setInitialAttributes(t2, e2) {
      this._setAttributeIfNotExists(t2, "role", "tablist");
      for (const t3 of e2)
        this._setInitialAttributesOnChild(t3);
    }
    _setInitialAttributesOnChild(t2) {
      t2 = this._getInnerElement(t2);
      const e2 = this._elemIsActive(t2), i3 = this._getOuterElement(t2);
      t2.setAttribute("aria-selected", e2), i3 !== t2 && this._setAttributeIfNotExists(i3, "role", "presentation"), e2 || t2.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t2, "role", "tab"), this._setInitialAttributesOnTargetPanel(t2);
    }
    _setInitialAttributesOnTargetPanel(t2) {
      const e2 = z.getElementFromSelector(t2);
      e2 && (this._setAttributeIfNotExists(e2, "role", "tabpanel"), t2.id && this._setAttributeIfNotExists(e2, "aria-labelledby", `${t2.id}`));
    }
    _toggleDropDown(t2, e2) {
      const i3 = this._getOuterElement(t2);
      if (!i3.classList.contains("dropdown"))
        return;
      const n2 = (t3, n3) => {
        const s2 = z.findOne(t3, i3);
        s2 && s2.classList.toggle(n3, e2);
      };
      n2(Bs, Fs), n2(".dropdown-menu", Ws), i3.setAttribute("aria-expanded", e2);
    }
    _setAttributeIfNotExists(t2, e2, i3) {
      t2.hasAttribute(e2) || t2.setAttribute(e2, i3);
    }
    _elemIsActive(t2) {
      return t2.classList.contains(Fs);
    }
    _getInnerElement(t2) {
      return t2.matches(qs) ? t2 : z.findOne(qs, t2);
    }
    _getOuterElement(t2) {
      return t2.closest(".nav-item, .list-group-item") || t2;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Ks.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2)
            throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  N.on(document, Ls, Rs, function(t2) {
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), l(this) || Ks.getOrCreateInstance(this).show();
  }), N.on(window, Ds, () => {
    for (const t2 of z.find(Vs))
      Ks.getOrCreateInstance(t2);
  }), m(Ks);
  const Qs = ".bs.toast", Xs = `mouseover${Qs}`, Ys = `mouseout${Qs}`, Us = `focusin${Qs}`, Gs = `focusout${Qs}`, Js = `hide${Qs}`, Zs = `hidden${Qs}`, to = `show${Qs}`, eo = `shown${Qs}`, io = "hide", no = "show", so = "showing", oo = { animation: "boolean", autohide: "boolean", delay: "number" }, ro = { animation: true, autohide: true, delay: 5e3 };
  class ao extends W {
    constructor(t2, e2) {
      super(t2, e2), this._timeout = null, this._hasMouseInteraction = false, this._hasKeyboardInteraction = false, this._setListeners();
    }
    static get Default() {
      return ro;
    }
    static get DefaultType() {
      return oo;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      N.trigger(this._element, to).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(io), d(this._element), this._element.classList.add(no, so), this._queueCallback(() => {
        this._element.classList.remove(so), N.trigger(this._element, eo), this._maybeScheduleHide();
      }, this._element, this._config.animation));
    }
    hide() {
      this.isShown() && (N.trigger(this._element, Js).defaultPrevented || (this._element.classList.add(so), this._queueCallback(() => {
        this._element.classList.add(io), this._element.classList.remove(so, no), N.trigger(this._element, Zs);
      }, this._element, this._config.animation)));
    }
    dispose() {
      this._clearTimeout(), this.isShown() && this._element.classList.remove(no), super.dispose();
    }
    isShown() {
      return this._element.classList.contains(no);
    }
    _maybeScheduleHide() {
      this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay)));
    }
    _onInteraction(t2, e2) {
      switch (t2.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e2;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e2;
      }
      if (e2)
        return void this._clearTimeout();
      const i3 = t2.relatedTarget;
      this._element === i3 || this._element.contains(i3) || this._maybeScheduleHide();
    }
    _setListeners() {
      N.on(this._element, Xs, (t2) => this._onInteraction(t2, true)), N.on(this._element, Ys, (t2) => this._onInteraction(t2, false)), N.on(this._element, Us, (t2) => this._onInteraction(t2, true)), N.on(this._element, Gs, (t2) => this._onInteraction(t2, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), this._timeout = null;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = ao.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2])
            throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  return R(ao), m(ao), { Alert: Q, Button: Y, Carousel: xt, Collapse: Bt, Dropdown: qi, Modal: On, Offcanvas: qn, Popover: us, ScrollSpy: Es, Tab: Ks, Toast: ao, Tooltip: cs };
});
//# sourceMappingURL=scripts.js.map
