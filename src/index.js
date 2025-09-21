import { useEffect, useRef, useState } from 'react';

export const useCreateIframeAndLoadViewer = ({
  files,
  authInfo,
  fileName,
  licenseKey,
  customData,
  uuid,
  tools,
  locale,
  mode,
  container,
  iframeSrc,
  onFileFailed,
  defaultAnnotationEditorMode,
  initialAnnotations,
  notarySeal,
  initialSigners,
  modifiedUiElements
}) => {
  const [internalIsReady, setInternalIsReady] = useState(false);  // Add this state variable
  const [selectedPages, setSelectedPages] = useState([]);
  const done = useRef(false);
  const iframeLoadedSuccessfully = useRef(false); // Add this ref to keep track of iframe's load state
  const [pagesLoaded, setPagesLoaded] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [hasSeal, setHasSeal] = useState(false);
  const [authTokens, setAuthTokens] = useState(null);
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);

  const createIframe = () => {
    const iframe = document.createElement('iframe');

    iframe.src = iframeSrc || `/pdf-ui/index.html`;

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
    iframe.onload = function() {
      const targetOrigin = window.location.origin;
      const message = { files, fileName, tools, locale, licenseKey, mode, uuid, customData, initialAnnotations, notarySeal, initialSigners, modifiedUiElements, authInfo, defaultAnnotationEditorMode };
    
      // Set up a function to send the message
      const sendMessage = () => {
        // @ts-ignore
        iframe.contentWindow.postMessage(message, targetOrigin);
      };
    
      // Call the function immediately to send the first message
      sendMessage();
    
      // Set up an interval to send the message every 1000ms (1 second)
      const interval = setInterval(sendMessage, 200);
    
      // Set up an event listener to listen for a response from the iframe
      window.parent.addEventListener('message', function(event) {
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
        if (event.data.type === "annotation-modal-open-change") {
          setSignatureModalOpen(event.data.message);
        }
      });
    };

    container.current.appendChild(iframe);
  };

  const handleIframeLoaded = (event) => {
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
      let parsedTokens = authTokens ? JSON.parse(authTokens) : null;
      iframeWin?.postMessage({ authInfo: {
        token: parsedTokens?.token,
        refreshToken: parsedTokens?.refreshToken
      } }, '*');
      // I believe this is only for the chrome extension tabs learning from each other.
    }
  };

  useEffect(() => {
    window.parent.addEventListener('message', handleIframeLoaded);
    return () => window.parent.removeEventListener('message', handleIframeLoaded);
  }, []);

  const [clickedTag, setClickedTag] = useState(null);

  const handleTagClicked = (event) => {
    if (event.data.type === 'click-tag') {
      setClickedTag(event.data);
    }
  }
  useEffect(() => {
    window.parent.addEventListener('message', handleTagClicked);
    return () => window.parent.removeEventListener('message', handleTagClicked);
  }, []);

  const handleVisibilityChange = () => {
    if (!document.hidden && !iframeLoadedSuccessfully.current) {
      const iframe = document.getElementById('webviewer-1');
      if (iframe) {
        iframe.remove();
      }
      createIframe();
    }
  };

  useEffect(() => {
    if (!container?.current) {
      return;
    }
    if (done.current) {
      return;
    }
    done.current = true;
    createIframe();
  }, [container, files]);

  useEffect(() => {
    document.addEventListener('click', function() {
      // @ts-ignore
      var iframeWin = document.getElementById('webviewer-1').contentWindow;
      iframeWin.postMessage('clickedOutside', window.location.origin);
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const download = () => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin.postMessage({ type: 'download' }, window.location.origin);
  };

  const toggleFullScreenThumbnails = (enable) => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin.postMessage({ type: 'toggle-full-screen-thumbnails', enable }, window.location.origin);
  };

  const toggleSearchbar = (enable) => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin.postMessage({ type: 'toggle-searchbar', enable }, window.location.origin);
  };

  const requestBuffer = async (value) => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.data.type === 'request-buffer-completed') {
          resolve(event.data.message);  // Resolve the promise with the result
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
        else if (event.data.type === 'request-buffer-failed') {
          reject(new Error(event.data.message));  // Reject the promise with the error message
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
      };
  
      // Adding the event listener before sending the postMessage
      window.addEventListener('message', listener);
  
      // @ts-ignore
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    
      // Sending the extract-pages message to the iframe
      iframeWin.postMessage({ type: 'request-buffer', value }, window.location.origin);
    });
  };

  const finalizeDocument = async () => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
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
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
      iframeWin?.postMessage({ type: 'finalize-document' }, window.location.origin);
    });
  }

  const toggleSignatureModal = (enable) => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin.postMessage({ type: 'toggle-signature-modal', enable }, window.location.origin);
  };

  const setThumbnailZoom = (value) => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin.postMessage({ type: 'set-thumbnail-zoom', value }, window.location.origin);
  };

  const setAuthInfo = ({token, refreshToken}) => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin?.postMessage({ type: 'set-auth-info', authInfo: {
      token,
      refreshToken
    } }, window.location.origin);
  };

  const splitPages = async () => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.data.type === 'split-pages-completed' && event.data.success) {
          resolve(event.data.message);  // Resolve the promise with the result
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
        else if (event.data.type === 'split-pages-failed') {
          reject(new Error(event.data.message));  // Reject the promise with the error message
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
      };
  
      // Adding the event listener before sending the postMessage
      window.addEventListener('message', listener);
  
      // @ts-ignore
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    
      // Sending the extract-pages message to the iframe
      iframeWin.postMessage({ type: 'split-pages' }, window.location.origin);
    });
  }

  const mergeFiles = async (value) => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.data.type === 'merge-files-completed' && event.data.success) {
          resolve(event.data.message);  // Resolve the promise with the result
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
        else if (event.data.type === 'merge-files-failed') {
          reject(new Error(event.data.message));  // Reject the promise with the error message
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
      };
  
      // Adding the event listener before sending the postMessage
      window.addEventListener('message', listener);
  
      // @ts-ignore
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    
      // Sending the extract-pages message to the iframe
      iframeWin.postMessage({ type: 'merge-files', value }, window.location.origin);
    });
  };

  const removeChatHistory = async () => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.data.type === 'remove-chat-history-completed' && event.data.success) {
          resolve(event.data.message);  // Resolve the promise with the result
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
        else if (event.data.type === 'remove-chat-history-failed') {
          reject(new Error(event.data.message));  // Reject the promise with the error message
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
      };
  
      // Adding the event listener before sending the postMessage
      window.addEventListener('message', listener);
  
      // @ts-ignore
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    
      // Sending the extract-pages message to the iframe
      iframeWin.postMessage({ type: 'remove-chat-history' }, window.location.origin);
    });
  };

  const combineFiles = async (value) => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.data.type === 'combine-files-completed' && event.data.success) {
          resolve(event.data.message);  // Resolve the promise with the result
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
        else if (event.data.type === 'combine-files-failed') {
          reject(new Error(event.data.message));  // Reject the promise with the error message
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
      };
  
      // Adding the event listener before sending the postMessage
      window.addEventListener('message', listener);
  
      // @ts-ignore
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    
      // Sending the extract-pages message to the iframe
      iframeWin.postMessage({ type: 'combine-files', value }, window.location.origin);
    });
  };

  const extractPages = async (value) => {
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.data.type === 'extract-pages-completed' && event.data.success) {
          resolve(event.data.result);  // Resolve the promise with the result
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
        else if (event.data.type === 'extract-pages-failed') {
          reject(new Error(event.data.message));  // Reject the promise with the error message
          window.removeEventListener('message', listener);  // Remove the listener to clean up
        }
      };
  
      // Adding the event listener before sending the postMessage
      window.addEventListener('message', listener);
  
      // @ts-ignore
      var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    
      // Sending the extract-pages message to the iframe
      iframeWin.postMessage({ type: 'extract-pages', value }, window.location.origin);
    });
  };

  return {
    requestBuffer,
    finalizeDocument,
    removeChatHistory,
    setAuthInfo,
    splitPages,
    combineFiles, 
    mergeFiles,
    pagesLoaded,
    clickedTag,
    extractPages, download,
    toggleSearchbar,
    toggleSignatureModal,
    toggleFullScreenThumbnails,
    isReady: internalIsReady,
    setThumbnailZoom,
    selectedPages,
    annotations,
    hasSeal,
    authTokens,
    signatureModalOpen
  };
};
