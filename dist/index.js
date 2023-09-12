"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateIframeAndLoadViewer = void 0;
var _react = require("react");
var useCreateIframeAndLoadViewer = function useCreateIframeAndLoadViewer(_ref) {
  var file = _ref.file,
    fileName = _ref.fileName,
    licenseKey = _ref.licenseKey,
    tools = _ref.tools,
    locale = _ref.locale,
    container = _ref.container,
    iframeSrc = _ref.iframeSrc,
    onFileFailed = _ref.onFileFailed;
  var done = (0, _react.useRef)(false);
  var iframeLoadedSuccessfully = (0, _react.useRef)(false); // Add this ref to keep track of iframe's load state

  var createIframe = function createIframe() {
    var iframe = document.createElement('iframe');
    iframe.src = iframeSrc || "/dist/index.html";
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
        file: file,
        fileName: fileName,
        tools: tools,
        locale: locale,
        licenseKey: licenseKey
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
      });
    };
    container.current.appendChild(iframe);
  };
  var handleIframeLoaded = function handleIframeLoaded(event) {
    if (event.data.type === 'iframe-loaded' && event.data.success) {
      iframeLoadedSuccessfully.current = true;
    }
  };
  (0, _react.useEffect)(function () {
    window.parent.addEventListener('message', handleIframeLoaded);
    return function () {
      return window.parent.removeEventListener('message', handleIframeLoaded);
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
  }, [container, file]);
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
  return {
    download: download
  };
};
exports.useCreateIframeAndLoadViewer = useCreateIframeAndLoadViewer;