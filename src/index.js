import { useEffect, useRef } from 'react';
import 'pdfjs-dist/web/pdf_viewer.css';

export const useCreateIframeAndLoadViewer = ({
  file,
  fileName,
  tools,
  container,
}) => {
  const done = useRef(false);

  const createIframe = () => {
    const iframe = document.createElement('iframe');

    iframe.src = `/dist/index.html`;

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
      // @ts-ignore
      iframe.contentWindow.postMessage({ file, fileName, tools }, '*');
    };

    container.current.appendChild(iframe);
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
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
      iframeWin.postMessage('clickedOutside', '*');
    });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const download = () => {
    // @ts-ignore
    var iframeWin = document?.getElementById('webviewer-1')?.contentWindow;
    iframeWin.postMessage({ type: 'download' }, '*');
  };

  return { download };
};