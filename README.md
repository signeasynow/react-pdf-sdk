# React PDF Tools

View, edit, and Chat-with-your-PDF with AI.

Add View to your app for free. Learn pricing for all features [here](https://www.prodfox.com/upgrade)

![Visual of app](https://media.discordapp.net/attachments/1065627273618800732/1161792368152956938/Feature_rich_React_component_for_viewing_editing_and_more.png?ex=65399675&is=65272175&hm=3ccb739e31aa1b1604b9e566a9556d8431c5ed3944df3bdb065f83317aec768d&=&width=1884&height=942)

# Demo

https://react-pdf-demo-sigma.vercel.app/

[Demo source code](https://github.com/prodfox-pdf/react-pdf-demo)

# Quick start

1. Copy-paste the `pdf-ui` folder [here](https://github.com/prodfox-pdf/react-pdf-demo/tree/main/public/pdf-ui) into your own `public` folder.

2. Create a component
```
import { useRef } from 'react';
import { useCreateIframeAndLoadViewer } from "@prodfox/react-ui-plugin";

function App() {
  const containerRef = useRef(null);

  const { download } = useCreateIframeAndLoadViewer({
    container: containerRef,
    fileName: "my-file.pdf",
    uuid: "some-user",
    licenseKey: "sandbox",
    locale: "en",
    tools: {
      editing: [
       "extract",
       "remove",
        "move"
      ],
      thumbnails: [
        "zoom",
        "expand"
      ],
      general: [
        "thumbnails",
        "download",
        "search",
        "panel-toggle",
        "zoom"
      ],
    },
    files: [
      {
        url: "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
        name: "my-file1.pdf"
      },
      {
        url: "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
        name: "my-file2.pdf"
      }
    ],
  });


  return (
    <div>
      <button onClick={download}>Download</button>
      <div className="container" id="pdf" ref={containerRef}>
    </div>
    </div>
  );
}

export default App;
```

## Core

## Parameters

### file `String` `""` `Required`

The URL path to your file.

### container `Required`

The HTML element to attach the PDF viewer to.

### fileName `String` `file.pdf` `Optional`

The name of your file. Useful if you want to configure the file name of the downloaded file.

### tools `Object` `{}`

Control what tools are available in the UI. Available keys are `thumbnails`, `general`, `editing`, ...

```
useCreateIframeAndLoadViewer({
  tools: {
    thumbnails: ...,
    general: ...,
    editing: ...,
  },
  ...other parameters
});
```

#### general `Object` `[]`

| Field   | Description      |
| ------- | ---------------- |
| zoom | Enable zoom in/out of the document in view |
| search | Enable search functions |
| download | Enable downloading the document |
| thumbnails | Enable a thumbnails panel |


```
useCreateIframeAndLoadViewer({
  tools: {
    general: [
      "zoom",
      "search",
      "download",
      "thumbnails"
    ],
  },
  ...other parameters
});
```

#### thumbnails `Object` `[]`

| Field   | Description      |
| ------- | ---------------- |
| zoom | Enable a slider above thumbnails to increase/decrease the size of the thumbnails |
| expand | Enable the thumbnails bar to be expandable to the full screen |


```
useCreateIframeAndLoadViewer({
  tools: {
    thumbnails: [
      "zoom",
      "expand"
    ],
  },
  ...other parameters
});
```

#### editing `Object` `[]`

| Field   | Description      |
| ------- | ---------------- |
| remove | Enable the ability to remove pages |
| rotation | Enable the rotation of individual pages |


```
useCreateIframeAndLoadViewer({
  tools: {
    editing: [
      "remove",
      "rotation"
    ],
  },
  ...other parameters
});
```

#### locale `string` `en` `Optional`

Options:

`en` - English

`es` - Spanish

`ru` - Russian

#### onFileFailed `Function` `optional`

Callback when a file fails to upload

```
useCreateIframeAndLoadViewer({
  onFileFailed: (errorMessage) => {
    // handle the failure as you need
  }
});
```
