![GennyFlow](https://uploads-ssl.webflow.com/60c4c4c98684b37e4da3dde8/63a5ed906f28b58ba94bcafe_github.jpg)

# GennyFlow:

GennyFlow is a web-based image generator. It uses designs you make in Webflow to create PNG and JPG images. If there are more than one images to capture, it will zip them up for you.

It was designed to be used with the Webflow CMS to allow for rapid and dynamic image creation, but it can be used without the CMS, or in any web environment!

### Requirements

- jquery

### Built using

- HTML2Canvas
- jszip
- filesaver.js
- inline-svg

These are included in `gennyflow.js`, but not in `gennyflow-solo.js`

### Limitations

- This version only supports once instance of GennyFlow per page (note that an instance can capture many images, but the actual settings set when you initialize GennyFlow can only be set once per page).
- HTML2Canvas doesn't support some CSS properties. See full list [here.](https://html2canvas.hertzen.com/features/)
- GennyFlow must be hosted in your Webflow asset manager, and all images in your designs need to be hosted through the asset manager as well.

### Required elements

GennyFlow divs are controlled using custom attributes, which you'll be familiar with if you've used Finsweet Attributes.

![Diagram showing three "capture" elements, each nested inside "wrapper", and each with a unique "slug" inside](https://uploads-ssl.webflow.com/60c4c4c98684b37e4da3dde8/63a5e6156b52568c667f2a35_visual-simple.png)

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

You can set these when you initialize GennyFlow. Some can be set by the user via an on-page form. Simply put the custom attribute on an form input. I recommend using select or radio for things that should be specific (i.e. scale).

|                 | Label        | Values            | Description                        | User-settable            |
| --------------- | ------------ | ----------------- | ---------------------------------- | ------------------------ |
| File Format     | `fileFormat` | `'jpg' or 'png'`  | Default `'png'`                    | `gennyflow="fileformat"` |
| JPG Quality     | `jpgQuality` | `0.0` to `1.0`    | Default `1.0.` Only works for jpg. | `gennyflow="jpgquality"` |
| Scale           | `scale`      | `'2'`             | Default `'1'`                      | `gennyflow="scale"`      |
| Zip Folder Name | `zipName`    | `'zip_name_here'` | Default `'images'`                 | `gennyflow="zipname"`    |

**Label Settings**
By default, zip labels are `images_MMDDYY_@1x.zip` and image labels are `slug_MMDDYY_@1x.png`
| |Label|Values| Description | User-settable
|---|---|---|---|---|
|Include Date in Zip Label|`labelZipDate`|`true` or `false`| Default `true`.|No
|Include Scale in Zip Label|`labelZipScale`|`true` or `false`| Default `true`.|No
|Include Date in Image Label|`labelImgDate`|`true` or `false`| Default `true`.|No
|Include Scale in Image Label|`labelImgScale`|`true` or `false`| Default `true`.|No

### Debug Settings

If you run into issues with SVGs, tainted canvases, or CORS, these tools can be helpful.
| |Label |Values|Description|User-settable
|---|---|---|---|---|
|SVG Fix |`enableSVGfix`|`true` or `false`| Default `true`. Inlines svgs loaded through `<img>`, and sets explicit height/width. | No
|Allow Canvas Taint |`enableAllowTaint`|`true` or `false`| Default `true`. Changes HTML2Canvas AllowTaint setting.| No
|Use CORS |`enableUseCORS`|`true` or `false`| Default `true`. Changes HTML2Canvas UseCORS setting.| No
|Verbose Console |`enableVerbose`|`true` or `false`| Default `false`. | No

### Example, Webflow setup

#### Upload/Include Script

Upload the .txt file in /src to the Webflow asset manager. Use the URL of this uploaded file below.

#### Add to page head

```
<script src="Your GennyFlow.txt URL"></script>
```

#### Add before body close

This is where you add all the settings to customize.

```
<script>
    $('[gennyflow=trigger]').click(() => gennyFlow({
        scale: 2,
        fileFormat: 'jpg',
        jpgQuality: 0.9,
        zipName: 'example-zip',
    }));
</script>
```

#### Create Your Elements

See "Required Elements" above. Create the elements and apply the custom attributes.

#### That's it!

Not much to it.

### Example, HTML

GennyFlow also works outside of Webflow! Here is how it would look on a simple page.

```
<html>
	<head>
	    <script src="jquery.min.js"></script>
	    <script src="gennyflow-v2.0.0.js"></script>
	</head>

	<body>
	    <button gennyflow="trigger" type="button">Download</button>
	    <div gennyflow="wrapper">
	        <div gennyflow="capture">
	            <span gennyflow="slug">slug-1</span>
	            Capture Content Here
	        </div>
	    </div>

	<script>
	    $('[gennyflow=trigger]').click(() => gennyFlow());
	</script>
	</body>
</html>
```
