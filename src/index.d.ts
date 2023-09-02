declare module 'pdf_editor_aleon35_react_plugin' {
  export const useCreateIframeAndLoadViewer: (
    props: {
      file: string;
      fileName: string;
      tools: {
        thumbnails?: ("zoom" | "expand")[];
        general?: ("zoom" | "search" | "download" | "thumbnails")[];
        editing?: ("remove" | "rotation")[];
      };
      container: any; // Replace 'any' with the correct type if known
    }
  ) => {
    download: () => void;
  };
}
