import * as React from 'react';

declare module 'pdf_editor_aleon35_react_plugin' {
  export const useCreateIframeAndLoadViewer: (
    props: {
      file: string;
      licenseKey: string;
      tools: {
        thumbnails?: ("zoom" | "expand")[];
        general?: ("zoom" | "search" | "download" | "thumbnails")[];
        editing?: ("remove" | "rotation")[];
      };
      container: React.MutableRefObject<HTMLElement | null> | (HTMLElement | null);
      locale?: "en" | "es" | "ru",
      fileName?: string;
      onFileFailed?: (message: string) => void;
    }
  ) => {
    download: () => void;
  };
}
