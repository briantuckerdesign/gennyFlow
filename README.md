
![GennyFlow](https://uploads-ssl.webflow.com/60c4c4c98684b37e4da3dde8/63a5ed906f28b58ba94bcafe_github.jpg)
# GennyFlow [6.0.2]:

GennyFlow is a client-side javascript tool that downloads HTML elements as images.

While this was made to be used with Webflow and its CMS, it is compatible with any js-enabled web environment.
  
You can see a live example at [gennyFlow.com](http://www.gennyflow.com).

### Required elements
`gennyFlow` elements are controlled using custom attributes, which you'll be familiar with if you've used Finsweet Attributes.

- **Wrapper element** 
	- `gf="wrapper"`
	- Contains all elements that need to be captured and downloaded
- **Capture element(s)**
	- `gf="capture"`
	- An element to be captured and downloaded
	- Must be nested inside of the wrapper element.
- **Slug element**
	- `gf="slug"`
	- Sets file name for (1) capture element
	- Must be nested inside capture element
	- Does not need to have CSS visibility
	- Should not include file extension
- **Trigger element**
	- `gf="trigger"`
	- When this element is clicked, it runs `gennyFlow`, downloading all capture elements.

## Settings

You can set these when you initialize GennyFlow.
You can allow users to set these by putting the user-settable attribute on any type of form input. Be sure the values match what's below (so I recommend things like selects, radio, or checkboxes for items that need to be specific, i.e. format).

You can set these options in several places, here is the order of precedence:

**Order of precedence**

1. **Setting declared on gf="capture" element**
		Example: An element has both "gf=capture" and "gf-scale=2"
		The item would export with a scale of 2 no matter what higher-level settings were set.
2. **Setting declared by html user input**
		Example: An html input with attribute "gf=scale-input"
		`<input gf="scale-input" value="2">`
3. **Value from the gf="wrapper" element**
		Example: The wrapper element with gf="wrapper" also has "gf-scale=2"
		This scale is applied to all captures inside of the wrapper unless overruled by 1 or 2.
4. **Default setting from defaultSettings in settings.js**


|                         | Attribute (and defaults)       | Accepted values               | User inputs            |
| ----------------------- | ------------------------------ | -------------------- | --------------------- |
| File Format             | `gf-format="png"`              | `'jpg' 'png' 'webp'` | `gf="format-input"`   |
| Quality (jpg/webp)      | `gf-quality="1"`               | `0.0` to `1.0`       | `gf="quality-input"`  |
| Scale                   | `gf-scale="1"`                 | `any number`                | `gf="scale-input"`    |
| Zip Folder Name         | `gf-zip-name="images"`         | `'any string'`    | `gf="zip-name-input"` |
| Include Date, Zip Name  | `gf-include-date-zip="false"`  | `true` `false`   |                       |
| Include Scale, Zip Name | `gf-include-scale-zip="false"` | `true` `false`   |                       |
| Include Date, Img Name  | `gf-include-date-img="false"`  | `true` `false`   |                       |
| Include Scale, Img Name | `gf-include-scale-img="false"` | `true` `false`   |                       |
| Disable SVG Fix         | `gf-disable-svg-fix="true"`    | `true` `false`   |                       |
| Don't capture element          | `gf="ignore"`                  | `"ignore"`           |                       |

### Example, Webflow setup

#### Upload/include script

Upload the `gennyFlow-(version number).txt` file in `/dist` folder to the `Webflow asset manager`. 

#### Add before body close of page

`<script src="Your GennyFlow.txt asset manager URL"></script>`

#### Create Your Elements

See `required elements` above. Create the elements and apply the custom attributes.

#### That's it!

### Example, HTML

`gennyFlow` also works outside of Webflow! Here is how it would look on a simple page.
```
<button type="button" gf="trigger">Download images</button> 

<div gf="wrapper"> 

    <div gf="capture">
        <div gf="slug">Example image 1</div>
    </div>
    <div gf="capture">
        <div gf="slug">Example image 2</div>
    </div>
    
</div>

<script src="gennyflow-version-here.js"></script>
```

### Built using

-  [`html-to-img`](https://github.com/bubkoo/html-to-image)
-  [`jszip`](https://github.com/Stuk/jszip)
-  [`downloadjs`](https://github.com/rndme/download)


### Limitations

-   This version only supports one instance of `gennyFlow` per page.
-   `HTML2Canvas` doesn't support some CSS properties. See full list [here.](https://html2canvas.hertzen.com/features/)
-   `gennyFlow` must be hosted in your `Webflow asset manager`, and all images in your designs need to be hosted through there as well (unless you're using a CORS proxy, see below).
-   `HTML2Canvas` has issues with some SVG files. You may need to use rasterized images, or utilize something like [inline-svg](https://github.com/jonnyhaynes/inline-svg).
-   `HTML2Canvas` does not like exporting scaled up css `background-image`'s. If you're exporting at a scale higher than 1, consider using an image element with absolute positioning instead.

### CORS
All image files that are inside your capture elements must be hosted from the same origin as your `gennyFlow.js` file due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

To avoid CORS issues, you can
- Host all images AND host `gennyFlow` `.txt ` in the Webflow asset manager
- Use a CORS proxy 