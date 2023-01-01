![GennyFlow](https://uploads-ssl.webflow.com/60c4c4c98684b37e4da3dde8/63a5ed906f28b58ba94bcafe_github.jpg)

# GennyFlow [beta v3.0.0]:

GennyFlow is a web-based image generator. It uses designs you make in Webflow to create PNG and JPG images. If there is more than one image to capture, it will zip them up for you.

It was designed to be used with the Webflow CMS to allow for rapid and dynamic image creation, but it can be used without the CMS, or in any web environment!

You can see a live example at [GennyFlow.com](https://www.gennyflow.com).

### Required elements

GennyFlow divs are controlled using custom attributes, which you'll be familiar with if you've used Finsweet Attributes.

-   **Wrapper
    `gf="wrapper"`**
    Parent div in which all captured divs live.
-   **Capture Div
    `gf="capture"`**
    Div(s) you want turned into an image. Must be inside of `wrapper`.
-   **Slug
    `gf="slug"`**
    Text element nested inside of each `capture`. Each must be unique. Can be hidden with CSS.
-   **Trigger
    `gf="trigger"`**
    Button to activate GennyFlow. Can be put on any element anywhere on the page.

## Settings

You can set these when you initialize GennyFlow.
You can allow users to set these by putting the user-settable attribute on any type of form input. Be sure the values match what's below (so I recommend things like selects, radio, or checkboxes for items that need to be specific, i.e. format).

You can set these options in several places, here is the order of prescedence:

1. Value from a **gf="capture"** element
2. User input e.g. gf="scale-input" used on an html input
3. Value from the **gf="wrapper"** element
4. Default values (below)

So in essense, you can set the options for all items by adding these attributes to the same element that has "gf="wrapper".

|                         | Attribute (and defaults)       | Values               | For inputs            |
| ----------------------- | ------------------------------ | -------------------- | --------------------- |
| File Format             | `gf-format="png"`              | `'jpg' 'png' 'webp'` | `gf="format-input"`   |
| Quality (jpg/webp)      | `gf-quality="1"`               | `0.0` to `1.0`       | `gf="quality-input"`  |
| Scale                   | `gf-scale="1"`                 | `'2'`                | `gf="scale-input"`    |
| Zip Folder Name         | `gf-zip-name="images"`         | `'any name here'`    | `gf="zip-name-input"` |
| Include Date, Zip Name  | `gf-include-date-zip="false"`  | `'true'` `'false'`   |                       |
| Include Scale, Zip Name | `gf-include-scale-zip="false"` | `'true'` `'false'`   |                       |
| Include Date, Img Name  | `gf-include-date-img="false"`  | `'true'` `'false'`   |                       |
| Include Scale, Img Name | `gf-include-scale-img="false"` | `'true'` `'false'`   |                       |
| Disable SVG Fix         | `gf-disable-svg-fix="true"`    | `'true'` `'false'`   |                       |
| Ignore element          | `gf="ignore"`                  | `"ignore"`           |                       |

### Example, Webflow setup

#### Upload/Include Script

Upload the .txt file in /src to the Webflow asset manager. Use the URL of this uploaded file below.

#### Add before body close

```
<script src="Your GennyFlow.txt URL"></script>
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
    <script src="../src/dependencies/jquery.min.js"></script>
</head>

<body>
    <div gf="trigger">Generate</div>
        <div gf="wrapper">
            <div gf="capture">
                <div gf="slug">Example image 1</div>
            </div>
            <div gf="capture">
                <div gf="slug">Example image 2</div>
            </div>
        </div>
    </div>
    <script src="gennyflow-v3.0.0.js"></script>
</body>

</html>
```

### Requirements

-   jquery

### Built using

-   HTML2Canvas
-   jszip
-   filesaver.js
-   inline-svg

These are included in `gennyflow.js`, but not in `gennyflow-solo.js`

### Limitations

-   This version only supports once instance of GennyFlow per page (note that an instance can capture many images, but the actual settings set when you initialize GennyFlow can only be set once per page).
-   HTML2Canvas doesn't support some CSS properties. See full list [here.](https://html2canvas.hertzen.com/features/)
-   GennyFlow must be hosted in your Webflow asset manager, and all images in your designs need to be hosted through the asset manager as well.

### Other Notes

To avoid CORS issues:

-   Host all images used in the Webflow asset manager
-   Host GennyFlow in the Webflow asset manager
-   Webflow doesn't support JS files, so upload the .TXT file in the /src folder.
    You can read more about CORS [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
