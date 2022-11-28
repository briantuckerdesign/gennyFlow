![GennyFlow](https://uploads-ssl.webflow.com/635d10016c0ae0f8c2546b8f/635d1e766c5db6e08eda2ee3_github.png)

# GennyFlow:
GennyFlow is a web-based image generator.

It was designed to be used with the Webflow CMS to allow for rapid and dynamic image creation, but can be used outside of Webflow too.

v1.8.0 currently only supports one instance per page, but multi per page is on the horizon.

### Requirements
 - jquery

### Built using
 - HTML2Canvas
 - jszip
 - filesaver.js
 - inline-svg
 
These are included in gennyflow.js, but not in gennyflow-solo.js

### Required elements
All GennyFlow elements start with "gf_"
 - #gf_wrapper
	 - Parent element in which all captured elements live
 - .gf_capture
	 - Element(s) you want turned into an image
	 - Must be nested inside of #gg_wrapper
 - .gf_slug
	 - Labels the exported image
	 - MUST be unique from all other slugs
	 - CAN be a hidden element
	 - MUST be nested inside of .gf_capture

### Other Notes
To avoid CORS issues:
 - Host all images used in the Webflow asset manager
 - Host the requirements in the Webflow asset manager
	 - You can do this by renaming your js file to a .txt file.
	 - See example below

## Settings
All of these settings can be defined by their default values, code-set values, or user-set values. User-set values override code-set values, and code-set values override default values. 

### Code-Set Settings
Set these when you initialize GennyFlow. Many (but not all) of these can be set by the user via User-Set Settings.

**Image Settings**
|   |Label|Values|Description| 
|---|---|---|---|
|File Format|`fileFormat`|`'jpg' or 'png'`|Default `'png'`
|JPG Quality |`jpgQuality`|`0.0` to `1.0`|Default `1.0.` Only works for jpg.
|Scale|`scale`|`'jpg' or 'png'`|Default `'png'`
|Zip Folder Name|`zipName`        |`'zip_name_here'`          | Default `'images'`

**Label Settings** 
By default, zip labels are `images_MMDDYY_@1x.zip` and image labels are `slug_MMDDYY_@1x.png`
|   |Label|Values| Description | 
|---|---|---|---|
|Include Date in Zip Label|`labelZipDate`|`true` or `false`| Default `true`. Format `_MMDDYY`.
|Include Scale in Zip Label|`labelZipScale`|`true` or `false`| Default `true`. Format `_@1x`.
|Include Date in Image Label|`labelImgDate`|`true` or `false`| Default `true`. Format `_MMDDYY`.
|Include Scale in Image Label|`labelImgScale`|`true` or `false`| Default `true`. Format `_@1x`.


### User-Set Settings
You can create inputs on your page to allow the user to change capture settings. The below settings allow you to change the target ID to fetch these user input values. 
|   |Label |Values|Description| 
|---|---|---|---|
|File Format via User Input	|`fileFormatInputID`|`'custom_id_here'`| Gets file format from HTML input. Default is `'gf_file-format'`
|JPG Quality via User Input	|`jpgQualityInputID`|`'custom_id_here'`|Gets JPG quality from HTML input. Default is `'gf_jpg-quality'`. 
|Scale via User Input|`scaleInputID`|`'custom_id_here'`|Gets JPG quality from HTML input. Default is `'gf_scale'`. 
|Zip Folder Name via User Input	|`zipNameInputID`|`'custom_id_here'`|Gets JPG quality from HTML input. Default is `'gf_zip-name'`. 

### Debug Settings
If you run into issues with SVGs, tainted canvases, or CORS, these tools can be helpful.
|   |Label |Values|Description| 
|---|---|---|---|
|Debug SVG	|`debugSVG`|`true` or `false`| Default `true`. Inlines svgs called in `<img>` tags and sets manually sets their height and width. Without this, they render incorrectly at scales larger than 1. 
|Allow Taint	|`debugAllowTaint`|`true` or `false`| Default `true`. Changes HTML2Canvas AllowTaint setting.
|Use CORS	|`debugUseCORS`|`true` or `false`| Default `true`. Changes HTML2Canvas UseCORS setting.

### Example 
```<html>
<head>
    <script src="dependencies/jquery.min.js"></script>
    <script src="gennyflow.js"></script>
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
</html>```
