"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateIframeAndLoadViewer = void 0;
var _react = require("react");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var useCreateIframeAndLoadViewer = function useCreateIframeAndLoadViewer(_ref) {
  var files = _ref.files,
    authInfo = _ref.authInfo,
    fileName = _ref.fileName,
    licenseKey = _ref.licenseKey,
    customData = _ref.customData,
    uuid = _ref.uuid,
    tools = _ref.tools,
    locale = _ref.locale,
    mode = _ref.mode,
    container = _ref.container,
    iframeSrc = _ref.iframeSrc,
    onFileFailed = _ref.onFileFailed,
    defaultAnnotationEditorMode = _ref.defaultAnnotationEditorMode,
    initialAnnotations = _ref.initialAnnotations,
    notarySeal = _ref.notarySeal,
    initialSigners = _ref.initialSigners,
    modifiedUiElements = _ref.modifiedUiElements,
    textTagDefaults = _ref.textTagDefaults;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    internalIsReady = _useState2[0],
    setInternalIsReady = _useState2[1]; // Add this state variable
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedPages = _useState4[0],
    setSelectedPages = _useState4[1];
  var done = (0, _react.useRef)(false);
  var iframeLoadedSuccessfully = (0, _react.useRef)(false); // Add this ref to keep track of iframe's load state
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    pagesLoaded = _useState6[0],
    setPagesLoaded = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    annotations = _useState8[0],
    setAnnotations = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    hasSeal = _useState10[0],
    setHasSeal = _useState10[1];
  var _useState11 = (0, _react.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    notarySealIds = _useState12[0],
    setNotarySealIds = _useState12[1];
  var _useState13 = (0, _react.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    authTokens = _useState14[0],
    setAuthTokens = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    signatureModalOpen = _useState16[0],
    setSignatureModalOpen = _useState16[1];
  var createIframe = function createIframe() {
    var iframe = document.createElement('iframe');
    iframe.src = iframeSrc || "/pdf-ui/index.html";
    iframe.id = "webviewer-1";
    iframe.title = "webviewer";
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.margin = "0px";
    iframe.style.padding = "0px";
    iframe.style.display = "block";
    iframe.allowFullscreen = true;
    // @ts-ignore
    iframe["webkitallowfullscreen"] = true;
    // @ts-ignore
    iframe["mozallowfullscreen"] = true;

    // When the iframe is loaded, post the file to it
    iframe.onload = function () {
      var targetOrigin = window.location.origin;
      var message = {
        files: files,
        fileName: fileName,
        tools: tools,
        locale: locale,
        licenseKey: licenseKey,
        mode: mode,
        uuid: uuid,
        customData: customData,
        initialAnnotations: initialAnnotations,
        notarySeal: notarySeal,
        initialSigners: initialSigners,
        modifiedUiElements: modifiedUiElements,
        authInfo: authInfo,
        defaultAnnotationEditorMode: defaultAnnotationEditorMode,
        textTagDefaults: textTagDefaults
      };

      // Set up a function to send the message
      var sendMessage = function sendMessage() {
        // @ts-ignore
        iframe.contentWindow.postMessage(message, targetOrigin);
      };

      // Call the function immediately to send the first message
      sendMessage();

      // Set up an interval to send the message every 1000ms (1 second)
      var interval = setInterval(sendMessage, 200);

      // Set up an event listener to listen for a response from the iframe
      window.parent.addEventListener('message', function (event) {
        if (event.data.type === 'file-received' && event.data.success) {
          // If the message was received successfully, clear the interval
          clearInterval(interval);
        }
        if (event.data.type === 'file-failed' && event.data.message) {
          // If the message was received successfully, clear the interval
          onFileFailed(event.data.message);
        }
        if (event.data.type === 'multi-page-selection-change' && Array.isArray(event.data.message)) {
          setSelectedPages(event.data.message);
        }
        if (event.data.type === "pages-loaded") {
          setPagesLoaded(event.data.message);
        }
        if (event.data.type === "annotations-change") {
          setAnnotations(event.data.message);
        }
        if (event.data.type === 'has-seal-change') {
          console.log('has-seal-change', event.data.message);
          setHasSeal(!!event.data.message);
        }
        if (event.data.type === 'notary-seal-ids-change') {
          var ids = Array.isArray(event.data.message) ? event.data.message : [];
          setNotarySealIds(ids);
        }
        if (event.data.type === "annotation-modal-open-change") {
          setSignatureModalOpen(event.data.message);
        }
      });
    };
    container.current.appendChild(iframe);
  };
  var handleIframeLoaded = function handleIframeLoaded(event) {
    if (event.data.type === 'iframe-loaded' && event.data.success) {
      iframeLoadedSuccessfully.current = true;
      setInternalIsReady(true);
    }
    // let's just lump more stuff in here
    if (event.data.type === 'token-granted' && event.data.token) {
      setAuthTokens(JSON.stringify({
        token: event.data.token,
        refreshToken: event.data.refreshToken
      }));
    }
    if (event.data.type === 'token-removed') {
      setAuthTokens(null);
    }
    if (event.data.type === 'request-token' && event.data.success) {
      var iframeWin = document.getElementById('webviewer-1').contentWindow;
      var parsedTokens = authTokens ? JSON.parse(authTokens) : null;
      iframeWin === null || iframeWin === void 0 ? void 0 : iframeWin.postMessage({
        authInfo: {
          token: parsedTokens === null || parsedTokens === void 0 ? void 0 : parsedTokens.token,
          refreshToken: parsedTokens === null || parsedTokens === void 0 ? void 0 : parsedTokens.refreshToken
        }
      }, '*');
      // I believe this is only for the chrome extension tabs learning from each other.
    }
  };

  (0, _react.useEffect)(function () {
    window.parent.addEventListener('message', handleIframeLoaded);
    return function () {
      return window.parent.removeEventListener('message', handleIframeLoaded);
    };
  }, []);
  var _useState17 = (0, _react.useState)(null),
    _useState18 = _slicedToArray(_useState17, 2),
    clickedTag = _useState18[0],
    setClickedTag = _useState18[1];
  var handleTagClicked = function handleTagClicked(event) {
    if (event.data.type === 'click-tag') {
      setClickedTag(event.data);
    }
  };
  (0, _react.useEffect)(function () {
    window.parent.addEventListener('message', handleTagClicked);
    return function () {
      return window.parent.removeEventListener('message', handleTagClicked);
    };
  }, []);
  var handleVisibilityChange = function handleVisibilityChange() {
    if (!document.hidden && !iframeLoadedSuccessfully.current) {
      var iframe = document.getElementById('webviewer-1');
      if (iframe) {
        iframe.remove();
      }
      createIframe();
    }
  };
  (0, _react.useEffect)(function () {
    if (!(container !== null && container !== void 0 && container.current)) {
      return;
    }
    if (done.current) {
      return;
    }
    done.current = true;
    createIframe();
  }, [container, files]);
  (0, _react.useEffect)(function () {
    document.addEventListener('click', function () {
      // @ts-ignore
      var iframeWin = document.getElementById('webviewer-1').contentWindow;
      iframeWin.postMessage('clickedOutside', window.location.origin);
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return function () {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  var download = function download() {
    var _document;
    // @ts-ignore
    var iframeWin = (_document = document) === null || _document === void 0 || (_document = _document.getElementById('webviewer-1')) === null || _document === void 0 ? void 0 : _document.contentWindow;
    iframeWin.postMessage({
      type: 'download'
    }, window.location.origin);
  };
  var toggleFullScreenThumbnails = function toggleFullScreenThumbnails(enable) {
    var _document2;
    // @ts-ignore
    var iframeWin = (_document2 = document) === null || _document2 === void 0 || (_document2 = _document2.getElementById('webviewer-1')) === null || _document2 === void 0 ? void 0 : _document2.contentWindow;
    iframeWin.postMessage({
      type: 'toggle-full-screen-thumbnails',
      enable: enable
    }, window.location.origin);
  };
  var toggleSearchbar = function toggleSearchbar(enable) {
    var _document3;
    // @ts-ignore
    var iframeWin = (_document3 = document) === null || _document3 === void 0 || (_document3 = _document3.getElementById('webviewer-1')) === null || _document3 === void 0 ? void 0 : _document3.contentWindow;
    iframeWin.postMessage({
      type: 'toggle-searchbar',
      enable: enable
    }, window.location.origin);
  };
  var requestBuffer = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(value) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              var _document4;
              var listener = function listener(event) {
                if (event.data.type === 'request-buffer-completed') {
                  resolve(event.data.message); // Resolve the promise with the result
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                } else if (event.data.type === 'request-buffer-failed') {
                  reject(new Error(event.data.message)); // Reject the promise with the error message
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                }
              };

              // Adding the event listener before sending the postMessage
              window.addEventListener('message', listener);

              // @ts-ignore
              var iframeWin = (_document4 = document) === null || _document4 === void 0 || (_document4 = _document4.getElementById('webviewer-1')) === null || _document4 === void 0 ? void 0 : _document4.contentWindow;

              // Sending the extract-pages message to the iframe
              iframeWin.postMessage({
                type: 'request-buffer',
                value: value
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function requestBuffer(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var finalizeDocument = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var _document5;
              var listener = function listener(event) {
                if (!event || !event.data) return;
                if (event.data.type === 'finalize-document') {
                  // Child posts { type: 'finalize-document', annotations }
                  resolve(event.data.annotations);
                  window.removeEventListener('message', listener);
                } else if (event.data.type === 'finalize-document-failed') {
                  reject(new Error(event.data.message || 'Finalize document failed'));
                  window.removeEventListener('message', listener);
                }
              };

              // Add listener to capture the next finalize signal
              window.addEventListener('message', listener);

              // Optionally nudge the iframe if it supports being prompted to finalize
              // @ts-ignore
              var iframeWin = (_document5 = document) === null || _document5 === void 0 || (_document5 = _document5.getElementById('webviewer-1')) === null || _document5 === void 0 ? void 0 : _document5.contentWindow;
              iframeWin === null || iframeWin === void 0 ? void 0 : iframeWin.postMessage({
                type: 'finalize-document'
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function finalizeDocument() {
      return _ref3.apply(this, arguments);
    };
  }();
  var toggleSignatureModal = function toggleSignatureModal(enable) {
    var _document6;
    // @ts-ignore
    var iframeWin = (_document6 = document) === null || _document6 === void 0 || (_document6 = _document6.getElementById('webviewer-1')) === null || _document6 === void 0 ? void 0 : _document6.contentWindow;
    iframeWin.postMessage({
      type: 'toggle-signature-modal',
      enable: enable
    }, window.location.origin);
  };
  var setThumbnailZoom = function setThumbnailZoom(value) {
    var _document7;
    // @ts-ignore
    var iframeWin = (_document7 = document) === null || _document7 === void 0 || (_document7 = _document7.getElementById('webviewer-1')) === null || _document7 === void 0 ? void 0 : _document7.contentWindow;
    iframeWin.postMessage({
      type: 'set-thumbnail-zoom',
      value: value
    }, window.location.origin);
  };
  var setAuthInfo = function setAuthInfo(_ref4) {
    var _document8;
    var token = _ref4.token,
      refreshToken = _ref4.refreshToken;
    // @ts-ignore
    var iframeWin = (_document8 = document) === null || _document8 === void 0 || (_document8 = _document8.getElementById('webviewer-1')) === null || _document8 === void 0 ? void 0 : _document8.contentWindow;
    iframeWin === null || iframeWin === void 0 ? void 0 : iframeWin.postMessage({
      type: 'set-auth-info',
      authInfo: {
        token: token,
        refreshToken: refreshToken
      }
    }, window.location.origin);
  };
  var splitPages = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var _document9;
              var listener = function listener(event) {
                if (event.data.type === 'split-pages-completed' && event.data.success) {
                  resolve(event.data.message); // Resolve the promise with the result
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                } else if (event.data.type === 'split-pages-failed') {
                  reject(new Error(event.data.message)); // Reject the promise with the error message
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                }
              };

              // Adding the event listener before sending the postMessage
              window.addEventListener('message', listener);

              // @ts-ignore
              var iframeWin = (_document9 = document) === null || _document9 === void 0 || (_document9 = _document9.getElementById('webviewer-1')) === null || _document9 === void 0 ? void 0 : _document9.contentWindow;

              // Sending the extract-pages message to the iframe
              iframeWin.postMessage({
                type: 'split-pages'
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function splitPages() {
      return _ref5.apply(this, arguments);
    };
  }();
  var mergeFiles = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(value) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              var _document10;
              var listener = function listener(event) {
                if (event.data.type === 'merge-files-completed' && event.data.success) {
                  resolve(event.data.message); // Resolve the promise with the result
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                } else if (event.data.type === 'merge-files-failed') {
                  reject(new Error(event.data.message)); // Reject the promise with the error message
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                }
              };

              // Adding the event listener before sending the postMessage
              window.addEventListener('message', listener);

              // @ts-ignore
              var iframeWin = (_document10 = document) === null || _document10 === void 0 || (_document10 = _document10.getElementById('webviewer-1')) === null || _document10 === void 0 ? void 0 : _document10.contentWindow;

              // Sending the extract-pages message to the iframe
              iframeWin.postMessage({
                type: 'merge-files',
                value: value
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function mergeFiles(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  var removeChatHistory = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              var _document11;
              var listener = function listener(event) {
                if (event.data.type === 'remove-chat-history-completed' && event.data.success) {
                  resolve(event.data.message); // Resolve the promise with the result
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                } else if (event.data.type === 'remove-chat-history-failed') {
                  reject(new Error(event.data.message)); // Reject the promise with the error message
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                }
              };

              // Adding the event listener before sending the postMessage
              window.addEventListener('message', listener);

              // @ts-ignore
              var iframeWin = (_document11 = document) === null || _document11 === void 0 || (_document11 = _document11.getElementById('webviewer-1')) === null || _document11 === void 0 ? void 0 : _document11.contentWindow;

              // Sending the extract-pages message to the iframe
              iframeWin.postMessage({
                type: 'remove-chat-history'
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function removeChatHistory() {
      return _ref7.apply(this, arguments);
    };
  }();
  var combineFiles = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(value) {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              var _document12;
              var listener = function listener(event) {
                if (event.data.type === 'combine-files-completed' && event.data.success) {
                  resolve(event.data.message); // Resolve the promise with the result
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                } else if (event.data.type === 'combine-files-failed') {
                  reject(new Error(event.data.message)); // Reject the promise with the error message
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                }
              };

              // Adding the event listener before sending the postMessage
              window.addEventListener('message', listener);

              // @ts-ignore
              var iframeWin = (_document12 = document) === null || _document12 === void 0 || (_document12 = _document12.getElementById('webviewer-1')) === null || _document12 === void 0 ? void 0 : _document12.contentWindow;

              // Sending the extract-pages message to the iframe
              iframeWin.postMessage({
                type: 'combine-files',
                value: value
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function combineFiles(_x4) {
      return _ref8.apply(this, arguments);
    };
  }();
  var extractPages = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(value) {
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", new Promise(function (resolve, reject) {
              var _document13;
              var listener = function listener(event) {
                if (event.data.type === 'extract-pages-completed' && event.data.success) {
                  resolve(event.data.result); // Resolve the promise with the result
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                } else if (event.data.type === 'extract-pages-failed') {
                  reject(new Error(event.data.message)); // Reject the promise with the error message
                  window.removeEventListener('message', listener); // Remove the listener to clean up
                }
              };

              // Adding the event listener before sending the postMessage
              window.addEventListener('message', listener);

              // @ts-ignore
              var iframeWin = (_document13 = document) === null || _document13 === void 0 || (_document13 = _document13.getElementById('webviewer-1')) === null || _document13 === void 0 ? void 0 : _document13.contentWindow;

              // Sending the extract-pages message to the iframe
              iframeWin.postMessage({
                type: 'extract-pages',
                value: value
              }, window.location.origin);
            }));
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function extractPages(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();
  return {
    requestBuffer: requestBuffer,
    finalizeDocument: finalizeDocument,
    removeChatHistory: removeChatHistory,
    setAuthInfo: setAuthInfo,
    splitPages: splitPages,
    combineFiles: combineFiles,
    mergeFiles: mergeFiles,
    pagesLoaded: pagesLoaded,
    clickedTag: clickedTag,
    extractPages: extractPages,
    download: download,
    toggleSearchbar: toggleSearchbar,
    toggleSignatureModal: toggleSignatureModal,
    toggleFullScreenThumbnails: toggleFullScreenThumbnails,
    isReady: internalIsReady,
    setThumbnailZoom: setThumbnailZoom,
    selectedPages: selectedPages,
    annotations: annotations,
    notarySealIds: notarySealIds,
    hasSeal: hasSeal,
    authTokens: authTokens,
    signatureModalOpen: signatureModalOpen
  };
};
exports.useCreateIframeAndLoadViewer = useCreateIframeAndLoadViewer;