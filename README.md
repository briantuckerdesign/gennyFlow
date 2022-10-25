# GennyFlow:
GennyFlow is a web-based image generator.

It was designed to be used with the Webflow CMS to allow for rapid and dynamic image creation, but can be used outside of webflow too.

### Requirements
 - jquery

### Built using
 - HTML2Canvas
 - jszip
 - filesaver.js
 - inline-svg
 These are included in gennyflow.js, but not in gennyflow-solo.js

### Required elements
 - #gen_wrapper
	 - Parent element in which all captured elements live
 - .gen_capture
	 - Element(s) you want turned into an image
	 - Must be nested inside of #gen_wrapper
 - .gen_slug
	 - Labels the exported png
	 - MUST be unique
	 - Can be a hidden element
	 - Must be nested inside of .gen_capture

### Other Notes
To avoid CORS issues:
 - Host all images used in the Webflow asset manager
 - Host the requirements in the Webflow asset manager
	 - You can do this by renaming your js file to a .txt file.
	 - See example below

### Example Page Structure

    <html>
	    <head>
		    <!--include html2canvas/jszip/filesaver here-->
		    <!--host them on webflow as .txt files-->
		    <!--i.e. 
			    <script type="text/javascript" src="url.txt">
			    </script>
		    -->
	    </head>
	    <body>
		    <div id="gen_capture">
			    <div class="gen_capture>
				    <span class="gen_slug">unique-slug-1</span>
				    <!--Capture content here-->
			    </div>
			    <div class="gen_capture>
				    <span class="gen_slug">unique-slug-2</span>
				    <!--Capture content here-->
			    </div>
		    </div>
		    <script src="gennyflow.txt type="text/javascript></script>
		    <!-- you can put this in the before </body> section of your webflow page settings-->
	    </body>
    </html>
