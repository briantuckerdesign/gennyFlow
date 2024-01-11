![GennyFlow](https://uploads-ssl.webflow.com/60c4c4c98684b37e4da3dde8/63a5ed906f28b58ba94bcafe_github.jpg)

# gennyFlow [v6.0.3]

gennyFlow is a client-side javascript tool that downloads HTML elements as images.

Practically speaking, when used with Webflow, you can create powerful automated image generation tools using your Webflow data, and no code, just attributes!

While this was made to be used with Webflow and its CMS, it is compatible with any js-enabled web environment.

You can see a live example at [gennyFlow.byBrian.io](http://gennyflow.bybrian.io).

```

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[gf=trigger]")?.addEventListener("click", () => {
    const options = { /* your options here */ };
    gennyFlow(options);
  });
});

```

Below this is

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

|                         | Attribute (and defaults)       | Accepted values      | User inputs           |
| ----------------------- | ------------------------------ | -------------------- | --------------------- |
| File Format             | `gf-format="png"`              | `'jpg' 'png' 'webp'` | `gf="format-input"`   |
| Quality (jpg/webp)      | `gf-quality="1"`               | `0.0` to `1.0`       | `gf="quality-input"`  |
| Scale                   | `gf-scale="1"`                 | `any number`         | `gf="scale-input"`    |
| Zip Folder Name         | `gf-zip-name="images"`         | `'any string'`       | `gf="zip-name-input"` |
| Include Date, Zip Name  | `gf-include-date-zip="false"`  | `true` `false`       |                       |
| Include Scale, Zip Name | `gf-include-scale-zip="false"` | `true` `false`       |                       |
| Include Date, Img Name  | `gf-include-date-img="false"`  | `true` `false`       |                       |
| Include Scale, Img Name | `gf-include-scale-img="false"` | `true` `false`       |                       |
| Disable SVG Fix         | `gf-disable-svg-fix="true"`    | `true` `false`       |                       |
| Don't capture element   | `gf="ignore"`                  | `"ignore"`           |                       |

### Example, Webflow setup

Coming soon

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

<script src="gennyflow.js"></script>
<script>
// gennyFlow by Brian Tucker
// {@link https://www.gennyflow.com}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[gf=trigger]")?.addEventListener("click", () => {
    const options = { /* your options here */ };
    gennyFlow(options);
  });
});
</script>
```

### Built using

- [`html-to-img`](https://github.com/bubkoo/html-to-image)
- [`jszip`](https://github.com/Stuk/jszip)
- [`downloadjs`](https://github.com/rndme/download)

### CORS Proxy

If your capture elements have externally hosted images or css inside them, you will likely hit a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) error.

To bypass this, I recommend using a CORS proxy. You can find my fork of a Cloudflare Worker CORS proxy [here](https://github.com/briantuckerdesign/cors-proxy-worker/tree/main).
