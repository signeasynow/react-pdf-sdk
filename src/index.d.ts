import * as React from 'react';

declare module 'pdf_editor_aleon35_react_plugin' {
  export const useCreateIframeAndLoadViewer: (
    props: {
      files: {name: string, url: string}[];
      uuid?: string;
      licenseKey: string;
      tools: {
        thumbnails?: ("zoom" | "expand")[];
        general?: ("zoom" | "search" | "download" | "thumbnails" | "panel-toggle")[];
        editing?: ("remove" | "rotation" | "extract" | "move")[];
      };
      container: React.MutableRefObject<HTMLElement | null> | (HTMLElement | null);
      locale?: "en" | "es" | "ru",
      mode?: "split" | "regular",
      fileName?: string;
      onFileFailed?: (message: string) => void;
    }
  ) => {
    combineFiles: () => void;
    pagesLoaded: string;
    download: () => void;
    isReady: boolean;
    toggleFullScreenThumbnails: (newValue?: boolean) => void;
    setThumbnailZoom: (value: boolean) => void;
    toggleSearchbar: (value: boolean) => void;
    removeChatHistory: () => void;
    splitPages: () => void;
    extractPages: () => void;
    selectedPages: number[];
    onDocumentUpdated: (listener: (pdfData: Uint8Array) => void) => () => void;
  };
}
