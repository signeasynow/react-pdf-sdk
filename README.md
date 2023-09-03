# hello

## Core

## Parameters

### file `String` `""` `Required`

The URL path to your file.

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

#### locale `string` `en`

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
