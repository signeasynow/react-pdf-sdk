declare module 'pdf_editor_aleon35_react_plugin' {
  export const useCreateIframeAndLoadViewer: (
    props: {
      file: string;
      fileName: string;
      tools: any;
      container: any;
    }
  ) => {
    download: () => void;
  };
}