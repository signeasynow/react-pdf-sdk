import { useEffect, useRef } from 'react';
// DONT USE: import 'pdfjs-dist/web/pdf_viewer.css';

export const useCreateIframeAndLoadViewer = ({
  file,
  fileName,
  tools,
  locale,
  container,
  iframeSrc,
  onFileFailed
}) => {
  const done = useRef(false);
  const iframeLoadedSuccessfully = useRef(false); // Add this ref to keep track of iframe's load state

  const createIframe = () => {
    const iframe = document.createElement('iframe');

    iframe.src = iframeSrc || `/dist/index.html`;

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
      const message = { file, fileName, tools, locale };
    
      // Set up a function to send the message
      const sendMessage = () => {
        console.log("sending a mesg")
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
      });
    };

    container.current.appendChild(iframe);
  };

  const handleIframeLoaded = (event) => {
    if (event.data.type === 'iframe-loaded' && event.data.success) {
      console.log("received change!!", event.data)
      iframeLoadedSuccessfully.current = true;
    }
  };

  useEffect(() => {
    window.parent.addEventListener('message', handleIframeLoaded);
    return () => window.parent.removeEventListener('message', handleIframeLoaded);
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
  }, [container, file]);

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

  return { download };
};