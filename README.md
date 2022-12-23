![GennyFlow](https://uploads-ssl.webflow.com/635d10016c0ae0f8c2546b8f/635d1e766c5db6e08eda2ee3_github.png)

# GennyFlow:

GennyFlow is a web-based image generator.

It was designed to be used with the Webflow CMS to allow for rapid and dynamic image creation, but can be used outside of Webflow too.

This version only supports once instance of GennyFlow per page (note that an instance can capture many images, but the actual javascript

### Requirements

- jquery

### Built using

- HTML2Canvas
- jszip
- filesaver.js
- inline-svg

These are included in gennyflow.js, but not in gennyflow-solo.js

### Required elements

GennyFlow divs are controlled using custom attributes, which you'll be familiar with if you've used Finsweet Attributes.
![enter image description here](https://uploads-ssl.webflow.com/60c4c4c98684b37e4da3dde8/63a5e6156b52568c667f2a35_visual-simple.png)

- **Wrapper
  `gennyflow="wrapper"`**
  Parent div in which all captured divs live.
- **Capture Div
  `gennyflow="capture"`**
  Div(s) you want turned into an image. Must be inside of `wrapper`.
- **Slug
  `gennyflow="slug"`**
  Text element nested inside of each `capture`. Each must be unique. Can be hidden with CSS.
- **Trigger
  `gennyflow="trigger"`**
  Button to activate GennyFlow. Can be put on any element anywhere on the page.

### Other Notes

To avoid CORS issues:

- Host all images used in the Webflow asset manager
- Host GennyFlow in the Webflow asset manager
- Webflow doesn't support JS files, so upload the .TXT file in the /src folder.
  You can read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## Settings

### Code-Set Settings

Set these when you initialize GennyFlow. Many (but not all) of these can be set by the user via User-Set Settings.

**Image Settings**
| |Label|Values|Description|
|---|---|---|---|
|File Format|`fileFormat`|`'jpg' or 'png'`|Default `'png'`
|JPG Quality |`jpgQuality`|`0.0` to `1.0`|Default `1.0.` Only works for jpg.
|Scale|`scale`|`'2'`|Default `'1'`
|Zip Folder Name|`zipName` |`'zip_name_here'` | Default `'images'`

**Label Settings**

By default, zip labels are `images_MMDDYY_@1x.zip` and image labels are `slug_MMDDYY_@1x.png`
| |Label|Values| Description |
|---|---|---|---|
|Include Date in Zip Label|`labelZipDate`|`true` or `false`| Default `true`. Format `_MMDDYY`.
|Include Scale in Zip Label|`labelZipScale`|`true` or `false`| Default `true`. Format `_@1x`.
|Include Date in Image Label|`labelImgDate`|`true` or `false`| Default `true`. Format `_MMDDYY`
|Include Scale in Image Label|`labelImgScale`|`true` or `false`| Default `true`. Format `_@1x`.

### User-Set Settings

You can create inputs on your page to allow the user to change capture settings. The below settings allow you to change the target ID to fetch these user input values.

|                                | Label               | Values             | Description                                                      |
| ------------------------------ | ------------------- | ------------------ | ---------------------------------------------------------------- |
| File Format via User Input     | `fileFormatInputID` | `'custom_id_here'` | Gets file format from HTML input. Default is `'gf_file-format'`  |
| JPG Quality via User Input     | `jpgQualityInputID` | `'custom_id_here'` | Gets JPG quality from HTML input. Default is `'gf_jpg-quality'`. |
| Scale via User Input           | `scaleInputID`      | `'custom_id_here'` | Gets JPG quality from HTML input. Default is `'gf_scale'`.       |
| Zip Folder Name via User Input | `zipNameInputID`    | `'custom_id_here'` | Gets JPG quality from HTML input. Default is `'gf_zip-name'`.    |

### Debug Settings

If you run into issues with SVGs, tainted canvases, or CORS, these tools can be helpful.

|             | Label             | Values            | Description                                                                                                                                                       |
| ----------- | ----------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Debug SVG   | `debugSVG`        | `true` or `false` | Default `true`. Inlines svgs called in `<img>` tags and sets manually sets their height and width. Without this, they render incorrectly at scales larger than 1. |
| Allow Taint | `debugAllowTaint` | `true` or `false` | Default `true`. Changes HTML2Canvas AllowTaint setting.                                                                                                           |
| Use CORS    | `debugUseCORS`    | `true` or `false` | Default `true`. Changes HTML2Canvas UseCORS setting.                                                                                                              |

### Example, Webflow setup

#### Upload/Include Script

Upload the .txt file in /src to Webflow. Use the URL of this uploaded file below:

#### Add to page head

```
<script src="webflow url here"></script>
```

#### Add before body close

This is where you add all the settings to customize. Alternatively, you can set it via user input by creating a form and using the IDs above for the fields.

```
<script>
document.getElementById("gf_trigger").onclick = () => gennyFlow({
scale: 2,
labelImgDate: false,
labelImgScale: false,
// Additional settings go here
});
</script>
```

#### Container

Make a div that contains all the items you want to capture. Set the ID to `gf_wrapper`.

#### Item Wrapper

Each item you want to capture should be inside a div with the class `gf_capture`.
You can have as few or as many as you want.

#### Slug

Each capture item MUST have a unique slug. This is what labels the file. Create a text block with the class `gf_slug`.
This MUST be inside of the gf_capture element.
This element can be hidden.

#### Capture Trigger

In order to trigger gennyFlow, you must add a trigger.

You can use any element, like a button or link block. Then you give it an ID of `gf_trigger`.

### Example, HTML

```

<html>

<head>

<script src="jquery.min.js"></script>

<script src="gennyflow-v1.8.0.js"></script>

</head>

<body>

<button id="gf_trigger" type="button">Download</button>



<div id="gf_wrapper">

<div class="gf_capture">

<span class=" gf_slug">slug-1</span>

Capture Content Here

</div>

</div>

<script>

document.getElementById("gf_trigger").onclick = () => gennyFlow({

fileFormat: 'jpg',

jpgQuality: 0.9,

scale: 2,

labelImgDate: false,

labelImgScale: false,

});

</script>

</body>

</html>

```
