# GennyFlow:
GennyFlow is a web-based image generator.

It was designed to be used with the Webflow CMS to allow for rapid and dynamic image creation, but can be used outside of webflow too.

### Requirements
 - HTML2Canvas
 - jszip
 - filesaver.js

### Required elements
 - #gen_wrapper
	 - Parent element in which all captured elements live
 - .gen_capture
	 - Element(s) you want turned into an image
	 - Must be nested inside of #gen_wrapper
 - .gen_slug
	 - Labels the exported png
	 - Must be nested inside of .gen_capture
