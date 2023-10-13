# React PDF Tools

View, edit, and Chat-with-your-PDF with AI.

Add View to your app for free. Learn pricing for all features [here](https://www.prodfox.com/upgrade)

![Visual of app](https://media.discordapp.net/attachments/1065627273618800732/1161792368152956938/Feature_rich_React_component_for_viewing_editing_and_more.png?ex=65399675&is=65272175&hm=3ccb739e31aa1b1604b9e566a9556d8431c5ed3944df3bdb065f83317aec768d&=&width=1884&height=942)

# Demo

https://react-pdf-demo-sigma.vercel.app/

Want to see the source code for the above demo? Find it [here](https://github.com/prodfox-pdf/react-pdf-demo).

# Quick start

1. Copy-paste the `pdf-ui` folder [here](https://github.com/prodfox-pdf/react-pdf-demo/tree/main/public/pdf-ui) into your own `public` folder.

2. Create a component
```
import { useRef } from 'react';
import { useCreateIframeAndLoadViewer } from "@prodfox/react-pdf-editor";

function App() {
  const containerRef = useRef(null);

  const { download } = useCreateIframeAndLoadViewer({
    container: containerRef,
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

### container `Required`

The HTML element to attach the PDF viewer to.

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
| panel-toggle | Enable the left-side panel to be togglable |


```
useCreateIframeAndLoadViewer({
  tools: {
    general: [
      "zoom",
      "search",
      "download",
      "thumbnails",
      "panel-toggle"
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
| extraction | Enabling extracting out a set of pages into one document |
| move | Re-arrange pages in a document |

```
useCreateIframeAndLoadViewer({
  tools: {
    editing: [
      "remove",
      "rotation",
      "extraction",
      "move"
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

(Reach out if you need a particular language added)

#### onFileFailed `Function` `optional`

Callback when a file fails to upload

```
useCreateIframeAndLoadViewer({
  onFileFailed: (errorMessage) => {
    // handle the failure as you need
  }
});
```

#### mode `string` `optional`

Defaults to `regular`. Set it to `split` to enable being able to select split markers to be then used for splitting a document into several documents.

# Functions

Combine several files into one

```
const { combineFiles } = useCreateIframeAndLoadViewer({
  ...
});

combineFiles();

```

Listen for when the pages are loaded for the active document

```
const { pagesLoaded } = useCreateIframeAndLoadViewer({
  ...
});

if (pagesLoaded) {
  // logic here
}
```

Download

```
const { download } = useCreateIframeAndLoadViewer({
  ...
});

download();
```

Listen for when the PDF editor is ready to accept commands

```
const { isReady } = useCreateIframeAndLoadViewer({
  ...
});

if (isReady) {
  // logic here
}
```

Toggle displaying the full screen thumbnail view

```
const { toggleFullScreenThumbnails } = useCreateIframeAndLoadViewer({
  ...
});

toggleFullScreenThumbnails(true) // set this to true or false to open/close it.
```

Control the thumbnail zoom level. Ranges from 0 to 1.

```
const { setThumbnailZoom } = useCreateIframeAndLoadViewer({
  ...
});

setThumbnailZoom(0.5)
```

Toggle displaying the search bar on the right

```
const { toggleSearchbar } = useCreateIframeAndLoadViewer({
  ...
});

toggleSearchbar(true) // set this to true or false to open/close it.
```

Delete the AI conversation chat history

```
const { removeChatHistory } = useCreateIframeAndLoadViewer({
  ...
});

removeChatHistory()
```

Get the 0-indexed array of selected pages

```
const { selectedPages } = useCreateIframeAndLoadViewer({
  ...
});
```

Extract the selected pages

```
const { extractPages } = useCreateIframeAndLoadViewer({
  ...
});

extractPages()
```

Split the document into several documents based on the split markers the user selected.

```
const { splitPages } = useCreateIframeAndLoadViewer({
  ...
});

splitPages()
```
