# hello

## Core

## Parameters

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
    thumbnails: [
      "zoom",
      "expand"
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
